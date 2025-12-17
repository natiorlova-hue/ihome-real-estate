Security & access rules
🎯 Purpose

The CMS is a private tool, not part of the public website.

Security layers
1️⃣ Perimeter (Edge protection)

/studio is protected by Basic Auth

Implemented via Next.js middleware

Controlled by environment variables:

STUDIO_BASIC_AUTH_USER

STUDIO_BASIC_AUTH_PASS

If variables are not set → Studio is open (development mode).

2️⃣ CMS access (Sanity)

Authentication via Sanity (Google / email)

Role-based permissions

Audit log enabled

What is NOT allowed

Public access to /studio in production

Committing credentials to the repository

Mounting Studio under locale routes

Disabling middleware in production

SEO & security

/studio → noindex

Blog and pages → indexable

Middleware does not affect:

Lighthouse scores

generateMetadata

Indexing or rendering
