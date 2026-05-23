import { Badge } from "@/components/ui/badge";
import { featuredProjects, projects } from "@/content/github";

const rows = [
  ["status", "building"],
  ["focus", "projects / music / writing"],
  ["mode", "student developer"],
  ["stack", "react + tailwind + curiosity"],
];

export default function TerminalStatusPanel() {
  return (
    <aside className="terminal-status-panel" aria-label="Current site status">
      <div className="flex items-center justify-between border-b border-cyan-200/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-lime-300 shadow-[0_0_16px_rgba(190,242,100,0.7)]" />
          <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.24em] text-cyan-100/78">
            arya/lab
          </span>
        </div>
        <Badge variant="outline" className="border-cyan-200/20 text-cyan-100">
          live
        </Badge>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {rows.map(([label, value], index) => (
          <p key={label} className="terminal-status-panel__line" style={{ animationDelay: `${120 + index * 90}ms` }}>
            <span className="text-lime-200">{label}</span>
            <span className="text-slate-500">:</span>
            <span className="text-slate-100">{value}</span>
          </p>
        ))}
      </div>

      <div className="grid grid-cols-3 border-t border-cyan-200/10 text-center font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-slate-400">
        <div className="border-r border-cyan-200/10 px-2 py-3">
          <span className="block text-lg font-semibold text-cyan-100">
            {String(projects.length).padStart(2, "0")}
          </span>
          repos
        </div>
        <div className="border-r border-cyan-200/10 px-2 py-3">
          <span className="block text-lg font-semibold text-lime-100">
            {String(featuredProjects.length).padStart(2, "0")}
          </span>
          featured
        </div>
        <div className="px-2 py-3">
          <span className="block text-lg font-semibold text-slate-100">0</span>
          canvas
        </div>
      </div>
    </aside>
  );
}
