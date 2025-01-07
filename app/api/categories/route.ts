import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("/api/getCategory");
    const result = await response.json();

    return NextResponse.json({
      data: result.data?.categoryList || [],
    });
  } catch (error) {
    console.error("getCategory error:", error);
    return NextResponse.json({ error: "getCategory error" }, { status: 500 });
  }
}
