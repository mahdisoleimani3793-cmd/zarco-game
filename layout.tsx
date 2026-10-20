import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Z-CRASH | بازی ضریب‌محور",
  description: "نسخه نمایشی بازی ضریب‌محور با امتیاز مجازی؛ بدون پول واقعی.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fa" dir="rtl"><body>{children}</body></html>;
}