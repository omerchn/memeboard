const WebSocket = require('ws')
const clients = require('./clients')

const start = (server) => {
  const wss = new WebSocket.Server({ server })

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
}

module.exports = start
