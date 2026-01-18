import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { resend, isResendConfigured } from "@/lib/resend";
import {
  generateJobApplicationAcknowledgementEmail,
  EMAIL_SUBJECTS,
} from "@/lib/email-templates";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = createServerClient();

    // Validate required fields
    if (!body.job_id || !body.first_name || !body.last_name || !body.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get job title for email
    const { data: job } = await supabase
      .from("rax_landing_jobs")
      .select("title")
      .eq("id", body.job_id)
      .single();

    // Insert application
    const { error } = await supabase.from("rax_landing_job_applications").insert({
      job_id: body.job_id,
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      phone: body.phone,
      current_company: body.current_company,
      linkedin_url: body.linkedin_url,
      portfolio_url: body.portfolio_url,
      years_experience: body.years_experience,
      cover_letter: body.cover_letter,
      resume_url: body.resume_url,
    });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to submit application" },
        { status: 500 }
      );
    }

    // Send email to the applicant
    if (isResendConfigured() && resend) {
      const senderEmail = "Rax Tech Careers <no-reply@contact.raxgbc.co.in>";

      const { error: emailError } = await resend.emails.send({
        from: senderEmail,
        to: [body.email],
        subject: EMAIL_SUBJECTS.jobApplicationAcknowledgement(job?.title || "Position"),
        html: generateJobApplicationAcknowledgementEmail({
          firstName: body.first_name,
          lastName: body.last_name,
          email: body.email,
          jobTitle: job?.title || "Position",
        }),
      });

      if (emailError) {
        console.error("Email send error:", emailError);
        // Don't fail the request if email fails - application is already saved
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
