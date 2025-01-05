import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import defaultImage from "../../assets/default.jpg";
import UserService from "@/services//userservice"; // Adjust the import path
import { useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate(); // Initialize the navigate function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    try {
      // Call the login function
      await UserService.login({ email, password });
      // Redirect to the home page after a successful login
      navigate("/home");
    } catch (err: any) {
      // Handle errors
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border border-[#C5A880]">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-[#4E6629]">Welcome back</h1>
                <p className="text-balance text-[#6E6A62]">
                  Login to your Acme Inc account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[#4E6629]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                  className="border-[#C5A880] focus:ring-[#4E6629]"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-[#4E6629]">
                    Password
                  </Label>
                  <a
                    href="psw"
                    className="ml-auto text-sm text-[#6E6A62] underline-offset-2 underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-[#C5A880] focus:ring-[#4E6629]"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FFC107] hover:bg-[#FFB300] text-[#4E6629]"
              >
                Login
              </Button>
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-[#C5A880]">
                <span className="relative z-10 bg-white px-2 text-[#6E6A62]">
                  Or continue with
                </span>
              </div>
              <Button variant="outline" className="w-full border-[#C5A880] text-[#4E6629] hover:border-[#FFC107]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
                <div className="text-center text-sm text-[#6E6A62]">
                Don&apos;t have an account?{" "}
                <a href="/singup" className="underline underline-offset-4 text-[#6E6A62]">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-[#FFF2D1] md:block">
            <img
              src={defaultImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-[#6E6A62] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[#4E6629]">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
