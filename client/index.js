const wsUrl = 'wss://meme-api.omercohen.dev'

const WebSocket = require('ws')
const playMeme = require('./play-meme')

let ws

const connect = () => {
  console.log(`Connecting to WebSocket server at ${wsUrl}`)

  ws = new WebSocket(wsUrl)

  ws.on('open', () => {
    console.log('Connected to WebSocket server')
  })

  ws.on('message', (message) => {
    try {
      playMeme(JSON.parse(message.toString()))
    } catch {
      console.error(`Bad message. expected JSON, got: ${message}`)
    }
  })

  ws.on('close', () => {
    console.log('Connection to WebSocket server closed')
    ws = null
    setTimeout(connect, 1000)
  })
}

connect()
