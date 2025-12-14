import { redirect } from "next/navigation";
import { type Locale } from "@/lib/locale-path";

type Props = { params: Promise<{ locale: Locale }> };

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/coming-soon`);
}
