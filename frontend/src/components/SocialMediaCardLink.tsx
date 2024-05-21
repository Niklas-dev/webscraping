import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function SocialMediaCardLink({
  href,
  from_color,
  to_color,
  children,
  pre_word,
  post_type,
}: {
  href: string;
  from_color: string;
  to_color: string;
  children: React.ReactNode;
  pre_word: string;
  post_type: string;
}) {
  return (
    <Link
      href={href}
      className={`mt-2 h-96 w-[30rem] bg-gradient-to-tr ${from_color} ${to_color} rounded-xl flex flex-col justify-end p-8 drop-shadow-2xl relative group/card cursor-pointer hover:shadow-2xl transition-all duration-300`}
    >
      {children}
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-white font-bold text-2xl group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-all">
          {pre_word} <br /> {post_type}
        </h3>
        <div className="bg-white px-6 py-2 rounded-full group-hover/card:-translate-x-1 group-hover/card:-translate-y-1 transition-all hover:scale-110">
          <FaArrowRight size={25} color="black" />
        </div>
      </div>
    </Link>
  );
}
