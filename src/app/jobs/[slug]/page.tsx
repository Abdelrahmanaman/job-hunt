import JobPost from "@/components/JobPost";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: { slug: string };
}

const getPost = cache(async (slug: string) => {
  const post = prisma.job.findUnique({
    where: {
      slug,
    },
  });
  if (!post) notFound();
  return post;
});

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const post = await getPost(slug);
  return {
    title: `${post?.title}`,
    description: `View the details of ${post?.title}, a job posting on Jobs in Tech.`,
  };
}

export default async function page({ params: { slug } }: PageProps) {
  const post = await getPost(slug);
  if (!post) notFound();
  return (
    <>
      <JobPost post={post} />
    </>
  );
}
