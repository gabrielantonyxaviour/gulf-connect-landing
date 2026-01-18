import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { resend, isResendConfigured } from "@/lib/resend";
import { contactFormSchema } from "@/lib/validations";
import {
  generateProductEnquiryAcknowledgementEmail,
  EMAIL_SUBJECTS,
} from "@/lib/email-templates";

interface ProductEnquiryRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  product: {
    name: string;
    model: string;
    image: string;
    category: string;
  };
}

export async function POST(request: Request) {
  try {
    const body: ProductEnquiryRequest = await request.json();

    // Validate the contact form fields
    const formData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      company: body.company,
      message: body.message,
    };

    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Validate product info
    if (!body.product?.name || !body.product?.model || !body.product?.image || !body.product?.category) {
      return NextResponse.json(
        { error: "Product information is required" },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, company, message } = result.data;

    // 1. Save to Supabase with product context
    const supabase = createServerClient();

    const enhancedMessage = `[Product Enquiry]\nProduct: ${body.product.name}\nModel: ${body.product.model}\nCategory: ${body.product.category}\n\n${message}`;

    const { error: dbError } = await supabase
      .from('rax_landing_contact_messages')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        company: company || null,
        message: enhancedMessage,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      // Continue with email even if DB fails
    }

    // 2. Send product enquiry email to the user
    if (!isResendConfigured() || !resend) {
      // Log for development
      console.log("=== Product Enquiry Submission ===");
      console.log(`Name: ${firstName} ${lastName}`);
      console.log(`Email: ${email}`);
      console.log(`Product: ${body.product.name} (${body.product.model})`);
      console.log(`Message: ${message}`);
      console.log("==================================");

      return NextResponse.json(
        {
          success: true,
          message: "Enquiry received",
          savedToDb: !dbError,
        },
        { status: 200 }
      );
    }

    const senderEmail = "Rax Tech <no-reply@contact.raxgbc.co.in>";

    // Send product enquiry acknowledgement email
    const { error: emailError } = await resend.emails.send({
      from: senderEmail,
      to: [email],
      subject: EMAIL_SUBJECTS.productEnquiryAcknowledgement(body.product.name),
      html: generateProductEnquiryAcknowledgementEmail({
        firstName,
        lastName,
        email,
        message,
        company,
        product: body.product,
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
      { success: true, message: "Enquiry sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Product enquiry error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
