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

  const messages = await import(`@/messages/${locale}.json`).then(
    (mod) => mod.default
  );

  return (
    <html lang={locale}>
      <body className="bg-primary">
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
