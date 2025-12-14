import { getTranslations } from "next-intl/server";
import Image from "next/image";

// Inline SVG for WhatsApp
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382C17.112 14.202 15.344 13.332 15.016 13.222C14.687 13.112 14.447 13.057 14.207 13.418C13.967 13.778 13.28 14.588 13.07 14.828C12.86 15.068 12.65 15.098 12.29 14.918C11.93 14.738 10.769 14.358 9.393 13.132C8.303 12.161 7.568 10.962 7.358 10.602C7.148 10.242 7.336 10.048 7.516 9.869C7.677 9.709 7.873 9.452 8.053 9.242C8.233 9.033 8.293 8.883 8.413 8.643C8.533 8.403 8.473 8.193 8.383 8.013C8.293 7.833 7.573 6.063 7.273 5.343C6.982 4.642 6.686 4.738 6.471 4.728C6.269 4.719 6.039 4.719 5.809 4.719C5.579 4.719 5.208 4.805 4.898 5.145C4.588 5.485 3.708 6.305 3.708 7.975C3.708 9.645 4.898 11.255 5.068 11.485C5.238 11.715 7.429 15.093 10.784 16.543C11.582 16.888 12.205 17.094 12.693 17.249C13.565 17.525 14.359 17.485 14.985 17.391C15.681 17.287 17.112 16.523 17.412 15.683C17.712 14.843 17.712 14.123 17.622 13.973C17.532 13.823 17.292 13.733 16.932 13.553H17.472V14.382Z" />
    <path d="M12.005 0C5.39 0 0.005 5.385 0.005 12C0.005 14.113 0.553 16.124 1.528 17.896L0 23.473L5.706 21.977C7.382 22.891 9.293 23.371 11.265 23.371H11.27C17.882 23.371 23.265 17.986 23.265 11.371C23.265 8.334 22.083 5.481 19.935 3.334C17.788 1.186 14.933 0.003 11.888 0.003L12.005 0ZM11.27 21.411C9.489 21.411 7.747 20.932 6.223 20.028L5.861 19.813L2.091 20.801L3.097 17.127L2.862 16.753C1.886 15.203 1.371 13.409 1.371 11.559C1.371 6.095 5.812 1.654 11.275 1.654C13.919 1.654 16.404 2.684 18.273 4.554C20.143 6.423 21.171 8.908 21.171 11.553C21.171 17.017 16.73 21.458 11.267 21.458L11.27 21.411Z" />
  </svg>
);

// Inline SVG for Telegram
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.944 0C5.367 0 0 5.367 0 11.944C0 18.521 5.367 23.888 11.944 23.888C18.521 23.888 23.888 18.521 23.888 11.944C23.888 5.367 18.521 0 11.944 0ZM17.682 8.165L15.656 17.712C15.503 18.397 15.097 18.567 14.524 18.246L11.439 15.972L9.951 17.406C9.786 17.571 9.648 17.709 9.277 17.709L9.498 14.568L15.215 9.402C15.463 9.179 15.16 9.055 14.829 9.277L7.761 13.727L4.717 12.774C4.056 12.567 4.043 12.112 4.854 11.794L16.757 7.21C17.308 7.013 17.791 7.342 17.682 8.165Z" />
  </svg>
);

// Inline SVG for Phone (Filled)
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.27 17.26C10.44 15.82 8.12 13.5 6.68 10.67L8.88 8.47C9.15 8.2 9.24 7.81 9.12 7.46C8.76 6.35 8.56 5.16 8.56 3.93C8.56 3.38 8.11 2.93 7.56 2.93H4.18C3.63 2.93 3.18 3.38 3.18 3.93C3.18 13.48 11.13 21.43 20.68 21.43C21.23 21.43 21.68 20.98 21.68 20.43V17.05C21.68 16.5 21.23 16.05 20.68 16.05H20.01V15.38Z" />
  </svg>
);

export default async function ComingSoonPage({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale: params.locale,
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
