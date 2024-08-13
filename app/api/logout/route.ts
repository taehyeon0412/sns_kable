import getSession from "@/app/_libs/_server/session";
import { redirect } from "next/navigation";

export async function POST() {
  const session = await getSession();

  if (session) {
    await session.destroy();

    return redirect("/");
  }

  return new Response("Session not found", { status: 401 });
}
