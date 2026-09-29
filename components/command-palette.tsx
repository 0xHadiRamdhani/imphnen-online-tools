"use client";

import { categoryLabels, tools, type Tool } from "@/lib/tools";
import { translate, type AppLanguage } from "@/lib/language";

type CommandPaletteProps = {
  open: boolean;
  query: string;
  results: Tool[];
  language: AppLanguage;
  translateText: (text: string) => string;
  onQueryChange: (value: string) => void;
  onSelect: (tool: Tool) => void;
  onClose: () => void;
};

export function CommandPalette({
  open,
  query,
  results,
  language,
  translateText: t,
  onQueryChange,
  onSelect,
  onClose,
}: CommandPaletteProps) {
  if (!open) return null;

  const quickAccess = tools.filter((tool) => tool.popular).slice(0, 6);
  const visibleTools = query ? results : quickAccess;

  return (
    <div
      className="palette-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="command-palette" role="dialog" aria-modal="true" aria-label={t("Search tools")}>
        <div className="palette-input">
          <span>⌕</span>
          <input
            autoFocus
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={t("Search tools, categories...")}
          />
          <kbd>ESC</kbd>
        </div>
        <div className="palette-hint">{query ? t("SEARCH RESULTS") : t("QUICK ACCESS")}</div>
        {visibleTools.map((tool) => (
          <button className="palette-result" key={tool.slug} onClick={() => onSelect(tool)}>
            <span className={`mini-icon ${tool.category}`}>{tool.icon}</span>
            <span>
              <b>{translate(tool.name, language)}</b>
              <small>{translate(categoryLabels[tool.category], language)}</small>
            </span>
            <span className="result-enter">↵</span>
          </button>
        ))}
        {query && results.length === 0 && (
          <div className="empty-search">
            {language === "Indonesian"
              ? `Alat tidak ditemukan untuk “${query}”`
              : `No tools found for “${query}”`}
          </div>
        )}
        <div className="palette-footer">
          <span>↑↓ {t("Navigate")}</span>
          <span>↵ {t("Open tool")}</span>
          <span>ESC {t("Close")}</span>
        </div>
      </div>
    </div>
  );
}
