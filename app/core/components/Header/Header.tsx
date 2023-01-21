import { Form, Link } from "@remix-run/react";

interface IProps {
  user: { id: string; email: string } | null;
}

export default function Header({ user }: IProps) {
  console.log(user);

  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="admin" className="btn btn-ghost normal-case text-xl">
          Admin
        </Link>
        {user ? (
          <div className="user-info">
            <span>{`Hi ${user.email}`}</span>
            <Form action="/admin/logout" method="post">
              <button type="submit" className="button">
                Logout
              </button>
            </Form>
          </div>
        ) : (
          <Link to="login">Login</Link>
        )}
      </div>
    </header>
  );
}
