import React from "react";

export default function RichTextFormInput({
  onChange,
  value,
  placeholder,
  label,
  id,
}: {
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
  label: string;
  id: string;
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-base font-medium text-gray-700 "
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
}
