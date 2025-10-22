// lib/navigation.ts
export const mainNavigation = {
  left: [
    { id: "home", href: "" },
    {
      id: "forYou",
      href: "live-your-way",
      hasMegaMenu: true,
      children: [
        { id: "families", href: "live-your-way/families" },
        { id: "nomads", href: "live-your-way/nomads" },
        { id: "golden", href: "live-your-way/golden" },
        { id: "golf", href: "live-your-way/golf" },
        { id: "secondHome", href: "live-your-way/second-home" },
        { id: "investment", href: "live-your-way/investment" },
      ],
    },
    {
      id: "properties",
      href: "properties",
      hasMegaMenu: true,
    },
    { id: "services", href: "services" },
  ],
  right: [
    { id: "guides", href: "guides" },
    { id: "ourWay", href: "our-way" },
  ],
}

export const footerNavigation = {
  navigation: [
    { name: "home", href: "" },
    { name: "forYou", href: "live-your-way" },
    { name: "properties", href: "properties" },
    { name: "services", href: "services" },
    { name: "guides", href: "guides" },
    { name: "ourWay", href: "our-way" },
  ],
  legal: [
    { name: "privacy", href: "privacy-policy" },
    { name: "cookies", href: "cookie-policy" },
    { name: "terms", href: "terms-conditions" },
    { name: "sitemap", href: "sitemap.xml" },
  ],
}
