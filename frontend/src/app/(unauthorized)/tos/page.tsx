import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          href={"/"}
          className="flex items-center text-black hover:text-gray-600 transition-colors mb-6 text-lg"
        >
          <FaArrowLeft className="w-4 h-4 mr-2 mb-1" />
          Back
        </Link>
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="space-y-6">
          <p>
            Welcome to TrendPilot. By using our service, you agree to these
            Terms of Service. Please read them carefully.
          </p>
          <h2 className="text-2xl font-semibold mt-6">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using TrendPilot, you agree to be bound by these
            Terms of Service and all applicable laws and regulations. If you do
            not agree with any part of these terms, you may not use our service.
          </p>
          <h2 className="text-2xl font-semibold mt-6">2. Use of Service</h2>
          <p>
            You agree to use TrendPilot only for lawful purposes and in
            accordance with these Terms. You are prohibited from violating or
            attempting to violate the security of the Service.
          </p>
          <h2 className="text-2xl font-semibold mt-6">3. User Account</h2>
          <p>
            To access certain features of TrendPilot, you may be required to
            create an account. You are responsible for maintaining the
            confidentiality of your account and password and for restricting
            access to your computer.
          </p>
          <h2 className="text-2xl font-semibold mt-6">
            4. Intellectual Property
          </h2>
          <p>
            The content, features, and functionality of TrendPilot are owned by
            us and are protected by international copyright, trademark, patent,
            trade secret, and other intellectual property laws.
          </p>
          <h2 className="text-2xl font-semibold mt-6">5. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access
            to TrendPilot at our sole discretion, without notice, for conduct
            that we believe violates these Terms of Service or is harmful to
            other users, us, or third parties, or for any other reason.
          </p>
          <h2 className="text-2xl font-semibold mt-6">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms of Service at
            any time. It is your responsibility to check these Terms
            periodically for changes.
          </p>
          <p className="mt-8">
            By using TrendPilot, you signify your acceptance of these Terms of
            Service. If you do not agree to these Terms, please do not use our
            Service.
          </p>
        </div>
      </div>
    </div>
  );
}
