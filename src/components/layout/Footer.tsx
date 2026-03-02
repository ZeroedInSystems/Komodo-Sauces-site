import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SHOP_LINKS = [
  { href: "/shop", label: "All Hot Sauces" },
  { href: "/shop/bundles", label: "Bundles" },
  { href: "/shop/merchandise", label: "Merchandise" },
  { href: "/shop/gift-cards", label: "Gift Cards" },
] as const;

const COMPANY_LINKS = [
  { href: "/our-story", label: "Our Story" },
  { href: "/mission", label: "Mission" },
  { href: "/contact", label: "Contact" },
  { href: "/wholesale", label: "Wholesale" },
] as const;

// ─── SVG Icons (inline — no icon library) ─────────────────────────────────────

function InstagramIcon() {
  return (
    <svg
      className="h-4 w-4 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth={0} />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      className="h-4 w-4 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      className="h-4 w-4 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

// ─── Shared link style ────────────────────────────────────────────────────────

const linkClass =
  "text-sm text-gray-400 transition-colors duration-200 hover:text-komodo-red focus-visible:outline-none focus-visible:text-komodo-red";

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-gray-800 bg-komodo-black"
      role="contentinfo"
    >
      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">

          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-baseline gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red"
              aria-label="Komodo Sauces home"
            >
              <span className="text-lg font-black uppercase tracking-[0.12em] text-komodo-white">
                Komodo
              </span>
              <span className="text-sm font-black uppercase tracking-[0.18em] text-komodo-red">
                Sauces
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Small-batch, chef-crafted hot sauces for those who demand more
              from their heat. Sourced with purpose. Made with fire.
            </p>
          </div>

          {/* Column 2 — Shop */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-komodo-white">
              Shop
            </h3>
            <ul className="space-y-3" role="list">
              {SHOP_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-komodo-white">
              Company
            </h3>
            <ul className="space-y-3" role="list">
              {COMPANY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Social */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-komodo-white">
              Follow Us
            </h3>
            <ul className="space-y-4" role="list">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 ${linkClass}`}
                  aria-label="Komodo Sauces on Instagram (opens in new tab)"
                >
                  <InstagramIcon />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 ${linkClass}`}
                  aria-label="Komodo Sauces on TikTok (opens in new tab)"
                >
                  <TikTokIcon />
                  <span>TikTok</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 ${linkClass}`}
                  aria-label="Komodo Sauces on Facebook (opens in new tab)"
                >
                  <FacebookIcon />
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-gray-600">
            © {year} Komodo Sauces. All rights reserved.
          </p>
          <p className="text-xs font-semibold uppercase tracking-widest text-komodo-red">
            Every bottle fights human trafficking.
          </p>
        </div>
      </div>
    </footer>
  );
}
