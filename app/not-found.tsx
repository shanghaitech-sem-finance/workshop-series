import { sitePath } from "./lib/site-path";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="section-kicker">404</p>
      <h1>Page not found</h1>
      <p>The page you requested is not part of the workshop archive.</p>
      <a className="button button-primary" href={sitePath("/")}>
        Return home
      </a>
    </main>
  );
}
