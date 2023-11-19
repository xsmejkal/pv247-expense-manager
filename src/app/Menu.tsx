import Link from "next/link";

const Menu = () => {
  return (
    <div className="bg-gray-800 text-white flex flex-col">
      <Link href="/categories" className="px-5 py-2 hover:bg-gray-700">
        Categories
      </Link>
      <Link href="/expenses" className="px-5 py-2 hover:bg-gray-700">
        Expenses
      </Link>
      <Link href="/reports" className="px-5 py-2 hover:bg-gray-700">
        Reports
      </Link>
    </div>
  );
};

export default Menu;
