"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { Eye, EyeOff, UserPlus, Check, X } from "lucide-react";

import { AuthContext } from "@/providers/AuthProvider";
import BlurBackground from "@/components/ui/blur-background";
import { Logo } from "@/components/ui/logo";
import { SecurityBadge } from "@/components/ui/security-badge";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const router = useRouter();
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user.username) {
      router.push("/dashboard");
    }
  }, [user.username, router]);

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, text: "" };

    let score = 0;

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Character variety checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Normalize to 0-3 scale
    const normalizedScore = Math.min(3, Math.floor(score / 2));

    const strengthText = ["Weak", "Fair", "Good", "Strong"][normalizedScore];

    return { score: normalizedScore, text: strengthText };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const passwordCriteria = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    {
      label: "Contains uppercase letter",
      met: /[A-Z]/.test(formData.password),
    },
    { label: "Contains number", met: /[0-9]/.test(formData.password) },
    {
      label: "Contains special character",
      met: /[^A-Za-z0-9]/.test(formData.password),
    },
  ];

  const register = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("All fields are required", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    if (!agreedToTerms) {
      toast.error("You must agree to the Terms of Service", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    // Password strength check
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long", {
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
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/create-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.detail || "Registration failed", {
          duration: 8000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        return;
      }

      await response.json();

      toast.success(
        "Account has been created! Check your email to verify your account.",
        {
          duration: 12000,
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );

      // Redirect to login page after successful registration
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const registerGoogle = () => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND}/auth/google`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <BlurBackground />
      <Toaster />

      <div className="w-full max-w-md flex flex-col items-center">
        <Logo />

        <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="h-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Create an account
            </h1>
            <p className="text-center text-gray-500 mb-6">
              Join TrendPilot to start creating viral content
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
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    className="w-full h-11 bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    className="w-full h-11 bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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

                {formData.password && (
                  <>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex space-x-1 flex-1">
                          {[0, 1, 2, 3].map((index) => (
                            <div
                              key={index}
                              className={`h-1.5 flex-1 rounded-full transition-colors ${
                                index <= passwordStrength.score
                                  ? [
                                      "bg-red-500",
                                      "bg-orange-500",
                                      "bg-yellow-500",
                                      "bg-green-500",
                                    ][passwordStrength.score]
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span
                          className={`text-xs ml-2 ${
                            [
                              "text-red-500",
                              "text-orange-500",
                              "text-yellow-500",
                              "text-green-500",
                            ][passwordStrength.score]
                          }`}
                        >
                          {passwordStrength.text}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {passwordCriteria.map((criterion, index) => (
                          <div
                            key={index}
                            className="flex items-center text-xs"
                          >
                            {criterion.met ? (
                              <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                            ) : (
                              <X className="h-3.5 w-3.5 text-gray-300 mr-1.5" />
                            )}
                            <span
                              className={
                                criterion.met
                                  ? "text-gray-700"
                                  : "text-gray-400"
                              }
                            >
                              {criterion.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the{" "}
                  <Link
                    href="/tos?ref=register"
                    className="text-yellow-600 hover:text-yellow-700 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy?ref=register"
                    className="text-yellow-600 hover:text-yellow-700 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                className="w-full h-11 bg-black text-white rounded-lg font-medium text-base hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all shadow-md border-2 border-black"
                onClick={register}
                disabled={isLoading}
                data-umami-event="Signup Email button"
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
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Register
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
                onClick={registerGoogle}
                data-umami-event="Signup Google button"
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
                Sign Up with Google
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-yellow-600 font-medium hover:text-yellow-700 hover:underline"
                  >
                    Login to existing account
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
