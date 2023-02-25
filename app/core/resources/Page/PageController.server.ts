import { PageModel } from ".";

export async function findPages() {
  return PageModel.findAll();
}
