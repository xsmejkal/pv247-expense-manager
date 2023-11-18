import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header className="p-4 bg-gray-200">
        <Link className="text-blue-600 hover:underline" href="/expenses/new">
          Create new expense
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
