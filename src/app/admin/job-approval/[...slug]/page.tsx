import JobPost from "@/components/JobPost";
import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ApprovalModal } from "@/components/ApprovalModal";
import { isAdmin } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";


interface ApprovalPageProps {
  params: { slug: [string] };
}
const getPost = async (slug: string) => {
  const post = await prisma.job.findUnique({
    where: {
      slug,
      approved: false,
    },
  });
  if (!post) notFound();
  return post;
};
export default async function page({ params: { slug } }: ApprovalPageProps) {
  if (slug.length > 1) notFound();
  const post = await getPost(slug[0]);
  const user : any = await currentUser();
  return (
    <div className="m-auto my-10  flex max-w-5xl flex-wrap space-y-10 px-3  text-purple-900 sm:flex-wrap md:flex-nowrap">
      <JobPost post={post} />
      <aside className="flex flex-col gap-2">
        {isAdmin(user) && (
          <>
            <ApprovalModal
              title={"Approve Job"}
              description={"Please confirm approval"}
              type={"Approve"}
              slug={slug[0]}
              jobTitle={post.title}
            />
            <ApprovalModal
              title={"Delete Job"}
              description={"Please confirm deletion"}
              type={"Delete"}
              slug={slug[0]}
              jobTitle={post.title}
            />
          </>
        )}
      </aside>
    </div>
  );
}
