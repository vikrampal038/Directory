import bcrypt from "bcryptjs";

// 👇 DEV helper (password generate karne ke liye – baad me comment kar dena)
// console.log(bcrypt.hashSync("admin1@123", 10));
// console.log(bcrypt.hashSync("admin2@123", 10));
// console.log(bcrypt.hashSync("admin3@123", 10));

export const USERS = [
  {
    email: "admin1@gmail.com",
    passwordHash: "$2b$10$JwSkx3cXoiuXOVNIvdWtqujRQLWI5EspXD1djNlG066LHMPBdedue", // client@123 ka hash
  },
  {
    email: "admin2@gmail.com",
    passwordHash: "$2b$10$sHRMFIlZMMbg/bj.mcN16.XjcC3wwuCMqDv8aGnx2/k0TW1KLtHQu", // staff@123 ka hash
  },
  {
    email: "admin3@gmail.com",
    passwordHash: "$2b$10$ad8u.NP.WRLiQ5.FqS8LLuMaOqnfF8gX4t.g4vhXineWidky55CZ2", // staff@123 ka hash
  },
];

export function verifyLogin(email, password) {
  const user = USERS.find((u) => u.email === email);
  if (!user) return false;
  return bcrypt.compareSync(password, user.passwordHash);
}
