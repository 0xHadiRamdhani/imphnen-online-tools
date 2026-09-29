"use client";

import Image from "next/image";
import Link from "next/link";
import { translate, useAppLanguage } from "@/lib/language";

type StaticPage = "about" | "privacy" | "terms";

type Copy = (text: string) => string;

function Breadcrumb({ page, t }: { page: string; t: Copy }) {
  return (
    <div className="tool-breadcrumb">
      <Link href="/">{t("Home")}</Link>
      <span>/</span>
      <strong>{t(page)}</strong>
    </div>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function AboutPage({ t }: { t: Copy }) {
  const sections = [
    {
      number: "01",
      label: "OUR MISSION",
      title: <>{t("Less friction.")}<br />{t("More making.")}</>,
      body: t("We believe everyday digital work should be easier. IMPHNEN brings practical tools together in one calm, focused workspace, so you can spend less time looking and more time doing."),
    },
    {
      number: "02",
      label: "PRIVACY",
      title: <>{t("Your work stays")}<br />{t("yours.")}</>,
      body: t("Tools marked as local run in your browser. Some advanced tools need a connected processing service. We label those requirements clearly, and provider credentials belong on the server."),
    },
    {
      number: "03",
      label: "TECHNOLOGY",
      title: <>{t("Built for speed")}<br />{t("and clarity.")}</>,
      body: t("Made with Next.js, React, and modern browser APIs. We prefer simple client-side processing when it can deliver a useful result without uploading your files."),
    },
    {
      number: "04",
      label: "SAY HELLO",
      title: <>{t("Have an idea")}<br />{t("for a tool?")}</>,
      body: t("We’re always looking for ways to make the toolkit more useful."),
      contact: true,
    },
  ];

  return (
    <div className="about-page">
      <Breadcrumb page="About" t={t} />
      <div className="about-hero">
        <span className="section-kicker">{t("A BETTER WAY TO GET THINGS DONE")}</span>
        <h1>IMPHNEN<br /><span>ONLINE TOOLS</span></h1>
        <p>{t("A collection of fast, simple, and useful online tools for everyone.")}</p>
        <div className="about-orbit">
          <Image src="/imphnen-sidebar-logo.png" alt="Logo IMPHNEN" width={950} height={530} unoptimized />
        </div>
      </div>

      <div className="about-grid">
        {sections.map((section) => (
          <section key={section.number}>
            <span>{section.number} / {t(section.label)}</span>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            {section.contact && <a className="text-link" href="mailto:hello@imphnen.tools">hello@imphnen.tools ↗</a>}
          </section>
        ))}
      </div>

      <div className="about-back">
        <Link className="button-primary" href="/all-tools">{t("Explore the toolkit")} <b>→</b></Link>
      </div>
    </div>
  );
}

function PrivacyPage({ t }: { t: Copy }) {
  return (
    <div className="legal-page">
      <Breadcrumb page="Privacy" t={t} />
      <span className="section-kicker">{t("YOUR FILES STAY YOURS")}</span>
      <h1>{t("Privacy, in plain language.")}</h1>
      <p className="legal-lede">{t("IMPHNEN ONLINE TOOLS is designed to process compatible files directly in your browser.")}</p>

      <LegalSection title={t("Browser processing")}>
        <p>{t("Tools marked “Runs in your browser” process the input on your device. The image compressor, image resizer, image converter, JSON tools, encoders, generators, and other marked utilities do not upload that input to an IMPHNEN server.")}</p>
      </LegalSection>
      <LegalSection title={t("Connected services")}>
        <p>{t("AI tools send the text you submit to the AI provider configured by the site operator. Provider credentials are held server-side. Don’t submit confidential or personal information unless you are comfortable with that provider’s data practices.")}</p>
        <p>{t("Some document and media tools show a provider setup notice until a processing service is connected. This version does not upload files for those tools.")}</p>
      </LegalSection>
      <LegalSection title={t("Preferences on this device")}>
        <p>{t("Theme, language, favorite tools, and recently used tools are stored in your browser’s local storage. You can clear favorites and recent tools in Settings.")}</p>
      </LegalSection>
      <LegalSection title={t("Contact")}>
        <p>{t("For questions about this policy, contact the operator of the IMPHNEN ONLINE TOOLS deployment.")}</p>
      </LegalSection>
      <Link href="/settings" className="button-secondary">{t("Open privacy settings")} <b>→</b></Link>
    </div>
  );
}

function TermsPage({ t }: { t: Copy }) {
  return (
    <div className="legal-page">
      <Breadcrumb page="Terms" t={t} />
      <span className="section-kicker">{t("USING THE TOOLKIT")}</span>
      <h1>{t("Terms of use.")}</h1>
      <p className="legal-lede">{t("Use these tools responsibly and review the output before relying on it.")}</p>

      <LegalSection title={t("Provided as tools")}>
        <p>{t("IMPHNEN ONLINE TOOLS provides utilities for convenience. Results can depend on browser support and connected service availability. Review generated, converted, or analyzed output for accuracy and suitability.")}</p>
      </LegalSection>
      <LegalSection title={t("Your content")}>
        <p>{t("You retain responsibility for content you enter or upload. Avoid submitting material you do not have permission to process. Tools that use an AI provider send submitted text to the provider configured for this deployment.")}</p>
      </LegalSection>
      <LegalSection title={t("Availability")}>
        <p>{t("Some tools require additional providers or processing engines. Their setup requirements are shown on the tool page. Features may change as the toolkit develops.")}</p>
      </LegalSection>
      <LegalSection title={t("Questions")}>
        <p>{t("For questions about this deployment, contact the IMPHNEN ONLINE TOOLS operator.")}</p>
      </LegalSection>
      <Link href="/all-tools" className="button-primary">{t("Browse tools")} <b>→</b></Link>
    </div>
  );
}

export function StaticSitePage({ page }: { page: StaticPage }) {
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);

  if (page === "about") return <AboutPage t={t} />;
  if (page === "privacy") return <PrivacyPage t={t} />;
  return <TermsPage t={t} />;
}
