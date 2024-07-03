import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email:", type: "text", placeholder: "Enter Email" },
        password: { label: "Password:", type: "password", placeholder: "Enter Password" },
      },
      async authorize(credentials: any) {
        try {
          const res = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Authentication failed');
          }

          const user = await res.json();
          return user;
        } catch (err) {
          if (err instanceof Error) {
            throw new Error(err.message || 'Authentication failed');
          } else {
            throw new Error('Authentication failed');
          }
        }
      },
    }),
  ],
  pages: {
    signIn: '/Login',
  },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(options);
  if (!session) return redirect("/");
}

export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/");
  }
}
