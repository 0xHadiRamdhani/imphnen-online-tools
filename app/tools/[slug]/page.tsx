import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {ToolWorkspace} from "@/components/tool-workspace";
import {getTool,tools,categoryLabels} from "@/lib/tools";
export function generateStaticParams(){return tools.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const tool=getTool(slug);if(!tool)return {title:"Tool not found"};return {title:tool.name,description:tool.description,openGraph:{title:`${tool.name} — IMPHNEN ONLINE TOOLS`,description:tool.description}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!getTool(slug))notFound();return <ToolWorkspace slug={slug}/>}
