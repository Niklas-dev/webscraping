"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IPostIdea } from "@/shared/interfaces";
import { getCookie } from "cookies-next";
import TextFormInput from "@/components/TextFormInput";
import RichTextFormInput from "@/components/RichTextFormInput";
import IdeaInfoArea from "@/components/IdeaInfoArea";
import IdeaInfoAreaInstructions from "@/components/IdeaInfoAreaInstructions";
export default function Page() {
  const params = useParams<{ id: string }>();

  const [post, setPost] = useState<IPostIdea | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const formatHashtags = (hashtags: string): string[] => {
    // Check if hashtags are not null or empty
    if (hashtags) {
      // Remove curly braces and split the string into a list of hashtags
      const hashtagsStr = hashtags.replace(/^\{|\}$/g, ""); // Remove curly braces using regex
      return hashtagsStr.split(",").map((hashtag) => hashtag.trim()); // Split by comma and trim extra spaces
    }
    return [];
  };

  const getPost = async (id: string): Promise<IPostIdea[] | null> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/socials/posts/${id}`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    const post = data["post"];

    console.log(post);
    setPost(post);
    setIsLoading(false);
    return post;
  };

  useLayoutEffect(() => {
    getPost(params.id);

    return () => {};
  }, []);

  return (
    <div className="px-8 min-h-0 flex flex-col">
      <h2 className="text-3xl font-semibold">Your next post idea</h2>
      <div className="h-[2px] w-full bg-gray-200 mt-2 shadow-2xl"></div>
      <div className="flex flex-row flex-wrap lg:flex-nowrap gap-8  min-h-0 overflow-auto relative pt-6">
        {isLoading ? (
          <div className="flex flex-row justify-start w-full" role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-100 animate-spin  fill-gray-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <form className="space-y-6">
            <div>
              <IdeaInfoArea title="Title" content={post?.title!} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Hashtags
              </label>
              <div className="flex flex-wrap gap-2">
                {formatHashtags(post?.hashtags!).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-lg"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                      />
                    </svg>
                    {tag.slice(1)}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <IdeaInfoArea
                title="Video Descripition"
                content={post?.description!}
              />
            </div>

            <div>
              <IdeaInfoAreaInstructions
                title="How to create your idea"
                contents={post?.video_creation_instructions!}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Create Your Idea Now
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
