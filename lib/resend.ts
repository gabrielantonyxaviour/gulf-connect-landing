import { Resend } from "resend";

// Only initialize Resend if API key is available
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const isResendConfigured = () => !!process.env.RESEND_API_KEY;
