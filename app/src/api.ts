const apiUrl = 'https://meme-api.omercohen.dev'

export const getMemes = async () => {
  const res = await fetch(`${apiUrl}/bucket/memes`)
  if (!res.ok) {
    throw new Error('Failed to get memes')
  }
  const data = await res.json()
  const { memes } = data
  return memes
}

export const playMeme = async (meme: string) => {
  const res = await fetch(`${apiUrl}/play/bucket/memes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ meme }),
  })
  if (!res.ok) {
    throw new Error('Failed to play meme')
  }
}

export const uploadFile = async (file: File) => {
  const data = new FormData()
  data.append('file', file)

  const res = await fetch(`${apiUrl}/upload/mp3`, {
    method: 'POST',
    body: data,
  })

  if (!res.ok) {
    throw new Error('Failed to upload meme')
  }
}
