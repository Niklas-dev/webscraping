import LoadingCard from "@/components/LoadingCard";
import PostIdeaCard from "@/components/PostIdeaCard";
import { IPostIdea } from "@/shared/interfaces";
import { getRandomStringFromArray } from "@/utils/utils";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();

  const getPosts = async (): Promise<IPostIdea[] | null> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/socials/posts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${cookieStore.get("access_token")!.value}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    const posts = data["posts"];

    return posts;
  };

  const posts = await getPosts();

  console.log(posts);

  return (
    <div className="px-8 min-h-0 flex flex-col">
      <h2 className="text-3xl font-semibold">Your cool ideas ❄️</h2>
      <div className="h-[2px] w-full bg-gray-200 mt-2 shadow-2xl"></div>
      <div className="flex flex-row flex-wrap gap-8  min-h-0 overflow-auto relative pt-6">
        {posts!.map((post) => {
          if (post.is_finished) {
            return <PostIdeaCard key={post.id} post={post} />;
          } else {
            return <LoadingCard key={post.id} />;
          }
        })}
      </div>
    </div>
  );
}
