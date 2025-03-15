"use client";

import RichTextFormInput from "@/components/RichTextFormInput";
import TextFormInput from "@/components/TextFormInput";
import { useEffect, useLayoutEffect, useState } from "react";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { IFullUserData } from "@/shared/interfaces";

export default function Page() {
  const [formData, setFormData] = useState({
    niche_preference: "",
    extra_preference: "",
  });
  const [isLoading, setIsLoading] = useState(true);

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
      toast.error("Failed to save preferences.", {
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
      niche_preference: data.niche_preference ?? "",
      extra_preference: data.extra_preference ?? "",
    });
    setIsLoading(false);
    console.log(data);
  };

  const savePreferences = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/update-user`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      toast.error("Failed to save preferences.", {
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

    toast.success("Saved new preferences", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  useEffect(() => {
    const load = async () => {
      await loadPreferences();
    };

    load();

    return () => {};
  }, []);

  return (
    <div className="md:px-8">
      <div className="w-full h-full">
        <div className="flex flex-row justify-between items-center mt-20">
          <div>
            <h3 className="text-3xl font-bold ">Idea Settings</h3>
            <p className="text-gray-500 text-lg">
              Update your idea creation preferences
            </p>
          </div>
        </div>

        <div className="mt-10">
          <div className="h-[2px] w-full bg-gray-200 mb-2"></div>
          {isLoading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-100 animate-spin  fill-gray-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="flex flex-col flex-wrap gap-4 mt-4">
              <TextFormInput
                id="niche_pref"
                label=""
                placeholder="The niche preference of your post"
                onChange={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    niche_preference: value,
                  }))
                }
                value={formData.niche_preference}
              />
              <RichTextFormInput
                id="description_pref"
                label=""
                placeholder="Describe closer what you want to your post idea to be about preference"
                onChange={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    extra_preference: value,
                  }))
                }
                value={formData.extra_preference}
              />

              {"true" === "true" ? (
                <button
                  onClick={async () => await savePreferences()}
                  className={`bg-[#1b1b1b] text-white rounded-lg w-32 h-10 text-xl flex justify-center items-center font-medium hover:scale-105 transition-transform`}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => null}
                  className={`bg-[#1b1b1b] text-white rounded-lg w-32 h-10 text-lg flex justify-center items-center font-bold hover:scale-105 transition-transform`}
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-100 animate-spin  fill-[#1b1b1b]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
