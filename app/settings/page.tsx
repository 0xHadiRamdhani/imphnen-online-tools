"use client";
import { useEffect, useState } from "react";
import { translate, useAppLanguage } from "@/lib/language";

export default function Page() {
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);
  const [theme, setTheme] = useState("light");
  const [saved, setSaved] = useState(false);

  useEffect(() => setTheme(localStorage.getItem("imphnen-theme") || "light"), []);

  const changeLanguage = (value: string) => {
    localStorage.setItem("imphnen-language", value);
    window.dispatchEvent(new Event("imphnen-language-change"));
  };
  const clear = (key: string) => {
    localStorage.removeItem(key);
    window.dispatchEvent(new Event("imphnen-local-update"));
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return <div className="settings-page">
    <div className="tool-breadcrumb"><a href="/">{t("Home")}</a><span>/</span><strong>{t("Settings")}</strong></div>
    <div className="listing-heading"><div><span className="section-kicker">{t("MAKE YOURSELF AT HOME")}</span><h1>{t("Settings")} <span>⚙</span></h1><p>{t("Make your workspace feel a little more like yours.")}</p></div></div>
    <section className="settings-card">
      <div className="settings-section"><div><h2>{t("Appearance")}</h2><p>{t("Choose how IMPHNEN ONLINE TOOLS looks on this device.")}</p></div><div className="segmented">{["dark", "light", "system"].map(x => <button className={theme === x ? "selected" : ""} key={x} onClick={() => { setTheme(x); localStorage.setItem("imphnen-theme", x); document.documentElement.dataset.theme = x === "dark" ? "dark" : "light"; }}>{t(x[0].toUpperCase() + x.slice(1))}</button>)}</div></div>
      <div className="settings-section"><div><h2>{t("Language")}</h2><p>{t("Choose your preferred language.")}</p></div><select value={language} onChange={e => changeLanguage(e.target.value)}><option value="English">English</option><option value="Indonesian">Bahasa Indonesia</option></select></div>
      <div className="settings-section"><div><h2>{t("Privacy & data")}</h2><p>{t("Clear the tools stored in this browser.")}</p></div><div className="settings-buttons"><button className="button-secondary" onClick={() => clear("imphnen-recent")}>{t("Clear recent tools")}</button><button className="button-secondary" onClick={() => clear("imphnen-favorites")}>{t("Clear favorites")}</button></div></div>
      <div className="settings-section"><div><h2>{t("Keyboard shortcuts")}</h2><p>{t("Open search from anywhere in your workspace.")}</p></div><kbd>⌘ K <span>{t("or")}</span> Ctrl K</kbd></div>
      {saved && <div className="settings-toast">✓ {t("Preferences updated")}</div>}
    </section>
  </div>;
}
