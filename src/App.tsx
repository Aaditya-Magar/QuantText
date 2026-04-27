import { useMemo, useState } from "react";
import {
  Asterisk,
  CaseSensitive,
  Check,
  Copy,
  Pilcrow,
  Scan,
  Trash2,
  WholeWord,
} from "lucide-react";
import { StatCard } from "@/components/lexicount/StatCard";
import { ThemeToggle } from "@/components/lexicount/ThemeToggle";

const SYMBOL_REGEX = /[^\p{L}\p{N}\s]/gu;

function analyze(text: string) {
  const trimmed = text.trim();
  const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
  const charsAll = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const symbols = (text.match(SYMBOL_REGEX) ?? []).length;
  return { words, charsAll, charsNoSpaces, symbols };
}

export default function App() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => analyze(text), [text]);

  const handleClear = () => setText("");

  const handleCopy = async () => {
    const payload = `QuantText Results
─────────────────
Words: ${stats.words}
Characters (with spaces): ${stats.charsAll}
Characters (no spaces): ${stats.charsNoSpaces}
Symbols: ${stats.symbols}`;
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="absolute right-[-120px] top-1/3 h-[360px] w-[360px] rounded-full bg-accent/20 blur-3xl animate-blob" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(var(--color-foreground)_1px,transparent_1px),linear-gradient(90deg,var(--color-foreground)_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-8">
        <div className="flex items-baseline">
          <span className="text-lg font-bold tracking-tight text-foreground">Quant</span>
          <span className="text-lg font-bold tracking-tight text-gradient-primary">Text</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-12">
        <section className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Analyze any text in <span className="text-gradient-primary">real time</span>
          </h1>
          <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
            Paste below to instantly measure words, characters and symbols. Built for writers,
            developers and anyone who counts.
          </p>
        </section>

        <section className="mt-10">
          <div className="relative rounded-3xl border border-border bg-card/60 p-2 shadow-soft backdrop-blur">
            <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here…"
              spellCheck={false}
              className="block min-h-[220px] w-full resize-y rounded-2xl bg-transparent p-5 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none sm:text-base"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Scan className="h-3.5 w-3.5" />
                Live analysis · no data leaves your browser
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClear}
                  disabled={!text}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-destructive/50 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!text}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-elegant disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy results"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Words"
            value={stats.words}
            hint="Whitespace-separated"
            icon={<WholeWord className="h-5 w-5" />}
            accent="primary"
          />
          <StatCard
            label="Characters"
            value={stats.charsAll}
            hint="Including spaces"
            icon={<Pilcrow className="h-5 w-5" />}
            accent="accent"
          />
          <StatCard
            label="Characters"
            value={stats.charsNoSpaces}
            hint="Excluding spaces"
            icon={<CaseSensitive className="h-5 w-5" />}
            accent="primary"
          />
          <StatCard
            label="Symbols"
            value={stats.symbols}
            hint="!@#$%^&*() etc."
            icon={<Asterisk className="h-5 w-5" />}
            accent="accent"
          />
        </section>

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          Built with care · QuantText runs entirely in your browser
        </footer>
      </main>
    </div>
  );
}