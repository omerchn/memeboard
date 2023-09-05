require('dotenv').config()
const express = require('express')
const http = require('http')
const cors = require('cors')

const startWs = require('./ws')
const uploadRouter = require('./routers/upload')
const playRouter = require('./routers/play')
const bucketRouter = require('./routers/bucket')

const app = express()
const server = http.createServer(app)

startWs(server)

app.use(express.json())
app.use(cors())
app.use('/upload', uploadRouter)
app.use('/play', playRouter)
app.use('/bucket', bucketRouter)

const PORT = process.env.PORT || 6000
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
