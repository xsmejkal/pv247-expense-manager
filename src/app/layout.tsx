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
      <body className={`${inter.className} flex flex-col w-full overflow-x-hidden`}>
        <Providers>
          <div className="bg-gray-100 w-full px-5 py-3 flex justify-between items-center">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <LoginStatus />
          </div>

          <div className="flex md:flex h-screen">
            <div className="flex flex-row w-screen">
              <div className="w-60 h-screen bg-gray-800 overflow-y-auto">
                {" "}
                <div className="px-5 py-3 font-bold text-white">Menu</div>
                <Menu />
              </div>
              <div className="p-5 flex-1 overflow-y-auto">
                {" "}
                {children}
              </div>
            </div>
          </div>

          <div className="flex md:hidden">
            <div className="flex flex-col w-screen">
              <BurgerButton />
              <div className="p-5">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
