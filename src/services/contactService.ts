import type { ContactApiResponse, ContactFormPayload } from "@/types/portfolio";

export async function submitContactInquiry(
  payload: ContactFormPayload
): Promise<ContactApiResponse> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as ContactApiResponse;

  if (!response.ok) {
    const err = new Error(data.error || "Gagal mengirim pesan ke server.") as Error & {
      fallbackMailto?: boolean;
    };
    err.fallbackMailto = data.fallbackMailto;
    throw err;
  }

  return data;
}
