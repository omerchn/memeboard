const { GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const WebSocket = require('ws')
const express = require('express')
const router = express.Router()

const clients = require('../clients')
const client = require('../s3')

router.post('/url/mp3', (req, res) => {
  const {
    body: { url },
  } = req

  if (!url) {
    return res
      .status(400)
      .json({ success: false, error: 'No meme provided. send `url` in body' })
  }

  console.log(`Broadcasting meme: ${url}`)

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(url)
    }
  })

  res.json({ success: true, message: 'Meme broadcasted' })
})

router.post('/bucket/memes', async (req, res) => {
  const {
    body: { meme },
  } = req

  if (!meme || typeof meme !== 'string') {
    return res
      .status(400)
      .json({ error: 'No meme provided. send `meme` under body.' })
  }

  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: meme,
  })

  try {
    const url = await getSignedUrl(client, command, { expiresIn: 3600 })

    console.log(`Broadcasting meme: ${url}`)

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ url, meme }))
      }
    })

    res.json({ success: true, message: 'Meme broadcasted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error })
  }
})

module.exports = router
