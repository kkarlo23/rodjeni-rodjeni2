export function getCategories(repository) {
  return async (req, res) => {
    const categories = await repository.categories.getCategories();

    return res.send(categories);
  };
}
