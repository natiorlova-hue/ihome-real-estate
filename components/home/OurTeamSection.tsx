// components/home/OurTeamSection.tsx
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
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
        <Reveal delay="delay-800">
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
        </Reveal>
        <RevealGroup threshold={0.2}>
          <ul
            className={[
              "mt-10 flex flex-col gap-12 md:mt-14 md:flex-row md:flex-wrap md:justify-center",
              // base hidden for direct li children
              "[&>li]:opacity-0 [&>li]:translate-y-3 [&>li]:will-change-transform",
              // reveal li
              "[[data-reveal=on]_&]:[&>li]:animate-slideUp",
              "[[data-reveal=on]_&]:[&>li]:[animation-fill-mode:both]",
              "motion-reduce:[&>li]:opacity-100 motion-reduce:[&>li]:translate-y-0 motion-reduce:[&>li]:animate-none",

              // MOBILE (stack): 1..6
              "[[data-reveal=on]_&]:[&>li:nth-child(1)]:delay-0",
              "[[data-reveal=on]_&]:[&>li:nth-child(2)]:delay-150",
              "[[data-reveal=on]_&]:[&>li:nth-child(3)]:delay-300",
              "[[data-reveal=on]_&]:[&>li:nth-child(4)]:delay-450",
              "[[data-reveal=on]_&]:[&>li:nth-child(5)]:delay-600",
              "[[data-reveal=on]_&]:[&>li:nth-child(6)]:delay-750",

              // MD (2 cols-ish wrap): left -> right wave
              "md:[[data-reveal=on]_&]:[&>li:nth-child(odd)]:delay-0",
              "md:[[data-reveal=on]_&]:[&>li:nth-child(even)]:delay-200",

              // LG (3 cols): left -> middle -> right wave
              "lg:[[data-reveal=on]_&]:[&>li:nth-child(3n+1)]:delay-0",
              "lg:[[data-reveal=on]_&]:[&>li:nth-child(3n+2)]:delay-200",
              "lg:[[data-reveal=on]_&]:[&>li:nth-child(3n+3)]:delay-400",
            ].join(" ")}
            role="list"
          >
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
        </RevealGroup>
      </div>
    </Section>
  );
}
