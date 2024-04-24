"use client";
import { useState } from "react";
import { CircleX } from "lucide-react";
export default function ErrorToast() {
  const [error, setError] = useState(false);
  return (
    <div className="p-2 rounded-lg max-w-[25rem] h-20 flex justify-center items-center bg-red-500 text-white font-semibold">
      <p className="flex items-center gap-1">Something went wrong! Please try again later.
        <CircleX  className="size-5"/>
      </p>
    </div>
  );
}
