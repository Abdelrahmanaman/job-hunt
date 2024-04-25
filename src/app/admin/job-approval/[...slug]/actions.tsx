"use server";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function approveJobPost(formData: FormData) {
  try {
    const slug = formData.get("slug") as string;
    const user = await currentUser();
    if (!user || !isAdmin(user)) {
      notFound();
    }
    await prisma.job.update({
      where: {
        slug,
      },
      data: {
        approved: true,
      },
    });
    console.log("sucess");
    revalidatePath("/");
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    }
    return message;
  }
}
