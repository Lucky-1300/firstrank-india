import bcrypt from "bcrypt";

export const hashPassword = async (pass) => {
  return await bcrypt.hash(pass, 10);
};

export const comparePassword = async (pass, hash) => {
  return await bcrypt.compare(pass, hash);
};