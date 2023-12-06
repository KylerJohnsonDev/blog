import { i as getContext, c as create_ssr_component, j as subscribe, h as escape, f as add_attribute, g as each } from "./index2.js";
import { s as siteMetadata } from "./siteMetaData.js";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const name = "Kyler Johnson";
const jobTitle = "Sr. Principal Software Engineer";
const PageHead = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { title } = $$props;
  let { description } = $$props;
  let { image = "%sveltekit.assets%/kyler_johnson_dev.png" } = $$props;
  let { imageAlt } = $$props;
  let { canonicalUrl } = $$props;
  let { ogType = "website" } = $$props;
  let { date } = $$props;
  let { tags } = $$props;
  const defaultTitle = `${name} | ${jobTitle}`;
  const formattedTitle = title ? `${title} | ${name}` : defaultTitle;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  if ($$props.imageAlt === void 0 && $$bindings.imageAlt && imageAlt !== void 0)
    $$bindings.imageAlt(imageAlt);
  if ($$props.canonicalUrl === void 0 && $$bindings.canonicalUrl && canonicalUrl !== void 0)
    $$bindings.canonicalUrl(canonicalUrl);
  if ($$props.ogType === void 0 && $$bindings.ogType && ogType !== void 0)
    $$bindings.ogType(ogType);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-12ei9d5_START -->${$$result.title = `<title>${escape(formattedTitle)}</title>`, ""}<meta property="${"og:site_name"}"${add_attribute("content", formattedTitle, 0)}><meta property="${"og:title"}"${add_attribute("content", title, 0)}><meta property="${"og:image"}"${add_attribute("content", image, 0)}><meta property="${"og:image:alt"}"${add_attribute("content", imageAlt, 0)}><meta property="${"og:description"}"${add_attribute("content", description, 0)}><meta property="${"og:author"}"${add_attribute("content", name, 0)}><meta name="${"robots"}" content="${"follow, index"}"><meta name="${"description"}"${add_attribute("content", description, 0)}><meta property="${"og:url"}"${add_attribute("content", $page.url.href, 0)}><meta property="${"og:type"}"${add_attribute("content", ogType, 0)}>${ogType === "article" ? `<meta property="${"article:published_time"}"${add_attribute("content", new Date(date).toISOString(), 0)}>
		<meta property="${"article:modified_time"}"${add_attribute("content", new Date(date).toISOString(), 0)}>
		<meta property="${"article:author"}"${add_attribute("content", name, 0)}>
		<meta property="${"article:section"}" content="${"Technology"}">
		${tags?.length ? `${each(tags, (tag) => {
    return `<meta property="${"article:tag"}"${add_attribute("content", tag, 0)}>`;
  })}` : ``}` : ``}<meta name="${"twitter:card"}"${add_attribute("content", image, 0)}><meta name="${"twitter:site"}"${add_attribute("content", siteMetadata.twitter, 0)}><meta name="${"twitter:title"}"${add_attribute("content", title, 0)}><meta name="${"twitter:description"}"${add_attribute("content", description, 0)}><meta name="${"twitter:image"}"${add_attribute("content", image, 0)}><link rel="${"canonical"}"${add_attribute("href", canonicalUrl ? canonicalUrl : `$page.url.href`, 0)}><!-- HEAD_svelte-12ei9d5_END -->`, ""}`;
});
export {
  PageHead as P
};
