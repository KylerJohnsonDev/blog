import { c as create_ssr_component, f as add_attribute, h as escape } from "./index2.js";
const Paginator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { currentPage } = $$props;
  let { totalPages } = $$props;
  let { hasPrevPage } = $$props;
  let { prevPageUri } = $$props;
  let { hasNextPage } = $$props;
  let { nextPageUri } = $$props;
  if ($$props.currentPage === void 0 && $$bindings.currentPage && currentPage !== void 0)
    $$bindings.currentPage(currentPage);
  if ($$props.totalPages === void 0 && $$bindings.totalPages && totalPages !== void 0)
    $$bindings.totalPages(totalPages);
  if ($$props.hasPrevPage === void 0 && $$bindings.hasPrevPage && hasPrevPage !== void 0)
    $$bindings.hasPrevPage(hasPrevPage);
  if ($$props.prevPageUri === void 0 && $$bindings.prevPageUri && prevPageUri !== void 0)
    $$bindings.prevPageUri(prevPageUri);
  if ($$props.hasNextPage === void 0 && $$bindings.hasNextPage && hasNextPage !== void 0)
    $$bindings.hasNextPage(hasNextPage);
  if ($$props.nextPageUri === void 0 && $$bindings.nextPageUri && nextPageUri !== void 0)
    $$bindings.nextPageUri(nextPageUri);
  return `<div class="${"space-y-2 pt-6 pb-8 md:space-y-5"}"><nav class="${"flex justify-between"}">${hasPrevPage ? `<a${add_attribute("href", prevPageUri, 0)}><button>Previous</button></a>` : `<button class="${"cursor-auto disabled:opacity-50"}" ${!hasPrevPage ? "disabled" : ""}>Previous
            </button>`}

        <span>${escape(currentPage)} of ${escape(totalPages)}</span>

        ${hasNextPage ? `<a${add_attribute("href", nextPageUri, 0)}><button>Next</button></a>` : `<button class="${"cursor-auto disabled:opacity-50"}" ${!hasNextPage ? "disabled" : ""}>Next
            </button>`}</nav></div>`;
});
export {
  Paginator as P
};
