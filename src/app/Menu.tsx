'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Menu = () => {
  const pathname = usePathname();
	const isActive = (path: string) => pathname === path;

	const linkClassName = (path: string) => {
		let baseClass =
			'px-5 py-2 hover:bg-gray-700';
		if (isActive(path)) {
			baseClass += ' font-bold';
		}
		return baseClass;
	};

  return (
    <div className="bg-gray-800 text-white flex flex-col">
      <Link href="/categories" className={linkClassName("/categories")}>
        Categories
      </Link>
      <Link href="/expenses" className={linkClassName("/expenses")}>
        Expenses
      </Link>
      <Link href="/reports" className={linkClassName("/reports")}>
        Reports
      </Link>
    </div>
  );
};

export default Menu;
