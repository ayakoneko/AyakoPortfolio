// Simple wrapper so the component stays small
const SERVICE_ID = "service_1no5yec";
const TEMPLATE_ID = "template_f1qwtdh";
const PUBLIC_KEY  = "sBQDMMEAstpdLa-wT";

export function initEmail() {
  try { window.emailjs?.init({ publicKey: PUBLIC_KEY }); } catch {}
}

export async function sendContact({ name, email, subject, message }) {
  return window.emailjs?.send(SERVICE_ID, TEMPLATE_ID, {
    from_name: name,
    reply_to: email,
    subject: subject || "(No subject)",
    message,
    page_url: window.location.href,
  });
}
