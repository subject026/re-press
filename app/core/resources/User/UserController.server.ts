import bcrypt from "bcryptjs";

import * as MUser from "./UserModel.server";

export async function create({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const passwordHash = await bcrypt.hash(password, 10);
  return MUser.create({ email, passwordHash });
}

export async function getUserById({ id }: { id: string }) {
  return MUser.findById(id);
}

export async function getUserByEmail(
  email: string,
  select: { [key: string]: boolean }
) {
  return MUser.findOne({
    where: { email },
    select,
  });
}
