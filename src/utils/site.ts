// Leave unset locally: do not publish canonical URLs for an unverified domain.
export const siteUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_BASE_URL).origin
  : undefined
