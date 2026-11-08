export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Pendaran atmosfer cobalt lembut di cakrawala */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 52% at 50% 44%, rgba(47, 84, 235, 0.16) 0%, rgba(17, 24, 39, 0.22) 48%, rgba(11, 13, 18, 0) 78%)",
        }}
      />

      {/* Kisi arsitektural tipis di latar belakang */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at 50% 42%, black 28%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 42%, black 28%, transparent 78%)",
        }}
      />

      {/* Siluet punggung bukit dan kontur topografi 2D ringan (< 4 KB) */}
      <svg
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 inset-x-0 w-full h-[78vh] min-h-[460px] text-[#0B0D12]"
      >
        <defs>
          <linearGradient id="hero-ridge-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A2236" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0B0D12" stopOpacity="0.92" />
          </linearGradient>
          <linearGradient id="hero-ridge-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#121724" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#0B0D12" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Garis kontur ketinggian tipis */}
        <path
          d="M0 440 Q 240 370 460 405 T 920 350 T 1440 420"
          fill="none"
          stroke="rgba(112, 143, 255, 0.16)"
          strokeWidth="1.2"
        />
        <path
          d="M0 495 Q 310 420 580 465 T 1060 410 T 1440 480"
          fill="none"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="1"
        />

        {/* Lapisan bukit terjauh */}
        <path
          d="M0 540 L180 455 L340 492 L540 375 L740 460 L960 342 L1170 438 L1310 402 L1440 465 L1440 760 L0 760 Z"
          fill="url(#hero-ridge-far)"
        />

        {/* Lapisan bukit tengah */}
        <path
          d="M0 605 L210 515 L410 562 L635 468 L835 545 L1085 452 L1285 520 L1440 488 L1440 760 L0 760 Z"
          fill="url(#hero-ridge-mid)"
        />

        {/* Siluet dasar menyatu sempurna ke Hero & About */}
        <path
          d="M0 680 Q 360 635 720 668 T 1440 652 L1440 760 L0 760 Z"
          fill="#0B0D12"
        />
      </svg>
    </div>
  );
}
