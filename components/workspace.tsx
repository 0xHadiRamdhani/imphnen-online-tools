"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  Boxes,
  Code2,
  FileText,
  History,
  Home,
  Image as ImageIcon,
  Moon,
  PanelLeftClose,
  Search,
  Settings as SettingsIcon,
  Star,
  Sun,
} from "lucide-react";
import { categories, categoryLabels, tools, type Tool } from "@/lib/tools";
import { categoryName, translate, useAppLanguage } from "@/lib/language";
import {
  STORAGE_KEYS,
  useStoredStringList,
  useStoredValue,
  writeStoredValue,
  writeStringList,
} from "@/lib/browser-storage";
import { SiteFooter } from "@/components/site-footer";
import { CommandPalette } from "@/components/command-palette";

const categoryIcon: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  developer: Code2,
  media: ImageIcon,
  pdf: FileText,
  ai: Bot,
};

export function Workspace({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);

  const theme = useStoredValue(STORAGE_KEYS.theme, "light");
  const workspaceName = useStoredValue(STORAGE_KEYS.workspaceName, "Personal workspace");
  const favorites = useStoredStringList(STORAGE_KEYS.favorites);
  const recent = useStoredStringList(STORAGE_KEYS.recent);
  const dark = theme === "dark";
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const [palette, setPalette] = useState(false);
  const [workspaceMenu, setWorkspaceMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [editingWorkspace, setEditingWorkspace] = useState(false);
  const [workspaceDraft, setWorkspaceDraft] = useState("");

  const workspaceSwitcher = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPalette((open) => !open);
      }
      if (event.key === "Escape") {
        setPalette(false);
        setWorkspaceMenu(false);
        setProfileMenu(false);
        setEditingWorkspace(false);
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  useEffect(() => {
    if (!workspaceMenu) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!workspaceSwitcher.current?.contains(event.target as Node)) {
        setWorkspaceMenu(false);
      }
    };

    window.addEventListener("pointerdown", closeOnOutsideClick);
    return () => window.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [workspaceMenu]);

  useEffect(() => {
    if (!profileMenu) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!profileRef.current?.contains(event.target as Node)) {
        setProfileMenu(false);
      }
    };

    window.addEventListener("pointerdown", closeOnOutsideClick);
    return () => window.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [profileMenu]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    return tools
      .filter((tool) => {
        const searchableContent = [
          tool.name,
          tool.description,
          categoryLabels[tool.category],
          translate(tool.name, language),
          translate(tool.description, language),
        ].join(" ").toLowerCase();

        return searchableContent.includes(normalizedQuery);
      })
      .slice(0, 8);
  }, [query, language]);



  const openTool = (tool: Tool) => {
    const nextRecent = [tool.slug, ...recent.filter((slug) => slug !== tool.slug)].slice(0, 8);
    writeStringList(STORAGE_KEYS.recent, nextRecent);
    setPalette(false);
    setQuery("");
    router.push(`/tools/${tool.slug}`);
  };

  const saveWorkspaceName = () => {
    const name = workspaceDraft.trim();
    if (!name) return;

    writeStoredValue(STORAGE_KEYS.workspaceName, name);
    setEditingWorkspace(false);
  };

  const toggleTheme = () => {
    writeStoredValue(STORAGE_KEYS.theme, dark ? "light" : "dark");
  };

  const toggleLanguage = () => {
    const nextLanguage = language === "English" ? "Indonesian" : "English";
    writeStoredValue(STORAGE_KEYS.language, nextLanguage);
    window.dispatchEvent(new Event("imphnen-language-change"));
  };

  const favoriteTools = favorites
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is Tool => Boolean(tool))
    .slice(0, 3);
  const recentTools = recent
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is Tool => Boolean(tool))
    .slice(0, 3);
  const isCurrentPath = (href: string) => pathname === href;
  return <div className={`shell ${collapsed?"is-collapsed":""}`}>
    <aside className="sidebar">
      <Link href="/" className="brand"><Image className="brand-image" src="/imphnen-sidebar-logo.png" alt="IMPHNEN" width={950} height={530} unoptimized/><span className="brand-text brand-subtitle"><small>ONLINE TOOLS</small></span></Link>
      <div className="workspace-switcher" ref={workspaceSwitcher}><button type="button" className="workspace-pill" aria-expanded={workspaceMenu} aria-haspopup="dialog" onClick={()=>setWorkspaceMenu(open=>!open)}><span className="workspace-dot"/><span className="workspace-pill-label">{t(workspaceName)}</span><span className="chevron">⌄</span></button>{workspaceMenu&&<div className="workspace-menu" role="dialog" aria-label={t("Personal workspace")}>
        <div className="workspace-menu-current"><div className="workspace-menu-title"><span className="workspace-menu-avatar">{workspaceName.slice(0,1).toUpperCase()}</span><div><b>{t(workspaceName)}</b><small>{t("Guest workspace")} · {t("Free plan")}</small></div><button className="workspace-rename-button" onClick={()=>{setWorkspaceDraft(workspaceName);setEditingWorkspace(true)}} aria-label={t("Rename workspace")} title={t("Rename workspace")}>✎</button></div>
          {editingWorkspace&&<form className="workspace-rename-form" onSubmit={e=>{e.preventDefault();saveWorkspaceName()}}><input autoFocus maxLength={40} value={workspaceDraft} onChange={e=>setWorkspaceDraft(e.target.value)} aria-label={t("Workspace name")}/><button type="submit" disabled={!workspaceDraft.trim()}>{t("Save")}</button><button type="button" onClick={()=>setEditingWorkspace(false)}>{t("Cancel")}</button></form>}
        </div>
        <section className="workspace-menu-section"><div className="workspace-menu-heading"><b>{t("Favorites")}</b><Link href="/favorites" onClick={()=>setWorkspaceMenu(false)}>{t("See all")}</Link></div>{favoriteTools.length?favoriteTools.map(tool=><button key={tool.slug} className="workspace-tool-link" onClick={()=>{setWorkspaceMenu(false);openTool(tool)}}><span className={`mini-icon ${tool.category}`}>{tool.icon}</span>{translate(tool.name,language)}</button>):<p className="workspace-empty">{t("No favorites yet")}</p>}</section>
        <section className="workspace-menu-section"><div className="workspace-menu-heading"><b>{t("Recently used")}</b><Link href="/recent" onClick={()=>setWorkspaceMenu(false)}>{t("See all")}</Link></div>{recentTools.length?recentTools.map(tool=><button key={tool.slug} className="workspace-tool-link" onClick={()=>{setWorkspaceMenu(false);openTool(tool)}}><span className={`mini-icon ${tool.category}`}>{tool.icon}</span>{translate(tool.name,language)}</button>):<p className="workspace-empty">{t("No recent tools yet")}</p>}</section>
        <div className="workspace-menu-quick"><button onClick={toggleTheme}>{dark?<Sun size={13}/>:<Moon size={13}/>} {dark?t("Light mode"):t("Dark mode")}</button><button onClick={toggleLanguage}>文 {language==="English"?"Bahasa Indonesia":"English"}</button></div>
        <Link className="workspace-settings-link" href="/settings" onClick={()=>setWorkspaceMenu(false)}>{t("Workspace settings")} <ArrowUpRight size={13}/></Link>
      </div>}</div>
      <nav aria-label="Main navigation">
        <div className="nav-label">{t("WORKSPACE")}</div>
        <Link title={t("Home")} aria-label={t("Home")} className={`nav-item ${isCurrentPath("/")?"active":""}`} href="/"><span><Home size={15}/></span><span className="nav-item-label">{t("Home")}</span></Link>
        <Link title={t("All tools")} aria-label={t("All tools")} className={`nav-item ${pathname==="/all-tools"?"active":""}`} href="/all-tools"><span><Boxes size={15}/></span><span className="nav-item-label">{t("All tools")}</span><kbd>⌘ 1</kbd></Link>
        <div className="nav-label nav-label-spaced">{t("CATEGORIES")}</div>
        {categories.filter(c=>c.id!=="all").map(c=>{const Icon=categoryIcon[c.id],label=categoryName(c.id,language);return <Link key={c.id} title={label} aria-label={label} className={`nav-item ${pathname===`/category/${c.id}`?"active":""}`} href={`/category/${c.id}`}><span><Icon size={15}/></span><span className="nav-item-label">{label}</span><i className="nav-count">{c.count}</i></Link>})}
        <div className="nav-label nav-label-spaced">{t("YOUR LIBRARY")}</div>
        <Link title={t("Favorites")} aria-label={t("Favorites")} className={`nav-item ${isCurrentPath("/favorites")?"active":""}`} href="/favorites"><span><Star size={15}/></span><span className="nav-item-label">{t("Favorites")}</span> {favorites.length>0&&<i className="nav-count">{favorites.length}</i>}</Link>
        <Link title={t("Recent")} aria-label={t("Recent")} className={`nav-item ${isCurrentPath("/recent")?"active":""}`} href="/recent"><span><History size={15}/></span><span className="nav-item-label">{t("Recent")}</span></Link>
      </nav>
  <div className="sidebar-bottom">
        <Link title={t("Settings")} aria-label={t("Settings")} className="nav-item" href="/settings"><span><SettingsIcon size={15}/></span><span className="nav-item-label">{t("Settings")}</span></Link><button title={dark?t("Light mode"):t("Dark mode")} aria-label={dark?t("Light mode"):t("Dark mode")} className="nav-item theme-button" onClick={toggleTheme}><span>{dark?<Sun size={15}/>:<Moon size={15}/>}</span><span className="nav-item-label">{dark?t("Light mode"):t("Dark mode")}</span><i className="theme-toggle"><i/></i></button>
        <button className="collapse-button" onClick={()=>setCollapsed(!collapsed)} aria-label={t(collapsed?"Expand sidebar":"Collapse sidebar")} title={t(collapsed?"Expand sidebar":"Collapse sidebar")}><span><PanelLeftClose size={14}/></span><span className="nav-item-label">{t(collapsed?"Expand sidebar":"Collapse sidebar")}</span></button>
        <div className="profile-wrap" ref={profileRef}><button type="button" className="profile" aria-label={t("Workspace options")} aria-expanded={profileMenu} aria-haspopup="menu" onClick={()=>setProfileMenu(open=>!open)}><span className="avatar">I</span><span className="profile-label"><b>{t("Guest workspace")}</b><small>{t("Free plan")}</small></span><span className="profile-more" aria-hidden="true">···</span></button>{profileMenu&&<div className="profile-menu" role="menu" aria-label={t("Workspace options")}>
          {editingWorkspace?<form className="profile-rename-form" onSubmit={e=>{e.preventDefault();saveWorkspaceName();setProfileMenu(false)}}><label htmlFor="profile-workspace-name">{t("Rename workspace")}</label><input id="profile-workspace-name" autoFocus maxLength={40} value={workspaceDraft} onChange={e=>setWorkspaceDraft(e.target.value)}/><div><button type="submit" disabled={!workspaceDraft.trim()}>{t("Save")}</button><button type="button" onClick={()=>{setEditingWorkspace(false);setProfileMenu(false)}}>{t("Cancel")}</button></div></form>:<><button role="menuitem" onClick={()=>{setWorkspaceDraft(workspaceName);setEditingWorkspace(true)}}>{t("Rename workspace")}</button><button role="menuitem" onClick={toggleTheme}>{dark?<Sun size={14}/>:<Moon size={14}/>} {dark?t("Light mode"):t("Dark mode")}</button><Link role="menuitem" href="/settings" onClick={()=>setProfileMenu(false)}><SettingsIcon size={14}/>{t("Workspace settings")}</Link></>}
        </div>}</div>
      </div>
    </aside>
    <main className="main-area"><header className="topbar"><div className="breadcrumbs"><span>{t("Workspace")}</span><b>/</b><strong>{t(pathname==="/"?"Home":pathname.split("/").filter(Boolean).at(-1)?.replaceAll("-"," ")||"Home")}</strong></div><div className="top-actions"><button className="top-search" onClick={()=>setPalette(true)}><span><Search size={15}/></span> {t("Search anything...")} <kbd>⌘ K</kbd></button></div></header>
      <div className="page-content">{children}</div>
      <SiteFooter translate={t} />
    </main>
    <CommandPalette
      open={palette}
      query={query}
      results={filtered}
      language={language}
      translateText={t}
      onQueryChange={setQuery}
      onSelect={openTool}
      onClose={() => setPalette(false)}
    />
  </div>
}
