import getSession from "@/app/_libs/_server/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  const session = await getSession();

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://sns-kable.vercel.app"
      : "http://localhost:3000";

  if (session) {
    await session.destroy();

    return NextResponse.redirect(`${baseUrl}`, { status: 302 });
  }

  return new Response("Session not found", { status: 401 });
}
