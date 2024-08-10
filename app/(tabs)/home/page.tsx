import TopNav from "@/app/_components/common/top_nav";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Home() {
  return (
    <>
      <TopNav />
    </>
  );
}
