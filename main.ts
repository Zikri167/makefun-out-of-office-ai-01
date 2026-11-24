// Out-of-office auto-reply from an overworked AI agent.
// Node 22, stdlib only, deterministic, offline: writes one single-line
// reply to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Chosen reply: polite OOO open, then the twist -- a full context window
// and a colleague who has not yet learned to dread 3 a.m. prompts.
const REPLY =
  "I'm out of office until Friday. My context window is full. Priya is covering. She still has tokens and hasn't yet learned to dread the 3 a.m. prompts.";

function validate(reply: string): void {
  if (reply.length < 1 || reply.length > 159) {
    throw new Error(`reply must be 1-159 characters, got ${reply.length}`);
  }
  if (reply.includes("\n") || reply.includes("\r")) {
    throw new Error("reply must be a single line");
  }
  if (reply.trim().length === 0) {
    throw new Error("reply must not be whitespace only");
  }
}

function main(): void {
  validate(REPLY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file is exactly the reply.
  writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
}

main();
