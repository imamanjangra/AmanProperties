export default function AmanLogo() {
  return (
    <svg
      viewBox="0 0 500 400"
      className="w-64 h-64"
      fill="none"
    >
      {/* Left A */}
      <path d="M120 310 V120 L170 80 L220 120 V310"
        stroke="#D4A017"
        strokeWidth="6"
      />

      {/* Left Buildings */}
      <path d="M135 310 V150" stroke="#111" strokeWidth="3"/>
      <path d="M155 310 V130" stroke="#111" strokeWidth="3"/>
      <path d="M175 310 V110" stroke="#111" strokeWidth="3"/>
      <path d="M195 310 V135" stroke="#111" strokeWidth="3"/>

      {/* Center Buildings */}
      <path d="M250 310 V70" stroke="#111" strokeWidth="3"/>
      <path d="M270 310 V60" stroke="#111" strokeWidth="3"/>
      <path d="M290 310 V80" stroke="#111" strokeWidth="3"/>
      <path d="M310 310 V90" stroke="#111" strokeWidth="3"/>

      {/* P Shape */}
      <path
        d="M340 310 V90 H410 V160 H340"
        stroke="#D4A017"
        strokeWidth="6"
      />

      {/* Right Buildings */}
      <path d="M365 310 V180" stroke="#111" strokeWidth="3"/>
      <path d="M390 310 V220" stroke="#111" strokeWidth="3"/>
      <path d="M420 310 V240" stroke="#111" strokeWidth="3"/>

      {/* Ground line */}
      <path
        d="M50 320 L230 250 L450 320"
        stroke="#111"
        strokeWidth="2"
      />

      <text
        x="250"
        y="380"
        textAnchor="middle"
        fontSize="40"
        fontFamily="Poppins"
        fill="#111"
      >
        Aman Properties
      </text>
    </svg>
  );
}