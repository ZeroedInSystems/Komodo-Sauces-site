import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-komodo-black px-6 text-center">
      {/* Eyebrow */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
        404
      </p>

      {/* Heading */}
      <h1 className="mt-4 text-3xl font-black uppercase tracking-[0.12em] text-komodo-white md:text-5xl">
        Page Not Found
      </h1>

      {/* Body */}
      <p className="mt-6 max-w-sm text-sm leading-relaxed text-gray-500">
        Looks like this page ran out of heat. Try exploring our sauces instead.
      </p>

      {/* Primary CTA */}
      <Link
        href="/products"
        className="mt-10 inline-flex items-center justify-center bg-komodo-red px-10 py-4 text-xs font-black uppercase tracking-[0.18em] text-komodo-white transition-colors hover:bg-komodo-red-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red focus-visible:ring-offset-2 focus-visible:ring-offset-komodo-black"
      >
        Shop Our Sauces
      </Link>

      {/* Secondary CTA */}
      <Link
        href="/"
        className="mt-4 text-xs text-gray-600 transition-colors hover:text-komodo-white focus-visible:outline-none focus-visible:text-komodo-white"
      >
        Back to home
      </Link>
    </div>
  );
}
