import React from "react";

export default function IdeaInfoArea({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={title}
        className="block text-base font-medium text-gray-700 "
      >
        {title}
      </label>
      <div className="block px-2 py-1.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none">
        {content}
      </div>
    </div>
  );
}
