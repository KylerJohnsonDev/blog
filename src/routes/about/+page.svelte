<script>
    import portrait from '$lib/assets/kyler_johnson.jpg';
    import PageHead from "$lib/components/PageHead.svelte";

</script>

<PageHead title="About" description="A Sr. Principal UI Engineer focused on Angular, Sveltekit, and Next.js/React" />

<main class="mb-auto">
    <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div class="space-y-2 pt-6 pb-8 md:space-y-5"><h1
                class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About</h1></div>
        <div class="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
            <div class="flex flex-col items-center pt-8">

                <span
                    style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;">
                    <span style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; max-width: 100%;">
                    <img class="h-36 w-36 rounded-full"
                    style="display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;"
                    alt="" aria-hidden="true"
                    src={portrait}></span><img
                    alt="avatar" src={portrait}
                    decoding="async" data-nimg="intrinsic" class="h-36 w-36 rounded-full"
                    style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: medium; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;"
                    srcset={portrait}></span>
                <h3 class="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">Kyler Johnson</h3>
                <div class="text-gray-500 dark:text-gray-400">Senior Principal Software Engineer</div>
                <div class="text-gray-500 dark:text-gray-400">Sophos</div>
            </div>
            <div class="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">
                <p>
                    Hello there! I am Kyler Johnson, A product-minded developer with 10 years of experience delivering and maintaining enterprise software that fills the sales pipeline and boosts customer retention. I understand how to strike the balance between shipping features quickly and maintaining a high-quality code base. 
                </p>

                <p>Specializing in C# .NET, Angular, and Node.js technologies, I build and maintain high quality, UX-oriented web applications at an enterprise scale. I enjoy doing everything from data modeling and building event driven, cloud-native systems to developing intuitive, aesthetic user interfaces.</p>

                <p>
                    I absolutely love what I do and I am enthralled by the challenges of solving real-world problems with technology. Seeing myself as a Software Craftsman, I have an insatiable appetite for learning and I am always looking for ways to improve my craft and share my knowledge.
                </p>

<!--                <p>-->
<!--                    I subscribe to the idea that there is much more to being a good developer than just writing code and deep technical knowledge. Keeping the "big picture" in focus, taking ownership, communicating effectively, and being a team player are all just as important.-->
<!--                </p>-->
            </div>
        </div>
    </div>
</main>