import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

import connectDB from "@/lib/mongodb";
import Link from "@/models/Link";
import validateUrl from "@/lib/validateUrl";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        {
          success: false,
          message: "URL is required",
        },
        { status: 400 }
      );
    }

    if (!validateUrl(url)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid URL",
        },
        { status: 400 }
      );
    }

    let shortCode = nanoid(7);

    // Prevent collisions
    while (await Link.findOne({ shortCode })) {
      shortCode = nanoid(7);
    }

    await Link.create({
      originalUrl: url,
      shortCode,
      clicks: 0,
    });

    return NextResponse.json(
      {
        success: true,
        shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SHORTEN_API_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}