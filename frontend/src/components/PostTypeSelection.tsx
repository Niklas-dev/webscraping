import React from "react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import SocialMediaCardLink from "./SocialMediaCardLink";

export default function PostTypeSelection({
  post_type,
}: {
  post_type: string;
}) {
  return (
    <div>
      {post_type === "reel" && (
        <SocialMediaCardLink
          href="/dashboard/create-post-idea?type=reel"
          from_color="from-[#3c1053]"
          to_color="to-[#ad5389]"
          pre_word="Awesome"
          post_type="Instagram Reel"
        >
          <FaInstagram
            className="absolute top-4 left-4 group-hover/card:translate-x-1 group-hover/card:translate-y-1 transition-all"
            color="white"
            size={35}
          />
        </SocialMediaCardLink>
      )}
      {post_type === "tiktok" && (
        <SocialMediaCardLink
          href="/dashboard/create-post-idea?post_type=tiktok"
          from_color="from-[#89216B]"
          to_color="to-[#DA4453]"
          pre_word="Stunning"
          post_type="TikTok"
        >
          <FaTiktok
            className="absolute top-4 left-4 group-hover/card:translate-x-1 group-hover/card:translate-y-1 transition-all"
            color="white"
            size={35}
          />
        </SocialMediaCardLink>
      )}
      {post_type === "short" && (
        <SocialMediaCardLink
          href="/dashboard/create-post-idea?post_type=short"
          from_color="from-[#FF416C]"
          to_color="to-[#FF4B2B]"
          pre_word="Breathtaking"
          post_type="Youtube Short"
        >
          <FaYoutube
            className="absolute top-4 left-4 group-hover/card:translate-x-1 group-hover/card:translate-y-1 transition-all"
            color="white"
            size={35}
          />
        </SocialMediaCardLink>
      )}
      {post_type === "vid" && (
        <SocialMediaCardLink
          href="/dashboard/create-post-idea?post_type=vid"
          from_color="from-[#373B44]"
          to_color="to-[#4286f4]"
          pre_word="Awesome"
          post_type="Youtube Video"
        >
          <FaYoutube
            className="absolute top-4 left-4 group-hover/card:translate-x-1 group-hover/card:translate-y-1 transition-all"
            color="white"
            size={35}
          />
        </SocialMediaCardLink>
      )}
    </div>
  );
}
