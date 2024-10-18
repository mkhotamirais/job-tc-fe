"use client";

import Link from "next/link";
import { ModeToggle } from "./theme/ModeToggle";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 bg-background border-b">
      <div className="container flex justify-between h-16 items-center">
        <Logo />
        <div className="flex gap-4 items-center">
          <Button asChild>
            <Link title="login" href="/login">
              Login
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export const Logo = () => {
  return (
    <Link href="/" className="flex flex-col *:leading-none min-w-max">
      <span className="text-xl font-bold tracking-widest">TMDB</span>
      <span>Mkhotami</span>
    </Link>
  );
};
