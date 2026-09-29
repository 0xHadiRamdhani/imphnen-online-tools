"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  categories,
  categoryLabels,
  tools,
  type Category,
  type Tool,
} from "@/lib/tools";
import { categoryName, translate, useAppLanguage } from "@/lib/language";
import { ToolGrid } from "@/components/tool-grid";
import { STORAGE_KEYS, useStoredStringList, writeStringList } from "@/lib/browser-storage";

function WelcomeSection({ greeting, dateLabel }: { greeting: string; dateLabel: string }) {
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);

  return (
    <section className="welcome-row">
      <div>
        <div className="eyebrow">
          <span className="eyebrow-line" /> {t("YOUR CREATIVE WORKSPACE")}
        </div>
        <h1>{t(greeting)}<span className="wave">✳</span></h1>
        <p>{t("What can we help you get done today?")}</p>
      </div>
      <div className="welcome-date">
        <span className="date-icon">◷</span>
        <div>
          <small>{dateLabel}</small>
          <b>{t("One less tab to worry about.")}</b>
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);

  const exploreTools = () => {
    document.getElementById("tool-explorer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <div className="hero-kicker"><i /> {t("YOUR ALL-IN-ONE TOOLKIT")}</div>
        <h2>{t("All your tools.")}<br /><span>{t("One place.")}</span></h2>
        <p>{t("Powerful online tools for developers, creators, students, and everyone else.")}</p>
        <button className="hero-cta" onClick={exploreTools}>
          {t("Explore all tools")} <b>↗</b>
        </button>
        <div className="hero-trust">
          <span><i>✓</i> {t("No sign-up required")}</span>
          <span><i>◈</i> {t("Privacy-first")}</span>
          <span><i>⚡</i> {t("Fast by design")}</span>
        </div>
      </div>
      <Image
        className="hero-brand-image"
        src="/imphnen-brand-art-transparent.png"
        alt="IMPHNEN: Ingin Menjadi Programmer Handal, Namun Enggan Ngoding"
        width={1338}
        height={906}
        priority
        unoptimized
      />
      <div className="hero-decoration">I<span>✳</span></div>
    </section>
  );
}

function StatsSection() {
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);
  const stats = [
    { icon: "⌘", style: "coral", value: "45+", label: "Powerful tools" },
    { icon: "ϟ", style: "lavender", value: "100%", label: "Free to use" },
    { icon: "◈", style: "green", value: t("Private"), label: "By default" },
    { icon: "↗", style: "yellow", value: t("Instant"), label: "No waiting around" },
  ];

  return (
    <section className="stats-row">
      {stats.map((stat) => (
        <div className="stat-item" key={stat.label}>
          <span className={`stat-icon ${stat.style}`}>{stat.icon}</span>
          <div><b>{stat.value}</b><small>{t(stat.label)}</small></div>
        </div>
      ))}
    </section>
  );
}

function RecentToolsSection({ items }: { items: Tool[] }) {
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);

  if (items.length === 0) return null;

  return (
    <section className="content-section recent-section">
      <div className="section-heading">
        <div>
          <span className="section-kicker">{t("PICK UP WHERE YOU LEFT OFF")}</span>
          <h2>{t("Recently used")} <span>↗</span></h2>
        </div>
        <Link href="/recent" className="text-link">{t("See history")} <b>→</b></Link>
      </div>
      <div className="recent-strip">
        {items.slice(0, 4).map((tool) => (
          <Link key={tool.slug} className="recent-chip" href={`/tools/${tool.slug}`}>
            <span className={`mini-icon ${tool.category}`}>{tool.icon}</span>
            <span>
              <b>{translate(tool.name, language)}</b>
              <small>{translate(categoryLabels[tool.category], language)}</small>
            </span>
            <span className="chip-arrow">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ToolExplorer({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  favorites,
  onFavorite,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  filter: Category | "all";
  onFilterChange: (value: Category | "all") => void;
  favorites: string[];
  onFavorite: (slug: string) => void;
}) {
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);
  const matches = tools.filter((tool) => {
    const matchesCategory = filter === "all" || tool.category === filter;
    const searchableText = [
      tool.name,
      tool.description,
      categoryLabels[tool.category],
      translate(tool.name, language),
      translate(tool.description, language),
    ].join(" ").toLowerCase();

    return matchesCategory && searchableText.includes(query.toLowerCase());
  });
  const showCategories = filter === "all" && query.length === 0;

  return (
    <section id="tool-explorer" className="content-section explorer-section">
      <div className="section-heading">
        <div>
          <span className="section-kicker">{t("THE WHOLE TOOLKIT")}</span>
          <h2>{t("Find your next tool")} <span>✳</span></h2>
          <p>{t("Everything you need, right at your fingertips.")}</p>
        </div>
        <label className="inline-search">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={t("Search all tools...")}
          />
          <kbd>⌘ K</kbd>
        </label>
      </div>

      <div className="filter-tabs" role="tablist">
        {categories.map((category) => (
          <button
            key={category.id}
            role="tab"
            aria-selected={filter === category.id}
            className={filter === category.id ? "selected" : ""}
            onClick={() => onFilterChange(category.id)}
          >
            <span>{category.icon}</span>
            {categoryName(category.id, language)}
            <i>{category.count}</i>
          </button>
        ))}
      </div>

      {showCategories ? (
        <CategorySections favorites={favorites} onFavorite={onFavorite} />
      ) : (
        <section className="tool-category search-grid">
          <div className="results-label">
            {matches.length} {t(matches.length === 1 ? "tool found" : "tools found")}
          </div>
          <ToolGrid items={matches} favorites={favorites} onFavorite={onFavorite} />
        </section>
      )}
    </section>
  );
}

function CategorySections({
  favorites,
  onFavorite,
}: {
  favorites: string[];
  onFavorite: (slug: string) => void;
}) {
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);
  const categoriesWithTools = categories.filter((category) => category.id !== "all");

  return (
    <>
      <ToolCategory
        icon="✦"
        iconClass="popular-icon"
        title={t("Popular right now")}
        description={t("The tools everyone keeps coming back to.")}
        linkHref="/all-tools"
        linkLabel={t("View all")}
        items={tools.filter((tool) => tool.popular).slice(0, 4)}
        favorites={favorites}
        onFavorite={onFavorite}
      />
      {categoriesWithTools.map((category) => (
        <ToolCategory
          key={category.id}
          icon={category.icon}
          iconClass={category.id}
          title={categoryName(category.id, language)}
          description={t(categoryDescription(category.id as Category))}
          linkHref={`/category/${category.id}`}
          linkLabel={`${t("See all")} ${category.count}`}
          items={tools.filter((tool) => tool.category === category.id).slice(0, 3)}
          favorites={favorites}
          onFavorite={onFavorite}
        />
      ))}
    </>
  );
}

function ToolCategory({
  icon,
  iconClass,
  title,
  description,
  linkHref,
  linkLabel,
  items,
  favorites,
  onFavorite,
}: {
  icon: string;
  iconClass: string;
  title: string;
  description: string;
  linkHref: string;
  linkLabel: string;
  items: Tool[];
  favorites: string[];
  onFavorite: (slug: string) => void;
}) {
  return (
    <section className="tool-category">
      <div className="category-title">
        <span className={`category-heading-icon ${iconClass}`}>{icon}</span>
        <div><h3>{title}</h3><p>{description}</p></div>
        <Link href={linkHref} className="text-link">{linkLabel} <b>→</b></Link>
      </div>
      <ToolGrid items={items} favorites={favorites} onFavorite={onFavorite} />
    </section>
  );
}

function categoryDescription(category: Category): string {
  const descriptions: Record<Category, string> = {
    developer: "Thoughtful tools for your everyday workflow.",
    media: "Make your images and media work harder.",
    pdf: "A simpler way to get documents done.",
    ai: "A little intelligence goes a long way.",
  };

  return descriptions[category];
}

function PrivacyBanner() {
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);

  return (
    <section className="privacy-banner">
      <div className="privacy-emblem">◈</div>
      <div>
        <span>{t("YOUR FILES STAY YOURS")}</span>
        <h3>{t("Private by design. Every time.")}</h3>
        <p>{t("Tools marked with a lock process your files locally in your browser. Your work stays yours.")}</p>
      </div>
      <Link href="/about" className="button-secondary">
        {t("How we protect you")} <b>→</b>
      </Link>
      <div className="privacy-watermark">◈</div>
    </section>
  );
}

function BottomCallToAction({ onExplore }: { onExplore: () => void }) {
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);

  return (
    <section className="bottom-cta">
      <div className="cta-spark">✳</div>
      <div>
        <h3>{t("A tool for that?")} <span>{t("There probably is.")}</span></h3>
        <p>{t("Explore the whole collection and get back to what matters.")}</p>
      </div>
      <button onClick={onExplore} className="button-primary">
        {t("Explore the toolkit")} <b>↗</b>
      </button>
      <div className="cta-pattern">✳</div>
    </section>
  );
}

export function HomePage() {
  const language = useAppLanguage();
  const [filter, setFilter] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");
  const favorites = useStoredStringList(STORAGE_KEYS.favorites);
  const recent = useStoredStringList(STORAGE_KEYS.recent);
  const [greeting, setGreeting] = useState("Good morning");
  const [dateLabel, setDateLabel] = useState("");

  // Keep server markup stable; the greeting and date depend on the visitor's local clock and locale.
  useEffect(() => {
    const now = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGreeting(
      now.getHours() < 12
        ? "Good morning"
        : now.getHours() < 18
          ? "Good afternoon"
          : "Good evening",
    );
    setDateLabel(
      new Intl.DateTimeFormat(language === "Indonesian" ? "id-ID" : "en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(now).toUpperCase(),
    );
  }, [language]);

  const recentTools = recent
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is Tool => Boolean(tool));

  const toggleFavorite = (slug: string) => {
    const next = favorites.includes(slug)
      ? favorites.filter((favorite) => favorite !== slug)
      : [...favorites, slug];

    writeStringList(STORAGE_KEYS.favorites, next);
  };

  const exploreTools = () => {
    setFilter("all");
    document.getElementById("tool-explorer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <WelcomeSection greeting={greeting} dateLabel={dateLabel} />
      <HeroSection />
      <StatsSection />
      <RecentToolsSection items={recentTools} />
      <ToolExplorer
        query={query}
        onQueryChange={setQuery}
        filter={filter}
        onFilterChange={setFilter}
        favorites={favorites}
        onFavorite={toggleFavorite}
      />
      <PrivacyBanner />
      <BottomCallToAction onExplore={exploreTools} />
    </>
  );
}
