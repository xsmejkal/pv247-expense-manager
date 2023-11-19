import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main>{children}</main>

      <div className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full cursor-pointer h-16 w-16">
        <Link className="flex justify-center  w-16 h-16" href="/expenses/new">
          <div className="font-bold text-2xl flex align-middle">
            <span className="flex items-center justify-center">+</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Layout;
