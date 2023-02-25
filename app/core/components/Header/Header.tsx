import { Form, Link } from "@remix-run/react";

interface IProps {
  user: { id: string; email: string } | null;
}

export default function Header({ user }: IProps) {
  console.log(user);

  return (
    <header className="navbar bg-base-100">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="admin" className="btn btn-ghost normal-case text-xl">
            Admin
          </Link>
        </div>
        <div className="flex-none">
          {user ? (
            <div className="user-info flex flex-row gap-4 items-center">
              <span>{`Hi ${user.email}`}</span>
              <Form action="/admin/logout" method="post">
                <button
                  type="submit"
                  className="btn"
                  data-testid="logout-button"
                >
                  logout
                </button>
              </Form>
            </div>
          ) : (
            <Link to="/login">login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
