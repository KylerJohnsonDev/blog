import { c as create_ssr_component, f as add_attribute, h as escape, g as each, v as validate_component } from "../../../chunks/index2.js";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { description } = $$props;
  let { imgSrc } = $$props;
  let { href } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.imgSrc === void 0 && $$bindings.imgSrc && imgSrc !== void 0)
    $$bindings.imgSrc(imgSrc);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  return `<div class="${"md p-4 md:w-1/2 max-w-[544px]"}"><div${add_attribute("class", `${imgSrc && "h-full"}  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`, 0)}>${imgSrc && href ? `<a${add_attribute("href", href, 0)}${add_attribute("aria-label", `Link to ${title}`, 0)}><img${add_attribute("alt", title, 0)}${add_attribute("src", imgSrc, 0)} class="${"object-cover object-center md:h-36 lg:h-48"}"${add_attribute("width", 544, 0)}${add_attribute("height", 306, 0)}></a>` : `<img${add_attribute("alt", title, 0)}${add_attribute("src", imgSrc, 0)} class="${"object-cover object-center md:h-36 lg:h-48"}"${add_attribute("width", 544, 0)}${add_attribute("height", 306, 0)}>`}
        <div class="${"p-6"}"><h2 class="${"mb-3 text-2xl font-bold leading-8 tracking-tight"}">${href ? `<a${add_attribute("href", href, 0)}${add_attribute("aria-label", `Link to ${title}`, 0)}>${escape(title)}</a>` : `${escape(title)}`}</h2>
            <p class="${"prose mb-3 max-w-none text-gray-500 dark:text-gray-400"}">${escape(description)}</p>
            ${href ? `<a${add_attribute("href", href, 0)} class="${"text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"}"${add_attribute("aria-label", `Link to ${title}`, 0)}>Learn more →
                </a>` : ``}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const projectsData = [];
  return `<div class="${"divide-y divide-gray-200 dark:divide-gray-700"}"><div class="${"space-y-2 pt-6 pb-8 md:space-y-5"}"><h1 class="${"text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"}">Projects
        </h1>
        <p class="${"text-lg leading-7 text-gray-500 dark:text-gray-400"}">Showcase your projects with a hero image (16 x 9)
        </p></div>
    <div class="${"container py-12"}"><div class="${"-m-4 flex flex-wrap"}">${each(projectsData, (d) => {
    return `${validate_component(Card, "Card").$$render(
      $$result,
      {
        title: d.title,
        description: d.description,
        imgSrc: d.imgSrc,
        href: d.href
      },
      {},
      {}
    )}`;
  })}</div></div></div>`;
});
export {
  Page as default
};
