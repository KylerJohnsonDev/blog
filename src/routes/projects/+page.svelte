<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import PageHead from "$lib/components/PageHead.svelte";

    const projectsData: any = [];
</script>

<PageHead title="Projects" description="Under construction" />

<div class="divide-y divide-gray-200 dark:divide-gray-700">
    <div class="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
        </h1>
        <p class="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
        </p>
    </div>
    <div class="container py-12">
        <div class="-m-4 flex flex-wrap">
            { #each projectsData as d }
                <Card
                    title={d.title}
                    description={d.description}
                    imgSrc={d.imgSrc}
                    href={d.href}
                />
            {/each}
        </div>
    </div>
</div>