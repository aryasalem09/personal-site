import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Contribution = {
  date: string;
  count: number;
  level: number;
};

type CachedContributions = {
  timestamp: number;
  contributions: Contribution[];
};

type GitHubContributionCalendarProps = {
  username?: string;
  profileUrl?: string;
};

const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
const REFRESH_AGE = 60 * 60 * 1000;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const levelClasses = [
  "bg-muted",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/70",
  "bg-primary",
];

function isIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !ISO_DATE.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(`${value}T12:00:00Z`);
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function validateContributions(value: unknown): Contribution[] | null {
  if (!value || typeof value !== "object" || !Array.isArray((value as { contributions?: unknown }).contributions)) {
    return null;
  }

  const contributions: Contribution[] = [];
  let previousDate = "";

  for (const item of (value as { contributions: unknown[] }).contributions) {
    if (!item || typeof item !== "object") return null;
    const { date, count, level } = item as Record<string, unknown>;
    if (
      !isIsoDate(date) ||
      !Number.isInteger(count) ||
      (count as number) < 0 ||
      !Number.isInteger(level) ||
      (level as number) < 0 ||
      (level as number) > 4 ||
      date <= previousDate
    ) {
      return null;
    }

    contributions.push({ date, count: count as number, level: level as number });
    previousDate = date;
  }

  return contributions.length > 0 ? contributions : null;
}

function formatDate(date: string) {
  return DATE_FORMATTER.format(new Date(`${date}T12:00:00Z`));
}

function getCacheKey(username: string) {
  return `github-contribution-calendar:${username}`;
}

function readCache(username: string): CachedContributions | null {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(getCacheKey(username)) ?? "null");
    if (!parsed || typeof parsed !== "object") return null;
    const { timestamp, contributions } = parsed as Record<string, unknown>;
    const valid = validateContributions({ contributions });
    return typeof timestamp === "number" && Number.isFinite(timestamp) && valid ? { timestamp, contributions: valid } : null;
  } catch {
    return null;
  }
}

export function GitHubContributionCalendar({
  username = "aryasalem09",
  profileUrl = `https://github.com/${username}`,
}: GitHubContributionCalendarProps) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const cells = useRef<Array<HTMLButtonElement | null>>([]);

  const applyContributions = useCallback((next: Contribution[], timestamp: number) => {
    setContributions(next);
    setUpdatedAt(timestamp);
    setSelectedDate((current) => (current && next.some(({ date }) => date === current) ? current : next[next.length - 1].date));
    setFocusIndex((current) => Math.min(current, next.length - 1));
  }, []);

  const load = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`, {
        signal,
      });
      if (!response.ok) throw new Error("GitHub contribution data is temporarily unavailable.");
      const valid = validateContributions(await response.json());
      if (!valid) throw new Error("GitHub returned contribution data in an unexpected format.");

      const timestamp = Date.now();
      applyContributions(valid, timestamp);
      try {
        localStorage.setItem(getCacheKey(username), JSON.stringify({ timestamp, contributions: valid }));
      } catch {
        // Storage availability is optional; the live result remains usable.
      }
    } catch (reason) {
      if (!signal?.aborted && (reason as DOMException).name !== "AbortError") {
        const cached = readCache(username);
        if (cached && Date.now() - cached.timestamp <= CACHE_MAX_AGE) {
          applyContributions(cached.contributions, cached.timestamp);
        } else {
          setError(reason instanceof Error ? reason.message : "Unable to load GitHub contribution data.");
        }
      }
    } finally {
      setIsLoading(false);
    }

  }, [applyContributions, username]);

  useEffect(() => {
    const cached = readCache(username);
    if (cached && Date.now() - cached.timestamp <= CACHE_MAX_AGE) {
      applyContributions(cached.contributions, cached.timestamp);
      if (Date.now() - cached.timestamp < REFRESH_AGE) {
        setIsLoading(false);
        return;
      }
    }
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [applyContributions, load, username]);

  useEffect(() => {
    const refreshOnVisible = () => {
      if (document.visibilityState === "visible" && (!updatedAt || Date.now() - updatedAt >= REFRESH_AGE)) {
        void load(new AbortController().signal);
      }
    };
    document.addEventListener("visibilitychange", refreshOnVisible);
    return () => document.removeEventListener("visibilitychange", refreshOnVisible);
  }, [load, updatedAt]);

  const weeks = useMemo(() => {
    const result: Contribution[][] = [];
    contributions.forEach((contribution, index) => {
      const column = Math.floor(index / 7);
      (result[column] ??= []).push(contribution);
    });
    return result;
  }, [contributions]);
  const selected = contributions.find(({ date }) => date === selectedDate) ?? contributions[contributions.length - 1];
  const total = contributions.reduce((sum, { count }) => sum + count, 0);

  const moveFocus = (nextIndex: number) => {
    const bounded = Math.max(0, Math.min(nextIndex, contributions.length - 1));
    setFocusIndex(bounded);
    setSelectedDate(contributions[bounded]?.date ?? null);
    requestAnimationFrame(() => cells.current[bounded]?.focus());
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };
    if (event.key in moves) {
      event.preventDefault();
      moveFocus(index + moves[event.key]);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveFocus(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveFocus(contributions.length - 1);
    }
  };

  return (
    <section aria-labelledby="github-contributions-heading" className="border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">GitHub activity</p>
          <h3 id="github-contributions-heading" className="mt-2 text-lg font-semibold">
            {contributions.length > 0 ? `${total.toLocaleString()} contributions in the last year` : "Loading GitHub activity"}
          </h3>
          {contributions.length > 0 ? (
            <p className="mt-1 text-xs text-muted-foreground">
              {formatDate(contributions[0].date)} to {formatDate(contributions[contributions.length - 1].date)}
            </p>
          ) : null}
        </div>
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="quiet-link font-mono text-[10px] uppercase tracking-[0.14em]">@{username} on GitHub</a>
      </div>

      <p aria-live="polite" className="mt-4 min-h-5 text-sm text-muted-foreground">
        {selected ? `${formatDate(selected.date)}: ${selected.count} contribution${selected.count === 1 ? "" : "s"}.` : isLoading ? "Loading contribution history..." : "No contribution history is available."}
      </p>

      {error ? (
        <div role="alert" className="mt-4 border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
          <p>{error}</p>
          <button type="button" onClick={() => void load(new AbortController().signal)} className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground underline underline-offset-4">Retry</button>
        </div>
      ) : null}

      <div className="mt-4 overflow-x-auto pb-2" aria-label="GitHub contribution calendar">
        <div className="grid min-w-max auto-cols-max grid-flow-col gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={week[0]?.date ?? weekIndex} className="grid grid-rows-7 gap-1">
              {week.map((contribution, dayIndex) => {
                const index = weekIndex * 7 + dayIndex;
                const label = `${formatDate(contribution.date)}: ${contribution.count} contribution${contribution.count === 1 ? "" : "s"}`;
                return <button key={contribution.date} ref={(element) => { cells.current[index] = element; }} type="button" tabIndex={index === focusIndex ? 0 : -1} className={`size-5 rounded-[3px] ${levelClasses[contribution.level]} outline-none transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`} aria-label={label} title={label} onFocus={() => { setFocusIndex(index); setSelectedDate(contribution.date); }} onMouseEnter={() => setSelectedDate(contribution.date)} onClick={() => { setFocusIndex(index); setSelectedDate(contribution.date); }} onKeyDown={(event) => onKeyDown(event, index)} />;
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 text-[10px] text-muted-foreground">
        <p>Updated hourly through a public profile-data service. No login or token is used.</p>
        <div className="flex items-center gap-1" aria-label="Contribution intensity: low to high">
          <span>Less</span>{levelClasses.map((color, index) => <span key={color} className={`size-3 rounded-[2px] ${color}`} aria-hidden={index > 0 ? true : undefined} />)}<span>More</span>
        </div>
      </div>
    </section>
  );
}
