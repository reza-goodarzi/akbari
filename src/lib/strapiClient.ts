import { strapi } from '@strapi/client'

// NOTE:
// On Vercel you MUST define `VITE_STRAPI_URL` in the project Environment Variables.
// If it's missing or incorrect, Strapi client requests will fail with HTTPError.
const baseURL = import.meta.env.VITE_STRAPI_URL

// Fallback to empty string so that @strapi/client is still constructed,
// but we can detect misconfiguration at runtime and avoid crashing the whole app.
export const strapiClient = strapi({
  baseURL: baseURL || '',
})

export const articles = strapiClient.collection('articles')
