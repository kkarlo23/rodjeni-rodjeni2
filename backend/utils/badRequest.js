export function statusBadRequest(res, str) {
  return res.status(400).send({ error: str });
}
