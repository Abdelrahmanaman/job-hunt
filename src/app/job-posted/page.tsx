import React from "react";
import Image from "next/image";
export default function page() {
  return (
    <section className="min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-5xl font-extrabold tracking-wide text-purple-300">
        Job Posted
      </h1>
      <p className="text-muted-foreground font-medium text-xl">
        Your Job has been posted successfully! It will be listed once it is
        approved by an admin.
      </p>

      <Image
        src={"/job-posted.svg"}
        alt="Job Posted"
        height={500}
        width={500}
      />
    </section>
  );
}
