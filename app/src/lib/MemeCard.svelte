<script lang="ts">
  import { playMeme } from '../api'

  export let memeKey: string
  let memeName: string

  $: {
    const split = memeKey.split('-')
    if (split.length === 1) {
      memeName = split[0]
    } else {
      const [id, ...rest] = split
      memeName = rest.join('-')
    }
  }

  const play = async () => {
    await playMeme(memeKey)
  }
</script>

<div class="card">
  <button on:click={play}>
    play {memeName}
  </button>
  <span>id: {memeKey}</span>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card span {
    font-size: 0.75em;
    margin: 0 0.5em;
    color: #999;
  }
</style>
