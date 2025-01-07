import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("/api/noauth/getTowns1");
    const result = await response.json();

    return NextResponse.json({
      data: result.data?.list || [],
    });
  } catch (error) {
    console.error("getTowns1 error:", error);
    return NextResponse.json({ error: "getTowns1 error" }, { status: 500 });
  }
}
