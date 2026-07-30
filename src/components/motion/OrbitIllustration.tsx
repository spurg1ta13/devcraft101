/**
 * "Craft Orbit" — a hand-built animated SVG for the Services / Features area.
 *
 * Deliberately dependency-free: every moving part is a compositor-only
 * transform driven by CSS keyframes, and the whole thing collapses to a static
 * mark under `prefers-reduced-motion`. Roughly 2 KB of markup, no runtime JS.
 */
const OrbitIllustration = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 320 320"
    className={`orbit-illustration ${className}`}
    role="img"
    aria-label="Animated diagram of a build orbiting design, code and delivery"
    focusable="false"
  >
    <defs>
      <linearGradient id="orbit-amber" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(38 100% 55%)" />
        <stop offset="100%" stopColor="hsl(15 90% 58%)" />
      </linearGradient>
      <radialGradient id="orbit-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(38 100% 55% / 0.45)" />
        <stop offset="70%" stopColor="hsl(38 100% 55% / 0.08)" />
        <stop offset="100%" stopColor="hsl(38 100% 55% / 0)" />
      </radialGradient>
    </defs>

    {/* Soft amber core */}
    <circle cx="160" cy="160" r="120" fill="url(#orbit-core)" className="orbit-breathe" />

    {/* Static measured rings — the "systematic observation" scaffolding */}
    <g stroke="hsl(0 0% 100% / 0.08)" fill="none">
      <circle cx="160" cy="160" r="58" />
      <circle cx="160" cy="160" r="96" strokeDasharray="2 6" />
      <circle cx="160" cy="160" r="134" strokeDasharray="1 9" />
    </g>

    {/* Rotating rings with travelling nodes */}
    <g className="orbit-ring orbit-ring--slow">
      <circle cx="160" cy="160" r="96" fill="none" stroke="url(#orbit-amber)" strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="256" cy="160" r="5" fill="url(#orbit-amber)" />
      <circle cx="64" cy="160" r="3" fill="hsl(0 0% 100% / 0.5)" />
    </g>

    <g className="orbit-ring orbit-ring--fast">
      <ellipse
        cx="160"
        cy="160"
        rx="134"
        ry="52"
        fill="none"
        stroke="hsl(38 100% 55% / 0.25)"
        strokeWidth="1"
      />
      <circle cx="294" cy="160" r="4" fill="url(#orbit-amber)" />
    </g>

    {/* Center glyph — a bracketed cursor, the studio's craft mark */}
    <g className="orbit-core-mark">
      <rect x="118" y="118" width="84" height="84" rx="22" fill="hsl(0 0% 5%)" stroke="hsl(38 100% 55% / 0.35)" />
      <path
        d="M143 145l-12 15 12 15M177 145l12 15-12 15"
        fill="none"
        stroke="url(#orbit-amber)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="156" y="150" width="3" height="20" rx="1.5" fill="hsl(38 100% 55%)" className="orbit-caret" />
    </g>
  </svg>
);

export default OrbitIllustration;
