// header.tsx (Server)
import { getTranslations } from "next-intl/server";
import HeaderClient from "./HeaderClient";

interface HeaderProps {
  locale: string;
}

export default async function Header({ locale }: HeaderProps) {
  const nav = await getTranslations({ locale, namespace: "navigation" });
  const tax = await getTranslations({ locale, namespace: "taxonomy" });

  const items = [
    {
      key: "families",
      title: tax("categoryLifestyle.families.title"),
      desc: tax("categoryLifestyle.families.desc"),
      path: "families",
    },
    {
      key: "nomads",
      title: tax("categoryLifestyle.nomads.title"),
      desc: tax("categoryLifestyle.nomads.desc"),
      path: "nomads",
    },
    {
      key: "golf",
      title: tax("categoryLifestyle.golf.title"),
      desc: tax("categoryLifestyle.golf.desc"),
      path: "golf",
    },
    {
      key: "golden",
      title: tax("categoryLifestyle.golden.title"),
      desc: tax("categoryLifestyle.golden.desc"),
      path: "golden-years",
    },
    {
      key: "sea",
      title: tax("categoryLifestyle.sea.title"),
      desc: tax("categoryLifestyle.sea.desc"),
      path: "second-home",
    },
    {
      key: "investment",
      title: tax("categoryLifestyle.investment.title"),
      desc: tax("categoryLifestyle.investment.desc"),
      path: "investment",
    },
  ];

  return (
    <HeaderClient
      locale={locale}
      labels={{
        brand: nav("header.brand"),
        home: nav("header.nav.home"),
        forYou: nav("header.nav.forYou"),
        properties: nav("header.nav.properties"),
        guides: nav("header.nav.guides"),
        ourWay: nav("header.nav.ourWay"),
        method: nav("header.actions.method"),
        talk: nav("header.actions.talk"),
      }}
      dropdownForYou={items}
      dropdownProperties={[
        {
          key: "sale",
          title: nav("header.dropdown.properties.sale.title"),
          desc: nav("header.dropdown.properties.sale.desc"),
          href: `/${locale}/properties?type=sale`,
        },
        {
          key: "rent",
          title: nav("header.dropdown.properties.rent.title"),
          desc: nav("header.dropdown.properties.rent.desc"),
          href: `/${locale}/properties?type=rent`,
        },
        {
          key: "sell",
          title: nav("header.dropdown.properties.sell.title"),
          desc: nav("header.dropdown.properties.sell.desc"),
          href: `/${locale}/sell`,
        },
      ]}
    />
  );
}
