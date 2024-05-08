// This is where we aetup providers like github provoders or credentials provoders
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/utils/db";

export const options: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "Enter Email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Enter Password",
        },
      },

      async authorize(credentials: any, req) {
        console.log(credentials )
        console.log("function inaitwa" )
        const { email, password } = credentials;
        console.log(`paass-${password}`);
        try {
          const res = await fetch(`http://127.0.0.1:8000/api/login/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });

          const user = await res.json();
          console.log(user);
          console.log(`status - ${user.status}`);

          if (res.ok) {
            return user;
          } else if (res.ok && user.status == false) {
            throw new Error(`${user.message}`);
          } else return null;
        } catch (error) {
          console.log(error);
          throw new Error("Unauthorised user");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async signIn({ user, account, profile, email, credentials }) {
      // @ts-ignore
      if (user.email) {
        return "success";
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: "/Login",
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