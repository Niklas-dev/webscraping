"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Page() {
  const searchParams = useSearchParams();
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          href={searchParams.get("ref") === "register" ? "/register" : "/"}
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
            Terms of Service, our Privacy Policy, and all applicable laws and
            regulations. If you do not agree with any part of these terms, you
            may not use our service.
          </p>

          <h2 className="text-2xl font-semibold mt-6">2. Use of Service</h2>
          <p>
            You agree to use TrendPilot for lawful purposes only and in
            accordance with these Terms. You are prohibited from using the
            Service to violate any local, national, or international law or
            regulation. Any attempt to interfere with the integrity or security
            of TrendPilot is strictly prohibited.
          </p>

          <h2 className="text-2xl font-semibold mt-6">3. User Accounts</h2>
          <p>
            To access certain features, you must create an account. You are
            responsible for keeping your account information confidential, and
            you agree to accept responsibility for all activities that occur
            under your account. If you believe your account has been
            compromised, you must notify us immediately.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            4. Right of Withdrawal (Widerrufsrecht)
          </h2>
          <p>
            If you are a consumer in the EU, you have the right to withdraw from
            this contract within 14 days without giving any reason. To exercise
            this right, you must inform us of your decision to withdraw by
            providing a clear statement (e.g., a letter sent by post or email).
            If you withdraw from this contract, we will reimburse all payments
            received from you, without undue delay, and no later than 14 days
            from the date on which we are informed of your decision.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            5. Intellectual Property
          </h2>
          <p>
            All content, materials, and services provided by TrendPilot,
            including but not limited to algorithms, designs, text, graphics,
            and software, are the intellectual property of TrendPilot and are
            protected by copyright, trademark, and other intellectual property
            laws. You may not copy, modify, distribute, or exploit any part of
            the service without express written permission.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            6. User-Generated Content
          </h2>
          <p>
            Any content you generate using TrendPilot, including social media
            post ideas, remains your intellectual property. However, by using
            TrendPilot, you grant us a non-exclusive, royalty-free, perpetual
            license to use, modify, and display your generated content in
            connection with providing and improving the service.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            7. Disclaimer of Warranties
          </h2>
          <p>
            TrendPilot is provided &quot;as is&quot; and without any warranty of
            any kind. While we strive to provide a reliable service, we do not
            guarantee that the service will be uninterrupted or error-free.
            However, this disclaimer does not affect any statutory warranties
            that cannot be excluded or limited under applicable law,
            particularly in the EU.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            8. Limitation of Liability
          </h2>
          <p>
            Our liability for damages caused by slight negligence shall be
            excluded, except for damages arising from injury to life, body, or
            health, or in cases of essential contractual obligations (cardinal
            obligations). In such cases, our liability shall be limited to the
            foreseeable damage typical for the contract. These limitations do
            not apply to damages caused by intent or gross negligence.
          </p>

          <h2 className="text-2xl font-semibold mt-6">9. Data Protection</h2>
          <p>
            TrendPilot complies with the General Data Protection Regulation
            (GDPR) and other applicable data protection laws. For information on
            how we collect, use, and protect your personal data, please review
            our <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            10. Dispute Resolution
          </h2>
          <p>
            If you are an EU consumer, you have the right to use the EU&apos;s
            Online Dispute Resolution (ODR) platform to resolve disputes. You
            can access the platform here:{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank">
              https://ec.europa.eu/consumers/odr
            </a>
            .
          </p>

          <h2 className="text-2xl font-semibold mt-6">11. Governing Law</h2>
          <p>
            These Terms of Service are governed by and construed in accordance
            with the laws of Germany. If you are a consumer residing in the EU,
            you will also benefit from any mandatory provisions of the law of
            the country in which you are resident.
          </p>

          <h2 className="text-2xl font-semibold mt-6">12. Changes to Terms</h2>
          <p>
            We may modify these Terms of Service at any time. You are
            responsible for regularly reviewing these Terms. Your continued use
            of TrendPilot after any changes indicates your acceptance of the new
            terms.
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
