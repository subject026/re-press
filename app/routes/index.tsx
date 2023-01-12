import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  title: "RePress",
  description: "Press your words with remix!",
});

export default function IndexRoute() {
  return (
    <div className="min-h-screen bg-sky-300 flex items-center justify-center">
      <div>
        <h1>Repress</h1>
        <nav>
          <ul>
            <li>
              <Link to="jokes">Read Jokes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
