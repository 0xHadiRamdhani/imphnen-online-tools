"use client";

import Link from "next/link";
import { translate, useAppLanguage } from "@/lib/language";

export function StaticSitePage({ page }: { page: "about" | "privacy" | "terms" }) {
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);

  if (page === "about") return <div className="about-page">
    <div className="tool-breadcrumb"><Link href="/">{t("Home")}</Link><span>/</span><strong>{t("About")}</strong></div>
    <div className="about-hero"><span className="section-kicker">{t("A BETTER WAY TO GET THINGS DONE")}</span><h1>IMPHNEN<br/><span>ONLINE TOOLS</span></h1><p>{t("A collection of fast, simple, and useful online tools for everyone.")}</p><div className="about-orbit">i<span>✳</span></div></div>
    <div className="about-grid"><section><span>01 / {t("OUR MISSION")}</span><h2>{t("Less friction.")}<br/>{t("More making.")}</h2><p>{t("We believe everyday digital work should be easier. IMPHNEN brings practical tools together in one calm, focused workspace, so you can spend less time looking and more time doing.")}</p></section><section><span>02 / {t("PRIVACY")}</span><h2>{t("Your work stays")}<br/>{t("yours.")}</h2><p>{t("Tools marked as local run in your browser. Some advanced tools need a connected processing service. We label those requirements clearly, and provider credentials belong on the server.")}</p></section><section><span>03 / {t("TECHNOLOGY")}</span><h2>{t("Built for speed")}<br/>{t("and clarity.")}</h2><p>{t("Made with Next.js, React, and modern browser APIs. We prefer simple client-side processing when it can deliver a useful result without uploading your files.")}</p></section><section><span>04 / {t("SAY HELLO")}</span><h2>{t("Have an idea")}<br/>{t("for a tool?")}</h2><p>{t("We’re always looking for ways to make the toolkit more useful.")}</p><a className="text-link" href="mailto:hello@imphnen.tools">hello@imphnen.tools ↗</a></section></div>
    <div className="about-back"><Link className="button-primary" href="/all-tools">{t("Explore the toolkit")} <b>→</b></Link></div>
  </div>;

  if (page === "privacy") return <div className="legal-page">
    <div className="tool-breadcrumb"><Link href="/">{t("Home")}</Link><span>/</span><strong>{t("Privacy")}</strong></div><span className="section-kicker">{t("YOUR FILES STAY YOURS")}</span><h1>{t("Privacy, in plain language.")}</h1><p className="legal-lede">{t("IMPHNEN ONLINE TOOLS is designed to process compatible files directly in your browser.")}</p>
    <section><h2>{t("Browser processing")}</h2><p>{t("Tools marked “Runs in your browser” process the input on your device. The image compressor, image resizer, image converter, JSON tools, encoders, generators, and other marked utilities do not upload that input to an IMPHNEN server.")}</p></section><section><h2>{t("Connected services")}</h2><p>{t("AI tools send the text you submit to the AI provider configured by the site operator. Provider credentials are held server-side. Don’t submit confidential or personal information unless you are comfortable with that provider’s data practices.")}</p><p>{t("Some document and media tools show a provider setup notice until a processing service is connected. This version does not upload files for those tools.")}</p></section><section><h2>{t("Preferences on this device")}</h2><p>{t("Theme, language, favorite tools, and recently used tools are stored in your browser’s local storage. You can clear favorites and recent tools in Settings.")}</p></section><section><h2>{t("Contact")}</h2><p>{t("For questions about this policy, contact the operator of the IMPHNEN ONLINE TOOLS deployment.")}</p></section><Link href="/settings" className="button-secondary">{t("Open privacy settings")} <b>→</b></Link>
  </div>;

  return <div className="legal-page">
    <div className="tool-breadcrumb"><Link href="/">{t("Home")}</Link><span>/</span><strong>{t("Terms")}</strong></div><span className="section-kicker">{t("USING THE TOOLKIT")}</span><h1>{t("Terms of use.")}</h1><p className="legal-lede">{t("Use these tools responsibly and review the output before relying on it.")}</p>
    <section><h2>{t("Provided as tools")}</h2><p>{t("IMPHNEN ONLINE TOOLS provides utilities for convenience. Results can depend on browser support and connected service availability. Review generated, converted, or analyzed output for accuracy and suitability.")}</p></section><section><h2>{t("Your content")}</h2><p>{t("You retain responsibility for content you enter or upload. Avoid submitting material you do not have permission to process. Tools that use an AI provider send submitted text to the provider configured for this deployment.")}</p></section><section><h2>{t("Availability")}</h2><p>{t("Some tools require additional providers or processing engines. Their setup requirements are shown on the tool page. Features may change as the toolkit develops.")}</p></section><section><h2>{t("Questions")}</h2><p>{t("For questions about this deployment, contact the IMPHNEN ONLINE TOOLS operator.")}</p></section><Link href="/all-tools" className="button-primary">{t("Browse tools")} <b>→</b></Link>
  </div>;
}
