const player = require('play-sound')((opts = {}))

const WebSocket = require('ws')
const fs = require('fs')
const path = require('path')

const FILE_OUTPUT_DIR = path.join(__dirname, 'files')

if (!fs.existsSync(FILE_OUTPUT_DIR)) {
  fs.mkdirSync(FILE_OUTPUT_DIR)
}

let ws

const connect = () => {
  console.log('Trying to connect to WebSocket server')

  ws = new WebSocket('wss://meme-api.omercohen.dev')

  ws.on('open', () => {
    console.log('Connected to WebSocket server')
  })

  ws.on('message', (message) => {
    if (message instanceof Buffer) {
      const filename = `${Date.now()}.mp3`
      const filePath = path.join(FILE_OUTPUT_DIR, filename)
      fs.writeFileSync(filePath, message)
      console.log(`playing ${filename}`)
      player.play(filePath, () => {
        fs.unlink(filePath, () => {
          console.log(`deleted ${filename}`)
        })
      })
    }
  })

  ws.on('close', () => {
    console.log('Connection to WebSocket server closed')
    ws = null
    setTimeout(connect, 1000)
  })
}

connect()
