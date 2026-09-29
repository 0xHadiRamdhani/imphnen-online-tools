"use client";

import Image from "next/image";
import Link from "next/link";

export function SiteFooter({ translate }: { translate: (text: string) => string }) {
  const t = translate;

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link href="/" className="footer-brand">
          <Image
            className="footer-brand-image"
            src="/imphnen-sidebar-logo.png"
            alt="IMPHNEN"
            width={950}
            height={530}
            unoptimized
          />
          <span><b>IMPHNEN</b><small>ONLINE TOOLS</small></span>
        </Link>
        <p>{t("All your tools. One place.")}</p>
        <div className="footer-links">
          <section>
            <b>{t("Explore")}</b>
            <Link href="/all-tools">{t("All tools")}</Link>
            <Link href="/category/developer">{t("Developer")}</Link>
            <Link href="/category/media">{t("Media")}</Link>
          </section>
          <section>
            <b>{t("More tools")}</b>
            <Link href="/category/pdf">PDF</Link>
            <Link href="/category/ai">AI</Link>
            <Link href="/favorites">{t("Favorites")}</Link>
          </section>
          <section>
            <b>{t("About")}</b>
            <Link href="/about">{t("Our mission")}</Link>
            <Link href="/privacy">{t("Privacy")}</Link>
            <Link href="/terms">{t("Terms")}</Link>
          </section>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 IMPHNEN ONLINE TOOLS</span>
        <span className="status-live"><i /> {t("Ready when you are")}</span>
      </div>
    </footer>
  );
}
