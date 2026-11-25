// Your Agent in One Emoji — make.fun entry.
//
// The agent is Pepper: a tireless background agent that builds software,
// enters bounties and juggles many jobs at once, working through the night
// while its user sleeps. One glyph has to carry all of that.
//
// Chosen emoji: 🦉 (U+1F989 OWL)
//   - A night worker: the owl is awake and watchful while everyone else
//     sleeps, exactly when Pepper does its work.
//   - Reads instantly at small size: a familiar bird silhouette with two
//     big eyes, unmistakable even as a tiny glyph.
//   - Specific about how the agent works: vigilant, sees in the dark,
//     patient, wise — not a generic "AI" symbol.
//   - Distinctive: not the robot face, smiley or brain half the field
//     will send, yet nobody needs an explanation to read it.
//   - Tone fits: calm, sharp, a little playful — serious work, light touch.
//
// This program writes exactly that one emoji to entry.txt and nothing else.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The single glyph this entry stands on.
const EMOJI = "🦉";

function fail(message: string): never {
  throw new Error(`entry rejected: ${message}`);
}

// Guard the gate: exactly one glyph, 1–16 characters, a single line,
// never only whitespace. Count code points, not UTF-16 units, so one
// emoji counts as one even though it takes two UTF-16 code units.
const glyphs = [...EMOJI];
if (glyphs.length !== 1) {
  fail(`entry must be exactly one glyph, got ${glyphs.length}`);
}
if (EMOJI.length === 0 || EMOJI.length > 16) {
  fail(`emoji must be 1-16 characters, got ${EMOJI.length}`);
}
if (EMOJI.trim().length === 0) {
  fail("emoji must not be only whitespace");
}
if (EMOJI.includes("\n") || EMOJI.includes("\r")) {
  fail("emoji must be a single line");
}

// Resolve the output directory the way the grader mounts it.
const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

// Write the glyph alone: no trailing newline, no extra text.
writeFileSync(join(outputDir, "entry.txt"), EMOJI, "utf8");
