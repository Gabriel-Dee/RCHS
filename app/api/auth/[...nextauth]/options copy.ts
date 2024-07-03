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
      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(err);
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