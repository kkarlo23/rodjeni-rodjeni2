import Joi from "joi";
import { statusBadRequest } from "../../utils/badRequest.js";
import { hashPassword } from "../../utils/hash.js";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).required(),
  confirm_password: Joi.string().valid(Joi.ref("password")).required(),
  full_name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
    .required()
    .messages({
      "string.pattern.base": "Must be a valid phone number",
    }),
});

export function register(repository) {
  return async (req, res) => {
    const { body } = req;
    const exists = await repository.users.usernameExists(body.username);

    if (exists) {
      return statusBadRequest(res, "Username already exists");
    }

    const user = await repository.users.createUser({
      username: body.username,
      password: await hashPassword(body.password),
      full_name: body.full_name,
      email: body.email,
      phone: body.phone,
    });

    return res.status(201).send(user);
  };
}
