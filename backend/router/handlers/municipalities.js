export function getMunicipalities(repository) {
  return async (req, res) => {
    const municipalities = await repository.municipalities.getMunicipalities();

    return res.send(municipalities);
  };
}
