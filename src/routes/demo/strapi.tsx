import { articles } from '@/lib/strapiClient'
import { createFileRoute, Link } from '@tanstack/react-router'

type LoaderData = {
  articles: any[]
  error?: string
}

export const Route = createFileRoute('/demo/strapi')({
  component: RouteComponent,
  loader: async (): Promise<LoaderData> => {
    try {
      const baseURL = import.meta.env.VITE_STRAPI_URL
      if (!baseURL) {
        // Don't crash the whole app on Vercel if env is missing
        return {
          articles: [],
          error:
            'VITE_STRAPI_URL is not configured. Set this environment variable in Vercel project settings.',
        }
      }

      const { data: strapiArticles } = await articles.find()
      return { articles: strapiArticles ?? [] }
    } catch (error) {
      // @strapi/client throws HTTPError for non‑2xx responses; we catch it here
      console.error('Failed to load Strapi articles', error)
      return {
        articles: [],
        error:
          'خطا در برقراری ارتباط با Strapi. لطفاً بعداً دوباره تلاش کنید یا تنظیمات سرور را بررسی کنید.',
      }
    }
  },
})

function RouteComponent() {
  const { articles: strapiArticles, error } = Route.useLoaderData() as LoaderData

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Strapi
          </span>{' '}
          <span className="text-gray-300">Articles</span>
        </h1>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {strapiArticles && strapiArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {strapiArticles.map((article) => (
              <Link
                key={article.id}
                to="/demo/strapi/$articleId"
                params={{ articleId: article.documentId }}
                className="block"
              >
                <article className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer h-full">
                  <h2 className="text-xl font-semibold text-white mb-3">
                    {article.title || 'Untitled'}
                  </h2>

                  {article.description && (
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {article.description}
                    </p>
                  )}

                  {article.content && (
                    <p className="text-gray-400 line-clamp-3 leading-relaxed">
                      {article.content}
                    </p>
                  )}

                  {article.createdAt && (
                    <p className="text-sm text-cyan-400/70 mt-4">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </article>
              </Link>
            ))}
          </div>
        ) : !error ? (
          <p className="text-gray-400">No articles found.</p>
        ) : null}
      </div>
    </div>
  )
}
