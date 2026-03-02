import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductByHandle, getProducts } from "@/lib/shopify/queries";
import { MOCK_PRODUCTS, PRODUCT_METADATA } from "@/lib/shopify/mock";
import { ProductDetails } from "@/components/product/ProductDetails";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { productSchema, breadcrumbSchema } from "@/lib/schema";

// Next.js 15: params is a Promise
interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle).catch(
    () => MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null,
  );

  if (!product) return {};

  const image = product.images[0];
  const title = product.seo.title || product.title;
  const description = product.seo.description || product.description;
  return {
    title,
    description,
    alternates: {
      canonical: `/products/${handle}`,
    },
    openGraph: {
      title,
      description,
      url: `/products/${handle}`,
      ...(image && {
        images: [
          {
            url: image.url,
            width: image.width,
            height: image.height,
            alt: image.altText ?? product.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image.url] }),
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;

  // Fetch product; fall back to mock when Shopify isn't wired up.
  const product = await getProductByHandle(handle).catch(
    () => MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null,
  );
  if (!product) notFound();

  // Related: fetch up to 4, strip the current product, show at most 3.
  const allProducts = await getProducts(4).catch(() => MOCK_PRODUCTS);
  const related = allProducts.filter((p) => p.handle !== handle).slice(0, 3);

  const meta = PRODUCT_METADATA[handle];
  const heatLevel = meta?.heatLevel ?? 5;
  const flavorTags = meta?.flavorTags ?? [];
  const heroImage = product.images[0] ?? null;

  const jsonLd = productSchema(product);
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: product.title, url: `/products/${product.handle}` },
  ]);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* ── Product hero ──────────────────────────────────────────────────── */}
      <section className="bg-komodo-black px-6 pb-16 pt-8 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">

            {/* ── Image column ────────────────────────────────────────────── */}
            <div className="sticky top-24 overflow-hidden rounded-xl bg-gray-900">
              {heroImage ? (
                <Image
                  src={heroImage.url}
                  alt={heroImage.altText ?? product.title}
                  width={heroImage.width}
                  height={heroImage.height}
                  className="aspect-square w-full object-cover"
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              ) : (
                // Placeholder monogram when no Shopify image is available
                <div
                  className="flex aspect-square w-full items-center justify-center bg-gray-900"
                  aria-label={`${product.title} product image placeholder`}
                >
                  <span
                    className="select-none font-black uppercase text-gray-700"
                    style={{ fontSize: "clamp(4rem, 16vw, 10rem)" }}
                    aria-hidden="true"
                  >
                    KS
                  </span>
                </div>
              )}
            </div>

            {/* ── Details column ──────────────────────────────────────────── */}
            <ProductDetails
              product={product}
              heatLevel={heatLevel}
              flavorTags={flavorTags}
            />
          </div>
        </div>
      </section>

      {/* ── Related products ──────────────────────────────────────────────── */}
      {related.length > 0 && <RelatedProducts products={related} />}
    </>
  );
}
