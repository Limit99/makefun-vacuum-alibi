// The Vacuum's Alibi — make.fun entry.
// Writes one line, a robot vacuum's excuse for missing a spot, to
// /output/entry.txt. Deterministic and offline.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ALIBI =
  "I did not miss that corner. My sensors mapped it, my schedule respected it, and my battery and I agreed: that is where the spider pays rent, and I do not do evictions.";

function entryPath(): string {
  return join(process.env.OUTPUT_DIR ?? "/output", "entry.txt");
}

function main(): void {
  // The gate accepts UTF-8 text of 1 to 200 characters, not only white space.
  if (ALIBI.trim().length === 0 || [...ALIBI].length > 200) {
    throw new Error(`alibi out of range: ${[...ALIBI].length} characters`);
  }
  const path = entryPath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, ALIBI, "utf8");
  console.log(ALIBI);
}

main();
