"use client";
import TextFormInput from "@/components/TextFormInput";
import { AuthContext } from "@/providers/AuthProvider";
import { IFullUserData } from "@/shared/interfaces";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [formData, setFormData] = useState({
    username: "",
  });

  const [initialFormData, setInitialFormData] = useState({
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isSaving, setIsSaving] = useState(false); // to prevent multiple clicks
  const user = useContext(AuthContext);
  const router = useRouter();
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
      username: data.username ?? "",
    });
    setInitialFormData({
      username: data.username ?? "",
    });
    setIsLoading(false);
  };

  const savePreferences = async () => {
    setIsSaving(true); // Prevent multiple clicks
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
      setIsSaving(false);
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
    user.logout();
    router.push("/");
    setIsSaving(false);
  };

  useEffect(() => {
    const load = async () => {
      await loadPreferences();
    };

    load();
  }, []);

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).id === "modal-background") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="md:px-8">
      <div className="w-full h-full">
        <div className="flex flex-row justify-between items-center mt-20">
          <div>
            <h3 className="text-3xl font-bold ">Account settings</h3>
            <p className="text-gray-500 text-lg">Update your account</p>
          </div>
        </div>

        <div className="mt-10">
          <div className="h-[2px] w-full bg-gray-200 mb-2 "></div>
          <div className="flex flex-row items-center justify-between pb-2 lg:pb-0">
            <h3 className="text-lg font-bold text-gray-800">Account</h3>
            <Link
              className="border-gray-300 text-gray-700 border-2 px-3 py-1.5 font-semibold rounded-lg shadow-sm"
              href={"/forgot-password"}
            >
              Reset/Change Password
            </Link>
          </div>

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
              <div>
                <label className="text-gray-600">Username</label>
                <TextFormInput
                  id="username"
                  label=""
                  placeholder="Username"
                  onChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      username: value,
                    }))
                  }
                  value={formData.username}
                />
              </div>

              {JSON.stringify(formData) !== JSON.stringify(initialFormData) && (
                <p className="text-red-500">unsaved changes</p>
              )}

              {/* Open the modal on click */}
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={isSaving}
                className={`bg-[#1b1b1b] text-white rounded-lg w-32 h-10 text-xl flex justify-center items-center font-medium hover:scale-105 transition-transform`}
              >
                Save
              </button>
            </div>
          )}

          {/* Modal Confirmation */}
          {isModalOpen && (
            <div
              id="modal-background"
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            >
              <div className="bg-white p-6 rounded-lg w-1/3">
                <h3 className="text-lg font-bold">Confirm Changes</h3>
                <p className="mt-2 text-gray-600">
                  Are you sure you want to save the changes? You need to sign in
                  again after saving the changes.
                </p>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      await savePreferences();
                      setIsModalOpen(false); // Close the modal
                    }}
                    className="bg-[#1b1b1b] text-white rounded-lg px-4 py-2"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
