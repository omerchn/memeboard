const { PutObjectCommand } = require('@aws-sdk/client-s3')
const multer = require('multer')
const express = require('express')
const router = express.Router()
const client = require('../s3')

const bucket = process.env.S3_BUCKET

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
})

router.post('/mp3', upload.single('file'), async (req, res) => {
  const { file } = req

  if (!file) {
    return res.status(400).json({ error: 'No file provided' })
  }

  const { buffer, originalname } = file

  const keyName = `${Date.now()}-${originalname}`

  const putCommand = new PutObjectCommand({
    Bucket: bucket,
    Key: keyName,
    Body: buffer,
  })

  try {
    await client.send(putCommand)
    res.json({
      success: true,
      message: `Successfully uploaded ${originalname} to ${bucket}/${keyName}`,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error })
  }
})

module.exports = router
