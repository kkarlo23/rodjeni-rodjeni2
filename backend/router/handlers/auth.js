import Joi from "joi";
import { verifyPassword } from "../../utils/hash.js";
import { statusBadRequest } from "../../utils/badRequest.js";

export function getDummySession(repository) {
  return async (req, res) => {
    const { body } = req;
    const username = "test222";
    const password = "test";
    const user = await repository.users.getUserForLogin(username);

    if (!user || !(await verifyPassword(password, user.password))) {
      return statusBadRequest(res, "Bad username or password");
    }
    delete user.password;
    delete user.deleted;

    const session = await repository.sessions.createSession(user.id);

    res.cookie("session", session.uuid);
    return res.send(user);
  };
}

export const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).required(),
});

export function login(repository) {
  return async (req, res) => {
    const { body } = req;

    const user = await repository.users.getUserForLogin(body.username);

    if (!user || !(await verifyPassword(body.password, user.password))) {
      return statusBadRequest(res, "Bad username or password");
    }
    delete user.password;
    delete user.deleted;

    const session = await repository.sessions.createSession(user.id);

    res.cookie("session", session.uuid);
    return res.send(user);
  };
}

export function logout() {
  return async (req, res) => {
    res.clearCookie("session");
    return res.sendStatus(200);
  };
}
