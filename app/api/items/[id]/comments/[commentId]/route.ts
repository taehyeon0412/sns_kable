import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { itemId: string; commentId: string } }
) {
  const { itemId, commentId } = params;
}
