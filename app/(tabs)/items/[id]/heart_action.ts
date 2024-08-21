"use server";

import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";

export async function HeartItem(itemId: number) {
  const session = await getSession();
  console.log("Session ID:", session.id);

  try {
    await db.heart.create({
      data: {
        itemId,
        userId: session.id!,
      },
    });

    /*  revalidateTag(`heart-status-${itemId}`); */
  } catch (e) {
    console.log("HeartItem error");
  }
}

export async function noHeartItem(itemId: number) {
  const session = await getSession();

  try {
    await db.heart.delete({
      where: {
        id: {
          itemId,
          userId: session.id!,
        },
      },
    });
    /*  revalidateTag(`heart-status-${itemId}`); */
  } catch (e) {
    console.log("noHeartItem error");
  }
}
//하트 버튼 로직
