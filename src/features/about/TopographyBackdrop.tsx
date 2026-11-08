export function TopographyBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Pendaran ambient tipis biru cobalt di belakang area potret */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 480px at 50% 24%, rgba(47, 84, 235, 0.14), rgba(11, 13, 18, 0) 72%)",
        }}
      />

      {/* Kontur topografi SVG statis tanpa beban CPU requestAnimationFrame */}
      <svg
        viewBox="0 0 1440 1200"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-90"
      >
        <g fill="none" strokeWidth="1">
          <path
            d="M-60 90 C 210 35, 420 145, 720 95 C 1020 45, 1210 155, 1500 95"
            stroke="rgba(112, 143, 255, 0.12)"
          />
          <path
            d="M-60 155 C 240 95, 460 220, 740 165 C 1010 110, 1230 220, 1500 160"
            stroke="rgba(255, 255, 255, 0.045)"
          />
          <path
            d="M-60 225 C 260 175, 490 295, 760 235 C 1030 175, 1250 285, 1500 225"
            stroke="rgba(255, 255, 255, 0.045)"
          />
          <path
            d="M-60 315 C 230 265, 480 390, 750 325 C 1010 260, 1230 375, 1500 315"
            stroke="rgba(112, 143, 255, 0.11)"
          />
          <path
            d="M-60 410 C 250 365, 510 480, 770 420 C 1030 360, 1250 475, 1500 415"
            stroke="rgba(255, 255, 255, 0.045)"
          />
          <path
            d="M-60 515 C 210 475, 460 580, 730 520 C 1000 460, 1220 565, 1500 505"
            stroke="rgba(255, 255, 255, 0.04)"
          />
          <path
            d="M-60 625 C 240 570, 500 685, 760 625 C 1020 565, 1240 675, 1500 615"
            stroke="rgba(112, 143, 255, 0.1)"
          />
          <path
            d="M-60 735 C 220 685, 470 795, 740 735 C 1010 675, 1230 780, 1500 725"
            stroke="rgba(255, 255, 255, 0.045)"
          />
          <path
            d="M-60 855 C 250 805, 500 915, 770 855 C 1040 795, 1260 905, 1500 845"
            stroke="rgba(255, 255, 255, 0.04)"
          />
          <path
            d="M-60 975 C 230 925, 480 1035, 750 975 C 1020 915, 1240 1025, 1500 965"
            stroke="rgba(112, 143, 255, 0.1)"
          />
          <path
            d="M-60 1095 C 260 1045, 520 1155, 780 1095 C 1040 1035, 1260 1145, 1500 1085"
            stroke="rgba(255, 255, 255, 0.04)"
          />

          {/* Pulau kontur tertutup tipis di kiri dan kanan */}
          <path
            d="M110 280 C 175 235, 280 245, 315 305 C 350 365, 275 430, 195 415 C 115 400, 45 325, 110 280 Z"
            stroke="rgba(112, 143, 255, 0.09)"
          />
          <path
            d="M1110 230 C 1185 190, 1300 215, 1325 280 C 1350 345, 1275 405, 1185 385 C 1095 365, 1035 270, 1110 230 Z"
            stroke="rgba(255, 255, 255, 0.045)"
          />
        </g>
      </svg>
    </div>
  );
}
