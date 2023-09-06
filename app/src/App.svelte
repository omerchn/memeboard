<script lang="ts">
  import { getMemes } from './api'
  import { onMount } from 'svelte'
  import MemeCard from './lib/MemeCard.svelte'
  import Upload from './lib/Upload.svelte'

  let memes: Array<string> | undefined

  const fetchMemes = async () => {
    try {
      memes = await getMemes()
    } catch (err) {
      alert(err)
    }
  }

  onMount(fetchMemes)
</script>

<main>
  {#if !!memes}
    {#each memes.reverse() as meme}
      <MemeCard memeId={meme} />
    {/each}
  {:else}
    <span>Getting memes...</span>
  {/if}
</main>
<Upload onUploadDone={fetchMemes} />

<style>
  main {
    padding: 2em;
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    text-align: center;
  }

  span {
    margin: auto;
  }
</style>
