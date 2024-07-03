// "use client"
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Login from "./(Authetication)/Login/page";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <>
      {session ? (
        <Login />
      ) : (
        // <h2>Home - No session</h2>
        <Login />
      )}
    </>
  );
}
