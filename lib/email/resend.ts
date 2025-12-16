import { Resend } from "resend";

export type ResendEnv = {
  apiKey: string;
  to: string;
  from: string;
};

export function getResendEnv(): ResendEnv | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

export function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendResendEmail(args: {
  env: ResendEnv;
  subject: string;
  replyTo?: string;
  html: string;
  headers?: Record<string, string>;
}) {
  const resend = new Resend(args.env.apiKey);

  await resend.emails.send({
    from: args.env.from,
    to: args.env.to,
    subject: args.subject,
    replyTo: args.replyTo,
    html: args.html,
    headers: args.headers,
  });
}
