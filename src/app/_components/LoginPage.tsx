"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-900">
      <div className="flex flex-col items-center">
        {" "}
        <h1 className="text-4xl font-bold text-white mb-4">
          {" "}
          Expense Manager++
        </h1>
        <div className="relative mb-4 w-96 h-96">
          {" "}
          <Image
            src="/logo.png"
            alt="Expense Manager++ Logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <button
          onClick={() => signIn("discord")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-full focus:outline-none"
        >
          Sign in with Discord
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
