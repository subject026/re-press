import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";

import { Link, useLoaderData } from "@remix-run/react";
import { findPages } from "../../../core/resources/Page/PageController.server";

export async function loader({ request }: LoaderArgs) {
  const pages = await findPages();

  return json({ pages });
}

export default function AdminPagesIndex() {
  const { pages } = useLoaderData<typeof loader>();

  console.log("pages", pages);

  return (
    <section>
      <nav>
        {/* // TODO: /new should create a new page in the DB with draft status and redirect to the the edit route with that page loaded */}
        <Link className="btn" to={"new"}>
          New Page
        </Link>
      </nav>
      {/* <section className="flex flex-col gap-2 px-2">
        {pages.map((page) => {
          return (
            <div key={page.id}>
            <Link className="link" to={`/admin/pages/${page.id}`}>
            {page.title}
            </Link>
            </div>
            );
          })}
        </section> */}
    </section>
  );
}
