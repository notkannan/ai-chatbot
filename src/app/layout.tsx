"use client";

import { ThemeProvider } from "next-themes";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";
import Providers from "./components/Providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Logo.jpeg" type="image/jpeg" />
        <title>NEU Husky Bot</title>
      </head>
      <body>
        <ThemeProvider attribute="class">
          <AuthProvider>
            <Providers>
              <div className="layout">
                <Header />
                <main className="content">{children}</main>
                <Footer />
              </div>
            </Providers>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
