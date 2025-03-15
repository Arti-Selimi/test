import { ReactNode } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function Providers({
  children,
  messages,
  locale,
}: {
  children: ReactNode;
  messages: Record<string, any>;
  locale: string;
}) {
  if (!hasLocale(routing.locales, locale)) {
    notFound(); 
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
