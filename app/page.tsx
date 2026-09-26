import Link from "next/link";
import { products } from "@/lib/products";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ServiceBar from "@/components/ServiceBar";
import Newsletter from "@/components/Newsletter";
import { journalPosts } from "@/lib/journal";

/** Campaign imagery — women only (activewear / swim / soft). Verified Unsplash. */
const moods = [
  {
    title: "ACTIVE",
    href: "/active",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "SWIM",
    href: "/swim",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "INTIMATES",
    href: "/intimates",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function Home() {
  const featured = products.slice(0, 4);
  return (
    <main className="min-h-screen bg-[#f8f4ef]">
      <Header />
      <section
        className="mx-auto grid max-w-[1600px] gap-2 p-2 sm:gap-3 sm:p-4 lg:grid-cols-[1.65fr_1fr]"
        aria-labelledby="hero-title"
      >
        <div className="relative min-h-[610px] overflow-hidden bg-[#cbb9ad] sm:min-h-[700px] lg:min-h-[760px]">
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=85"
            alt="Women in yoga activewear — Elarossa campaign"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10 lg:max-w-xl lg:p-14">
            <p className="text-[10px] font-semibold tracking-[.28em]">THE ELAROSSA EDIT</p>
            <h1 id="hero-title" className="serif mt-4 text-5xl leading-[.92] sm:text-7xl">
              Feel beautifully yourself.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/85">
              Curated feminine essentials for movement, confidence, travel and everyday life.
            </p>
            <Link
              href="/shop"
              className="cta-ink mt-7 inline-flex min-h-12 items-center px-6 text-[10px] font-semibold tracking-[.18em] transition"
            >
              SHOP THE EDIT <span className="ml-5">→</span>
            </Link>
          </div>
        </div>
        <div className="grid min-h-[610px] grid-rows-[1fr_auto] gap-2 sm:min-h-[700px] sm:gap-3 lg:min-h-[760px]">
          <div className="grid grid-cols-[.9fr_1.1fr] overflow-hidden bg-[#eee5df]">
            <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
              <h2 className="serif text-3xl leading-[1.05] sm:text-4xl">
                Dressed for the way you live.
              </h2>
              <p className="mt-5 text-xs leading-5">From morning movement to midnight escapes.</p>
              <Link
                href="/shop"
                className="mt-7 w-fit border-b border-[#201b1b] pb-2 text-[10px] font-semibold tracking-[.14em]"
              >
                DISCOVER ELAROSSA →
              </Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1000&q=85"
              alt="Woman in sports bra and shorts — strength edit"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="bg-[#eee5df] px-5 py-7 text-center sm:px-8 sm:py-10">
            <h2 className="serif text-2xl sm:text-3xl">Less noise. Better pieces.</h2>
            <div className="mt-7 grid grid-cols-3 divide-x divide-[#201b1b]/15">
              <div className="px-2">
                <p className="serif text-2xl">01</p>
                <p className="mt-2 text-[9px] font-semibold tracking-[.12em]">CURATED</p>
                <p className="mt-3 text-[11px] leading-5 opacity-65">
                  Fewer pieces worth making room for.
                </p>
              </div>
              <div className="px-2">
                <p className="serif text-2xl">02</p>
                <p className="mt-2 text-[9px] font-semibold tracking-[.12em]">CONSIDERED</p>
                <p className="mt-3 text-[11px] leading-5 opacity-65">
                  Selected for comfort and versatility.
                </p>
              </div>
              <div className="px-2">
                <p className="serif text-2xl">03</p>
                <p className="mt-2 text-[9px] font-semibold tracking-[.12em]">EVOLVING</p>
                <p className="mt-3 text-[11px] leading-5 opacity-65">
                  Shaped by real customer feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-[1500px] px-4 py-14 sm:px-8 sm:py-20"
        aria-labelledby="mood-title"
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[.28em]">SHOP BY MOOD</p>
            <h2 id="mood-title" className="serif mt-2 text-3xl sm:text-4xl">
              Find your everyday.
            </h2>
          </div>
          <Link href="/shop" className="text-[10px] font-semibold tracking-[.14em] underline underline-offset-4">
            VIEW ALL →
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {moods.map((mood) => (
            <Link
              key={mood.title}
              href={mood.href}
              className="group relative aspect-[4/5] overflow-hidden bg-[#e9dfda]"
            >
              <img
                src={mood.image}
                alt={`${mood.title} collection`}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-6 pt-28 text-center text-white">
                <p className="serif text-3xl">{mood.title}</p>
                <span className="mt-3 inline-block text-[10px] font-semibold tracking-[.16em]">
                  EXPLORE →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="mx-auto max-w-[1500px] px-4 pb-14 sm:px-8 sm:pb-20"
        aria-labelledby="edit-title"
      >
        <div className="text-center">
          <p className="text-[10px] font-semibold tracking-[.28em]">THE FOUNDING EDIT</p>
          <h2 id="edit-title" className="serif mt-2 text-3xl sm:text-4xl">
            Four pieces. One Elarossa state of mind.
          </h2>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-5">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="cta-ink inline-flex min-h-12 items-center px-7 text-[10px] font-semibold tracking-[.18em] transition hover:!bg-[#a65d68] hover:!text-white"
          >
            EXPLORE THE COLLECTION →
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-3 px-4 pb-14 sm:px-8 sm:pb-20 lg:grid-cols-[1.2fr_1fr]">
        <div className="bg-[#eee5df] p-7 sm:p-10">
          <p className="text-[10px] font-semibold tracking-[.28em]">FROM THE JOURNAL</p>
          <h2 className="serif mt-2 text-3xl sm:text-4xl">Thoughts for living beautifully.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {journalPosts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/journal/${post.slug}`} className="group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-[9px] font-semibold tracking-[.18em] opacity-50">
                  {post.category}
                </p>
                <h3 className="serif mt-1 text-xl">{post.title}</h3>
                <span className="mt-2 inline-block text-[10px] underline underline-offset-4">
                  Read More →
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex min-h-[360px] flex-col justify-end bg-[#d8c5b7] p-7 text-[#201b1b] sm:p-10">
          <p className="text-[10px] font-semibold tracking-[.28em]">JOIN ELAROSSA</p>
          <h2 className="serif mt-3 text-4xl leading-tight sm:text-5xl">10% off your first order.</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 opacity-70">
            A considered edit, delivered occasionally.
          </p>
          <div className="mt-7">
            <Newsletter variant="inline" />
          </div>
        </div>
      </section>

      <ServiceBar />
      <footer className="bg-[#201b1b] px-5 py-12 text-white sm:px-8">
        <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="serif text-3xl tracking-[.12em]">
              ELAROSSA
            </Link>
            <p className="mt-4 max-w-xs text-xs leading-6 opacity-60">
              Curated feminine essentials for movement, confidence, travel and everyday life.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[.18em] opacity-50">SHOP</p>
            <div className="mt-4 grid gap-3 text-xs opacity-80">
              <Link href="/shop">All Products</Link>
              <Link href="/active">Active</Link>
              <Link href="/swim">Swim</Link>
              <Link href="/intimates">Intimates</Link>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[.18em] opacity-50">CUSTOMER CARE</p>
            <div className="mt-4 grid gap-3 text-xs opacity-80">
              <Link href="/shipping">Shipping</Link>
              <Link href="/returns">Returns</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[.18em] opacity-50">ABOUT</p>
            <div className="mt-4 grid gap-3 text-xs opacity-80">
              <Link href="/journal">Journal</Link>
              <Link href="/about">Our Story</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-[1500px] border-t border-white/10 pt-6 text-[9px] tracking-[.1em] opacity-45">
          © 2026 ELAROSSA · Campaign imagery is editorial; product photos use supplier media.
        </div>
      </footer>
    </main>
  );
}
