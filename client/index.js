require('dotenv').config()
const symphonia = require('@tropicbliss/symphonia')
const WebSocket = require('ws')

const WS_URL = process.env.WS_URL || 'wss://meme-api.omercohen.dev'

let ws

const init = () => {
  console.log('Trying to connect to WebSocket server')

  ws = new WebSocket(WS_URL)

  ws.on('open', () => {
    console.log('Connected to WebSocket server')
  })

  ws.on('message', (message) => {
    if (message instanceof Buffer) {
      console.log('Playing meme')
      symphonia.playFromBuf(message)
    }
  })

  ws.on('close', () => {
    console.log('Connection to WebSocket server closed')
    ws = null
    setTimeout(init, 1000)
  })
}

init()
