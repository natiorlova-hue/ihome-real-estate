// lib/navigation.ts

export type NavItem = {
  id: string;
  href: string;
  status?: "active" | "comingSoon";
  hasMegaMenu?: boolean;
  children?: NavItem[];
};

export const mainNavigation: {
  left: NavItem[];
  right: NavItem[];
} = {
  left: [
    { id: "home", href: "", status: "active" },

    {
      id: "forYou",
      href: "live-your-way",
      hasMegaMenu: true,
      status: "active",
      children: [
        {
          id: "families",
          href: "live-your-way/families",
          status: "active",
        },
        { id: "nomads", href: "live-your-way/nomads", status: "active" },
        { id: "golden", href: "live-your-way/golden", status: "active" },
        { id: "golf", href: "live-your-way/golf", status: "active" },
        {
          id: "sea",
          href: "live-your-way/second-home",
          status: "active",
        },
        {
          id: "investment",
          href: "live-your-way/investment",
          status: "active",
        },
      ],
    },

    {
      id: "properties",
      href: "properties",
      hasMegaMenu: true,
      status: "active",
    },

    {
      id: "services",
      href: "services",
      status: "active",
    },
  ],

  right: [
    { id: "guides", href: "blog", status: "active" },
    { id: "ourWay", href: "our-way", status: "active" },
  ],
};

export const footerNavigation = {
  navigation: [
    { name: "home", href: "", status: "active" },
    { name: "forYou", href: "live-your-way", status: "active" },
    { name: "properties", href: "properties", status: "active" },
    { name: "services", href: "services", status: "active" },
    { name: "guides", href: "blog", status: "active" },
    { name: "ourWay", href: "our-way", status: "active" },
  ],
  legal: [
    { name: "privacy", href: "privacy-policy", status: "comingSoon" },
    { name: "cookies", href: "cookie-policy", status: "comingSoon" },
    { name: "terms", href: "terms-conditions", status: "comingSoon" },
    { name: "sitemap", href: "sitemap.xml", status: "comingSoon" },
  ],
};
