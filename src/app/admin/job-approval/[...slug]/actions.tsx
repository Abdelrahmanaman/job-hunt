"use server";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export async function approveJobPost(formData: FormData) {
  try {
    const slug = formData.get("slug") as string;
    const user = await currentUser();
    if (!user || !isAdmin(user)) {
      throw new Error("Unauthorized");
    }
    await prisma.job.update({
      where: {
        slug,
      },
      data: {
        approved: true,
      },
    });
    redirect("/admin");
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    }
    return message;
  }
}
export async function deleteJobPost(formData: FormData) {
  try {
    const slug = formData.get("slug") as string;
    const user = await currentUser();
    if (!user || !isAdmin(user)) {
      throw new Error("Unauthorized");
    }
    await prisma.job.delete({
      where: {
        slug,
      },
    });
    redirect("/admin");
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    }
    return message;
  }
}
