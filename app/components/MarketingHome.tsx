"use client";

import { workshops, workshopYears } from "../data/workshops";
import { sitePath } from "../lib/site-path";
import { useLanguage } from "./language";
import { ProgramSchedule } from "./ProgramPage";
import { SiteHeader } from "./SiteHeader";

const copy = {
  en: {
    edition: "2026 Edition",
    title: "2026 SEM Finance Workshop:",
    theme: "Financial Markets in a Changing Information Environment",
    dateLabel: "Date",
    date: "Sunday, October 11, 2026",
    locationLabel: "Location",
    location:
      "Room 501, School of Entrepreneurship and Management, ShanghaiTech University",
    programSectionTitle: "Preliminary Program",
    previousTitle: "Previous Workshop Programs",
    programLink: "Program",
    contactTitle: "Contact",
    organizer: "Yapei Zhang",
    email: "zhangyp3@shanghaitech.edu.cn",
    footer: "ShanghaiTech SEM Finance Workshop",
  },
  zh: {
    edition: "2026 年度",
    title: "2026 SEM 金融研讨会：",
    theme: "Financial Markets in a Changing Information Environment",
    dateLabel: "日期",
    date: "2026 年 10 月 11 日，星期日",
    locationLabel: "地点",
    location: "上海科技大学创业与管理学院 501 会议室",
    programSectionTitle: "初步议程",
    previousTitle: "历届研讨会议程",
    programLink: "议程",
    contactTitle: "联系方式",
    organizer: "张亚佩",
    email: "zhangyp3@shanghaitech.edu.cn",
    footer: "ShanghaiTech SEM Finance Workshop",
  },
};

export function MarketingHome() {
  const { language, setLanguage } = useLanguage();
  const t = copy[language];

  return (
    <div className="site-shell home-page">
      <SiteHeader language={language} onLanguageChange={setLanguage} />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="content-wrap hero-content">
            <div className="edition-line">
              <span>{t.edition}</span>
            </div>
            <h1 id="hero-title">
              <span className="hero-title-main">{t.title}</span>
              <span className="hero-title-theme">{t.theme}</span>
            </h1>

            <dl className="event-facts">
              <div>
                <dt>{t.dateLabel}</dt>
                <dd>{t.date}</dd>
              </div>
              <div>
                <dt>{t.locationLabel}</dt>
                <dd>{t.location}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section home-program-section" id="program">
          <div className="content-wrap program-layout">
            <aside>
              <p className="section-kicker">2026</p>
              <h2>{t.programSectionTitle}</h2>
            </aside>
            <ProgramSchedule schedule={workshops["2026"].schedule} language={language} />
          </div>
        </section>

        <section className="section archive-section" id="previous">
          <div className="content-wrap">
            <div className="section-heading-row archive-heading">
              <h2>{t.previousTitle}</h2>
            </div>

            <div className="archive-list">
              {workshopYears.map((year) => (
                  <a className="archive-card" href={sitePath(`/workshops/${year}`)} key={year}>
                    <span className="archive-year">{year}</span>
                    <span className="archive-link">
                      {year} {t.programLink} <span aria-hidden="true">&#8594;</span>
                    </span>
                  </a>
                ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="content-wrap contact-grid">
            <div>
              <h2>{t.contactTitle}</h2>
            </div>
            <div className="contact-card">
              <strong>{t.organizer}</strong>
              <a href={`mailto:${t.email}`}>{t.email}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-wrap footer-inner">
          <strong>{t.footer}</strong>
          <span>2026</span>
        </div>
      </footer>
    </div>
  );
}
