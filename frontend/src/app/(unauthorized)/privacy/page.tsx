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
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-6">
          <p>
            Welcome to TrendPilot. Your privacy is important to us. This Privacy
            Policy explains how we collect, use, and protect your personal data
            in accordance with the General Data Protection Regulation (GDPR) and
            other applicable laws.
          </p>

          <h2 className="text-2xl font-semibold mt-6">1. Data Controller</h2>
          <p>
            The data controller responsible for the processing of your personal
            data is TrendPilot, located in Germany. You can contact us at
            niklas.developers@gmail.com for any questions regarding your
            personal data.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            2. Personal Data We Collect
          </h2>
          <p>We collect and process the following types of personal data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account Information:</strong> When you create an account,
              we collect your name, email address, and other relevant
              information.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect information on how you use
              TrendPilot, such as the pages you visit, the features you use, and
              your interaction with the service.
            </li>
            <li>
              <strong>Technical Data:</strong> We collect technical information
              including your IP address, browser type, operating system, and
              device information.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">
            3. Legal Basis for Processing
          </h2>
          <p>
            We process your personal data in accordance with the GDPR under the
            following legal bases:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Consent:</strong> We process your data when you provide
              consent, for example, when you agree to receive marketing emails.
            </li>
            <li>
              <strong>Contractual Necessity:</strong> We process your data to
              provide and manage the service, such as managing your account and
              fulfilling our contractual obligations.
            </li>
            <li>
              <strong>Legal Obligation:</strong> We process data when we are
              legally required to do so, such as keeping records for tax
              purposes.
            </li>
            <li>
              <strong>Legitimate Interests:</strong> We may process data based
              on our legitimate interests, such as improving our service,
              ensuring security, or preventing fraud.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">
            4. How We Use Your Data
          </h2>
          <p>We use your personal data to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and improve the TrendPilot service.</li>
            <li>
              Communicate with you regarding updates, new features, or
              marketing, with your consent.
            </li>
            <li>
              Comply with legal obligations, such as maintaining financial
              records.
            </li>
            <li>
              Analyze usage trends to enhance user experience and service
              security.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">
            5. Data Sharing and Transfers
          </h2>
          <p>
            We do not sell your personal data. We only share data with third
            parties under the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Service Providers:</strong> We may share data with
              third-party service providers who assist us in operating our
              service, such as hosting or analytics providers, under strict
              confidentiality agreements.
            </li>
            <li>
              <strong>Legal Compliance:</strong> We may share data to comply
              with legal obligations, such as responding to government or law
              enforcement requests.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of assets, your data may be transferred to
              the new entity.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your data from unauthorized access, disclosure, alteration,
            or destruction. However, no data transmission or storage can be
            guaranteed to be 100% secure.
          </p>

          <h2 className="text-2xl font-semibold mt-6">7. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to
            fulfill the purposes outlined in this policy, unless a longer
            retention period is required or permitted by law. After this period,
            your data will be deleted or anonymized.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            8. Your Rights Under GDPR
          </h2>
          <p>
            Under the GDPR, you have the following rights regarding your
            personal data:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Right of Access:</strong> You have the right to request
              access to the personal data we hold about you.
            </li>
            <li>
              <strong>Right to Rectification:</strong> You have the right to
              request correction of inaccurate or incomplete data.
            </li>
            <li>
              <strong>Right to Erasure:</strong> You have the right to request
              the deletion of your personal data, under certain circumstances.
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> You have the right
              to request that we restrict the processing of your data, under
              certain circumstances.
            </li>
            <li>
              <strong>Right to Data Portability:</strong> You have the right to
              receive your personal data in a structured, commonly used, and
              machine-readable format, and to request the transfer of your data
              to another controller.
            </li>
            <li>
              <strong>Right to Object:</strong> You have the right to object to
              the processing of your personal data for direct marketing purposes
              or other legitimate interests.
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> If we process your
              data based on your consent, you have the right to withdraw that
              consent at any time.
            </li>
          </ul>
          <p>
            If you wish to exercise any of these rights, please contact us at
            trendpilot@info.com.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            9. International Data Transfers
          </h2>
          <p>
            If we transfer your personal data outside of the European Economic
            Area (EEA), we will ensure that adequate safeguards are in place,
            such as the use of Standard Contractual Clauses or an adequacy
            decision from the European Commission.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            10. Cookies and Tracking Technologies
          </h2>
          <p>
            We use cookies and similar technologies to collect usage data,
            improve user experience, and analyze website traffic. You can
            control or disable cookies through your browser settings. For more
            information, please review our{" "}
            <Link href="/cookie-policy">Cookie Policy</Link>.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            11. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any significant changes by posting the new Privacy Policy on
            our website. Your continued use of TrendPilot after any changes
            signifies your acceptance of the updated policy.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            12. Contact Information
          </h2>
          <p>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at:
          </p>
          <p>TrendPilot</p>
          <p>Germany</p>
          <p>Email: trendpilot@info.com</p>

          <p className="mt-8">
            By using TrendPilot, you acknowledge that you have read and
            understand this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
