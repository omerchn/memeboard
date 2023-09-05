<script lang="ts">
  import { getMemes } from './api'
  import { onMount } from 'svelte'
  import MemeCard from './lib/MemeCard.svelte'

  let memes:
    | Array<{
        Key: string
      }>
    | undefined

  onMount(async () => {
    memes = await getMemes()
  })
</script>

<main>
  {#if !!memes}
    {#each memes as meme}
      <MemeCard memeKey={meme.Key} />
    {/each}
  {/if}
</main>

<style>
  main {
    padding: 2em;
    display: flex;
  }
</style>
