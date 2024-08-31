import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from "recoil";
import RecoilContextProvider from "@/app/components/RecoilContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "GitChat - Talk with a GitHub Profile",
   description: "Talk with a GitHub Profile",
   icons: {
      icon: "/github.ico",
   },
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang='en'>
         <body className={inter.className}>
            <RecoilContextProvider>{children}</RecoilContextProvider>
         </body>
      </html>
   );
}
