import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const queryParams = new URLSearchParams({
      status: "0",
      filter: "0",
      page: "0",
      size: "20",
      signIn: "0",
    });

    // 검색 파라미터 추가
    if (searchParams.has("keyword")) {
      queryParams.append("keyword", searchParams.get("keyword")!);
    }
    if (searchParams.has("towns")) {
      queryParams.append("towns", searchParams.get("towns")!);
    }
    if (searchParams.has("categories")) {
      queryParams.append("categories", searchParams.get("categories")!);
    }

    const response = await fetch(`/api/noauth/getMainList?${queryParams}`);

    if (!response.ok) {
      throw new Error("getMainList fetch failed");
    }
    const result = await response.json();

    return NextResponse.json({
      data: result.data?.rentals || [],
    });
  } catch (error) {
    console.error("getMainList error:", error);
    return NextResponse.json({ error: "getMainList error" }, { status: 500 });
  }
}
