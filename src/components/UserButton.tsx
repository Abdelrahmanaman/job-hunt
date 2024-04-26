"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { User } from "lucide-react";

export default function UserProfile() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    return (
      <div className="flex size-7 animate-pulse items-center justify-center rounded-full border border-gray-50 bg-gray-50">
        <User className="size-6 text-gray-300" />
      </div>
    );
  }
  if (user && isLoaded) {
    return <UserButton />;
  }
  return false;
}
