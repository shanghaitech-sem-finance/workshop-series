"use client";

import { sitePath } from "../lib/site-path";
import { Language, LanguageToggle } from "./language";

export function SiteHeader({
  language,
  onLanguageChange,
  compact = false,
}: {
  language: Language;
  onLanguageChange: (language: Language) => void;
  compact?: boolean;
}) {
  const copy =
    language === "en"
      ? {
          previous: "Previous",
          contact: "Contact",
          home: "Home",
        }
      : {
          previous: "历届活动",
          contact: "联系",
          home: "首页",
        };

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href={sitePath("/")} aria-label="ShanghaiTech SEM Finance Workshop home">
          <span className="wordmark-mark" aria-hidden="true" />
          <span>
            <strong>ShanghaiTech</strong>
            <small className="wordmark-school">School of Entrepreneurship and Management</small>
            <small className="wordmark-event">Finance Workshop Series</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Primary navigation">
          {compact ? (
            <a href={sitePath("/")}>{copy.home}</a>
          ) : (
            <>
              <a href="#previous">{copy.previous}</a>
              <a href="#contact">{copy.contact}</a>
            </>
          )}
        </nav>

        <LanguageToggle language={language} onChange={onLanguageChange} />
      </div>
    </header>
  );
}
