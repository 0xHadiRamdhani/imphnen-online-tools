"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code2,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { categoryLabels, type Tool } from "@/lib/tools";
import { translate, useAppLanguage } from "@/lib/language";

const categoryIcons = {
  developer: Code2,
  media: ImageIcon,
  pdf: FileText,
  ai: Bot,
};

type ToolCardProps = {
  tool: Tool;
  favorite?: boolean;
  onFavorite?: (slug: string) => void;
};

function ToolCard({ tool, favorite = false, onFavorite }: ToolCardProps) {
  const CategoryIcon = categoryIcons[tool.category];
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);

  return (
    <motion.article
      layout
      whileHover={{ y: -2 }}
      transition={{ duration: 0.16 }}
      className="tool-card"
    >
      <Link href={`/tools/${tool.slug}`} className="tool-link">
        <div className={`tool-icon ${tool.category}`}>{tool.icon}</div>
        <span className="card-open">
          <ArrowUpRight size={13} />
        </span>
        <h3>{t(tool.name)}</h3>
        <p>{t(tool.description)}</p>
        <div className="tool-card-bottom">
          <span className={`category-tag ${tool.category}`}>
            <i>
              <CategoryIcon size={10} />
            </i>
            {translate(categoryLabels[tool.category], language)}
          </span>
          <span className="open-label">
            {t("Open tool")} <b><ArrowRight size={11} /></b>
          </span>
        </div>
      </Link>
      {onFavorite && (
        <button
          className={`favorite-btn ${favorite ? "is-favorite" : ""}`}
          aria-label={favorite ? t("Remove from favorites") : t("Add to favorites")}
          onClick={() => onFavorite(tool.slug)}
        >
          {favorite ? "★" : "☆"}
        </button>
      )}
    </motion.article>
  );
}

type ToolGridProps = {
  items: Tool[];
  favorites?: string[];
  onFavorite?: (slug: string) => void;
};

export function ToolGrid({
  items,
  favorites = [],
  onFavorite,
}: ToolGridProps) {
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <span>⌕</span>
        <h3>{t("Nothing here yet")}</h3>
        <p>{t("Tools you save or use will show up here.")}</p>
        <Link href="/all-tools" className="button-secondary">
          {t("Browse all tools")} <b>→</b>
        </Link>
      </div>
    );
  }

  return (
    <div className="tool-grid">
      {items.map((tool) => (
        <ToolCard
          key={tool.slug}
          tool={tool}
          favorite={favorites.includes(tool.slug)}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
}
