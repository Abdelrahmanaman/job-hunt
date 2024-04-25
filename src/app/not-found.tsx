import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center">
      <Image src={"/404.svg"} alt="Error image" width={500} height={500} />
      <span className="text-3xl font-bold mb-4 text-purple-900">Webpage not found</span>
      <Button className="bg-purple-900 hover:bg-purple-700" asChild>
        <Link href={"/"}>Return to the homepage</Link>
      </Button>
    </section>
  );
}
