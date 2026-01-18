import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { BUCKETS } from "@/lib/storage";

const ALLOWED_TYPES = ["application/pdf"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const categoryId = formData.get("categoryId") as string;
    const productModel = formData.get("productModel") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PDF file" },
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

    // Create a sanitized filename using product model
    const sanitizedModel = (productModel || 'catalog')
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .toLowerCase();
    const fileName = `${sanitizedModel}-catalog.pdf`;

    // Use category folder if provided
    const folder = categoryId || 'uncategorized';
    const filePath = `${folder}/${fileName}`;

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload with upsert to allow replacing existing catalog
    const { error } = await supabase.storage
      .from(BUCKETS.CATALOGS)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Storage error:", error);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKETS.CATALOGS)
      .getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
