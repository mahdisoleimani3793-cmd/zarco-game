import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZARCO",
  description: "ZARCO Telegram Mini App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#111", color: "#f5c542" }}>
        {children}
      </body>
    </html>
  );
}
