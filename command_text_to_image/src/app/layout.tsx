import "./globals.css";
export const metadata = {
  title: "app-routerテストページ",
  description: "Next.jsのApp Routerで普通にリンクする",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="">{children}</body>
    </html>
  );
}