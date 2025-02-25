"use client"; // Ensure this is a client component
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ApolloProviderWrapper from "../app/components/ApolloProviderWrapper";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthContextProvider, useAuthContext } from "../app/context/AuthContext";

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

// Separate protected layout to access `useAuthContext`
function ProtectedLayout({ children }) {
  const { authUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!authUser?.token) {
      router.push("/login");
    }
  }, [authUser, router]);

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
