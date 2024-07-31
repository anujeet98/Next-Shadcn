import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

interface User {
  id: string;
  name: string;
}

async function UserPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth");
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const users: User[] = await res.json();
  return (
    <>
      <div>UserPage</div>
      <p>{new Date().toLocaleTimeString()}</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default UserPage;
