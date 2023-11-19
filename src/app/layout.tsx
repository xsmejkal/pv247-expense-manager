import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoginStatus } from "./loginStatus";
import { Providers } from "../app/_components/providers";
import Menu from "./Menu";
import BurgerButton from "./BurgerButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expense manager++",
  description: "Expense manager for keeping personal finance in order!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <Providers>
          <div className="bg-gray-100 w-full px-5 py-3 flex justify-between items-center">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <LoginStatus />
          </div>

          <div className="hidden md:flex h-screen">
            <div className="flex flex-row">
              <div className="w-60 h-screen bg-gray-800">
                <div className="px-5 py-3 font-bold">Menu</div>
                <Menu />
              </div>
              <div className="p-5 flex-1">{children}</div>
            </div>
          </div>

          <div className="flex md:hidden">
            <div className="flex flex-col w-screen">
              <BurgerButton />
              <div className="p-5 flex-1">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
