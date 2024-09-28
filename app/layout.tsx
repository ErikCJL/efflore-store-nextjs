import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";

// const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });
export const metadata: Metadata = {
  title: "Next Complete Store",
  description: "An awesome store built with next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html suppressHydrationWarning lang="en">
        <body className={inter.className}>
          <Providers>
            <Navbar />
            <Container className="py-2">{children}</Container>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
