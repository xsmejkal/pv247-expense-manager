import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoginStatus } from "./login-status";
import { Providers } from "../app/_components/providers";
import BurgerButton from "./burger-button";
import { getServerAuthSession } from "@/server/auth";
import LoginPage from "./_components/LoginPage";
import Menu from "./Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expense manager++",
  description: "Expense manager for keeping personal finance in order!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const status = await getServerAuthSession();
  const userId = status?.user.id;
  if (!userId) {
    return (
      <html>
        <body>
          <LoginPage />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.className} flex flex-col overflow-x-hidden bg-gray-00`}
      >
        <Providers>
          <div className="bg-gray-100 h-16 w-full px-5 py-2 flex justify-between items-center fixed top-0 z-20">
            <Link className="hover:text-blue-600" href="/">
              Home
            </Link>
            <LoginStatus />
          </div>

          <div className="flex flex-1 pt-16">
            <div className="w-60 bg-gray-800 overflow-y-auto pt-16 fixed inset-y-0 left-0 z-10">
              <div className="px-5 py-3 font-bold text-white">Menu</div>
              <Menu />
            </div>

            <div className="flex-1 overflow-y-auto pl-60 pt-2">{children}</div>
          </div>

          <div className="md:hidden">
            <BurgerButton />
            <div className="overflow-y-auto pt-16">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
