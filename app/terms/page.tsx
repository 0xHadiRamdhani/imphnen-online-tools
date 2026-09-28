import type { Metadata } from "next";
import { StaticSitePage } from "@/components/site-content";

export const metadata: Metadata = { title: "Terms", description: "Terms for using IMPHNEN ONLINE TOOLS." };
export default function Page() { return <StaticSitePage page="terms" />; }
