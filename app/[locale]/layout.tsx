import Providers from "./providers";
import "./globals.css";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = await import(`@/locales/${locale}.json`).then(
    (mod) => mod.default
  );

  return (
    <Providers locale={locale} messages={messages}>
      {children}
    </Providers>
  );
}
