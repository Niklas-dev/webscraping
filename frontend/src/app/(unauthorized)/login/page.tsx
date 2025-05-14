"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { toast, Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

import { AuthContext } from "@/providers/AuthProvider";
import BlurBackground from "@/components/ui/blur-background";
import { Logo } from "@/components/ui/logo";
import { SecurityBadge } from "@/components/ui/security-badge";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user.username) {
      router.push("/dashboard");
    }

    const detail = searchParams.get("detail");
    if (detail === "email_verified") {
      toast.success("Your email has been verified.", {
        duration: 4000,
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }, [searchParams, user.username, router]);

  const login = async () => {
    if (!formData.username || !formData.password) {
      toast.error("Please enter both username and password", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: new URLSearchParams(formData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.detail || "Login failed", {
          duration: 4000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      const { access_token, refresh_token } = data;

      // Set cookies with longer expiration if remember me is checked
      const maxAge = rememberMe ? 60 * 6 * 24 * 30 : 60 * 6 * 24 * 7; // 30 days vs 7 days

      setCookie("access_token", access_token, {
        maxAge,
      });
      setCookie("refresh_token", refresh_token, {
        maxAge: maxAge * 2, // Refresh token lasts longer
      });

      // Show success message
      toast.success("Login successful!", {
        duration: 2000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      // Set login success state to show loading screen
      setLoginSuccess(true);

      // Delay redirect to ensure cookies are set and auth state is updated
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setIsLoading(false);
    }
  };

  const loginGoogle = () => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND}/auth/google`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      {loginSuccess && (
        <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-yellow-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Logging you in...
            </h2>
            <p className="text-gray-500">Redirecting to your dashboard</p>
          </div>
        </div>
      )}
      <BlurBackground />
      <Toaster />

      <div className="w-full max-w-md flex flex-col items-center">
        <Logo />

        <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="h-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Welcome back
            </h1>
            <p className="text-center text-gray-500 mb-6">
              Sign in to your TrendPilot account
            </p>

            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    className="w-full h-11 bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-yellow-600 hover:text-yellow-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    className="w-full h-11 bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <button className="w-full h-11 bg-black text-white rounded-lg font-medium text-base hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all shadow"></button>
            </div>
          </div>
        </div>

        <div className="mt-5 text-sm text-gray-500">
          Don&apos;t have an account?
          <Link
            href="/register"
            className="text-yellow-600 hover:text-yellow-700 hover:underline ml-1"
          >
            Sign up
          </Link>
        </div>

        <div className="mt-3 text-center">
          <button
            onClick={loginGoogle}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5 mr-2"
              alt="Google Logo"
            />
            Continue with Google
          </button>
        </div>

        <SecurityBadge />
      </div>
    </div>
  );
}
