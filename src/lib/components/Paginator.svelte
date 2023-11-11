<script lang="ts">
    export let currentPage: number;
    export let totalPages: number;
    export let hasPrevPage: boolean;
    export let prevPageUri: string;
    export let hasNextPage: boolean;
    export let nextPageUri: string;
</script>

<div class="space-y-2 pt-6 pb-8 md:space-y-5">
    <nav class="flex justify-between">
        { #if hasPrevPage }
            <a href={prevPageUri}>
                <button>Previous</button>
            </a>
        { :else }
            <button class="cursor-auto disabled:opacity-50" disabled={!hasPrevPage}>
                Previous
            </button>
        {/if}

        <span>
          {currentPage} of {totalPages}
        </span>

        { #if hasNextPage }
            <a href={nextPageUri}>
                <button>Next</button>
            </a>
        { :else }
            <button class="cursor-auto disabled:opacity-50" disabled={!hasNextPage}>
                Next
            </button>
        {/if}
    </nav>
</div>