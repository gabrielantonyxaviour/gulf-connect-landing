import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { resend, isResendConfigured } from "@/lib/resend";
import { contactFormSchema } from "@/lib/validations";
import {
  generateContactAcknowledgementEmail,
  EMAIL_SUBJECTS,
} from "@/lib/email-templates";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, company, message } = result.data;

    // 1. Save to Supabase
    const supabase = createServerClient();

    const { error: dbError } = await supabase
      .from('rax_landing_contact_messages')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        company: company || null,
        message,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      // Continue with email even if DB fails
    }

    // 2. Send email to the user
    if (!isResendConfigured() || !resend) {
      // Log for development
      console.log("=== Contact Form Submission ===");
      console.log(`Name: ${firstName} ${lastName}`);
      console.log(`Email: ${email}`);
      console.log(`Message: ${message}`);
      console.log("===============================");

      return NextResponse.json(
        {
          success: true,
          message: "Message received",
          savedToDb: !dbError,
        },
        { status: 200 }
      );
    }

    const senderEmail = "Rax Tech <no-reply@contact.raxgbc.co.in>";

    // Send email to the user who submitted the form
    const { error: emailError } = await resend.emails.send({
      from: senderEmail,
      to: [email],
      subject: EMAIL_SUBJECTS.contactAcknowledgement,
      html: generateContactAcknowledgementEmail({
        firstName,
        lastName,
        email,
        message,
        company,
      }),
    });

    if (emailError) {
      console.error("Email send error:", emailError);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
