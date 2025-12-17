import type { LifestyleKey } from "./lifestyle";

/**
 * Domain key → taxonomy key (translations)
 * ⚠️ Translation keys НЕ міняємо
 */
export const lifestyleToTaxonomyKey: Record<LifestyleKey, string> = {
  families: "families",
  nomads: "nomads",
  golf: "golf",
  golden: "golden",
  secondHome: "sea", // ← МАГІЯ ТУТ
  investment: "investment",
};
