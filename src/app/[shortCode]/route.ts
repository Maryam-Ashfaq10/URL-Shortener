import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Link from "@/models/Link";

interface RouteProps {
    params: Promise<{
        shortCode: string;
    }>;
}

export async function GET(
    request: NextRequest,
    { params }: RouteProps
) {
    try {
        await connectDB();

        const { shortCode } = await params;

        const link = await Link.findOne({
            shortCode,
        });

        if (!link) {
            return NextResponse.redirect(
                new URL("/link-not-found", request.url)
            );
        }

        await Link.updateOne(
            { _id: link._id },
            {
                $inc: {
                    clicks: 1,
                },
            }
        );

        return NextResponse.redirect(link.originalUrl);
    } catch (error) {
        console.error("REDIRECT_ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            {
                status: 500,
            }
        );
    }
}