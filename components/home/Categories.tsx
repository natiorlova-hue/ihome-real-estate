import { categories as categoriesData } from "@/lib/categories";
import Card from "../Card";
import GridContainer from "../GridContainer";

export default function Categories({ locale }: { locale: string }) {
  return (
    <div className="py-8 md:py-16">
      <div className="container">
        <div className="flex flex-col gap-6 items-center text-center mb-12 md:mb-16">
          <h2>Live your way on the Costa del Sol.</h2>
          <p className="text-tertiary-600 max-w-[640px]">
            Very lifestyle has its perfect place. Choose yours — and we’ll show
            you the neighborhoods, stories, and homes that fit.
          </p>
        </div>

        <GridContainer>
          {categoriesData.map(item => {
            return (
              <Card
                key={item.path}
                title={item.name}
                subtitle={item.subtitle}
                link={`/${locale}/${item.path}`}
                image={`${item.image}`}
              />
            );
          })}
        </GridContainer>
      </div>
    </div>
  );
}
