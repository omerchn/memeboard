const fs = require('fs')
const https = require('https')
const path = require('path')
const player = require('play-sound')({})

const FILE_OUTPUT_DIR = path.join(__dirname, 'files')

fs.rmSync(FILE_OUTPUT_DIR, { recursive: true, force: true })
fs.mkdirSync(FILE_OUTPUT_DIR)

const processes = []

const playFile = (filePath) => {
  processes.forEach((proc) => {
    proc.kill()
  })
  const proc = player.play(filePath, (err) => {
    if (err) {
      console.error('Error playing the file:', err)
    }
  })
  if (proc) processes.push(proc)
}

module.exports = ({ url, meme }) => {
  if (!url || !meme) {
    console.error('url and meme required.')
    return
  }

  const filePath = path.join(FILE_OUTPUT_DIR, meme)

  if (fs.existsSync(filePath)) {
    console.log(`Playing ${meme}`)
    return playFile(filePath)
  }

  try {
    console.log(`Downloading ${meme} from:`, url)

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(
          `Error downloading file. status code: ${response.statusCode}`
        )
        return
      }

      const filePath = path.join(FILE_OUTPUT_DIR, meme)
      const writeStream = fs.createWriteStream(filePath)

      console.log(`Saving ${meme}`)
      response.pipe(writeStream)

      writeStream.on('finish', () => {
        writeStream.close()
        console.log(`Playing ${meme}`)
        playFile(filePath)
      })

      writeStream.on('error', (err) => {
        console.error(`Error saving the ${meme}:`, err)
      })
    })
  } catch (err) {
    console.error(`Failed to make a request to url ${url}:`, err.message)
  }
}
