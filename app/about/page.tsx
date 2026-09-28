import type { Metadata } from "next";
import { StaticSitePage } from "@/components/site-content";

export const metadata: Metadata = { title: "About", description: "Learn about IMPHNEN ONLINE TOOLS, a collection of fast, simple, useful tools for everyone." };
export default function Page() { return <StaticSitePage page="about" />; }
