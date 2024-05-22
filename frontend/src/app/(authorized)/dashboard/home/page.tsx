import SocialMediaCardLink from "@/components/SocialMediaCardLink";
import Link from "next/link";
import { FaArrowRight, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function page() {
  return (
    <div className="px-8">
      <h2 className="text-3xl font-semibold">
        Get started with your next awesome post ✨
      </h2>
      <div className="h-[2px] w-full bg-gray-200 mt-2 "></div>
      <div className="flex flex-row flex-wrap gap-8 pt-4 ">
        <SocialMediaCardLink
          href="/dashboard/create-post-idea?post_type=reel"
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
      </div>
    </div>
  );
}
