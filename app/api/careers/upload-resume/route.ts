import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload PDF, DOC, or DOCX" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 10MB)" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Create a sanitized filename
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${Date.now()}-${sanitizedName}`;

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from("rax_landing_resumes")
      .upload(fileName, buffer, { contentType: file.type });

    if (error) {
      console.error("Storage error:", error);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Get signed URL (valid for 1 year)
    const { data: signedUrlData } = await supabase.storage
      .from("rax_landing_resumes")
      .createSignedUrl(fileName, 60 * 60 * 24 * 365);

    if (!signedUrlData?.signedUrl) {
      // Fallback to public URL
      const { data: publicUrlData } = supabase.storage
        .from("rax_landing_resumes")
        .getPublicUrl(fileName);

      return NextResponse.json({ url: publicUrlData.publicUrl });
    }

    return NextResponse.json({ url: signedUrlData.signedUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
