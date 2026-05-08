export const fromSlugToName = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/, (c) => c.toUpperCase());

export const andToAmpersand = (text: string) => text.replace(/\band\b/g, '&');
