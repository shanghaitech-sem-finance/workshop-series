"use client";

import type { ScheduleItem, Workshop } from "../data/workshops";
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

function ScheduleRow({
  item,
  language,
}: {
  item: ScheduleItem;
  language: "en" | "zh";
}) {
  const t = labels[language];
  const displayLabel = language === "zh" ? scheduleLabelsZh[item.label] ?? item.label : item.label;

  return (
    <article className={`schedule-row schedule-${item.kind}`}>
      <time>{item.time}</time>
      <div className="schedule-body">
        <span className="schedule-kind">{displayLabel}</span>
        {item.speaker ? <h3>{item.speaker}</h3> : <h3>{displayLabel}</h3>}
        {item.institution && <p className="institution">{item.institution}</p>}
        {item.title && <p className="paper-title">{item.title}</p>}
        {item.discussant && (
          <div className="discussant">
            <span>{t.discussant}</span>
            <strong>{item.discussant.name}</strong>
            <small>{item.discussant.institution}</small>
          </div>
        )}
        {item.abstract && (
          <details className="abstract">
            <summary>{t.abstract}</summary>
            <p>{item.abstract}</p>
          </details>
        )}
      </div>
    </article>
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
            <h1>{workshop.name}</h1>

            <dl className="program-facts">
              <div>
                <dt>{t.date}</dt>
                <dd>{workshop.date}</dd>
              </div>
              <div>
                <dt>{t.location}</dt>
                <dd>{workshop.location}</dd>
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
            <div className="schedule-list">
              {workshop.schedule.map((item, index) => (
                <ScheduleRow item={item} language={language} key={`${item.time}-${index}`} />
              ))}
            </div>
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
