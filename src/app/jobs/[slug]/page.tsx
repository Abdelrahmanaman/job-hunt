import JobPost from "@/components/JobPost";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
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
  if (!post) {
    notFound();
  }
  const { applicationUrl, applicationEmail } = post;
  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;
  if (!applicationLink) {
    console.log("No Application Link Found");
    notFound();
  }
  return (
    <div className="m-auto my-10  max-w-5xl space-y-10 px-3 flex text-purple-900">
      <JobPost post={post} />
      <aside>
        <Button asChild className="bg-purple-900 hover:bg-purple-950">
          <Link href={applicationLink}>Apply now!</Link>
        </Button>
      </aside>
    </div>
  );
}
