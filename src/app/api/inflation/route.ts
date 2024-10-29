import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const year = searchParams.get("year") || new Date().getFullYear();

  try {
    const result = await query(
      `SELECT * FROM inflation_model 
       WHERE year = $1 
       ORDER BY month ASC`,
      [year]
    );

    return NextResponse.json({ data: result.rows });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch inflation data" },
      { status: 500 }
    );
  }
}
