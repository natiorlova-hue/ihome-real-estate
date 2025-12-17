//lib/quiz.ts

export type QuizStepId =
  | "aboutYou"
  | "propertyType"
  | "bedrooms"
  | "budget"
  | "priorities"
  | "contact";

export type QuizOption = {
  id: string;
  labelKey: string;
};

export type QuizStep =
  | {
      id: Exclude<QuizStepId, "contact">;
      titleKey: string;
      subtitleKey?: string;
      type: "single";
      options: QuizOption[];
    }
  | {
      id: "contact";
      titleKey: string;
      subtitleKey?: string;
      type: "contact";
    };

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: "aboutYou",
    type: "single",
    titleKey: "steps.aboutYou.title",
    subtitleKey: "steps.aboutYou.subtitle",
    options: [
      { id: "familyMove", labelKey: "steps.aboutYou.options.familyMove" },
      {
        id: "secondHomeSea",
        labelKey: "steps.aboutYou.options.secondHomeSea",
      },
      {
        id: "retirement",
        labelKey: "steps.aboutYou.options.retirement",
      },
      { id: "remoteWork", labelKey: "steps.aboutYou.options.remoteWork" },
      {
        id: "investmentBrowsing",
        labelKey: "steps.aboutYou.options.investmentBrowsing",
      },
      { id: "loveSpain", labelKey: "steps.aboutYou.options.loveSpain" },
    ],
  },
  {
    id: "propertyType",
    type: "single",
    titleKey: "steps.propertyType.title",
    options: [
      {
        id: "apartmentCommunity",
        labelKey: "steps.propertyType.options.apartmentCommunity",
      },
      {
        id: "townhouse",
        labelKey: "steps.propertyType.options.townhouse",
      },
      { id: "villa", labelKey: "steps.propertyType.options.villa" },
      { id: "notSure", labelKey: "steps.propertyType.options.notSure" },
    ],
  },
  {
    id: "bedrooms",
    type: "single",
    titleKey: "steps.bedrooms.title",
    options: [
      { id: "one", labelKey: "steps.bedrooms.options.one" },
      { id: "twoThree", labelKey: "steps.bedrooms.options.twoThree" },
      { id: "fourPlus", labelKey: "steps.bedrooms.options.fourPlus" },
      { id: "range", labelKey: "steps.bedrooms.options.range" },
    ],
  },
  {
    id: "budget",
    type: "single",
    titleKey: "steps.budget.title",
    options: [
      { id: "0-400", labelKey: "steps.budget.options.0-400" },
      { id: "400-650", labelKey: "steps.budget.options.400-650" },
      { id: "650-1000", labelKey: "steps.budget.options.650-1000" },
      { id: "1000-1500", labelKey: "steps.budget.options.1000-1500" },
      { id: "1500plus", labelKey: "steps.budget.options.1500plus" },
      { id: "browsing", labelKey: "steps.budget.options.browsing" },
    ],
  },
  {
    id: "priorities",
    type: "single",
    titleKey: "steps.priorities.title",
    options: [
      { id: "seaView", labelKey: "steps.priorities.options.seaView" },
      { id: "mountainView", labelKey: "steps.priorities.options.mountainView" },
      { id: "terrace", labelKey: "steps.priorities.options.terrace" },
      { id: "walkable", labelKey: "steps.priorities.options.walkable" },
      { id: "school", labelKey: "steps.priorities.options.school" },
      {
        id: "communityAmenities",
        labelKey: "steps.priorities.options.communityAmenities",
      },
      {
        id: "detached",
        labelKey: "steps.priorities.options.detached",
      },
      { id: "calm", labelKey: "steps.priorities.options.calm" },
      {
        id: "petFriendly",
        labelKey: "steps.priorities.options.petFriendly",
      },
      { id: "nature", labelKey: "steps.priorities.options.nature" },
      { id: "inspire", labelKey: "steps.priorities.options.inspire" },
    ],
  },
  {
    id: "contact",
    type: "contact",
    titleKey: "steps.contact.title",
    subtitleKey: "steps.contact.subtitle",
  },
];
