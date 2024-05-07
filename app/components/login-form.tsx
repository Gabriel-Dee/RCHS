"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/registry/new-york/ui/label";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Icons } from "./icons";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/Dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    setIsLoading(true); // Set isLoading to true when submitting the form

    // const res = await signIn("credentials", {
    //   redirect: false,
    //   email,
    //   password,
    // });

    // setIsLoading(false); // Set isLoading to false after the sign-in process completes

    // if (res?.error) {
    //   setError("Invalid email or password");
    // } else {
    //   setError("");
    //   router.push("/Dashboard");
    // }

    try {
      const response = await fetch("your-django-api-login-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
  
      // Assuming the response contains a token or session information
      const data = await response.json();
      // Store the token/session information in local storage or a cookie
      // localStorage.setItem("token", data.token);
      // Redirect to Dashboard page
      router.push("/Dashboard");
    } catch (error: any) { // Explicitly specify the type of error as any
      setError(error.message as string); // Explicitly cast error.message as string
    } finally {
      setIsLoading(false);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={handleSubmit}>
          {error && (
            <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md min-w-full">
              {error}
            </span>
          )}
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Log In
            </Button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </div>
        </form>
        <div className="relative">
          <div className=" flex justify-center text-sm text-gray-600 hover:text-gray-900">
            <Link href="/ForgotPassword">Forgot Password?</Link>
          </div>
        </div>
      </div>
    )
  );
}
