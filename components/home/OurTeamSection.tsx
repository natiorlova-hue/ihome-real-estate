// components/home/OurTeamSection.tsx
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import Section from "@/components/layout/Section";
import type { Locale } from "@/lib/locale-path";
import { TEAM } from "@/lib/team";

type OurTeamSectionProps = {
  locale: Locale;
};

export default async function OurTeamSection({ locale }: OurTeamSectionProps) {
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <Section ariaLabelledby="team-heading" className="py-10 md:py-16">
      <div className="mx-auto max-w-[1192px]">
        <header className="text-center">
          <h2
            id="team-heading"
            className="font-serif text-3xl text-gray-900 md:text-5xl"
          >
            {t("team.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-600 md:text-base">
            {t("team.subtitle")}
          </p>
        </header>

        <ul className="mt-10 flex flex-col gap-12 md:mt-14 md:flex-row md:flex-wrap md:justify-center">
          {TEAM.map(member => (
            <li key={member.nameKey} className="text-center">
              <div className="mx-auto w-[140px] overflow-hidden rounded-[999px] md:w-[160px]">
                <Image
                  src={member.imageSrc}
                  alt={t(member.nameKey)}
                  width={320}
                  height={420}
                  sizes="(min-width: 1024px) 160px, 140px"
                  className="h-auto w-full object-cover"
                />
              </div>

              <h3 className="mt-6 font-serif text-xl text-gray-900 md:text-2xl">
                {t(member.nameKey)}
              </h3>

              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-terracotta-600">
                {t(member.roleKey)}
              </p>

              <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-gray-600">
                {t(member.bioKey)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
