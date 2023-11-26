"use client";

import { signOut, useSession } from "next-auth/react";

export const LoginStatus = () => {
  const { data, status } = useSession();
  if (status === "loading") return <div>loading...</div>;
  return (
    <div className="flex gap-3 items-center">
      Hi, {data?.user.name}
      <button
        onClick={() => signOut()}
        className="hover:bg-darkBlue rounded border border-white p-3"
      >
        Sign out
      </button>
    </div>
  );
};
