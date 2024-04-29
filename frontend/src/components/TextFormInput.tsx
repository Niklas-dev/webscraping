import React from "react";

export default function TextFormInput({
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
      <input
        type="text"
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-lg"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
}
