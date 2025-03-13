"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faGithub, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  const t = useTranslations("Navbar");

  return (
    <div className="flex items-center justify-between gap-10 bg-secondary p-5 rounded-full w-[70%] m-5 text-accent">
      <div>
        <Image src={logo} alt="logo" width={100} height={100}/>
      </div>
      <div>
        <Link href="https://rickandmortyapi.com/graphql" target="_blank" className="pointer-cursor font-extrabold pb-1 border-b-1">{t("checkAPI")}</Link>
      </div>
      <div className="flex items-center gap-2">
        <p>{t("socials")}</p>
        <Link href="https://github.com/Arti-Selimi" target="_blank">
          <FontAwesomeIcon icon={ faGithub }></FontAwesomeIcon>
        </Link>
        <Link href="https://x.com/Selimi_arti" target="_blank">
          <FontAwesomeIcon icon={ faXTwitter }></FontAwesomeIcon>
        </Link>
        <Link href="https://instagram.com/selimi_arti" target="_blank">
          <FontAwesomeIcon icon={ faInstagram }></FontAwesomeIcon>
        </Link>
      </div>
    </div>
  );
}
