import type { ContactFormPayload } from "@/types/portfolio";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateContactPayload(payload: ContactFormPayload): ValidationResult {
  if (payload.website && payload.website.trim().length > 0) {
    return { valid: false, error: "Permintaan ditolak oleh filter keamanan." };
  }

  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();

  if (name.length < 2 || name.length > 100) {
    return { valid: false, error: "Nama lengkap minimal 2 karakter dan maksimal 100 karakter." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { valid: false, error: "Format alamat email tidak valid." };
  }

  if (message.length < 10 || message.length > 2500) {
    return { valid: false, error: "Detail pesan minimal 10 karakter dan maksimal 2500 karakter." };
  }

  return { valid: true };
}
