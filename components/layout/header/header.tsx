// components/layout/header/header.tsx (Server)
import { withLocale, type Locale } from "@/lib/locale-path";
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
};

type LifestyleNavChild = {
  id: LifestyleKey;
  href: string;
};

const lifestyleIdToTaxonomyKey = {
  families: "families",
  nomads: "nomads",
  golden: "golden",
  golf: "golf",
  secondHome: "sea",
  investment: "investment",
} as const satisfies Record<LifestyleKey, string>;

function isLifestyleNavChild(child: NavChild): child is LifestyleNavChild {
  return Object.prototype.hasOwnProperty.call(
    lifestyleIdToTaxonomyKey,
    child.id
  );
}

export default async function Header({ locale }: HeaderProps) {
  const nav = await getTranslations({ locale, namespace: "navigation" });
  const tax = await getTranslations({ locale, namespace: "taxonomy" });

  const forYou = mainNavigation.left.find(i => i.id === "forYou");
  const forYouChildren = (forYou?.children ?? []) as NavChild[];

  const dropdownForYou = forYouChildren
    .filter(isLifestyleNavChild)
    .map(child => {
      const taxKey = lifestyleIdToTaxonomyKey[child.id];

      return {
        key: child.id,
        title: tax(`categoryLifestyle.${taxKey}.title`),
        desc: tax(`categoryLifestyle.${taxKey}.desc`),
        path: child.href, // already "live-your-way/..."
      };
    });

  return (
    <HeaderClient
      locale={locale as Locale}
      labels={{
        brand: nav("header.brand"),
        home: nav("header.nav.home"),
        forYou: nav("header.nav.forYou"),
        properties: nav("header.nav.properties"),
        guides: nav("header.nav.guides"),
        ourWay: nav("header.nav.ourWay"),
        method: nav("header.actions.method"),
        talk: nav("header.actions.talk"),

        openMenu: nav("header.a11y.openMenu"),
        closeMenu: nav("header.a11y.closeMenu"),
        homeAria: nav("header.a11y.homeAria"),
      }}
      dropdownForYou={dropdownForYou}
      dropdownProperties={[
        {
          key: "sale",
          title: nav("header.dropdown.properties.sale.title"),
          desc: nav("header.dropdown.properties.sale.desc"),
          href: `${withLocale(locale as Locale, "properties")}?type=sale`,
        },
        {
          key: "rent",
          title: nav("header.dropdown.properties.rent.title"),
          desc: nav("header.dropdown.properties.rent.desc"),
          href: `${withLocale(locale as Locale, "properties")}?type=rent`,
        },
        {
          key: "sell",
          title: nav("header.dropdown.properties.sell.title"),
          desc: nav("header.dropdown.properties.sell.desc"),
          href: withLocale(locale as Locale, "sell"),
        },
      ]}
    />
  );
}
