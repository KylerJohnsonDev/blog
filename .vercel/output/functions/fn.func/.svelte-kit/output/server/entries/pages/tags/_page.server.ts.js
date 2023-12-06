import { g as getFiles } from "../../../chunks/files.js";
import { k as kebabCase } from "../../../chunks/kebabCase.js";
async function getAllTagsWithCount() {
  const posts = await getFiles();
  const tagCount = {};
  posts.forEach((post) => {
    if (post.tags && post.published) {
      post.tags.forEach((tag) => {
        const formattedTag = kebabCase(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });
  return tagCount;
}
const load = async () => {
  const tagsWithCount = await getAllTagsWithCount();
  const sortedTags = Object.keys(tagsWithCount).sort((a, b) => a.localeCompare(b));
  return { tagsWithCount, sortedTags };
};
export {
  load
};
