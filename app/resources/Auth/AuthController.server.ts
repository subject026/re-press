import bcrypt from "bcryptjs";

import { db } from "~/resources/db.server";

import type { User } from "@prisma/client";
import {
  commitSession,
  destroySession,
  getSession,
} from "../../utils/session.server";
import { redirect } from "@remix-run/node";
export type { User } from "@prisma/client";

type LoginForm = {
  email: string;
  password: string;
};

type RegisterForm = {
  email: string;
  password: string;
};

export async function register({ email, password }: RegisterForm) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { email, passwordHash },
  });
  return { id: user.id, email };
}

export async function login({ email, password }: LoginForm) {
  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) return null;

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) return null;

  return { id: user.id, email };
}
export async function resetUserPassword({
  email,
  password,
}: {
  email: User["email"];
  password: string;
}) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return db.user.update({
    where: { email },
    data: {
      passwordHash: hashedPassword,
    },
  });
}

// SESSION

export async function logout(request: Request) {
  const session = await getUserSession(request);

  return await destroySession(session);
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

function getUserSession(request: Request) {
  return getSession(request.headers.get("Cookie"));
}

export async function getUserFromSession(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });
    return user;
  } catch {
    throw logout(request);
  }
}

/**
 * Check for session and return user id
 * @param request Request
 * @returns userId or null
 */
export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}
