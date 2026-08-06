// Type definitions for Next.js environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** Loaded from `.env` */
      RESEND_API_KEY?: string
    }
  }
}
export {}