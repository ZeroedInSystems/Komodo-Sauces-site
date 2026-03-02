// ─── Types ────────────────────────────────────────────────────────────────────

export type PostKind = "listicle" | "recipe" | "story" | "quiz";

export type SauceId = "black" | "red" | "gold";

export interface RecipeIngredient {
  amount: number;
  unit: string;
  item: string;
}

export interface RecipeData {
  servings: number;
  prepTime: string;
  cookTime: string;
  ingredients: RecipeIngredient[];
  steps: string[];
}

export interface ListicleItem {
  number: number;
  food: string;
  sauce: string;
  sauceId: SauceId;
  description: string;
}

export interface QuizOption {
  label: string;
  value: SauceId;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export type Block =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; level: 2 | 3; text: string }
  | { kind: "listicle"; items: ListicleItem[] }
  | { kind: "recipe"; data: RecipeData }
  | { kind: "quiz"; questions: QuizQuestion[] }
  | { kind: "timeline"; entries: { era: string; text: string }[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO date
  readingTime: number; // minutes
  heatLevel: 1 | 2 | 3 | 4 | 5;
  kind: PostKind;
  tags: string[];
  blocks: Block[];
}

// ─── Sauce metadata ────────────────────────────────────────────────────────────

export const SAUCE_META: Record<
  SauceId,
  { name: string; tagline: string; handle: string }
> = {
  black: {
    name: "Komodo Black",
    tagline: "Sweet, smoky, and deeply complex — the everyday drizzle.",
    handle: "komodo-black",
  },
  red: {
    name: "Komodo Red",
    tagline: "Bold, savory heat with an addictive kick.",
    handle: "komodo-red",
  },
  gold: {
    name: "Komodo Gold",
    tagline: "Bright, tangy, and sweet with a slow burn you'll crave.",
    handle: "komodo-gold",
  },
};

// ─── Posts ────────────────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [
  // ── 1: Listicle ─────────────────────────────────────────────────────────────
  {
    slug: "5-foods-that-need-hot-sauce",
    title: "5 Foods You Never Knew Needed Hot Sauce",
    excerpt:
      "Hot sauce isn't just for wings. From scrambled eggs to vanilla ice cream, Komodo's lineup unlocks flavors you didn't know were hiding.",
    publishedAt: "2026-01-15",
    readingTime: 4,
    heatLevel: 3,
    kind: "listicle",
    tags: ["tips", "pairings", "everyday"],
    blocks: [
      {
        kind: "paragraph",
        text: "We get it — hot sauce lives on the table next to the sriracha and the Tabasco, waiting patiently for wing night. But Komodo's three sauces were made for so much more than that. Here are five foods that transform the moment you add a few drops.",
      },
      {
        kind: "listicle",
        items: [
          {
            number: 1,
            food: "Scrambled Eggs",
            sauce: "Komodo Gold",
            sauceId: "gold",
            description:
              "The sweet, tangy brightness of Komodo Gold cuts through the richness of eggs the way a squeeze of lemon does — elevating without overpowering. Add a few drops right as the eggs come off the heat.",
          },
          {
            number: 2,
            food: "Avocado Toast",
            sauce: "Komodo Red",
            sauceId: "red",
            description:
              "Avocado is creamy and mild, which means it's a blank canvas begging for heat. Komodo Red adds savory depth and a slow burn that makes every bite feel intentional.",
          },
          {
            number: 3,
            food: "Mac & Cheese",
            sauce: "Komodo Black",
            sauceId: "black",
            description:
              "Smoky-sweet Komodo Black swirled into a bowl of mac and cheese is pure comfort turned up to eleven. The dark sauce melts into the cheese sauce and disappears — until the flavor hits.",
          },
          {
            number: 4,
            food: "Watermelon",
            sauce: "Komodo Gold",
            sauceId: "gold",
            description:
              "Sweet fruit plus spice is a classic combo across cultures. Komodo Gold's fruity heat amplifies the watermelon's sweetness while the slow burn lingers on the back of your tongue.",
          },
          {
            number: 5,
            food: "Vanilla Ice Cream",
            sauce: "Komodo Red",
            sauceId: "red",
            description:
              "Don't knock it till you've tried it. A single drop of Komodo Red on a scoop of vanilla ice cream creates a chili-chocolate vibe that gourmet restaurants charge $18 for. You're welcome.",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "The secret to pairing hot sauce is contrast. Rich and fatty foods love bright, acidic heat. Sweet foods love slow-building spice. Once you start thinking that way, you'll be reaching for Komodo every time you sit down to eat.",
      },
    ],
  },

  // ── 2: Recipe ────────────────────────────────────────────────────────────────
  {
    slug: "komodo-gold-marinade",
    title: "The Perfect Komodo Gold Marinade",
    excerpt:
      "This 7-ingredient marinade uses Komodo Gold to build layers of sweet heat, citrus, and umami that work on chicken, shrimp, tofu — everything.",
    publishedAt: "2026-01-28",
    readingTime: 5,
    heatLevel: 2,
    kind: "recipe",
    tags: ["recipe", "marinade", "grilling"],
    blocks: [
      {
        kind: "paragraph",
        text: "Komodo Gold's bright, tangy heat profile makes it a natural base for marinades. The fruit-forward spice balances perfectly with soy sauce and ginger, and a touch of brown sugar builds caramelization on the grill. This recipe works on everything from chicken thighs to shrimp to extra-firm tofu.",
      },
      {
        kind: "recipe",
        data: {
          servings: 4,
          prepTime: "10 min",
          cookTime: "20 min",
          ingredients: [
            { amount: 3, unit: "tbsp", item: "Komodo Gold hot sauce" },
            { amount: 3, unit: "tbsp", item: "soy sauce (or tamari for GF)" },
            { amount: 2, unit: "tbsp", item: "fresh lime juice (about 1 lime)" },
            { amount: 1, unit: "tbsp", item: "brown sugar, packed" },
            { amount: 2, unit: "cloves", item: "garlic, minced" },
            { amount: 1, unit: "tsp", item: "fresh ginger, grated" },
            { amount: 2, unit: "tbsp", item: "olive oil" },
            { amount: 1.5, unit: "lbs", item: "protein of choice" },
          ],
          steps: [
            "Whisk together Komodo Gold, soy sauce, lime juice, and brown sugar in a bowl until the sugar dissolves.",
            "Add garlic, ginger, and olive oil. Whisk until fully combined.",
            "Add your protein to a zip-lock bag or shallow dish and pour the marinade over. Coat evenly.",
            "Marinate in the refrigerator for at least 30 minutes — up to 4 hours for deeper flavor.",
            "Remove from marinade and cook as desired: grill over medium-high heat, pan-sear, or bake at 400°F until cooked through.",
            "Reserve a few tablespoons of unused marinade before adding protein. Brush over the cooked protein as a glaze right before serving.",
          ],
        },
      },
      {
        kind: "paragraph",
        text: "The marinade keeps in the fridge (before adding raw protein) for up to a week. Scale it up, bottle it, and keep it on hand — once it's in your fridge, you'll find reasons to use it daily.",
      },
    ],
  },

  // ── 3: Story / Timeline ──────────────────────────────────────────────────────
  {
    slug: "journey-indonesia-to-your-table",
    title: "Our Journey From Indonesia to Your Table",
    excerpt:
      "Four generations, three continents, and one unbreakable family recipe. The untold story behind every bottle of Komodo Sauces.",
    publishedAt: "2026-02-10",
    readingTime: 6,
    heatLevel: 1,
    kind: "story",
    tags: ["heritage", "brand story", "purpose"],
    blocks: [
      {
        kind: "paragraph",
        text: "Every bottle of Komodo Sauces carries a story most people will never know just by reading the label. It's a story that starts in 1918 on a Dutch merchant vessel and ends on dinner tables across Atlanta, Georgia. Here is the full version.",
      },
      {
        kind: "timeline",
        entries: [
          {
            era: "1918 — Java, Indonesia",
            text: "Our great grandmother was lured onto a Dutch merchant vessel as a victim of human trafficking. Whatever she experienced on that journey, she carried it in silence — but she arrived in Suriname, South America, with her identity and her recipes intact.",
          },
          {
            era: "Suriname — Earning Freedom",
            text: "After time spent as an indentured servant, she earned her freedom. With it, she preserved a piece of home: three sauces made by hand from Indonesian tradition. Two were sweet and spicy. One was straight heat. She made them the same way every time.",
          },
          {
            era: "Generations Passed",
            text: "The only way the family could get the sauces was when Grandma brought them in her carry-on from Suriname. As the family grew and spread, we started learning to make them ourselves. They became the centerpiece of every family gathering — a thread connecting us across oceans.",
          },
          {
            era: "Atlanta, Georgia — A New Chapter",
            text: "From Java to Suriname to the United States. From indentured servant to immigrant to US citizen. Our heritage traveled across three continents and four generations to land here — in kitchens, at cookouts, at family tables.",
          },
          {
            era: "Komodo Sauces — Sharing the Fire",
            text: "We named the company Komodo Sauces because Komodo Island in Indonesia is home to the Komodo Dragon — fierce, ancient, and one of a kind. Our sauces are hot and fiery. They are also from Indonesia. So are Komodo Dragons. It felt right.",
          },
        ],
      },
      {
        kind: "heading",
        level: 2,
        text: "The Mission Behind the Bottle",
      },
      {
        kind: "paragraph",
        text: "Because of where our story begins, Komodo Sauces is committed to fighting modern-day slavery and human trafficking. With each bottle purchased, a portion goes toward anti-human trafficking organizations. We're not just selling hot sauce. We're continuing a fight our great grandmother never chose but survived.",
      },
    ],
  },

  // ── 4: Quiz ──────────────────────────────────────────────────────────────────
  {
    slug: "which-komodo-sauce-are-you",
    title: "Heat Guide: Which Komodo Sauce Is Right For You?",
    excerpt:
      "Mild and sweet? Savory bold? Or fruity with a slow burn? Answer 3 questions and find your perfect Komodo match.",
    publishedAt: "2026-02-20",
    readingTime: 3,
    heatLevel: 4,
    kind: "quiz",
    tags: ["quiz", "fun", "guide"],
    blocks: [
      {
        kind: "paragraph",
        text: "Three sauces. Infinite personality. Komodo Black, Red, and Gold each have a distinct character — and one of them is definitely yours. Answer three quick questions and we'll show you which one.",
      },
      {
        kind: "quiz",
        questions: [
          {
            id: "heat",
            question: "How do you feel about spice?",
            options: [
              { label: "I like a little warmth, nothing wild", value: "black" },
              { label: "Bring the heat — I want to feel it", value: "red" },
              { label: "Sweet first, then a slow burn", value: "gold" },
            ],
          },
          {
            id: "meal",
            question: "What's your go-to comfort food?",
            options: [
              { label: "Ribs, brisket, or anything BBQ", value: "black" },
              { label: "Wings, tacos, or stir fry", value: "red" },
              { label: "Grilled fish, chicken, or a fresh bowl", value: "gold" },
            ],
          },
          {
            id: "vibe",
            question: "Pick your sauce personality:",
            options: [
              { label: "Smooth operator — complex but chill", value: "black" },
              { label: "No-nonsense — bold and direct", value: "red" },
              { label: "Life of the party — bright and surprising", value: "gold" },
            ],
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Not sure after the quiz? Try all three with our variety pack — real Komodo fans keep one of each in the fridge.",
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 2): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, count);
}
