import { hash, compare } from "bcrypt";

export async function hashPassword(password) {
  const saltRounds = 10;
  try {
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
}

export async function verifyPassword(password, hashedPassword) {
  try {
    const isMatch = await compare(password, hashedPassword);
    return isMatch; 
  } catch (err) {
    console.error("Error verifying password:", err);
    throw err;
  }
}
