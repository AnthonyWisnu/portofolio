import type { ContactFormPayload } from "@/types/portfolio";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FORM_FILL_MS = 1800;

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function sanitizeHeaderText(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

export function validateContactPayload(
  payload: ContactFormPayload,
  options?: { enforceFillDuration?: boolean }
): ValidationResult {
  if (payload.website && payload.website.trim().length > 0) {
    return { valid: false, error: "Permintaan ditolak oleh filter keamanan." };
  }

  if (
    options?.enforceFillDuration &&
    typeof payload.formStartedAt === "number" &&
    Number.isFinite(payload.formStartedAt)
  ) {
    const elapsed = Date.now() - payload.formStartedAt;
    if (elapsed >= 0 && elapsed < MIN_FORM_FILL_MS) {
      return {
        valid: false,
        error: "Pengiriman terlalu cepat terdeteksi. Mohon periksa pesan Anda sebentar lalu kirim ulang.",
      };
    }
  }

  const name = sanitizeHeaderText(payload.name || "");
  const email = sanitizeHeaderText(payload.email || "");
  const message = (payload.message || "").trim();

  if (name.length < 2 || name.length > 100) {
    return {
      valid: false,
      error: "Nama lengkap minimal 2 karakter dan maksimal 100 karakter.",
    };
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 160) {
    return { valid: false, error: "Format alamat email tidak valid." };
  }

  if (message.length < 10 || message.length > 2500) {
    return {
      valid: false,
      error: "Detail pesan minimal 10 karakter dan maksimal 2500 karakter.",
    };
  }

  return { valid: true };
}
