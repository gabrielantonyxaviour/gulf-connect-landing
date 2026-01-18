"use client";

import { useState } from "react";
import {
  generateContactAcknowledgementEmail,
  generateJobApplicationAcknowledgementEmail,
} from "@/lib/email-templates";

// Sample data for preview
const sampleContactData = {
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@example.com",
  message:
    "Hi, I'm interested in learning more about your IoT solutions for warehouse management. We're a logistics company looking to modernize our operations. Could we schedule a call to discuss?",
  company: "Acme Logistics",
};

const sampleJobData = {
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.j@example.com",
  jobTitle: "Senior Software Engineer",
  jobLocation: "Chennai, India",
};

export default function EmailPreviewPage() {
  const [activeTab, setActiveTab] = useState<"contact" | "job">("contact");

  const contactEmail = generateContactAcknowledgementEmail(sampleContactData);
  const jobEmail = generateJobApplicationAcknowledgementEmail(sampleJobData);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-2">
          Email Template Preview
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Preview how emails will look to recipients
        </p>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "contact"
                ? "bg-[#DC143C] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Contact Form Acknowledgement
          </button>
          <button
            onClick={() => setActiveTab("job")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "job"
                ? "bg-[#DC143C] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Job Application Acknowledgement
          </button>
        </div>

        {/* Email Preview */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Email Header Info */}
            <div className="border-b px-6 py-4 bg-gray-50">
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium text-gray-700">From:</span>{" "}
                  <span className="text-gray-600">
                    Rax Tech International &lt;no-reply@raxgbc.co.in&gt;
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">To:</span>{" "}
                  <span className="text-gray-600">
                    {activeTab === "contact"
                      ? sampleContactData.email
                      : sampleJobData.email}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Subject:</span>{" "}
                  <span className="text-gray-600">
                    {activeTab === "contact"
                      ? "Thank you for contacting Rax Tech International"
                      : `Application Received: ${sampleJobData.jobTitle} - Rax Tech International`}
                  </span>
                </p>
              </div>
            </div>

            {/* Email Body */}
            <iframe
              srcDoc={activeTab === "contact" ? contactEmail : jobEmail}
              className="w-full h-[800px] border-0"
              title="Email Preview"
            />
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-gray-500 text-sm mt-8">
          This is a development preview. Delete this page before production.
        </p>
      </div>
    </div>
  );
}
