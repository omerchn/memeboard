const wsUrl = 'wss://meme-api.omercohen.dev'
// const wsUrl = 'ws://localhost:6000'

const WebSocket = require('ws')
const playUrl = require('./play-url')

let ws

const connect = () => {
  console.log(`Connecting to WebSocket server at ${wsUrl}`)

  ws = new WebSocket(wsUrl)

  ws.on('open', () => {
    console.log('Connected to WebSocket server')
  })

  ws.on('message', (message) => {
    playUrl(message.toString())
  })

  ws.on('close', () => {
    console.log('Connection to WebSocket server closed')
    ws = null
    setTimeout(connect, 1000)
  })
}

connect()
