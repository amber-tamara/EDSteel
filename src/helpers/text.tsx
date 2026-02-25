export const fromSlugToName = (slug: string) =>
  slug
    .replace(/-/g, " ")
    .replace(/\b\w/, (c) => c.toUpperCase());

// 2️⃣ Replace "and" with "&" safely
export const andToAmpersand = (text: string) =>
  text.replace(/\band\b/g, "&");