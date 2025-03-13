"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";

export default function Navbar() {
  const t = useTranslations("Navbar");

  return (
    <div className="flex items-center justify-between gap-10 bg-secondary p-5 rounded-full w-[70%] m-5 text-accent">
      <div>
        <Image src={logo} alt="logo" width={100} height={100}/>
      </div>
      <div>
        <Link href="https://rickandmortyapi.com/graphql" target="_blank" className="pointer-cursor font-extrabold">Check out the API</Link>
      </div>
      <div>
        <Link href="">My Socials</Link>
        <Link href=""></Link>
        <Link href=""></Link>
        <Link href=""></Link>
      </div>
    </div>
  );
}
