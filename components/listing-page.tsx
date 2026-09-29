"use client";

import Link from "next/link";
import { useState } from "react";
import { tools, type Category, type Tool } from "@/lib/tools";
import { categoryName, translate, useAppLanguage } from "@/lib/language";
import { STORAGE_KEYS, useStoredStringList, writeStringList } from "@/lib/browser-storage";
import { ToolGrid } from "@/components/tool-grid";

type ListingKind = "all" | "favorites" | "recent" | "category";

type ListingPageProps = {
  kind: ListingKind;
  category?: string;
};

function resolveTools(kind: ListingKind, category: string | undefined, saved: string[], recent: string[]): Tool[] {
  if (kind === "favorites") return saved.map(findTool).filter(isTool);
  if (kind === "recent") return recent.map(findTool).filter(isTool);
  if (kind === "category") return tools.filter((tool) => tool.category === category);
  return tools;
}

function findTool(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

function isTool(tool: Tool | undefined): tool is Tool {
  return tool !== undefined;
}

export function ListingPage({ kind, category }: ListingPageProps) {
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);
  const saved = useStoredStringList(STORAGE_KEYS.favorites);
  const recent = useStoredStringList(STORAGE_KEYS.recent);
  const [query, setQuery] = useState("");

  const items = resolveTools(kind, category, saved, recent);
  const title = getListingTitle(kind, category, language, t);
  const visible = items.filter((tool) => {
    const content = [
      tool.name,
      tool.description,
      translate(tool.name, language),
      translate(tool.description, language),
    ].join(" ").toLowerCase();

    return content.includes(query.toLowerCase());
  });

  const toggleFavorite = (slug: string) => {
    const next = saved.includes(slug)
      ? saved.filter((favorite) => favorite !== slug)
      : [...saved, slug];

    writeStringList(STORAGE_KEYS.favorites, next);
  };

  return (
    <div className="listing-page">
      <div className="tool-breadcrumb">
        <Link href="/">{t("Home")}</Link>
        <span>/</span>
        <strong>{title}</strong>
      </div>

      <div className="listing-heading">
        <div>
          <span className="section-kicker">{getListingKicker(kind, t)}</span>
          <h1>{title}<span>✳</span></h1>
          <p>{getListingDescription(kind, title, language, t)}</p>
        </div>
        <div className="listing-counter">
          <b>{items.length.toString().padStart(2, "0")}</b>
          <small>{t("TOOLS AVAILABLE")}</small>
        </div>
      </div>

      <div className="listing-controls">
        <label className="inline-search">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={language === "Indonesian" ? `Cari ${title.toLowerCase()}...` : `Search ${title.toLowerCase()}...`}
          />
          <kbd>⌘ K</kbd>
        </label>
        <div className="privacy-chip">◈ {t("Privacy-first processing")}</div>
      </div>

      <div className="results-label">
        {t("SHOWING")} {visible.length} {t(visible.length === 1 ? "TOOL" : "TOOLS")}
      </div>
      <ToolGrid items={visible} favorites={saved} onFavorite={toggleFavorite} />
    </div>
  );
}

function getListingTitle(
  kind: ListingKind,
  category: string | undefined,
  language: ReturnType<typeof useAppLanguage>,
  t: (text: string) => string,
) {
  if (kind === "all") return t("All tools");
  if (kind === "favorites") return t("Your favorites");
  if (kind === "recent") return t("Recently used");
  return categoryName(category as Category, language);
}

function getListingKicker(kind: ListingKind, t: (text: string) => string) {
  if (kind === "favorites") return t("YOUR PERSONAL COLLECTION");
  if (kind === "recent") return t("YOUR WORKSPACE HISTORY");
  return t("THE IMPHNEN TOOLKIT");
}

function getListingDescription(
  kind: ListingKind,
  title: string,
  language: ReturnType<typeof useAppLanguage>,
  t: (text: string) => string,
) {
  if (kind === "favorites") return t("Your go-to tools, all in one place.");
  if (kind === "recent") return t("Jump back into something you were working on.");
  if (kind !== "category") return t("A little something for every task. Pick a tool and get going.");

  return language === "Indonesian"
    ? `Kumpulan alat ${title.toLowerCase()} untuk alur kerja Anda.`
    : `A focused collection of ${title.toLowerCase()} for your workflow.`;
}
