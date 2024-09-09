import React from "react";

export default function IdeaInfoAreaInstructions({
  title,
  contents,
}: {
  title: string;
  contents: string;
}) {
  const formatContent = (contents: string): string[] => {
    if (contents) {
      // Remove outer curly braces
      const contentsStr = contents.replace(/^\{|\}$/g, "");

      // Remove extra quotes around each item
      const cleanedStr = contentsStr.replace(/"(\d+\.\s[^"]*)"/g, "$1");

      // Split by commas that follow a digit and a dot, and trim each item
      return cleanedStr.split(/,(?=\d+\.)/).map((content) => content.trim());
    }
    return [];
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={title}
        className="block text-base font-medium text-gray-700 "
      >
        {title}
      </label>
      <div className="px-2 py-1.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none flex flex-col ">
        {formatContent(contents).map((content, index) => (
          <div key={index}>{content.replace(/"/g, "")}</div>
        ))}
      </div>
    </div>
  );
}
