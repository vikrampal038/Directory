import bcrypt from "bcryptjs";
// console.log("NEW HASH 👉", bcrypt.hashSync("", 10));

export const ADMIN_PASSWORD_HASH =
  "$2b$10$3Ga99265X3cY2EeKJC//CujPFbDzQKnxtfEPVpf6xr5oCt7xcdEjO";

export function verifyAdminPassword(inputPassword) {
  return bcrypt.compareSync(inputPassword, ADMIN_PASSWORD_HASH);
}