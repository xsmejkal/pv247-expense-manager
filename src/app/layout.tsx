import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoginStatus } from "./login-status";
import { Providers } from "../app/_components/providers";
import BurgerButton from "./burger-button";
import { getServerAuthSession } from "@/server/auth";
import LoginPage from "./_components/LoginPage";
import Menu from "./Menu";
import Head from "next/head";

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

  const siteUrl = "https://pv247-expense-manager-theta.vercel.app";
  const imageUrl = `${siteUrl}/logo.png`;
  if (!userId) {
    return (
      <html>
        <Head>
          <title>Home Page</title>
          <meta property="og:title" content="Home Page" key="ogtitle" />
          <meta
            property="og:description"
            content="Description of the home page"
            key="ogdesc"
          />
          <meta property="og:image" content={imageUrl} key="ogimage" />
          <meta property="og:url" content={siteUrl} key="ogurl" />
        </Head>
        <body>
          <LoginPage />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="h-screen bg-backgound">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.className} flex flex-col overflow-x-hidden bg-gray-00`}
      >
        <Providers>
          <div className="bg-complementary text-white h-16 w-full px-5 py-2 flex justify-between items-center fixed top-0 z-20">
            <Link
              className="hover:bg-darkBlue hover:text-white rounded border border-white p-3"
              href="/"
            >
              Home
            </Link>
            <LoginStatus />
          </div>

          <div className="hidden md:flex flex-1 pt-16">
            <div className="w-60 bg-gray-800 overflow-y-auto pt-16 fixed inset-y-0 left-0 z-10">
              <div className="px-5 py-3 font-bold text-white">Menu</div>
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
