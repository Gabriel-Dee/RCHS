import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/registry/new-york/ui/label";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  React.useEffect(() => {
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
    const user_id = e.target.user_id.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const first_name = e.target.first_name.value;
    const middle_name = e.target.middle_name.value;
    const last_name = e.target.last_name.value;
    const occupation = e.target.occupation.value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          username,
          email,
          password,
          first_name,
          middle_name,
          last_name,
          occupation,
        }),
      });

      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/Login");
      }
    } catch (error) {
      setError("Error, try again");
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
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="user_id">
                Id number
              </Label>
              <Input
                id="user_id"
                name="user_id"
                placeholder="User Id Number"
                type="text"
                autoCapitalize="none"
                autoComplete="user_id"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="username">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                autoCapitalize="none"
                autoComplete="username"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="first_name">
                First Name
              </Label>
              <Input
                id="first_name"
                name="first_name"
                placeholder="First Name"
                type="text"
                autoComplete="given-name"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="middle_name">
                Middle Name
              </Label>
              <Input
                id="middle_name"
                name="middle_name"
                placeholder="Middle Name"
                type="text"
                autoComplete="additional-name"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="last_name">
                Last Name
              </Label>
              <Input
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                type="text"
                autoComplete="family-name"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="occupation">
                Occupation
              </Label>
              <Input
                id="occupation"
                name="occupation"
                placeholder="Occupation"
                type="text"
                autoComplete="occupation"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Register with credentials
            </Button>
          </div>
        </form>
        {error && (
          <p className="px-8 text-center text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  );
}
