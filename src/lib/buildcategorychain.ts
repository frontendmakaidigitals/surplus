import { Category } from "./types";

type CategoryChain = {
  id: number;
  name: string;
  slug: string;
  subcategories?: CategoryChain[];
};

export function buildCategoryChain(
  category: Category | Category[],
  targetId?: number
): CategoryChain[] {
  const categories = Array.isArray(category) ? category : [category];

  // Case 1: targetId provided → return chain from top → target
  if (targetId !== undefined) {
    for (const cat of categories) {
      const currentPath: CategoryChain[] = [
        { id: cat.id, name: cat.name, slug: cat.slug },
      ];

      if (cat.id === targetId) {
        return currentPath;
      }

      if (cat.subcategories?.length) {
        const result = buildCategoryChain(cat.subcategories, targetId);
        if (result.length) {
          return [...currentPath, ...result];
        }
      }
    }

    return []; // not found → return empty array
  }

  // Case 2: targetId not provided → return all subcategories
  const allSubs: CategoryChain[] = [];
  for (const cat of categories) {
    if (cat.subcategories?.length) {
      allSubs.push(
        ...cat.subcategories.map((sub) => ({
          id: sub.id,
          name: sub.name,
          slug: sub.slug,
          subcategories: sub.subcategories?.length
            ? buildCategoryChain(sub.subcategories)
            : [], // empty array if no subcategories
        }))
      );
    }
  }

  return allSubs;
}
