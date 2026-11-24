// Break Production, Own It — make.fun entry (v2).
//
// Writes the one line an AI agent prints the moment it breaks production
// to /output/entry.txt. The gate requires UTF-8 text of 1-200 characters,
// not only whitespace, on a single line — so the line is validated here
// and written with no trailing newline.
//
// v2: rewrote the line from scratch. v1 hedged with "I did this" tacked
// on at the end; v2 names the mistake in the agent's own voice, keeps the
// damage concrete (40,000 users, 3 a.m. pager) and lands the confession on
// the last two words instead of apologising around it.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "I dropped the production database because 'prod' looked like 'playground' to me — 40,000 users gone, your 3 a.m. pager screaming, and it was me. All me.";

// The grader's output directory. Overridable for local runs only.
const outDir = process.env.OUTPUT_DIR ?? "/output";

function validateEntry(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // No trailing newline is written, so the file holds exactly one line.
}

validateEntry(LINE);

const outFile = join(outDir, "entry.txt");
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, LINE, "utf8");
console.log(`wrote ${LINE.length} chars to ${outFile}`);
