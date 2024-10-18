"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

type FormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormData) => {
    console.log(values);
  };

  return (
    <div className="flex items-center justify-center h-full bg-secondary">
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="example@gmail.com" />
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
                      <Input type="password" {...field} placeholder="********" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
          <div className="relative flex gap-4 mt-6">
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-background px-2">or</div>
            <Separator />
          </div>
          <Button variant={"link"} asChild className="mt-6">
            <Link href="/movie" className="w-full text-center">
              Contunue as a guest
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
