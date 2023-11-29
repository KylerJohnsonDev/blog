<script lang="ts">
    let hovered = false;
    let copied = false;
    let ref: any = null;
    function onEnter() {
        hovered = true;
    }
    function onExit() {
        hovered = false;
        copied = false;
    }
    function onCopy() {
        if(ref) {
            copied = true;
            navigator.clipboard.writeText(ref.current.textContent)
            setTimeout(() => {
                copied = false
            }, 2000)
        }
    }
</script>

<div class="relative" bind:this={ref} on:mouseenter={onEnter} on:mouseleave={onExit}>

    {#if hovered}
        <button
                aria-label="Copy code"
                type="button"
                class={`absolute right-2 top-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800 ${
            copied
              ? 'border-green-400 focus:border-green-400 focus:outline-none'
              : 'border-gray-300'
          }`}
                on:click={onCopy}
        >
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    class={copied ? 'text-green-400' : 'text-gray-300'}
            >
                { #if copied }
                    <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                    {:else}
                    <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                    { /if }
            </svg>
        </button>
    {/if}
    <slot />
</div>