import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoginStatus } from "./login-status";
import { Providers } from "../app/_components/providers";
import BurgerButton from "./burger-button";
import { getServerAuthSession } from "@/server/auth";
import LoginPage from "./_components/LoginPage";
import Menu from "./Menu";
import Image from "next/image";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense manager++",
  description: "Expense manager for keeping personal finance in order!",
  metadataBase: new URL(process.env.DEPLOY_URL ?? "http://localhost:3000"),
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
    <html lang="en" className="h-screen bg-background">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.className} flex flex-col overflow-x-hidden bg-gray-00`}
      >
        <Providers>
          <div className="bg-complementary text-white h-16 w-full px-5 py-2 flex justify-between items-center fixed top-0 z-20">
            <div className="flex flex-row gap-6">
              <Link className="rounded" href="/">
                <Image
                  src="/logo.png"
                  alt="Expense Manager++ Logo"
                  objectFit="contain"
                  height={30}
                  width={200}
                />
              </Link>
            </div>
            <LoginStatus />
          </div>

          <div className="hidden md:flex flex-1 pt-16">
            <div className="w-60 bg-gray-800 overflow-y-auto pt-16 fixed inset-y-0 left-0 z-10">
              <div className="px-5 py-5 font-bold flex justify-center text-2xl text-white">
                Menu
              </div>
              <Menu />
            </div>

            <div className="flex-1 overflow-y-auto pl-60 pt-2">{children}</div>
          </div>

          <div className="md:hidden pt-16">
            <div className="w-100 bg-gray-800">
              <BurgerButton />
            </div>
            <div className="flex-1 overflow-y-auto pt-2">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
