"use client";

import { useEffect, useSyncExternalStore } from "react";

export type Language = "en" | "zh";

const languageStorageKey = "sem-workshop-language";
const languageChangeEvent = "sem-workshop-language-change";

function getLanguageSnapshot(): Language {
  const saved = window.localStorage.getItem(languageStorageKey);
  return saved === "zh" ? "zh" : "en";
}

function subscribeToLanguage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(languageChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(languageChangeEvent, onStoreChange);
  };
}

export function useLanguage() {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    () => "en",
  );

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  function setLanguage(next: Language) {
    window.localStorage.setItem(languageStorageKey, next);
    window.dispatchEvent(new Event(languageChangeEvent));
  }

  return { language, setLanguage };
}

export function LanguageToggle({
  language,
  onChange,
}: {
  language: Language;
  onChange: (language: Language) => void;
}) {
  return (
    <div className="language-toggle" aria-label="Language selector">
      <button
        type="button"
        className={language === "en" ? "is-active" : ""}
        aria-pressed={language === "en"}
        onClick={() => onChange("en")}
      >
        EN
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={language === "zh" ? "is-active" : ""}
        aria-pressed={language === "zh"}
        onClick={() => onChange("zh")}
      >
        中文
      </button>
    </div>
  );
}
