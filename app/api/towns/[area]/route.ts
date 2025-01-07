import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { area: string } }
) {
  try {
    const response = await fetch(
      `/api/noauth/getTowns2?sigunguName=${params.area}`
    );
    const result = await response.json();

    return NextResponse.json({
      data: result.data?.list || [],
    });
  } catch (error) {
    console.error("Towns2 error:", error);
    return NextResponse.json({ error: "Towns2 error" }, { status: 500 });
  }
}
