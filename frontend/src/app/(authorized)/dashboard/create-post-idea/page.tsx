"use client";

import PostTypeSelection from "@/components/PostTypeSelection";
import RichTextFormInput from "@/components/RichTextFormInput";
import TextFormInput from "@/components/TextFormInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IFullUserData } from "@/shared/interfaces";
import { getCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CONTENT_FORMATS = [
  { value: "image", label: "Image Post" },
  { value: "video", label: "Video" },
  { value: "carousel", label: "Carousel" },
  { value: "story", label: "Story" },
  { value: "reel", label: "Reel" },
];

const POST_GOALS = [
  { value: "engagement", label: "Increase Engagement" },
  { value: "sales", label: "Drive Sales" },
  { value: "awareness", label: "Brand Awareness" },
  { value: "traffic", label: "Drive Traffic" },
  { value: "leads", label: "Generate Leads" },
];

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "humorous", label: "Humorous" },
  { value: "inspirational", label: "Inspirational" },
  { value: "educational", label: "Educational" },
];

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    niche: "",
    post_goal: "",
    target_audience: "",
    content_format: "",
    tone: "",
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
      post_goal: "",
      target_audience: "",
      content_format: "",
      tone: "",
      extra: data.extra_preference ?? "",
    });
    setIsLoading(false);
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
      <div className="h-[2px] w-full bg-gray-200 mt-2"></div>
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

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="post_goal" className="text-sm font-medium">
                  Post Goal
                </label>
                <Select
                  value={formData.post_goal}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      post_goal: value,
                    }))
                  }
                >
                  <SelectTrigger id="post_goal">
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {POST_GOALS.map((goal) => (
                      <SelectItem key={goal.value} value={goal.value}>
                        {goal.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="content_format" className="text-sm font-medium">
                  Content Format
                </label>
                <Select
                  value={formData.content_format}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      content_format: value,
                    }))
                  }
                >
                  <SelectTrigger id="content_format">
                    <SelectValue placeholder="Select a format" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTENT_FORMATS.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TextFormInput
              id="target_audience"
              label="Target Audience"
              placeholder="Describe your target audience"
              onChange={(value) =>
                setFormData((prevData) => ({
                  ...prevData,
                  target_audience: value,
                }))
              }
              value={formData.target_audience}
            />

            <div className="space-y-2">
              <label htmlFor="tone" className="text-sm font-medium">
                Content Tone
              </label>
              <Select
                value={formData.tone}
                onValueChange={(value) =>
                  setFormData((prevData) => ({ ...prevData, tone: value }))
                }
              >
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((tone) => (
                    <SelectItem key={tone.value} value={tone.value}>
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
