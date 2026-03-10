//components/properties/PropertiesFilter.tsx

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FILTER_KEYS = [
  "budget",
  "beds",
  "baths",
  "location",
  "type",
  "views",
  "condition",
  "features",
  "amenities",
  "totalArea",
  "livingArea",
  "plotArea",
  "floor",
  "luxury",
];

export interface TaxonomyItem {
  id: string;
  slug: string;
  title: string;
}

interface PropertiesFilterProps {
  locations?: TaxonomyItem[];
  propertyTypes?: TaxonomyItem[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

type FilterState = Record<string, string[]>;

export default function PropertiesFilter({
  locations = [],
  propertyTypes = [],
  isOpen,
  onClose,
  className,
}: PropertiesFilterProps) {
  const t = useTranslations("properties.filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Локальний стан для відкладеного застосування фільтрів
  const [draftFilters, setDraftFilters] = useState<FilterState>({});

  // Усі ключі, які ми відслідковуємо в URL — визначено на рівні модуля (module-level constant)

  // Синхронізація з URL при відкритті дропдауну
  useEffect(() => {
    if (isOpen) {
      const currentFilters: FilterState = {};
      FILTER_KEYS.forEach(key => {
        const value = searchParams.get(key);
        if (value) currentFilters[key] = value.split(",");
      });
      setDraftFilters(currentFilters);
    }
  }, [isOpen, searchParams]);

  const toggleFilter = (key: string, value: string) => {
    setDraftFilters(prev => {
      const currentValues = prev[key] || [];
      if (value === "any") {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      }

      if (currentValues.includes(value)) {
        const newValues = currentValues.filter(v => v !== value);
        if (newValues.length === 0) {
          const newState = { ...prev };
          delete newState[key];
          return newState;
        }
        return { ...prev, [key]: newValues };
      }

      return { ...prev, [key]: [...currentValues, value] };
    });
  };

  const isChecked = (key: string, value: string) => {
    const values = draftFilters[key] || [];
    if (value === "any") return values.length === 0;
    return values.includes(value);
  };

  const handleApply = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    // Очищаємо старі фільтри
    FILTER_KEYS.forEach(key => current.delete(key));

    // Встановлюємо нові
    Object.entries(draftFilters).forEach(([key, values]) => {
      if (values.length > 0) current.set(key, values.join(","));
    });

    current.delete("page");
    router.replace(`${pathname}?${current.toString()}`, { scroll: false });
    onClose();
  };

  // --- СТАТИЧНІ ДАНІ ДЛЯ ФІЛЬТРІВ ---
  const budgets = [
    { slug: "0-500000", label: "Up to €500K" },
    { slug: "500000-1000000", label: "€500K – €1M" },
    { slug: "1000000-2000000", label: "€1M – €2M" },
    { slug: "2000000-5000000", label: "€2M – €5M" },
    { slug: "5000000-plus", label: "Over €5M" },
  ];

  const bedrooms = ["1", "2", "3", "4", "5+"];
  const bathrooms = ["1", "2", "3", "4", "5+"];

  const views = [
    { slug: "sea", label: t("views.sea", { fallback: "Вид на море" }) },
    {
      slug: "mountains",
      label: t("views.mountains", { fallback: "Вид на горы" }),
    },
    { slug: "garden", label: t("views.garden", { fallback: "Вид на сад" }) },
    { slug: "golf", label: t("views.golf", { fallback: "Вид на гольф-поля" }) },
    {
      slug: "panoramic",
      label: t("views.panoramic", { fallback: "Панорамный вид" }),
    },
  ];

  const condition = [
    { slug: "new", label: t("condition.new", { fallback: "Новое" }) },
    {
      slug: "excellent",
      label: t("condition.excellent", { fallback: "Отличное" }),
    },
    {
      slug: "renovation",
      label: t("condition.renovation", { fallback: "Требует ремонта" }),
    },
  ];

  const features = [
    { slug: "terrace", label: t("features.terrace", { fallback: "Терраса" }) },
    {
      slug: "furniture",
      label: t("features.furniture", { fallback: "Мебель" }),
    },
    {
      slug: "closet",
      label: t("features.closet", { fallback: "Гардеробная" }),
    },
    {
      slug: "storage",
      label: t("features.storage", { fallback: "Storage room" }),
    },
    {
      slug: "parking",
      label: t("features.parking", { fallback: "Парковочное место" }),
    },
    {
      slug: "smart_home",
      label: t("features.smart_home", { fallback: "Система умный дом" }),
    },
    { slug: "ac", label: t("features.ac", { fallback: "Кондиционирование" }) },
    { slug: "elevator", label: t("features.elevator", { fallback: "Лифт" }) },
  ];

  const amenities = [
    { slug: "pool", label: t("amenities.pool", { fallback: "Бассейн" }) },
    {
      slug: "indoor_pool",
      label: t("amenities.indoor_pool", { fallback: "Зимний бассейн" }),
    },
    { slug: "spa", label: t("amenities.spa", { fallback: "СПА" }) },
    { slug: "gym", label: t("amenities.gym", { fallback: "Тренажерный зал" }) },
    { slug: "padel", label: t("amenities.padel", { fallback: "Падель-корт" }) },
    {
      slug: "coworking",
      label: t("amenities.coworking", { fallback: "Co-working" }),
    },
    {
      slug: "lounge",
      label: t("amenities.lounge", { fallback: "Residents’ Lounge" }),
    },
    { slug: "bbq", label: t("amenities.bbq", { fallback: "Барбекю-зона" }) },
    {
      slug: "playground",
      label: t("amenities.playground", { fallback: "Детская площадка" }),
    },
    { slug: "garden", label: t("amenities.garden", { fallback: "Сад" }) },
    {
      slug: "security",
      label: t("amenities.security", { fallback: "Security 24/7" }),
    },
    {
      slug: "gated",
      label: t("amenities.gated", { fallback: "Gated community" }),
    },
    {
      slug: "concierge",
      label: t("amenities.concierge", { fallback: "Консьерж" }),
    },
  ];

  const areaRanges = [
    { slug: "0-100", label: "Up to 100 m²" },
    { slug: "100-250", label: "100 - 250 m²" },
    { slug: "250-500", label: "250 - 500 m²" },
    { slug: "500-plus", label: "Over 500 m²" },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-dropdown"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn(
          "absolute left-0 top-[calc(100%+0.5rem)] z-[1010] flex w-[340px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl animate-fadeIn md:w-[760px] max-h-[75vh]",
          className
        )}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-gray-100 p-5 pb-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {t("title", { fallback: "Filters" })}
              </h3>
              <p className="text-xs text-tertiary-600">
                {t("subtitle", { fallback: "Refine your search criteria." })}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content (Розділено на 2 колонки для десктопу через велику кількість фільтрів) */}
        <div className="no-scrollbar flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 gap-8">
            {/* COLUMN 1: Basic & Location */}
            <div className="space-y-8">
              {/* PROPERTY TYPE */}
              {propertyTypes.length > 0 && (
                <FilterSection
                  title={t("sections.type", { fallback: "Тип недвижимости" })}
                >
                  <FilterCheckbox
                    label="Any"
                    checked={isChecked("type", "any")}
                    onChange={() => toggleFilter("type", "any")}
                  />
                  {propertyTypes.map(item => (
                    <FilterCheckbox
                      key={item.slug}
                      label={item.title}
                      checked={isChecked("type", item.slug)}
                      onChange={() => toggleFilter("type", item.slug)}
                    />
                  ))}
                </FilterSection>
              )}

              {/* LUXURY / PREMIUM */}
              <FilterSection
                title={t("sections.luxury", { fallback: "Категория" })}
              >
                <FilterCheckbox
                  label={t("labels.luxury", { fallback: "Luxury / Premium" })}
                  checked={isChecked("luxury", "true")}
                  onChange={() => toggleFilter("luxury", "true")}
                />
              </FilterSection>

              {/* BUDGET */}
              <FilterSection
                title={t("sections.budget", { fallback: "Бюджет (€)" })}
              >
                <FilterCheckbox
                  label="Any"
                  checked={isChecked("budget", "any")}
                  onChange={() => toggleFilter("budget", "any")}
                />
                {budgets.map(b => (
                  <FilterCheckbox
                    key={b.slug}
                    label={b.label}
                    checked={isChecked("budget", b.slug)}
                    onChange={() => toggleFilter("budget", b.slug)}
                  />
                ))}
              </FilterSection>

              {/* LOCATION */}
              {locations.length > 0 && (
                <FilterSection
                  title={t("sections.location", { fallback: "Локация" })}
                >
                  <FilterCheckbox
                    label="Any"
                    checked={isChecked("location", "any")}
                    onChange={() => toggleFilter("location", "any")}
                  />
                  {locations.map(item => (
                    <FilterCheckbox
                      key={item.slug}
                      label={item.title}
                      checked={isChecked("location", item.slug)}
                      onChange={() => toggleFilter("location", item.slug)}
                    />
                  ))}
                </FilterSection>
              )}

              {/* BEDS & BATHS (Групуємо поруч) */}
              <div className="grid grid-cols-1 gap-4">
                <FilterSection
                  title={t("sections.bedrooms", { fallback: "Спальни" })}
                >
                  <FilterCheckbox
                    label="Any"
                    checked={isChecked("beds", "any")}
                    onChange={() => toggleFilter("beds", "any")}
                  />
                  {bedrooms.map(bed => (
                    <FilterCheckbox
                      key={bed}
                      label={bed}
                      checked={isChecked("beds", bed)}
                      onChange={() => toggleFilter("beds", bed)}
                    />
                  ))}
                </FilterSection>
                <FilterSection
                  title={t("sections.bathrooms", { fallback: "Ванные" })}
                >
                  <FilterCheckbox
                    label="Any"
                    checked={isChecked("baths", "any")}
                    onChange={() => toggleFilter("baths", "any")}
                  />
                  {bathrooms.map(bath => (
                    <FilterCheckbox
                      key={bath}
                      label={bath}
                      checked={isChecked("baths", bath)}
                      onChange={() => toggleFilter("baths", bath)}
                    />
                  ))}
                </FilterSection>
              </div>

              {/* AREAS */}
              <FilterSection
                title={t("sections.totalArea", { fallback: "Общая площадь" })}
              >
                <FilterCheckbox
                  label="Any"
                  checked={isChecked("totalArea", "any")}
                  onChange={() => toggleFilter("totalArea", "any")}
                />
                {areaRanges.map(a => (
                  <FilterCheckbox
                    key={a.slug}
                    label={a.label}
                    checked={isChecked("totalArea", a.slug)}
                    onChange={() => toggleFilter("totalArea", a.slug)}
                  />
                ))}
              </FilterSection>
            </div>

            {/* COLUMN 2: Features, Amenities, Views */}
            <div className="space-y-8">
              {/* VIEWS */}
              <FilterSection title={t("sections.views", { fallback: "Вид" })}>
                <FilterCheckbox
                  label="Any"
                  checked={isChecked("views", "any")}
                  onChange={() => toggleFilter("views", "any")}
                />
                {views.map(v => (
                  <FilterCheckbox
                    key={v.slug}
                    label={v.label}
                    checked={isChecked("views", v.slug)}
                    onChange={() => toggleFilter("views", v.slug)}
                  />
                ))}
              </FilterSection>

              {/* CONDITION */}
              <FilterSection
                title={t("sections.condition", { fallback: "Состояние" })}
              >
                <FilterCheckbox
                  label="Any"
                  checked={isChecked("condition", "any")}
                  onChange={() => toggleFilter("condition", "any")}
                />
                {condition.map(c => (
                  <FilterCheckbox
                    key={c.slug}
                    label={c.label}
                    checked={isChecked("condition", c.slug)}
                    onChange={() => toggleFilter("condition", c.slug)}
                  />
                ))}
              </FilterSection>

              {/* INTERIOR & SMART FEATURES */}
              <FilterSection
                title={t("sections.features", { fallback: "Особенности" })}
              >
                {features.map(f => (
                  <FilterCheckbox
                    key={f.slug}
                    label={f.label}
                    checked={isChecked("features", f.slug)}
                    onChange={() => toggleFilter("features", f.slug)}
                  />
                ))}
              </FilterSection>

              {/* COMPLEX AMENITIES */}
              <FilterSection
                title={t("sections.amenities", {
                  fallback: "Инфраструктура комплекса",
                })}
              >
                {amenities.map(a => (
                  <FilterCheckbox
                    key={a.slug}
                    label={a.label}
                    checked={isChecked("amenities", a.slug)}
                    onChange={() => toggleFilter("amenities", a.slug)}
                  />
                ))}
              </FilterSection>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-gray-100 bg-gray-50/50 p-4">
          <button
            onClick={() => setDraftFilters({})}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            {t("clear", { fallback: "Clear all" })}
          </button>
          <button
            onClick={handleApply}
            className="rounded-md bg-terracotta-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-terracotta-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
          >
            {t("apply", { fallback: "Apply filters" })}
          </button>
        </div>
      </div>
    </>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      <div className="flex flex-col space-y-2.5">{children}</div>
    </div>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="group flex w-max cursor-pointer items-center gap-3">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      <span className="text-sm text-gray-700 transition-colors group-hover:text-gray-900">
        {label}
      </span>
    </label>
  );
}
