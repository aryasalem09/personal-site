import { useMemo } from "react";

const glyphs = "01<>[]{}$#/@+-=~*:;_";

function createRows() {
  const rows: string[] = [];
  let seed = 189;

  for (let row = 0; row < 34; row += 1) {
    let line = "";

    for (let col = 0; col < 88; col += 1) {
      seed = (seed * 9301 + 49297) % 233280;
      const noise = seed / 233280;
      const gridPulse = row % 6 === 0 || col % 17 === 0;

      if (noise > 0.93) {
        line += glyphs[Math.floor(noise * glyphs.length) % glyphs.length];
      } else if (gridPulse && noise > 0.76) {
        line += ".";
      } else {
        line += " ";
      }
    }

    rows.push(line);
  }

  return rows;
}

export default function FaultyTerminalLite() {
  const rows = useMemo(() => createRows(), []);

  return (
    <div aria-hidden="true" className="faulty-terminal-lite">
      <div className="faulty-terminal-lite__glow" />
      <pre className="faulty-terminal-lite__glyphs">
        {rows.map((row, index) => (
          <span key={`terminal-row-${index}`}>{row}</span>
        ))}
      </pre>
    </div>
  );
}
