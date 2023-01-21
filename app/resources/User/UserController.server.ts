import * as User from "./UserModel.server";

export async function getUserById(userId: string) {
  return User.findById(userId);
}
