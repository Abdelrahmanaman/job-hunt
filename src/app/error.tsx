"use client";
import Image from "next/image";
import Link from "next/link";
export default function error() {
  return (
    <section className="mx-auto max-w-5xl flex flex-col justify-center min-h-screen items-center">
      <h1 className="text-5xl text-purple-900 font-extrabold tracking-wide">Error</h1>
      <p className="text-2xl font-semibold text-muted-foreground">An unexpected error occurred.</p>
      <p className="flex items-center text-muted-foreground font-medium gap-1.5 text-xl">
        Return to the <Link  href={"/"} className="underline text-blue-700 hover:text-blue-500 block">homepage</Link>
      </p>
      <div className="flex justify-center">
        <Image alt="Error logo" src={"/error.svg"} width={500} height={500} />
      </div>
    </section>
  );
}
