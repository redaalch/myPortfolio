/**
 * Elegant dark-mode background with skewed violet streaks, dot pattern,
 * and radial glow — only renders in dark mode via data-theme="dark".
 *
 * Inspired by jatin-yadav05/elegant-dark-pattern, recolored to match the
 * portfolio's violet / purple accent palette.
 */
export default function DarkGradientBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden dark:block" aria-hidden="true">
      {/* ── Radial gradient base ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(100% 100% at 0% 0%, rgb(30, 15, 50) 0%, rgb(3, 0, 20) 100%)",
          mask: "radial-gradient(125% 100% at 0% 0%, rgb(0,0,0) 0%, rgba(0,0,0,0.22) 88%, rgba(0,0,0,0) 100%)",
          WebkitMask:
            "radial-gradient(125% 100% at 0% 0%, rgb(0,0,0) 0%, rgba(0,0,0,0.22) 88%, rgba(0,0,0,0) 100%)",
        }}
      >
        {/* Skewed fading violet streaks */}
        {[
          "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 20%, rgba(0,0,0,0) 36%, rgb(0,0,0) 55%, rgba(0,0,0,0.13) 67%, rgb(0,0,0) 78%, rgba(0,0,0,0) 97%)",
          "linear-gradient(90deg, rgba(0,0,0,0) 11%, rgb(0,0,0) 25%, rgba(0,0,0,0.55) 41%, rgba(0,0,0,0.13) 67%, rgb(0,0,0) 78%, rgba(0,0,0,0) 97%)",
          "linear-gradient(90deg, rgba(0,0,0,0) 9%, rgb(0,0,0) 20%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.42) 40%, rgb(0,0,0) 48%, rgba(0,0,0,0.27) 54%, rgba(0,0,0,0.13) 78%, rgb(0,0,0) 88%, rgba(0,0,0,0) 97%)",
          "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 17%, rgba(0,0,0,0.55) 26%, rgb(0,0,0) 35%, rgba(0,0,0,0) 47%, rgba(0,0,0,0.13) 69%, rgb(0,0,0) 79%, rgba(0,0,0,0) 97%)",
          "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 20%, rgba(0,0,0,0.55) 27%, rgb(0,0,0) 42%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.13) 67%, rgb(0,0,0) 74%, rgb(0,0,0) 82%, rgba(0,0,0,0.47) 88%, rgba(0,0,0,0) 97%)",
        ].map((maskVal, i) => (
          <div
            key={i}
            className="absolute inset-0 opacity-20"
            style={{
              background: "linear-gradient(rgb(139, 92, 246) 0%, rgba(139, 92, 246, 0) 100%)",
              mask: maskVal,
              WebkitMask: maskVal,
              transform: "skewX(45deg)",
            }}
          />
        ))}
      </div>

      {/* ── Subtle dot pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* ── Radial glow highlight ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
