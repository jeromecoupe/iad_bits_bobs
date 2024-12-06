function team(collectionsApi) {
  return collectionsApi
    .getFilteredByGlob("./src/content/team/*.md")
    .sort((a, b) => {
      return a.data.surname.localeCompare(b.data.surname, {
        sensitivity: "base",
      });
    });
}

export { team };
