"use client";

import type { LocalizedText, ScheduleItem, Workshop } from "../data/workshops";
import { workshopYears } from "../data/workshops";
import { sitePath } from "../lib/site-path";
import { useLanguage } from "./language";
import { SiteHeader } from "./SiteHeader";

const labels = {
  en: {
    edition: "Edition",
    program: "Program",
    date: "Date",
    location: "Location",
    viewProgram: "View Program",
    discussant: "Discussant",
    abstract: "Abstract",
    sources: "Original announcements",
    other: "Other workshop programs",
    back: "Back to all workshops",
  },
  zh: {
    edition: "年度",
    program: "研讨会议程",
    date: "日期",
    location: "地点",
    viewProgram: "查看议程",
    discussant: "讨论人",
    abstract: "论文摘要",
    sources: "原始活动公告",
    other: "其他年度议程",
    back: "返回历届活动",
  },
};

const scheduleLabelsZh: Record<string, string> = {
  Registration: "签到",
  "Opening Remarks": "开场致辞",
  "Closing Remarks": "闭幕致辞",
  Presentation: "论文报告",
  "Featured Talk": "特邀报告",
  "Coffee Break": "茶歇",
  "Group Photo & Coffee Break": "合影与茶歇",
  Lunch: "午餐",
  Dinner: "晚餐",
  "Networking Session": "交流环节",
  "Mingle & Discussion": "自由交流与讨论",
};

function localizedText(value: LocalizedText | undefined, language: "en" | "zh") {
  if (!value) {
    return undefined;
  }

  return typeof value === "string" ? value : value[language];
}

function ScheduleRow({
  item,
  language,
}: {
  item: ScheduleItem;
  language: "en" | "zh";
}) {
  const t = labels[language];
  const label = localizedText(item.label, language) ?? "";
  const displayLabel =
    language === "zh" && typeof item.label === "string"
      ? scheduleLabelsZh[item.label] ?? item.label
      : label;
  const speaker = localizedText(item.speaker, language);
  const institution = localizedText(item.institution, language);
  const title = localizedText(item.title, language);
  const abstract = localizedText(item.abstract, language);
  const discussantLabel = item.discussant
    ? localizedText(item.discussant.label, language) ?? t.discussant
    : undefined;
  const discussantName = item.discussant
    ? localizedText(item.discussant.name, language)
    : undefined;
  const discussantInstitution = item.discussant
    ? localizedText(item.discussant.institution, language)
    : undefined;

  return (
    <article className={`schedule-row schedule-${item.kind}`}>
      <time>{item.time}</time>
      <div className="schedule-body">
        <span className="schedule-kind">{displayLabel}</span>
        {speaker ? <h3>{speaker}</h3> : <h3>{displayLabel}</h3>}
        {institution && <p className="institution">{institution}</p>}
        {title && <p className="paper-title">{title}</p>}
        {item.discussant && (
          <div className="discussant">
            <span>{discussantLabel}</span>
            <strong>{discussantName}</strong>
            <small>{discussantInstitution}</small>
          </div>
        )}
        {abstract && (
          <details className="abstract">
            <summary>{t.abstract}</summary>
            <p>{abstract}</p>
          </details>
        )}
      </div>
    </article>
  );
}

export function ProgramSchedule({
  schedule,
  language,
}: {
  schedule: ScheduleItem[];
  language: "en" | "zh";
}) {
  return (
    <div className="schedule-list">
      {schedule.map((item, index) => (
        <ScheduleRow item={item} language={language} key={`${item.time}-${index}`} />
      ))}
    </div>
  );
}

export function ProgramPage({ workshop }: { workshop: Workshop }) {
  const { language, setLanguage } = useLanguage();
  const t = labels[language];

  return (
    <div className="site-shell program-site">
      <SiteHeader language={language} onLanguageChange={setLanguage} compact />
      <main>
        <section className="program-hero">
          <div className="content-wrap">
            <div className="edition-line">
              <span>
                {workshop.year} {t.edition}
              </span>
            </div>
            <h1>{localizedText(workshop.name, language)}</h1>

            <dl className="program-facts">
              <div>
                <dt>{t.date}</dt>
                <dd>{localizedText(workshop.date, language)}</dd>
              </div>
              <div>
                <dt>{t.location}</dt>
                <dd>{localizedText(workshop.location, language)}</dd>
              </div>
              <div>
                <dt>{t.program}</dt>
                <dd>
                  <a href="#program">{t.viewProgram}</a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section program-section" id="program">
          <div className="content-wrap program-layout">
            <aside>
              <p className="section-kicker">{workshop.year}</p>
              <h2>{t.program}</h2>
            </aside>
            <ProgramSchedule schedule={workshop.schedule} language={language} />
          </div>
        </section>

        {workshop.sources.length > 0 && (
          <section className="section source-section">
            <div className="content-wrap source-grid">
              <div>
                <h2>{t.sources}</h2>
                <ul className="source-list">
                  {workshop.sources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} target="_blank" rel="noreferrer">
                        {source.label} <span aria-hidden="true">&#8599;</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section className="section other-programs">
          <div className="content-wrap">
            <h2>{t.other}</h2>
            <div className="year-links">
              {workshopYears
                .filter((year) => year !== workshop.year)
                .map((year) => (
                  <a href={sitePath(`/workshops/${year}`)} key={year}>
                    {year}
                  </a>
                ))}
              <a href={sitePath("/#previous")}>{t.back}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-wrap footer-inner">
          <strong>ShanghaiTech SEM Finance Workshop</strong>
          <span>{workshop.year} Program</span>
        </div>
      </footer>
    </div>
  );
}
