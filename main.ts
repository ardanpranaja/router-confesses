// router-confesses: one line in which a home Wi-Fi router excuses
// itself for dying at the climax of a movie. The joke is the router
// as a petty little gatekeeper: it already knows the twist, and it
// is withholding the ending until someone finally dusts it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. A single line, at most 200 characters, spoken in
// the router's own voice — smug, petty, and holding a secret.
const ENTRY_LINE =
  "I know who the killer is, and frankly none of you dust me often enough to deserve the ending.";

// The competition gate, straight from the kit: 1 to 200 characters,
// exactly one line, and more than whitespace.
const MAX_LENGTH = 200;

function validateEntry(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("entry line must not start or end with whitespace");
  }
  if (line.length > MAX_LENGTH) {
    throw new Error(
      `entry line must be at most ${MAX_LENGTH} characters, got ${line.length}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be exactly one line");
  }
}

// The grader reads /output/entry.txt by default; MAKEFUN_OUTPUT_DIR
// overrides it for local runs.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

validateEntry(ENTRY_LINE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, ENTRY_LINE, "utf8");
console.log(`Wrote ${outputPath} (${ENTRY_LINE.length} characters)`);
