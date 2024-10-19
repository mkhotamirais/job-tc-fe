"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useRouter } from "next/navigation";
import { apiAccessToken, baseUrl } from "@/lib/constants";
import LoginGuest from "./LoginGuest";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Please enter your username" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

type FormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const getRequestToken = async () => {
    const response = await axios.get(`${baseUrl}/authentication/token/new`, {
      headers: { Authorization: `Bearer ${apiAccessToken}` },
    });
    return response.data.request_token;
  };

  const onSubmit = async (values: FormData) => {
    setPending(true);

    const request_token = await getRequestToken();

    const { username, password } = values;
    await axios
      .post(
        `${baseUrl}/authentication/token/validate_with_login`,
        { username, password, request_token },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiAccessToken}` } }
      )
      .then(() => {
        axios
          .post(
            `${baseUrl}/authentication/session/new`,
            { request_token },
            { headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiAccessToken}` } }
          )
          .then((res) => {
            toast.success("Logged in successfully");
            localStorage.setItem("session_id", res.data.session_id);
            router.push("/");
          });
      })
      .catch((err) => {
        toast.error(err.response.data.status_message);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <div className="flex items-center justify-center h-full bg-secondary py-4">
      <div className="container">
        <div className="relative border max-w-md mx-auto shadow-lg p-8 rounded-lg bg-background">
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold mb-2">Welcome back</h1>
            <p>Sign in to your account</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input disabled={pending} {...field} placeholder="username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input disabled={pending} type="password" {...field} placeholder="********" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={pending} type="submit" className="w-full">
                {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
          </Form>
          <p className="mt-4 text-sm text-center">
            Do not have an account?{" "}
            <a
              href="https://www.themoviedb.org/signup"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline"
            >
              Sign Up
            </a>
          </p>
          <div className="relative flex gap-4 mt-6">
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-background px-2">or</div>
            <Separator />
          </div>
          <LoginGuest />
        </div>
      </div>
    </div>
  );
}
