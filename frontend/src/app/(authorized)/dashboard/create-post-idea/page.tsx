"use client";

import RichTextFormInput from "@/components/RichTextFormInput";
import TextFormInput from "@/components/TextFormInput";
import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    niche: "",
    description: "",
    extra: "",
  });
  return (
    <div className="px-8">
      <h2 className="text-3xl font-semibold">Create your next big idea</h2>
      <div className="h-[2px] w-full bg-gray-200 mt-2 "></div>
      <div className="w-[40%] pt-4 flex flex-col gap-6 items-start">
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
          placeholder="Desribe closer what you want to your post idea to be about. Leave blank if you have no idea."
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
        <button className="bg-[#1b1b1b] hover:bg-[#252525] text-white px-6 py-2 rounded-xl text-lg font-semibold">
          Create Your Idea Now
        </button>
      </div>
    </div>
  );
}
