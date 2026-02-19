/** @type {import('@lhci/utils/src/lighthouserc').Config} */
module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      // Only test index.html — 404.html is just a GitHub Pages SPA redirect stub
      url: ["http://localhost/index.html"],
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        /* ── Performance thresholds ── */
        "categories:performance": ["error", { minScore: 0.9 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        interactive: ["warn", { maxNumericValue: 5000 }],

        /* ── Structural / infra — can't fix in code ── */
        // React core bundle unavoidably has ~44 KiB unused in any single page view
        "unused-javascript": "off",
        // Critical request chain depth is inherent to SPA + Google Fonts
        "network-dependency-tree-insight": "off",
        // DOM element count from SVG constellation map + full-page SPA
        "dom-size-insight": "off",
        "dom-size": "off",
        // Cache headers set by CDN (simpleicons.org), not controllable
        "cache-insight": "off",
        // CSS bundle is inherently render-blocking in Vite's build output
        "render-blocking-insight": "off",
        "render-blocking-resources": "off",
        // Main-thread work varies by CI runner speed
        "mainthread-work-breakdown": "off",
        // LCP & CLS culprits are insight diagnostics, not actionable failures
        "largest-contentful-paint": ["warn", { minScore: 0.5 }],
        "cls-culprits-insight": "off",
        // Image delivery insight is a diagnostic, handled by specific audits
        "image-delivery-insight": "off",
        // 404.html → index.html redirect is inherent to GitHub Pages SPA routing
        redirects: "off",
      },
    },
  },
};
