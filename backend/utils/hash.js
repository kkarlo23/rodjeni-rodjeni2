import { hash, compare } from "bcrypt";

// Function to hash a password
export async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds (higher = more secure, but slower)
  try {
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
}

// Function to check if a password is correct
export async function verifyPassword(password, hashedPassword) {
  try {
    const isMatch = await compare(password, hashedPassword);
    return isMatch; // true if passwords match, false otherwise
  } catch (err) {
    console.error("Error verifying password:", err);
    throw err;
  }
}
