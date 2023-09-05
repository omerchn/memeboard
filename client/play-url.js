const fs = require('fs')
const https = require('https')
const path = require('path')
const player = require('play-sound')({})

const FILE_OUTPUT_DIR = path.join(__dirname, 'files')

if (!fs.existsSync(FILE_OUTPUT_DIR)) {
  fs.mkdirSync(FILE_OUTPUT_DIR)
}

const processes = []
const killProcesses = () => {
  processes.forEach((proc) => {
    proc.kill()
  })
}

module.exports = (url) => {
  try {
    console.log('Downloading file from:', url)

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(`Error getting file. status code: ${response.statusCode}`)
        return
      }

      const fileName = `${Date.now()}.mp3`
      const filePath = path.join(FILE_OUTPUT_DIR, fileName)
      const writeStream = fs.createWriteStream(filePath)

      console.log('Saving file')
      response.pipe(writeStream)

      writeStream.on('finish', () => {
        writeStream.close()
        console.log('Playing file')
        killProcesses()
        const proc = player.play(filePath, (err) => {
          if (err) {
            console.error('Error playing the file:', err)
          }

          fs.unlink(filePath, () => {
            console.log('Deleted file')
          })
        })

        if (proc) processes.push(proc)
      })

      writeStream.on('error', (err) => {
        console.error('Error saving the file:', err)
      })
    })
  } catch (err) {
    console.error(`Failed to get url ${url}:`, err.message)
  }
}
