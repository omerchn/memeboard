const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const multer = require('multer')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const clients = new Set()

wss.on('connection', (ws) => {
  console.log('WebSocket client connected')
  clients.add(ws)

  ws.on('message', (message) => {
    console.log(`Received: ${message}`)
  })

  ws.on('close', () => {
    console.log('WebSocket client disconnected')
    clients.delete(ws)
  })
})

const storage = multer.memoryStorage()
const upload = multer({ storage })

app.use(express.json())

app.post('/meme/mp3', upload.single('file'), (req, res) => {
  const { file } = req

  if (!file) {
    return res.status(400).json({ error: 'No file provided' })
  }

  const fileBuffer = file.buffer
  console.log(`Broadcasting file: ${file.originalname}`)

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(fileBuffer)
    }
  })

  res.json({ success: true, message: 'Meme broadcasted' })
})

const PORT = process.env.PORT || 6000
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
