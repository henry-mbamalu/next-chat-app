"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ApolloProviderWrapper from "../app/components/ApolloProviderWrapper";
import { Toaster } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { AuthContextProvider, useAuthContext } from "../app/context/AuthContext";
import { isTokenExpired } from "../app/utils/isTokenExpired"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      <ProtectedLayout>{children}</ProtectedLayout>
    </AuthContextProvider>
  );
}

function ProtectedLayout({ children }) {
  const { authUser, setAuthUser } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/login", "/signup"];

  useEffect(() => {
    if (!authUser?.token && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }

    if (authUser?.token && isTokenExpired(authUser?.token)) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user-info");
        setAuthUser(null);
      }
    }

  }, [authUser, pathname, router]);

  return (
    <html lang="en">
      <body className="p-4 h-screen flex items-center justify-center">
        <ApolloProviderWrapper>
          {children}
          <Toaster />
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
