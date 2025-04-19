import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import React from "react";

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
});

export const metadata = {
    title: "Eats Easy - Доставка їжі",
    description: "Замовляйте смачну їжу з доставкою в найкоротші терміни. Eats Easy - ваш комфортний сервіс доставки.",
    keywords: "доставка їжі, Eats Easy, швидка доставка їжі, їжа на замовлення, ресторани, доставка їжі онлайн, їжа на дому",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserratAlternates.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}