import PostIdeaCard from "@/components/PostIdeaCard";
import { IPostIdea } from "@/shared/interfaces";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = cookies();
  const getLikedPosts = async (): Promise<IPostIdea[] | null> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/socials/liked-posts`,
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

    const liked_posts = data["liked_posts"];
    console.log(liked_posts);
    return liked_posts;
  };

  const liked_posts = await getLikedPosts();
  return (
    <div className="px-8">
      <h2 className="text-3xl font-semibold">Your old ideas ⌛</h2>
      <div className="h-[2px] w-full bg-gray-200 mt-2 "></div>
      <div className="flex flex-row flex-wrap gap-8  min-h-0 overflow-auto relative pt-6">
        {liked_posts!.length >= 1 ? (
          <>
            {liked_posts!.map((post) => {
              return <PostIdeaCard key={post.id} post={post} />;
            })}
          </>
        ) : (
          <div>
            <p>No Posts liked yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
