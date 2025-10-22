// app/[locale]/page.tsx - ТИМЧАСОВА ВЕРСІЯ

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      <h1 style={{ fontSize: "48px" }}>HOME PAGE</h1>
      <p>Locale: {locale}</p>
    </div>
  )
}
