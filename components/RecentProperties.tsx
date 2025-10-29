import Card from "@/components/Card";
import GridContainer from "@/components/GridContainer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BadgeData {
  text: string;
  variant: "pink" | "yellow" | "red" | "area";
}

interface PropertyData {
  title: string;
  description: string;
  image: string;
  price: string;
  topBadge?: BadgeData;
  bottomBadge?: BadgeData;
}

const samplePropertiesData: PropertyData[] = [
  {
    title: "Marbella Hillside Villa",
    description:
      "Authentic style with historic charm and mountain views. A perfect blend of tradition and comfort in a quiet setting.",
    image: "/categories/golf.jpg",
    price: "€1,250,000",
    topBadge: {
      text: "ROI 6.3%",
      variant: "pink",
    },
    bottomBadge: {
      text: "480 m²",
      variant: "area",
    },
  },
  {
    title: "Sunset Infinity Villa",
    description:
      "Modern design with sea views and a cozy terrace. A relaxing space with poolside comfort and full privacy.",
    image: "/categories/golf.jpg",
    price: "€780,000",
    topBadge: {
      text: "New",
      variant: "yellow",
    },
    bottomBadge: {
      text: "258 m²",
      variant: "area",
    },
  },
  {
    title: "Sunset Infinity Villa 2",
    description:
      "Spacious residence with mountain panorama and private garden. Andalusian spirit combined with a touch of ...",
    image: "/categories/golf.jpg",
    price: "€2,150,000",
    topBadge: {
      text: "Featured",
      variant: "red",
    },
    bottomBadge: {
      text: "557 m²",
      variant: "area",
    },
  },
];

export default function RecentProperties({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="py-8 md:py-16">
      <div className="container">
        <div className="flex flex-col gap-6 items-center text-center mb-12 md:mb-16">
          <h2>{title}</h2>
          <p className="text-tertiary-600 max-w-[640px]">{description}</p>
        </div>

        <GridContainer>
          {samplePropertiesData.map(item => {
            return (
              <Card
                key={item.title}
                title={item.title}
                description={item.description}
                link={`/`}
                image={`${item.image}`}
                price={item.price}
                topBadge={item.topBadge}
                bottomBadge={item.bottomBadge}
                isLink={true}
              />
            );
          })}
        </GridContainer>
        <div className="flex mt-4 md:mt-8">
          <Button variant="link" className="ml-auto px-0 py-0 group">
            View All
            <ArrowRight className="text-[#A4A7AE] group-hover:text-black transition-colors duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
}
