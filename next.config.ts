import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Les icônes Lucide sont importées une par une plutôt qu'en bloc :
  // seules celles réellement utilisées atteignent le navigateur.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // En-têtes de sécurité. Vercel ne les ajoute pas tout seul.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
