"use client";

import { signOut, useSession } from "next-auth/react";

export const LoginStatus = () => {
  const { data, status } = useSession();
  if (status === "loading") return <div>loading...</div>;
  return (
    <div style={{ textDecoration: 'underline' }} className="flex gap-3 items-center text-under">
      {data?.user.name}
      <button
        onClick={() => signOut()}
        className="hover:bg-darkBlue rounded border border-white p-3"
      >
        Sign out
      </button>
    </div>
  );
};
