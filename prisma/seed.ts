import { Auth } from "../app/core/resources/Auth";

async function seed() {
  await Auth.register({
    email: "steve@example.com",
    password: "password",
  });
}

seed();
