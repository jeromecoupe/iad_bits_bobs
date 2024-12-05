// collections
import { blogposts } from "./src/_11ty/collections/blogposts.js";
import { team } from "./src/_11ty/collections/team.js";

// filters
import { dateFull, dateISO } from "./src/_11ty/filters/dates.js";
import { limit } from "./src/_11ty/filters/limit.js";
import { offset } from "./src/_11ty/filters/offset.js";

export default function (eleventyConfig) {
  // collections
  eleventyConfig.addCollection("blogposts", blogposts);
  eleventyConfig.addCollection("team", team);

  // filters
  eleventyConfig.addFilter("dateISO", dateISO);
  eleventyConfig.addFilter("dateFull", dateFull);
  eleventyConfig.addFilter("limit", limit);
  eleventyConfig.addFilter("offset", offset);

  // avoid processing and watching files
  eleventyConfig.ignores.add("./src/assets/**/*");
  eleventyConfig.watchIgnores.add("./src/assets/**/*");

  // copy files
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/img");

  // Eleventy dev server config
  eleventyConfig.setServerOptions({
    port: 3000,
    watch: ["./dist/assets/css/**/*.css", "./dist/assets/js/**/*.js"],
  });
}

export const config = {
  dir: {
    input: "src/",
    output: "dist/",
    data: "_data",
    includes: "_includes",
  },
  templateFormats: ["njk", "md", "html"],
  htmlTemplateEngine: "njk",
  markdownTemplateEngine: "njk",
};
