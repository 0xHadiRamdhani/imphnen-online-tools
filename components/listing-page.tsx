"use client";
import Link from "next/link";
import { useEffect,useState } from "react";
import {categories,categoryLabels,tools,type Category, type Tool} from "@/lib/tools";
import {ToolGrid} from "@/components/workspace";
import {categoryName,translate,useAppLanguage} from "@/lib/language";
export function ListingPage({kind,category}:{kind:"all"|"favorites"|"recent"|"category";category?:string}){
 const language=useAppLanguage(),t=(text:string)=>translate(text,language);
 const [saved,setSaved]=useState<string[]>([]),[recent,setRecent]=useState<string[]>([]),[query,setQuery]=useState("");
 useEffect(()=>{try{setSaved(JSON.parse(localStorage.getItem("imphnen-favorites")||"[]"));setRecent(JSON.parse(localStorage.getItem("imphnen-recent")||"[]"))}catch{}},[]);
 const items:Tool[]=kind==="favorites"?saved.map(x=>tools.find(t=>t.slug===x)).filter((x):x is Tool=>!!x):kind==="recent"?recent.map(x=>tools.find(t=>t.slug===x)).filter((x):x is Tool=>!!x):kind==="category"?tools.filter(t=>t.category===category):tools;
 const title=kind==="all"?t("All tools"):kind==="favorites"?t("Your favorites"):kind==="recent"?t("Recently used"):categoryName(category as Category,language);
 const visible=items.filter(tool=>`${tool.name} ${tool.description} ${translate(tool.name,language)} ${translate(tool.description,language)}`.toLowerCase().includes(query.toLowerCase()));
 const toggle=(slug:string)=>{const next=saved.includes(slug)?saved.filter(x=>x!==slug):[...saved,slug];setSaved(next);localStorage.setItem("imphnen-favorites",JSON.stringify(next));window.dispatchEvent(new Event("imphnen-local-update"))};
 return <div className="listing-page"><div className="tool-breadcrumb"><Link href="/">{t("Home")}</Link><span>/</span><strong>{title}</strong></div><div className="listing-heading"><div><span className="section-kicker">{t(kind==="favorites"?"YOUR PERSONAL COLLECTION":kind==="recent"?"YOUR WORKSPACE HISTORY":"THE IMPHNEN TOOLKIT")}</span><h1>{title}<span>✳</span></h1><p>{kind==="favorites"?t("Your go-to tools, all in one place."):kind==="recent"?t("Jump back into something you were working on."):kind==="category"?(language==="Indonesian"?`Kumpulan alat ${title.toLowerCase()} untuk alur kerja Anda.`:`A focused collection of ${title.toLowerCase()} for your workflow.`):t("A little something for every task. Pick a tool and get going.")}</p></div><div className="listing-counter"><b>{items.length.toString().padStart(2,"0")}</b><small>{t("TOOLS AVAILABLE")}</small></div></div><div className="listing-controls"><label className="inline-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={language==="Indonesian"?`Cari ${title.toLowerCase()}...`:`Search ${title.toLowerCase()}...`}/><kbd>⌘ K</kbd></label><div className="privacy-chip">◈ {t("Privacy-first processing")}</div></div><div className="results-label">{t("SHOWING")} {visible.length} {t(visible.length===1?"TOOL":"TOOLS")}</div><ToolGrid items={visible} favorites={saved} onFavorite={toggle}/></div>
}
