import { db } from "~/core/resources/db.server";

import type { Page as TPage } from "@prisma/client";
export type { TPage };

// export async function create({
//   email,
//   passwordHash,
// }: {
//   email: Page["email"];
//   passwordHash: string;
// }) {
//   return db.user.create({
//     data: {
//       email,
//       passwordHash,
//     },
//   });
// }

export async function findById(pageId: string): Promise<TPage | null> {
  const page = await db.page.findUnique({
    where: { id: pageId },
  });
  return page;
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
}): Promise<TPage | null> {
  const page = (await db.page.findUnique({
    where,
    select,
  })) as unknown;

  return page as TPage;
}

export async function findAll(): Promise<TPage[]> {
  const pages = await db.page.findMany();
  return pages;
}

export async function update({
  where,
  data,
}: {
  where: {
    [key: string]: string;
  };
  data: { [key: string]: string };
}) {
  // const page = await db.page.findUnique({ where: { id } });
  const page = await db.page.update({ where, data });
  return page;
}
