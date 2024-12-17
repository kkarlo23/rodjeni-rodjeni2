// Middleware for validation
export const checkAuth = (repository) => async (req, res, next) => {
  const session = req.cookies?.session;
  if (!session) return res.sendStatus(401);

  const sessionUser = await repository.sessions.sessionOk(session);

  if (!sessionUser) {
    res.clearCookie("session");
    return res.sendStatus(401);
  }

  req.session = sessionUser;

  next();
};
