import Joi from "joi";
import { hashPassword } from "../../utils/hash.js";

export const changePasswordSchema = Joi.object({
  password: Joi.string().min(3).required(),
  confirm_password: Joi.string().valid(Joi.ref("password")).required(),
});
export function changePassword(repository) {
  return async (req, res) => {
    const { session, body } = req;

    await repository.users.changePassword(session.user_id, await hashPassword(body.password));
    res.sendStatus(200);
  };
}

export const updateUserInfoSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  full_name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
    .messages({
      "string.pattern.base": "Must be a valid phone number",
    })
    .required(),
});
export function updateUserInfo(repository) {
  return async (req, res) => {
    const { session, body } = req;
    const exists = await repository.users.usernameExists(body.username);

    if (exists) {
      return statusBadRequest(res, "Username already exists");
    }

    const user = await repository.users.updateUser(session.user_id, {
      username: body.username,
      full_name: body.full_name,
      email: body.email,
      phone: body.phone,
    });

    return res.status(200).send(user);
  };
}
