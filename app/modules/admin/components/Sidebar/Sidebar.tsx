import { Link } from "@remix-run/react";

export default function Sidebar() {
  return (
    <section>
      <ul className="menu p-4 bg-base-100 text-base-content flex flex-col gap-2">
        <li>
          <Link to="/admin/pages">Pages</Link>
        </li>
        <li>
          <Link to="/admin/media">Media</Link>
        </li>
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
      </ul>
    </section>
  );
}
