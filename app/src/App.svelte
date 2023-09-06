<script lang="ts">
  import { getMemes } from './api'
  import { onMount } from 'svelte'
  import MemeCard from './lib/MemeCard.svelte'
  import Upload from './lib/Upload.svelte'

  let memes:
    | Array<{
        Key: string
      }>
    | undefined

  onMount(async () => {
    await fetchMemes()
  })

  const fetchMemes = async () => {
    memes = await getMemes()
  }
</script>

<main>
  {#if !!memes}
    {#each memes.reverse() as meme}
      <MemeCard memeKey={meme.Key} />
    {/each}
  {:else}
    <span>Getting memes...</span>
  {/if}
</main>
<Upload refetch={fetchMemes} />

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
