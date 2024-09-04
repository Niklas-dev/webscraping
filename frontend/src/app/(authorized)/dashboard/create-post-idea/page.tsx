"use client";

import PostTypeSelection from "@/components/PostTypeSelection";
import RichTextFormInput from "@/components/RichTextFormInput";
import SocialMediaCardLink from "@/components/SocialMediaCardLink";
import TextFormInput from "@/components/TextFormInput";
import { IFullUserData } from "@/shared/interfaces";
import { getCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaInstagram } from "react-icons/fa";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    niche: "",
    description: "",
    extra: "",
  });

  const router = useRouter();

  const searchParams = useSearchParams();

  const post_type = searchParams.get("post_type");

  const loadPreferences = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/get-user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      }
    );

    if (!response.ok) {
      toast.error("Failed to load preferences.", {
        icon: "🤔",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return null;
    }

    const data: IFullUserData = await response.json();

    setFormData({
      niche: data.niche_preference ?? "",
      extra: data.extra_preference ?? "",
      description: "",
    });
    setIsLoading(false);
    console.log(data);
  };

  const createNewPostIdea = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/socials/create-new-post-idea`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      const info = data["detail"];
      toast.error(info, {
        icon: "🤔",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return null;
    }

    const data = await response.json();
    const info = data["detail"];

    toast.success(info, {
      icon: "❤️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    router.push("/dashboard/ideas");
  };

  useEffect(() => {
    loadPreferences();
  }, []);

  return (
    <div className="px-8">
      <h2 className="text-3xl font-semibold">Create your next big idea</h2>
      <div className="h-[2px] w-full bg-gray-200 mt-2 "></div>
      <div className="w-full pt-4 flex flex-col gap-6 items-start">
        <div className="flex flex-row w-full gap-6">
          <div className="flex flex-col gap-6 w-full">
            <TextFormInput
              id="niche"
              label="Niche"
              placeholder="The niche of your post"
              onChange={(value) =>
                setFormData((prevData) => ({ ...prevData, niche: value }))
              }
              value={formData.niche}
            />
            <RichTextFormInput
              id="description"
              label="Description"
              placeholder="Describe closer what you want to your post idea to be about. Leave blank if you have no idea."
              onChange={(value) =>
                setFormData((prevData) => ({ ...prevData, description: value }))
              }
              value={formData.description}
            />
            <RichTextFormInput
              id="extra"
              label="Extra information"
              placeholder="Add anything relevant that doesn't fit in the fields above."
              onChange={(value) =>
                setFormData((prevData) => ({ ...prevData, extra: value }))
              }
              value={formData.extra}
            />
            <button
              onClick={() => createNewPostIdea()}
              className="bg-[#1b1b1b] hover:bg-[#252525] text-white px-6 py-2 rounded-xl text-lg font-semibold"
            >
              Create Your Idea Now
            </button>
          </div>
          <div className="w-fit">
            <PostTypeSelection post_type={post_type!} />
          </div>
        </div>
      </div>
    </div>
  );
}
