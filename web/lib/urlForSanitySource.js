import imageUrlBuilder from "@sanity/image-url";
import client from "./client";

const urlForSanitySource = (source) => {
  return imageUrlBuilder(client).image(source);
};
export default urlForSanitySource;
