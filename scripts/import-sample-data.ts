import { createClient } from '@sanity/client'

// Create client using environment variables from .env file
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

const categories = [
  {
    _type: 'category',
    title: [
      { _key: 'en', _type: 'internationalizedArrayStringValue', value: 'Client Stories' },
      { _key: 'es', _type: 'internationalizedArrayStringValue', value: 'Historias de Clientes' },
      { _key: 'ru', _type: 'internationalizedArrayStringValue', value: 'Истории клиентов' },
    ],
    slug: {
      _type: 'slug',
      current: 'client-stories',
    },
    description: [
      { _key: 'en', _type: 'internationalizedArrayTextValue', value: 'Real stories from our clients about their relocation journey to Spain' },
      { _key: 'es', _type: 'internationalizedArrayTextValue', value: 'Historias reales de nuestros clientes sobre su viaje de reubicación a España' },
      { _key: 'ru', _type: 'internationalizedArrayTextValue', value: 'Реальные истории наших клиентов об их переезде в Испанию' },
    ],
    color: 'blue',
  },
  {
    _type: 'category',
    title: [
      { _key: 'en', _type: 'internationalizedArrayStringValue', value: 'Life in Spain' },
      { _key: 'es', _type: 'internationalizedArrayStringValue', value: 'Vida en España' },
      { _key: 'ru', _type: 'internationalizedArrayStringValue', value: 'Жизнь в Испании' },
    ],
    slug: {
      _type: 'slug',
      current: 'life-in-spain',
    },
    description: [
      { _key: 'en', _type: 'internationalizedArrayTextValue', value: 'Everything you need to know about living in Spain' },
      { _key: 'es', _type: 'internationalizedArrayTextValue', value: 'Todo lo que necesitas saber sobre vivir en España' },
      { _key: 'ru', _type: 'internationalizedArrayTextValue', value: 'Все, что нужно знать о жизни в Испании' },
    ],
    color: 'green',
  },
  {
    _type: 'category',
    title: [
      { _key: 'en', _type: 'internationalizedArrayStringValue', value: 'Budget & Relocation' },
      { _key: 'es', _type: 'internationalizedArrayStringValue', value: 'Presupuesto y Reubicación' },
      { _key: 'ru', _type: 'internationalizedArrayStringValue', value: 'Бюджет и Переезд' },
    ],
    slug: {
      _type: 'slug',
      current: 'budget-relocation',
    },
    description: [
      { _key: 'en', _type: 'internationalizedArrayTextValue', value: 'Financial planning and relocation tips for moving to Spain' },
      { _key: 'es', _type: 'internationalizedArrayTextValue', value: 'Planificación financiera y consejos de reubicación para mudarse a España' },
      { _key: 'ru', _type: 'internationalizedArrayTextValue', value: 'Финансовое планирование и советы по переезду в Испанию' },
    ],
    color: 'purple',
  },
  {
    _type: 'category',
    title: [
      { _key: 'en', _type: 'internationalizedArrayStringValue', value: 'Interior & Lifestyle' },
      { _key: 'es', _type: 'internationalizedArrayStringValue', value: 'Interior y Estilo de Vida' },
      { _key: 'ru', _type: 'internationalizedArrayStringValue', value: 'Интерьер и Образ Жизни' },
    ],
    slug: {
      _type: 'slug',
      current: 'interior-lifestyle',
    },
    description: [
      { _key: 'en', _type: 'internationalizedArrayTextValue', value: 'Home design, interior inspiration, and lifestyle content' },
      { _key: 'es', _type: 'internationalizedArrayTextValue', value: 'Diseño de hogar, inspiración interior y contenido de estilo de vida' },
      { _key: 'ru', _type: 'internationalizedArrayTextValue', value: 'Дизайн дома, интерьерное вдохновение и контент о образе жизни' },
    ],
    color: 'orange',
  },
]

const posts = [
  {
    _type: 'post',
    title: [
      { _key: 'en', _type: 'internationalizedArrayStringValue', value: 'Finding Your Dream Home in Barcelona' },
      { _key: 'es', _type: 'internationalizedArrayStringValue', value: 'Encontrando tu Hogar Ideal en Barcelona' },
      { _key: 'ru', _type: 'internationalizedArrayStringValue', value: 'Поиск Дома Мечты в Барселоне' },
    ],
    description: [
      { _key: 'en', _type: 'internationalizedArrayTextValue', value: 'A complete guide to navigating the Barcelona real estate market, from neighborhoods to legal requirements.' },
      { _key: 'es', _type: 'internationalizedArrayTextValue', value: 'Una guía completa para navegar el mercado inmobiliario de Barcelona, desde barrios hasta requisitos legales.' },
      { _key: 'ru', _type: 'internationalizedArrayTextValue', value: 'Полное руководство по навигации на рынке недвижимости Барселоны, от районов до правовых требований.' },
    ],
    content: {
      _type: 'localeBlock',
      en: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'Barcelona offers an incredible variety of housing options, from historic apartments in the Gothic Quarter to modern penthouses overlooking the Mediterranean. This guide will help you navigate the market and find your perfect home.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'Best Neighborhoods for Expats',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'Each neighborhood in Barcelona has its own unique character and advantages. Consider your lifestyle, budget, and priorities when choosing.',
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'Barcelona ofrece una increíble variedad de opciones de vivienda, desde apartamentos históricos en el Barrio Gótico hasta áticos modernos con vistas al Mediterráneo. Esta guía te ayudará a navegar el mercado y encontrar tu hogar perfecto.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'Mejores Barrios para Expatriados',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'Cada barrio en Barcelona tiene su propio carácter único y ventajas. Considera tu estilo de vida, presupuesto y prioridades al elegir.',
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'Барселона предлагает невероятное разнообразие вариантов жилья, от исторических квартир в Готическом квартале до современных пентхаусов с видом на Средиземное море. Это руководство поможет вам ориентироваться на рынке и найти идеальный дом.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'Лучшие Районы для Экспатов',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'Каждый район в Барселоне имеет свой уникальный характер и преимущества. Учитывайте свой образ жизни, бюджет и приоритеты при выборе.',
              marks: [],
            },
          ],
        },
      ],
    },
    slug: {
      _type: 'slug',
      current: 'finding-dream-home-barcelona',
    },
    publishedAt: '2024-01-15T10:00:00Z',
    featured: true,
  },
  {
    _type: 'post',
    title: [
      { _key: 'en', _type: 'internationalizedArrayStringValue', value: 'Sarah\'s Relocation Success Story' },
      { _key: 'es', _type: 'internationalizedArrayStringValue', value: 'Historia de Éxito de Reubicación de Sarah' },
      { _key: 'ru', _type: 'internationalizedArrayStringValue', value: 'История Успешного Переезда Сары' },
    ],
    description: [
      { _key: 'en', _type: 'internationalizedArrayTextValue', value: 'How Sarah moved from London to Madrid with her family and found the perfect apartment in just 3 weeks.' },
      { _key: 'es', _type: 'internationalizedArrayTextValue', value: 'Cómo Sarah se mudó de Londres a Madrid con su familia y encontró el apartamento perfecto en solo 3 semanas.' },
      { _key: 'ru', _type: 'internationalizedArrayTextValue', value: 'Как Сара переехала из Лондона в Мадрид со своей семьей и нашла идеальную квартиру всего за 3 недели.' },
    ],
    content: {
      _type: 'localeBlock',
      en: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'Sarah and her family decided to relocate from London to Madrid for a better work-life balance. Here\'s how we helped them find their perfect home in just three weeks.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'The Challenge',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'Sarah needed a 3-bedroom apartment near international schools, with a budget of €2,500/month, and they had to move within a month.',
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'Sarah y su familia decidieron reubicarse de Londres a Madrid para un mejor equilibrio entre trabajo y vida. Aquí te contamos cómo les ayudamos a encontrar su hogar perfecto en solo tres semanas.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'El Desafío',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'Sarah necesitaba un apartamento de 3 habitaciones cerca de escuelas internacionales, con un presupuesto de €2,500/mes, y tenían que mudarse en un mes.',
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'Сара и её семья решили переехать из Лондона в Мадрид для лучшего баланса между работой и личной жизнью. Вот как мы помогли им найти идеальный дом всего за три недели.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'Вызов',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'Саре нужна была 3-комнатная квартира рядом с международными школами, с бюджетом €2,500/месяц, и им нужно было переехать в течение месяца.',
              marks: [],
            },
          ],
        },
      ],
    },
    slug: {
      _type: 'slug',
      current: 'sarah-relocation-success-story',
    },
    publishedAt: '2024-01-20T14:30:00Z',
    featured: true,
  },
  {
    _type: 'post',
    title: [
      { _key: 'en', _type: 'internationalizedArrayStringValue', value: 'Budget Planning for Your Spanish Move' },
      { _key: 'es', _type: 'internationalizedArrayStringValue', value: 'Planificación de Presupuesto para tu Mudanza a España' },
      { _key: 'ru', _type: 'internationalizedArrayStringValue', value: 'Планирование Бюджета для Переезда в Испанию' },
    ],
    description: [
      { _key: 'en', _type: 'internationalizedArrayTextValue', value: 'Everything you need to know about the costs involved in relocating to Spain, from visas to property taxes.' },
      { _key: 'es', _type: 'internationalizedArrayTextValue', value: 'Todo lo que necesitas saber sobre los costos involucrados en reubicarse en España, desde visas hasta impuestos inmobiliarios.' },
      { _key: 'ru', _type: 'internationalizedArrayTextValue', value: 'Все, что нужно знать о расходах, связанных с переездом в Испанию, от виз до налогов на недвижимость.' },
    ],
    content: {
      _type: 'localeBlock',
      en: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'Moving to Spain involves various costs beyond just the property price. This comprehensive guide breaks down all the expenses you need to consider.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'Initial Costs Breakdown',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'From visa applications to property transfer taxes, here\'s what you can expect to pay when moving to Spain.',
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'Mudarse a España implica varios costos más allá del precio de la propiedad. Esta guía completa desglosa todos los gastos que necesitas considerar.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'Desglose de Costos Iniciales',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'Desde solicitudes de visa hasta impuestos de transferencia de propiedad, aquí está lo que puedes esperar pagar al mudarte a España.',
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'Переезд в Испанию включает в себя различные расходы помимо стоимости недвижимости. Это подробное руководство разбирает все расходы, которые вам нужно учесть.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'Разбивка Первоначальных Расходов',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'От подачи заявлений на визу до налогов на передачу недвижимости, вот что вы можете ожидать заплатить при переезде в Испанию.',
              marks: [],
            },
          ],
        },
      ],
    },
    slug: {
      _type: 'slug',
      current: 'budget-planning-spanish-move',
    },
    publishedAt: '2024-01-25T09:15:00Z',
    featured: false,
  },
  {
    _type: 'post',
    title: [
      { _key: 'en', _type: 'internationalizedArrayStringValue', value: 'Spanish Interior Design Trends 2024' },
      { _key: 'es', _type: 'internationalizedArrayStringValue', value: 'Tendencias de Diseño Interior Español 2024' },
      { _key: 'ru', _type: 'internationalizedArrayStringValue', value: 'Тренды Испанского Дизайна Интерьера 2024' },
    ],
    description: [
      { _key: 'en', _type: 'internationalizedArrayTextValue', value: 'Discover the latest interior design trends popular in Spanish homes, from Mediterranean minimalism to modern rustic.' },
      { _key: 'es', _type: 'internationalizedArrayTextValue', value: 'Descubre las últimas tendencias de diseño interior populares en hogares españoles, desde el minimalismo mediterráneo hasta el rústico moderno.' },
      { _key: 'ru', _type: 'internationalizedArrayTextValue', value: 'Откройте для себя последние тренды дизайна интерьера, популярные в испанских домах, от средиземноморского минимализма до современного рустика.' },
    ],
    content: {
      _type: 'localeBlock',
      en: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'Spanish interior design combines traditional Mediterranean elements with contemporary aesthetics. Here are the trends that are defining Spanish homes in 2024.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'Mediterranean Minimalism',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'Clean lines, natural materials, and a focus on light and space characterize this popular trend.',
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'El diseño interior español combina elementos mediterráneos tradicionales con estética contemporánea. Aquí están las tendencias que definen los hogares españoles en 2024.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'Minimalismo Mediterráneo',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'Líneas limpias, materiales naturales y un enfoque en la luz y el espacio caracterizan esta tendencia popular.',
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'Испанский дизайн интерьера сочетает традиционные средиземноморские элементы с современной эстетикой. Вот тренды, которые определяют испанские дома в 2024 году.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'Средиземноморский Минимализм',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'Чистые линии, натуральные материалы и акцент на свете и пространстве характеризуют этот популярный тренд.',
              marks: [],
            },
          ],
        },
      ],
    },
    slug: {
      _type: 'slug',
      current: 'spanish-interior-design-trends-2024',
    },
    publishedAt: '2024-01-30T16:45:00Z',
    featured: true,
  },
  {
    _type: 'post',
    title: [
      { _key: 'en', _type: 'internationalizedArrayStringValue', value: 'The Johnson Family\'s Costa del Sol Adventure' },
      { _key: 'es', _type: 'internationalizedArrayStringValue', value: 'La Aventura de la Familia Johnson en la Costa del Sol' },
      { _key: 'ru', _type: 'internationalizedArrayStringValue', value: 'Приключение Семьи Джонсон на Коста-дель-Соль' },
    ],
    description: [
      { _key: 'en', _type: 'internationalizedArrayTextValue', value: 'How the Johnson family found their perfect villa on the Costa del Sol and adapted to Spanish coastal living.' },
      { _key: 'es', _type: 'internationalizedArrayTextValue', value: 'Cómo la familia Johnson encontró su villa perfecta en la Costa del Sol y se adaptó a la vida costera española.' },
      { _key: 'ru', _type: 'internationalizedArrayTextValue', value: 'Как семья Джонсон нашла свою идеальную виллу на Коста-дель-Соль и адаптировалась к испанской прибрежной жизни.' },
    ],
    content: {
      _type: 'localeBlock',
      en: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'The Johnson family dreamed of coastal living in Spain. After months of searching, they found their perfect villa in Marbella. Here\'s their story.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'The Search Process',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'Finding the right property on the Costa del Sol required patience and local knowledge. We visited over 20 properties before finding the perfect match.',
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'La familia Johnson soñaba con vivir en la costa de España. Después de meses de búsqueda, encontraron su villa perfecta en Marbella. Aquí está su historia.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'El Proceso de Búsqueda',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'Encontrar la propiedad adecuada en la Costa del Sol requirió paciencia y conocimiento local. Visitamos más de 20 propiedades antes de encontrar la combinación perfecta.',
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'intro-text',
              text: 'Семья Джонсон мечтала о жизни на побережье Испании. После месяцев поисков они нашли свою идеальную виллу в Марбелье. Вот их история.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'heading1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'h2-text',
              text: 'Процесс Поиска',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-text',
              text: 'Поиск подходящей недвижимости на Коста-дель-Соль требовал терпения и местных знаний. Мы посетили более 20 объектов, прежде чем нашли идеальное совпадение.',
              marks: [],
            },
          ],
        },
      ],
    },
    slug: {
      _type: 'slug',
      current: 'johnson-family-costa-del-sol-adventure',
    },
    publishedAt: '2024-02-05T11:20:00Z',
    featured: false,
  },
]

async function importAllData() {
  try {
    console.log('🚀 Starting complete data import...')
    
    // Step 0: Delete existing data
    console.log('🗑️  Deleting existing data...')
    
    // Delete existing posts
    const existingPosts = await client.fetch(`*[_type == "post"]._id`)
    if (existingPosts.length > 0) {
      await client.delete({ query: `*[_type == "post"]` })
      console.log(`✅ Deleted ${existingPosts.length} existing posts`)
    }
    
    // Delete existing categories
    const existingCategories = await client.fetch(`*[_type == "category"]._id`)
    if (existingCategories.length > 0) {
      await client.delete({ query: `*[_type == "category"]` })
      console.log(`✅ Deleted ${existingCategories.length} existing categories`)
    }
    
    // Step 1: Import categories
    console.log('📁 Importing categories...')
    const createdCategories = []
    
    for (const category of categories) {
      const result = await client.create(category)
      createdCategories.push({
        ...result,
        slug: category.slug.current
      })
      console.log(`✅ Created category: ${category.title[0].value} (ID: ${result._id})`)
    }
    
    // Step 2: Import posts with category references
    console.log('📝 Importing posts...')
    
    for (const post of posts) {
      // Assign categories based on post index for variety
      let categoryIndex = 0
      if (post.title[0].value.includes('Barcelona')) categoryIndex = 1 // Life in Spain
      else if (post.title[0].value.includes('Sarah') || post.title[0].value.includes('Johnson')) categoryIndex = 0 // Client Stories
      else if (post.title[0].value.includes('Budget')) categoryIndex = 2 // Budget & Relocation
      else if (post.title[0].value.includes('Interior')) categoryIndex = 3 // Interior & Lifestyle
      
      const category = createdCategories[categoryIndex]
      
      if (!category) {
        console.error(`❌ Category not found for post: ${post.title[0].value}`)
        continue
      }
      
      // Create post with category reference
      const postWithCategory = {
        ...post,
        categories: [
          {
            _type: 'reference',
            _ref: category._id
          }
        ]
      }
      
      const result = await client.create(postWithCategory)
      console.log(`✅ Created post: ${post.title[0].value} with category: ${category.title[0].value} (ID: ${result._id})`)
    }
    
    console.log('🎉 Complete data import finished successfully!')
    console.log(`📊 Summary:`)
    console.log(`   - Categories: ${createdCategories.length}`)
    console.log(`   - Posts: ${posts.length}`)
    
  } catch (error) {
    console.error('❌ Error importing data:', error)
  }
}

// Run the import if this script is executed directly
if (require.main === module) {
  importAllData()
}

export { importAllData }