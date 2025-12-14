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
          status: "comingSoon",
        },
        { id: "nomads", href: "live-your-way/nomads", status: "comingSoon" },
        { id: "golden", href: "live-your-way/golden", status: "comingSoon" },
        { id: "golf", href: "live-your-way/golf", status: "comingSoon" },
        {
          id: "sea",
          href: "live-your-way/second-home",
          status: "comingSoon",
        },
        {
          id: "investment",
          href: "live-your-way/investment",
          status: "comingSoon",
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
      status: "comingSoon",
    },
  ],

  right: [
    { id: "guides", href: "guides", status: "comingSoon" },
    { id: "ourWay", href: "our-way", status: "comingSoon" },
  ],
};

export const footerNavigation = {
  navigation: [
    { name: "home", href: "", status: "active" },
    { name: "forYou", href: "live-your-way", status: "active" },
    { name: "properties", href: "properties", status: "active" },
    { name: "services", href: "services", status: "comingSoon" },
    { name: "guides", href: "guides", status: "comingSoon" },
    { name: "ourWay", href: "our-way", status: "comingSoon" },
  ],
  legal: [
    { name: "privacy", href: "privacy-policy", status: "comingSoon" },
    { name: "cookies", href: "cookie-policy", status: "comingSoon" },
    { name: "terms", href: "terms-conditions", status: "comingSoon" },
    { name: "sitemap", href: "sitemap.xml", status: "comingSoon" },
  ],
};
