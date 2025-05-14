"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { toast, Toaster } from "react-hot-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";

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
  const [loginSuccess, setLoginSuccess] = useState(false); // New state for loading overlay

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
      await user.getUser();
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
      {/* Loading overlay - only shown after successful login */}
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

              <button
                className="w-full h-11 bg-black text-white rounded-lg font-medium text-base hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all shadow-md border-2 border-black"
                onClick={login}
                disabled={isLoading}
                data-umami-event="Signin Email button"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Login
                  </span>
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <button
                className="w-full h-11 bg-white border-2 border-black text-black rounded-lg font-medium text-base hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all flex items-center justify-center gap-2"
                onClick={loginGoogle}
                data-umami-event="Signin Google button"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Login with Google
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-yellow-600 font-medium hover:text-yellow-700 hover:underline"
                  >
                    Create a new account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <SecurityBadge />
      </div>
    </div>
  );
}
