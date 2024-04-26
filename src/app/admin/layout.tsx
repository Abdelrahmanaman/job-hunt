import UserProfile from "@/components/UserButton";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
        <UserProfile/>
        {children}
      </ClerkProvider>
  );
}
