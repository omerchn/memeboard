const { ListObjectsCommand } = require('@aws-sdk/client-s3')
const express = require('express')
const router = express.Router()
const client = require('../s3')

router.get('/memes', async (req, res) => {
  const command = new ListObjectsCommand({ Bucket: process.env.S3_BUCKET })
  try {
    const { Contents } = await client.send(command)
    const memes = (Contents ?? []).map((obj) => obj.Key)
    res.json({ success: true, memes })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error })
  }
})

module.exports = router
