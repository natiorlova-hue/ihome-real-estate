import { type Locale } from "@/lib/locale-path";
import { mainNavigation } from "@/lib/navigation";
import { getTranslations } from "next-intl/server";
import HeaderClient, { type DropdownStatus } from "./HeaderClient";

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
  status?: DropdownStatus; // ✅ було string
};

type LifestyleNavChild = {
  id: LifestyleKey;
  href: string;
  status?: DropdownStatus;
};

const lifestyleIdToTaxonomyKey = {
  families: "families",
  nomads: "nomads",
  golden: "golden",
  golf: "golf",
  secondHome: "secondHome",
  investment: "investment",
} as const;

function isLifestyleNavChild(child: NavChild): child is LifestyleNavChild {
  return Object.keys(lifestyleIdToTaxonomyKey).includes(child.id);
}

export default async function Header({ locale }: HeaderProps) {
  const tNav = await getTranslations({
    locale,
    namespace: "navigation.header",
  });

  const tTax = await getTranslations({
    locale,
    namespace: "taxonomy.categoryLifestyle",
  });

  const forYou = mainNavigation.left.find(i => i.id === "forYou");
  const forYouChildren = (forYou?.children ?? []) as NavChild[];

  const dropdownForYou = forYouChildren
    .filter(isLifestyleNavChild)
    .map(child => {
      const taxKey = lifestyleIdToTaxonomyKey[child.id];

      return {
        key: child.id,
        title: tTax(`${taxKey}.title`),
        desc: tTax(`${taxKey}.desc`),
        href: child.href, // ✅ було path
        status: child.status, // ✅ тепер DropdownStatus | undefined
      };
    });

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
        services: tNav("nav.services"),
        guides: tNav("nav.guides"),
        ourWay: tNav("nav.ourWay"),
        method: tNav("actions.method"),
        talk: tNav("actions.talk"),

        openMenu: "Open menu",
        closeMenu: "Close menu",
        homeAria: "Home",
      }}
      navStatuses={{
        guides: guidesNav?.status ?? "active",
        ourWay: ourWayNav?.status ?? "active",
      }}
      dropdownForYou={dropdownForYou}
      dropdownProperties={[
        {
          key: "sale",
          title: tNav("dropdown.properties.sale.title"),
          desc: tNav("dropdown.properties.sale.desc"),
          href: "properties?type=sale",
          status: "active",
        },
        {
          key: "rent",
          title: tNav("dropdown.properties.rent.title"),
          desc: tNav("dropdown.properties.rent.desc"),
          href: "properties?type=rent",
          status: "active",
        },
        {
          key: "sell",
          title: tNav("dropdown.properties.sell.title"),
          desc: tNav("dropdown.properties.sell.desc"),
          href: "sell",
          status: "active",
        },
      ]}
    />
  );
}
