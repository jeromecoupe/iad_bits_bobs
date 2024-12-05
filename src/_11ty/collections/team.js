function team(collectionsApi) {
  return collectionsApi.getFilteredByGlob("./src/content/team/*.md");
}

export { team };
