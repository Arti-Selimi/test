import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <div className="flex items-center justify-around w-[60%] p-5 relative bottom-0 text-accent">
      <div className="flex gap-5">
        <Link
          className="cursor-pointer opacity-80 hover:opacity-100"
          href="/en"
        >
          {t(`English`)}
        </Link>
        <Link
          className="cursor-pointer opacity-80 hover:opacity-100"
          href="/de"
        >
          {t("German")}
        </Link>
      </div>
      <div className="">
        © {t("2025")} {t("company_name")}. {t("rights_reserved")}
      </div>
      <div>
        <Image src={logo} alt="logo" width={100} height={100} />
      </div>
    </div>
  );
}
