import React from "react";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full md:w-[60%] p-5 relative bottom-0 text-accent">
      <div className="flex gap-2">
        <div
          className="cursor-pointer opacity-80 hover:opacity-100"
          onClick={() => redirect("/en")}
        >
          {t("English")}
        </div>
        <div
          className="cursor-pointer opacity-80 hover:opacity-100"
          onClick={() => redirect("/de")}
        >
          {t("German")}
        </div>
        ||
      </div>
      <div className="text-center">
        © {t("2025")} {t("company_name")}. {t("rights_reserved")}
      </div>
      <div>
        <Image src={logo} alt="logo" width={100} height={100} />
      </div>
    </div>
  );
}
