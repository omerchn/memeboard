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

export const playMeme = async (memeKey: string) => {
  const res = await fetch(`${apiUrl}/play/bucket/memes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      meme: memeKey,
    }),
  })
  if (!res.ok) {
    throw new Error('Failed to play meme')
  }
}
