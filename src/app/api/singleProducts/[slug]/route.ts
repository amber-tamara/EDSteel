process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: String }> }
) {
  const slug = await params;
  if (!slug) {
    NextResponse.json({ error: "missing slug" }, { status: 400 });
  }

  const baseUrl = process.env.WOO_COMMERCE_API_URL!;
  const key = process.env.WC_KEY!;
  const secret = process.env.WC_SECRET!;
  const fetchedData = await fetch(`${baseUrl}/products?slug=${slug}`, {
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${key}:${secret}`).toString("base64"),
    },
  });
}
