import { db } from "~/core/resources/db.server";

import type { User as TUser } from "@prisma/client";
export type { TUser };

export async function create({
  email,
  passwordHash,
}: {
  email: TUser["email"];
  passwordHash: string;
}) {
  return db.user.create({
    data: {
      email,
      passwordHash,
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

export async function findOne({
  where,
  select,
}: {
  where: {
    [key: string]: string;
  };
  select: {
    [key: string]: boolean;
  };
}) {
  const user = await db.user.findUnique({
    where,
    select,
  });

  return user;
}

export async function update({
  where,
  data,
}: {
  where:
    | {
        id: string;
      }
    | { email: string };
  data: {
    passwordHash: string;
  };
}) {
  // const user = await db.user.findUnique({ where: { id } });
  const user = await db.user.update({ where, data });
  return user;
}
