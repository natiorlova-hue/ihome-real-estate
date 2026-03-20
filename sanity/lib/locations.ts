type RawLocation = {
  id: string;
  en: string;
  es: string;
  ru: string;
  parentId?: string;
};

type LocationDocument = {
  _id: string;
  _type: "location";
  title: { _key: string; _type: string; value: string }[];
  slug: { _type: "slug"; current: string };
  parent?: { _type: "reference"; _ref: string };
};

const rawLocations: RawLocation[] = [
  // === STANDALONE ===
  { id: "valencia", en: "Valencia", es: "Valencia", ru: "Валенсия" }, // 👈 Додали Валенсію сюди
  { id: "sotogrande", en: "Sotogrande", es: "Sotogrande", ru: "Сотогранде" },
  { id: "malaga", en: "Malaga", es: "Málaga", ru: "Малага" },
  { id: "rest-costa-del-sol", en: "Rest of Costa Del Sol", es: "Resto de la Costa del Sol", ru: "Остальная часть Коста-дель-Соль" },

  // === MANILVA ===
  { id: "manilva", en: "Manilva", es: "Manilva", ru: "Манильва" },
  { id: "manilva-pueblo", parentId: "manilva", en: "Manilva Pueblo", es: "Manilva Pueblo", ru: "Манильва Пуэбло" },
  { id: "sabinillas", parentId: "manilva", en: "Sabinillas", es: "Sabinillas", ru: "Сабинильяс" },
  { id: "puerto-duquesa", parentId: "manilva", en: "Puerto de la Duquesa", es: "Puerto de la Duquesa", ru: "Пуэрто-де-ла-Дукеса" },
  { id: "los-hidalgos", parentId: "manilva", en: "Los Hidalgos", es: "Los Hidalgos", ru: "Лос-Идальгос" },
  { id: "chullera", parentId: "manilva", en: "Chullera", es: "Chullera", ru: "Чульера" },

  // === CASARES COSTA ===
  { id: "casares-costa", en: "Casares Costa", es: "Casares Costa", ru: "Касарес Коста" },
  { id: "casares-playa", parentId: "casares-costa", en: "Casares Playa", es: "Casares Playa", ru: "Касарес Плайя" },
  { id: "majestic", parentId: "casares-costa", en: "Majestic", es: "Majestic", ru: "Маджестик" },
  { id: "dona-julia", parentId: "casares-costa", en: "Doña Julia", es: "Doña Julia", ru: "Донья Хулия" },

  // === ESTEPONA ===
  { id: "estepona", en: "Estepona", es: "Estepona", ru: "Эстепона" },
  { id: "seghers", parentId: "estepona", en: "Seghers", es: "Seghers", ru: "Сегерс" },
  { id: "cristo-beach", parentId: "estepona", en: "Cristo Beach", es: "Playa del Cristo", ru: "Пляж Кристо" },
  { id: "el-padron", parentId: "estepona", en: "El Padrón", es: "El Padrón", ru: "Эль-Падрон" },
  { id: "selwo", parentId: "estepona", en: "Selwo / La Resina", es: "Selwo / La Resina", ru: "Сельво / Ла Ресина" },
  { id: "guadalmansa", parentId: "estepona", en: "Guadalmansa", es: "Guadalmansa", ru: "Гуадальманса" },
  { id: "cancelada-est", parentId: "estepona", en: "Cancelada", es: "Cancelada", ru: "Канселада" },
  { id: "guadalmina-baja", parentId: "estepona", en: "Guadalmina Baja", es: "Guadalmina Baja", ru: "Гуадальмина Баха" },
  { id: "guadalmina-alta", parentId: "estepona", en: "Guadalmina Alta", es: "Guadalmina Alta", ru: "Гуадальмина Альта" },
  { id: "casasola", parentId: "estepona", en: "Casasola", es: "Casasola", ru: "Касасола" },

  // === BENAHAVÍS ===
  { id: "benahavis", en: "Benahavís", es: "Benahavís", ru: "Бенахавис" },
  { id: "benahavis-pueblo", parentId: "benahavis", en: "Benahavis pueblo", es: "Benahavís pueblo", ru: "Бенахавис Пуэбло" },
  { id: "zagaleta", parentId: "benahavis", en: "Zagaleta", es: "Zagaleta", ru: "Загалета" },

  // === SAN PEDRO ===
  { id: "san-pedro", en: "San Pedro", es: "San Pedro", ru: "Сан-Педро" },
  { id: "san-pedro-centro", parentId: "san-pedro", en: "San Pedro Centro", es: "San Pedro Centro", ru: "Центр Сан-Педро" },
  { id: "cancelada-sp", parentId: "san-pedro", en: "Cancelada", es: "Cancelada", ru: "Канселада" },
  { id: "atalaya-golf", parentId: "san-pedro", en: "Atalaya Golf", es: "Atalaya Golf", ru: "Аталайя Гольф" },
  { id: "la-quinta-golf", parentId: "san-pedro", en: "La Quinta Golf", es: "La Quinta Golf", ru: "Ла Кинта Гольф" },
  { id: "el-higueral", parentId: "san-pedro", en: "El Higueral Golf", es: "El Higueral Golf", ru: "Эль Игераль Гольф" },
  { id: "los-flamingos", parentId: "san-pedro", en: "Los Flamingos Golf", es: "Los Flamingos Golf", ru: "Лос Фламингос Гольф" },
  { id: "la-alqueria", parentId: "san-pedro", en: "La Alquería", es: "La Alquería", ru: "Ла Алькерия" },
  { id: "capanes", parentId: "san-pedro", en: "Capanes", es: "Capanes", ru: "Капанес" },
  { id: "el-herrojo", parentId: "san-pedro", en: "El Herrojo", es: "El Herrojo", ru: "Эль Эррохо" },

  // === MARBELLA ===
  { id: "marbella", en: "Marbella", es: "Marbella", ru: "Марбелья" },
  { id: "puerto-banus", parentId: "marbella", en: "Puerto Banús", es: "Puerto Banús", ru: "Пуэрто Банус" },
  { id: "nueva-andalucia", parentId: "marbella", en: "Nueva Andalucía", es: "Nueva Andalucía", ru: "Нуэва Андалусия" },
  { id: "aloha", parentId: "marbella", en: "Aloha", es: "Aloha", ru: "Алоха" },
  { id: "las-brisas", parentId: "marbella", en: "Las Brisas", es: "Las Brisas", ru: "Лас Брисас" },
  { id: "los-naranjos", parentId: "marbella", en: "Los Naranjos", es: "Los Naranjos", ru: "Лос Наранхос" },
  { id: "golden-mile", parentId: "marbella", en: "Golden Mile", es: "Milla de Oro", ru: "Золотая Миля" },
  { id: "sierra-blanca", parentId: "marbella", en: "Sierra Blanca", es: "Sierra Blanca", ru: "Сьерра Бланка" },
  { id: "nagueles", parentId: "marbella", en: "Nagüeles", es: "Nagüeles", ru: "Нагуэлес" },
  { id: "marbella-centro", parentId: "marbella", en: "Marbella Centro", es: "Marbella Centro", ru: "Марбелья Центр" },

  // === EAST MARBELLA ===
  { id: "east-marbella", en: "East Marbella", es: "Marbella Este", ru: "Восточная Марбелья" },
  { id: "rio-real", parentId: "east-marbella", en: "Rio Real", es: "Río Real", ru: "Рио Реаль" },
  { id: "los-monteros-alta", parentId: "east-marbella", en: "Los Monteros Alta", es: "Los Monteros Alta", ru: "Лос Монтерос Альта" },
  { id: "los-monteros-baja", parentId: "east-marbella", en: "Los Monteros Baja", es: "Los Monteros Baja", ru: "Лос Монтерос Баха" },
  { id: "elviria", parentId: "east-marbella", en: "Elviria", es: "Elviria", ru: "Эльвирия" },
  { id: "las-chapas", parentId: "east-marbella", en: "Las Chapas", es: "Las Chapas", ru: "Лас Чапас" },
  { id: "la-mairena", parentId: "east-marbella", en: "La Mairena", es: "La Mairena", ru: "Ла Майрена" },
  { id: "artola", parentId: "east-marbella", en: "Artola", es: "Artola", ru: "Артола" },
  { id: "artola-alta", parentId: "east-marbella", en: "Artola Alta", es: "Artola Alta", ru: "Артола Альта" },
  { id: "cabopino", parentId: "east-marbella", en: "Cabopino", es: "Cabopino", ru: "Кабопино" },

  // === MIJAS ===
  { id: "mijas", en: "Mijas", es: "Mijas", ru: "Михас" },
  { id: "calahonda", parentId: "mijas", en: "Calahonda", es: "Calahonda", ru: "Калаонда" },
  { id: "riviera-del-sol", parentId: "mijas", en: "Riviera del Sol", es: "Riviera del Sol", ru: "Ривьера дель Соль" },
  { id: "calanova", parentId: "mijas", en: "Calanova", es: "Calanova", ru: "Каланова" },
  { id: "miraflores", parentId: "mijas", en: "Miraflores", es: "Miraflores", ru: "Мирафлорес" },
  { id: "la-cala", parentId: "mijas", en: "La Cala", es: "La Cala", ru: "Ла Кала" },
  { id: "la-cala-resort", parentId: "mijas", en: "La Cala Resort", es: "La Cala Resort", ru: "Ла Кала Резорт" },
  { id: "mijas-golf", parentId: "mijas", en: "Mijas golf", es: "Mijas Golf", ru: "Михас Гольф" },
  { id: "santana-golf", parentId: "mijas", en: "Santana Golf", es: "Santana Golf", ru: "Сантана Гольф" },
  { id: "el-chaparral", parentId: "mijas", en: "El Chaparral", es: "El Chaparral", ru: "Эль Чапарраль" },
  { id: "hipodromo", parentId: "mijas", en: "Hipodromo", es: "Hipódromo", ru: "Иподромо" },
  { id: "el-faro", parentId: "mijas", en: "El Faro", es: "El Faro", ru: "Эль Фаро" },
  { id: "mijas-pueblo", parentId: "mijas", en: "Mijas Pueblo", es: "Mijas Pueblo", ru: "Михас Пуэбло" },

  // === FUENGIROLA ===
  { id: "fuengirola", en: "Fuengirola", es: "Fuengirola", ru: "Фуэнхирола" },
  { id: "torreblanca", parentId: "fuengirola", en: "Torreblanca", es: "Torreblanca", ru: "Торребланка" },
  { id: "carvajal", parentId: "fuengirola", en: "Carvajal", es: "Carvajal", ru: "Карвахаль" },
  { id: "los-boliches", parentId: "fuengirola", en: "Los Boliches", es: "Los Boliches", ru: "Лос Боличес" },
  { id: "centro-fuengirola", parentId: "fuengirola", en: "Centro", es: "Centro", ru: "Центр" },
  { id: "higueron-resort", parentId: "fuengirola", en: "Higuerón Resort", es: "Higuerón Resort", ru: "Игерон Резорт" },

  // === BENALMÁDENA ===
  { id: "benalmadena", en: "Benalmádena", es: "Benalmádena", ru: "Бенальмадена" },
  { id: "benalmadena-pueblo", parentId: "benalmadena", en: "Benalmádena Pueblo", es: "Benalmádena Pueblo", ru: "Бенальмадена Пуэбло" },
  { id: "arroyo-de-la-miel", parentId: "benalmadena", en: "Arroyo de la Miel", es: "Arroyo de la Miel", ru: "Арройо де ла Мьель" },
  { id: "benalmadena-costa", parentId: "benalmadena", en: "Benalmádena Costa", es: "Benalmádena Costa", ru: "Бенальмадена Коста" },
  { id: "torrequebrada", parentId: "benalmadena", en: "Torrequebrada", es: "Torrequebrada", ru: "Торрекебрада" },

  // === TORREMOLINOS ===
  { id: "torremolinos", en: "Torremolinos", es: "Torremolinos", ru: "Торремолинос" },
  { id: "playamar", parentId: "torremolinos", en: "Playamar", es: "Playamar", ru: "Плайямар" },
  { id: "los-alamos", parentId: "torremolinos", en: "Los Álamos", es: "Los Álamos", ru: "Лос Аламос" },
  { id: "la-carihuela", parentId: "torremolinos", en: "La Carihuela", es: "La Carihuela", ru: "Ла Кариуэла" },
  { id: "montemar", parentId: "torremolinos", en: "Montemar", es: "Montemar", ru: "Монтемар" },
];

export const locationDocuments: LocationDocument[] = rawLocations.map(
  (loc): LocationDocument => ({
    _id: `location-${loc.id}`,
    _type: "location",
    title: [
      { _key: "en", _type: "internationalizedArrayStringValue", value: loc.en },
      { _key: "es", _type: "internationalizedArrayStringValue", value: loc.es },
      { _key: "ru", _type: "internationalizedArrayStringValue", value: loc.ru },
    ],
    slug: { _type: "slug", current: loc.id },
    ...(loc.parentId
      ? { parent: { _type: "reference", _ref: `location-${loc.parentId}` } }
      : {}),
  }),
);
