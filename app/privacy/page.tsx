import type { Metadata } from "next";
import { StaticSitePage } from "@/components/site-content";

export const metadata: Metadata = { title: "Privacy", description: "How IMPHNEN ONLINE TOOLS handles your files and preferences." };
export default function Page() { return <StaticSitePage page="privacy" />; }
