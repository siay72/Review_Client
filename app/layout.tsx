"use client";

import "./globals.css";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/src/context/AuthContext";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">
        <AuthProvider>
          {!isAdmin && <Navbar />}

          {children}

          <Toaster position="top-center" />
        </AuthProvider>
        <Footer></Footer>
      </body>
    </html>
  );
}