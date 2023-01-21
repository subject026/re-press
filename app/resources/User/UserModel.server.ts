import bcrypt from "bcryptjs";

import { db } from "~/resources/db.server";

import type { User } from "@prisma/client";
export type { User } from "@prisma/client";

export async function create({
  email,
  password,
}: {
  email: User["email"];
  password: string;
}) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return db.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
    },
  });
}

export async function findById(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { email: true, id: true },
  });

  return user;
}
