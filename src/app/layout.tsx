import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import "./globals.css";
import WalletProvider from "@/components/WalletConnector/WalletProvider";
import Icon from '@/../public/images/icon.png'
export const metadata: Metadata = {
  title: "Dolphin",
  description: "Dolphin",
  icons: [Icon.src]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <WalletProvider>
            <Nav />
            {children}
            <div className="py-10"></div>
          </WalletProvider>
        </Theme>
      </body>
    </html >
  );
}
