import type { Metadata } from "next";
import { Workspace } from "@/components/workspace";
import "./globals.css";

export const metadata:Metadata={title:{default:"IMPHNEN ONLINE TOOLS — All Your Tools. One Place.",template:"%s — IMPHNEN ONLINE TOOLS"},description:"Powerful online tools for developers, creators, students, and everyone else. Fast, useful, and private by design.",applicationName:"IMPHNEN ONLINE TOOLS",openGraph:{title:"IMPHNEN ONLINE TOOLS",description:"All Your Tools. One Place.",type:"website"},twitter:{card:"summary_large_image",title:"IMPHNEN ONLINE TOOLS",description:"All Your Tools. One Place."}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" data-theme="light"><body><Workspace>{children}</Workspace></body></html>}
