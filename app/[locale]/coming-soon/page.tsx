//app/[locale]/coming-soon/page.tsx

import type { Locale } from "@/lib/locale-path";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const t = await getTranslations({
    locale: (await params).locale,
    namespace: "comingSoon",
  });

  // Helper to clean phone number for links
  const cleanPhone = (phone: string) =>
    phone.replace(/\s+/g, "").replace(/[^0-9+]/g, "");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-white">
      {/* 1. Main Icon (Dog Builder) */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-6">
        <Image
          src="/coming-soon-icon.png"
          alt="Coming Soon"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* 2. Headings */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-[#40120A] mb-3 font-bold">
          {t("title")}
        </h1>
        <p className="text-[#EF651A] text-lg md:text-xl font-medium">
          {t("subtitle")}
        </p>
      </div>

      {/* 3. Contact Card */}
      <div className="w-full max-w-[800px] bg-[#F9F5F2] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-sm">
        {/* Left Side: Logo */}
        <div className="flex flex-col items-center justify-center md:w-5/12 text-center border-b md:border-b-0 md:border-r border-gray-200 pb-8 md:pb-0 md:pr-12 border-dashed md:border-solid">
          <div className="relative w-40 h-32 mb-2">
            <Image
              src="/coming-soon-logo.png"
              alt="iHome Logo"
              fill
              className="object-contain"
            />
          </div>
          {/* Legal Name (Small text below logo) */}
          <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">
            {t("legal")}
          </span>
        </div>

        {/* Right Side: Contacts */}
        <div className="flex flex-col gap-8 md:w-7/12 text-center md:text-left w-full">
          <div>
            <h3 className="text-[#40120A] font-semibold text-lg mb-4">
              {t("contactBox.title")}
            </h3>
          </div>

          <div className="flex flex-col gap-6">
            {/* Contact 1: Nataliya */}
            <div className="space-y-1">
              <p className="font-bold text-[#40120A] text-lg">
                {t("contactBox.nataliya.name")}
              </p>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${t("contactBox.nataliya.phone")}`}
                    className="hover:text-[#EF651A] transition-colors flex items-center gap-2"
                  >
                    <span className="text-sm">
                      {t("contactBox.nataliya.phone")}
                    </span>
                  </a>
                  {/* Messengers Icons (File Based) */}
                  <div className="flex gap-2 items-center">
                    <a
                      href={`https://wa.me/${cleanPhone(t("contactBox.nataliya.phone"))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity relative w-3.5 h-3.5"
                    >
                      <Image
                        src="/whatsapp-icon-c.svg"
                        alt="WhatsApp"
                        fill
                        className="object-contain"
                      />
                    </a>
                    <a
                      href={`https://t.me/+${cleanPhone(t("contactBox.nataliya.phone"))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity relative w-3 h-3"
                    >
                      <Image
                        src="/tg-icon-c.svg"
                        alt="Telegram"
                        fill
                        className="object-contain"
                      />
                    </a>
                    <a
                      href={`tel:${cleanPhone(t("contactBox.nataliya.phone"))}`}
                      className="hover:opacity-80 transition-opacity relative w-3 h-3"
                    >
                      <Image
                        src="/phone-icon-c.svg"
                        alt="Phone"
                        fill
                        className="object-contain"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <a
                href={`mailto:${t("contactBox.nataliya.email")}`}
                className="text-sm text-gray-500 hover:text-[#EF651A] transition-colors block"
              >
                {t("contactBox.nataliya.email")}
              </a>
            </div>

            {/* Contact 2: Emilia */}
            <div className="space-y-1">
              <p className="font-bold text-[#40120A] text-lg">
                {t("contactBox.emilia.name")}
              </p>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${t("contactBox.emilia.phone")}`}
                    className="hover:text-[#EF651A] transition-colors flex items-center gap-2"
                  >
                    <span className="text-sm">
                      {t("contactBox.emilia.phone")}
                    </span>
                  </a>
                  {/* Messengers Icons (File Based) */}
                  <div className="flex gap-2 items-center">
                    <a
                      href={`https://wa.me/${cleanPhone(t("contactBox.emilia.phone"))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity relative w-3.5 h-3.5"
                    >
                      <Image
                        src="/whatsapp-icon-c.svg"
                        alt="WhatsApp"
                        fill
                        className="object-contain"
                      />
                    </a>
                    <a
                      href={`https://t.me/+${cleanPhone(t("contactBox.emilia.phone"))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity relative w-3 h-3"
                    >
                      <Image
                        src="/tg-icon-c.svg"
                        alt="Telegram"
                        fill
                        className="object-contain"
                      />
                    </a>
                    <a
                      href={`tel:${cleanPhone(t("contactBox.emilia.phone"))}`}
                      className="hover:opacity-80 transition-opacity relative w-3 h-3"
                    >
                      <Image
                        src="/phone-icon-c.svg"
                        alt="Phone"
                        fill
                        className="object-contain"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <a
                href={`mailto:${t("contactBox.emilia.email")}`}
                className="text-sm text-gray-500 hover:text-[#EF651A] transition-colors block"
              >
                {t("contactBox.emilia.email")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
