import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HeroVisualSection() {
  const t = useTranslations("home");

  return (
    <div className="container">
      <div className="relative w-full h-96">
        <Image
          src="/hero-image.jpg"
          alt={t("hero.imageAlt")}
          layout="fill"
          objectFit="cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
