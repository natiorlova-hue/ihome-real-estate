import { type Locale } from "@/lib/locale-path";
import { mainNavigation } from "@/lib/navigation";
import { getTranslations } from "next-intl/server";
import HeaderClient from "./HeaderClient";

interface HeaderProps {
  locale: string;
}

type LifestyleKey =
  | "families"
  | "nomads"
  | "golden"
  | "golf"
  | "secondHome"
  | "investment";

type NavChild = {
  id: string;
  href: string;
  status?: string; // Додаємо статус
};

type LifestyleNavChild = {
  id: LifestyleKey;
  href: string;
  status?: string;
};

const lifestyleIdToTaxonomyKey = {
  families: "families",
  nomads: "nomads",
  golden: "golden",
  golf: "golf",
  secondHome: "secondHome", // Було "sea", але в common.json ключ "secondHome"
  investment: "investment",
} as const; // Removed 'satisfies' just to keep it simpler if types mismatch

function isLifestyleNavChild(child: NavChild): child is LifestyleNavChild {
  return Object.keys(lifestyleIdToTaxonomyKey).includes(child.id);
}

export default async function Header({ locale }: HeaderProps) {
  // Використовуємо common, бо там лежить хедер
  const tNav = await getTranslations({
    locale,
    namespace: "navigation.header",
  });
  const tTax = await getTranslations({
    locale,
    namespace: "taxonomy.categoryLifestyle",
  });

  // Якщо taxonomy.json немає, використовуємо common.header.dropdowns
  // const tax = await getTranslations({ locale, namespace: "taxonomy" });

  const forYou = mainNavigation.left.find(i => i.id === "forYou");
  const forYouChildren = (forYou?.children ?? []) as NavChild[];

  const dropdownForYou = forYouChildren
    .filter(isLifestyleNavChild)
    .map(child => {
      const taxKey = lifestyleIdToTaxonomyKey[child.id];

      return {
        key: child.id,
        // Беремо переклади з common.json
        title: tTax(`${taxKey}.title`),
        desc: tTax(`${taxKey}.desc`),
        path: child.href,
        status: child.status, // Передаємо статус з navigation.ts
      };
    });

  // Отримуємо статуси для правих посилань
  const guidesNav = mainNavigation.right.find(i => i.id === "guides");
  const ourWayNav = mainNavigation.right.find(i => i.id === "ourWay");

  return (
    <HeaderClient
      locale={locale as Locale}
      labels={{
        brand: tNav("brand"),
        home: tNav("nav.home"),
        forYou: tNav("nav.forYou"),
        properties: tNav("nav.properties"),
        guides: tNav("nav.guides"),
        ourWay: tNav("nav.ourWay"),
        method: tNav("actions.method"),
        talk: tNav("actions.talk"),

        // Якщо цих ключів немає в common.json, додайте їх або захардкодьте тимчасово
        openMenu: "Open menu",
        closeMenu: "Close menu",
        homeAria: "Home",
      }}
      navStatuses={{
        guides: guidesNav?.status || "active",
        ourWay: ourWayNav?.status || "active",
      }}
      dropdownForYou={dropdownForYou}
      dropdownProperties={[
        {
          key: "sale",
          title: tNav("dropdown.properties.sale.title"),
          desc: tNav("dropdown.properties.sale.desc"),
          href: "properties?type=sale",
          status: "comingSoon", // Properties теж поки coming soon? Якщо ні - зміни на "active"
        },
        {
          key: "rent",
          title: tNav("dropdown.properties.rent.title"),
          desc: tNav("dropdown.properties.rent.desc"),
          href: "properties?type=rent",
          status: "comingSoon",
        },
        {
          key: "sell",
          title: tNav("dropdown.properties.sell.title"),
          desc: tNav("dropdown.properties.sell.desc"),
          href: "sell",
          status: "comingSoon",
        },
      ]}
    />
  );
}
