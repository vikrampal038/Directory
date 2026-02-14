import bcrypt from "bcryptjs";

// 👇 DEV helper (naya hash banane ke liye)
// console.log(bcrypt.hashSync("intsol@12", 10));
// console.log(bcrypt.hashSync("nikhil@123", 10));

export const USERS = [
  {
    email: "vikrampal038@gmail.com",
    name: "Vikram Pal",
    passwordHash:
      "$2b$10$SJ7VBoz6x8FPVG/P.IEf6.vj1RcP73hgBPbZDDI7s66doptubCodq",
    deletePasswordHash:
      "$2b$10$VO6WAdDFneLcBd5O0ueEF.io7Fwt1xOQ.5LxWwjST7EmyNpBLhImS",
  },
  {
    email: "singhnikhil100@gmail.com",
    name: "Nikhil Singh",
    passwordHash:
      "$2b$10$ngQb3pDDBOSsxoydW/smNuvB40cEwhqR4lWQrX6DU787kCVTnn3ri",
    deletePasswordHash:
      "$2b$10$quxhoOPnIbJBN9pyxkVZ5OkzgJARKZwTuQXVXa5iUYA3PX68a69uK",
  },
];

export function verifyLogin(email, password) {
  const user = USERS.find((u) => u.email === email);
  if (!user) return null;

  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) return null;

  return { email: user.email, name: user.name };
}

export async function verifyDeletePassword(email, inputPassword) {
  const bcrypt = (await import("bcryptjs")).default;
  if (!email || !inputPassword) return false;

  const user = USERS.find((u) => u.email === email);
  if (!user) return false;

  return bcrypt.compareSync(inputPassword, user.deletePasswordHash);
}
