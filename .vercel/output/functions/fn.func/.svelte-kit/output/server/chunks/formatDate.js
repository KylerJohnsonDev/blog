import { s as siteMetadata } from "./siteMetaData.js";
function formatDate(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, options);
  return now;
}
export {
  formatDate as f
};
