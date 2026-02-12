// console.log("NEW HASH 👉", bcrypt.hashSync("", 10));
import bcrypt from "bcryptjs";

export const ADMIN_PASSWORD_HASH =
  "$2b$10$pYnKJ1f9b/7wKvn3LAqtGuEtmp6P3ca1d62zBGx0Z/vHenGSzOV/C";

export function verifyAdminPassword(inputPassword) {
  return bcrypt.compareSync(inputPassword, ADMIN_PASSWORD_HASH);
}