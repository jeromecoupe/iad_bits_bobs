function blogposts(collectionsApi) {
  return collectionsApi
    .getFilteredByGlob("./src/content/blogposts/*.md")
    .reverse();
}

export { blogposts };
