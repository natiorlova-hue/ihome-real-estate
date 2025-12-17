Security & access rules
🎯 Мета

CMS — приватний інструмент, а не частина публічного сайту.

Рівні безпеки
1️⃣ Perimeter (Edge)

/studio захищений Basic Auth

Реалізовано через middleware

Керується env:

STUDIO_BASIC_AUTH_USER

STUDIO_BASIC_AUTH_PASS

Якщо env не задані → Studio відкрита (dev)

2️⃣ CMS access (Sanity)

Login через Sanity (Google / email)

Roles & permissions

Audit log

Що НЕ дозволено

Публічний доступ до /studio у production

Комітити credentials

Виносити Studio під locale route

Відключати middleware у prod

SEO & Security

/studio → noindex

Blog / Pages → indexable

Middleware не впливає на:

Lighthouse

generateMetadata

indexing
