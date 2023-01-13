import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  title: "RePress",
  description: "Press your words with remix!",
});

export default function IndexRoute() {
  return (
    <div className="min-h-screen bg-sky-300 text-orange-700 flex items-center justify-center">
      <div>
        <h1>Repress</h1>
        <nav>
          <ul>
            <li>
              <Link to="admin" className=" underline">
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
