export function getCounties(repository) {
  return async (req, res) => {
    const counties = await repository.counties.getCounties();

    return res.send(counties);
  };
}
