<script lang="ts">
  import { playMeme } from '../api'

  export let memeKey: string

  const play = async () => {
    await playMeme(memeKey)
  }
</script>

<div class="card">
  <button on:click={play}>
    {memeKey}
  </button>
</div>
