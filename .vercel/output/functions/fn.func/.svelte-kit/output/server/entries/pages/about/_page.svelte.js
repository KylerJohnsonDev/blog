import { c as create_ssr_component, v as validate_component, f as add_attribute } from "../../../chunks/index2.js";
import { p as portrait } from "../../../chunks/kyler_johnson.js";
import { P as PageHead } from "../../../chunks/PageHead.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PageHead, "PageHead").$$render(
    $$result,
    {
      title: "Kyler Johnson | About",
      description: "A Sr. Principal UI Engineer focused on Angular, Sveltekit, and Next.js/React"
    },
    {},
    {}
  )}

<main class="${"mb-auto"}"><div class="${"divide-y divide-gray-200 dark:divide-gray-700"}"><div class="${"space-y-2 pt-6 pb-8 md:space-y-5"}"><h1 class="${"text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"}">About</h1></div>
        <div class="${"items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0"}"><div class="${"flex flex-col items-center pt-8"}"><span style="${"box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;"}"><span style="${"box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; max-width: 100%;"}"><img class="${"h-36 w-36 rounded-full"}" style="${"display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;"}" alt="${""}" aria-hidden="${"true"}"${add_attribute("src", portrait, 0)}></span><img alt="${"avatar"}"${add_attribute("src", portrait, 0)} decoding="${"async"}" data-nimg="${"intrinsic"}" class="${"h-36 w-36 rounded-full"}" style="${"position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: medium; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;"}"${add_attribute("srcset", portrait, 0)}></span>
                <h3 class="${"pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight"}">Kyler Johnson</h3>
                <div class="${"text-gray-500 dark:text-gray-400"}">Senior Principal Software Engineer</div>
                <div class="${"text-gray-500 dark:text-gray-400"}">Secureworks</div></div>
            <div class="${"prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2"}"><p>Hello there! I am Kyler Johnson, a former senior back-end .NET developer currently focused on front-end development, specializing in Angular, Sveltekit, and Next.js/React. Currently working as a Senior Principal UI Engineer, I have years of experience across the stack building and maintaining scalable, event-driven SaaS products at an enterprise scale.
                </p>

                <p>I absolutely love what I do and I am enthralled by the challenges of solving real-world problems with technology. Seeing myself as a Software Craftsman, I have an insatiable appetite for learning and I am always looking for ways to improve my craft and share my knowledge.
                </p>



</div></div></div></main>`;
});
export {
  Page as default
};
