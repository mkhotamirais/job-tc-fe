"use client";

import Link from "next/link";
import { ModeToggle } from "./theme/ModeToggle";
import AuthBtn from "./AuthBtn";

export default function Header() {
  return (
    <header className="z-50 sticky top-0 bg-background shadow">
      <div className="container flex justify-between h-16 items-center">
        <div className="flex gap-4">
          <Logo />
          <ModeToggle />
        </div>
        <AuthBtn />
      </div>
    </header>
  );
}

export const Logo = () => {
  return (
    <Link href="/" className="flex flex-col *:leading-none min-w-max">
      <span className="text-xl font-bold tracking-widest text-primary">TMDB</span>
      <span>Mkhotami</span>
    </Link>
  );
};
