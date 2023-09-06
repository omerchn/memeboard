<script lang="ts">
  import Dropzone, {
    type DropzoneEvents,
  } from 'svelte-file-dropzone/Dropzone.svelte'
  import { uploadFile } from '../api'

  export let refetch: () => void
  const accept = '.mp3'

  const handleFilesSelect = async (e: DropzoneEvents['drop']) => {
    const { acceptedFiles, fileRejections } = e.detail
    if (fileRejections.length) {
      alert(`Files rejected: ${fileRejections.join(', ')}`)
    }
    if (acceptedFiles.length) {
      const file = acceptedFiles[0]
      const confirm = window.confirm(`Upload ${file.name}?`)
      if (!confirm) return
      try {
        await uploadFile(file)
        refetch()
      } catch {
        alert('Failed to upload file')
      }
    }
  }
</script>

<Dropzone on:drop={handleFilesSelect} {accept} multiple={false}>
  Drop a meme.mp3, or click to select. Max size 1MB
</Dropzone>
