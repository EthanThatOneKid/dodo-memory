/**
 * The whole-tree gates: a forum post in a capture still in the fold queue is
 * not yet owed a page, so it must not fail the threads gate; the same post
 * unqueued must fail it. The other gates may fail on a minimal fixture, so
 * these assert only on whether "threads" is among the failed gates.
 */

import { assert } from "@std/assert";
import { runGates } from "./gates.ts";

const FORUM = "1559218298128695386";

/** A capture in the connector's own shape, with one heading per thread. */
function capture(threads: Array<[string, string]>): string {
  const blocks = threads.map(([id, name]) => `## ${name} (thread ${id})\n\n**andy** — a message\n`)
    .join(
      "\n---\n\n",
    );
  return `---\ntitle: "Discord #propose — 2026-10-16"\n` +
    `source: "Discord REST API, channel ${FORUM}, UTC timestamps"\n` +
    `channel_type: forum\n---\n\nbody\n\n---\n${blocks}`;
}

/** A wiki page in the shape the guard allows, with no thread anchor. */
function page(name: string): string {
  return `---\n"@type": schema:TechArticle\nschema:name: ${name}\nschema:description: d\n---\n\n# ${name}\n`;
}

async function tree(files: Record<string, string>): Promise<string> {
  const root = await Deno.makeTempDir();
  for (const [path, text] of Object.entries(files)) {
    const dir = path.split("/").slice(0, -1).join("/");
    if (dir) await Deno.mkdir(`${root}/${dir}`, { recursive: true });
    await Deno.writeTextFile(`${root}/${path}`, text);
  }
  return root;
}

function wikiConfig(): string {
  return ["wiki:", "  input: wiki", "lint:", "  broken_links: error", ""].join("\n");
}

function cursor(pending: string[]): string {
  const entries = pending.map((capturePath) =>
    `    {\n      "capture": "${capturePath}",\n      "venue": "dodo-propose",\n      "messages": 1,\n      "offset": 0,\n      "stalls": 0\n    }`
  ).join(",\n");
  return `{\n  "_pending": [\n${entries}\n  ]\n}\n`;
}

Deno.test("a forum post in a queued capture does not fail the threads gate", async () => {
  const root = await tree({
    "wiki.yml": wikiConfig(),
    "wiki/Deno.md": page("Deno"),
    "raw/discord/2026-10-16_dodo-propose.md": capture([["20", "Rust Academy?"]]),
    "raw/discord/.cursor": cursor(["raw/discord/2026-10-16_dodo-propose.md"]),
  });
  try {
    const failed = await runGates(root);
    assert(!failed.includes("threads"), `threads must pass for a queued post, failed: ${failed.join(", ")}`);
  } finally {
    await Deno.remove(root, { recursive: true });
  }
});

Deno.test("the same post unqueued fails the threads gate", async () => {
  const root = await tree({
    "wiki.yml": wikiConfig(),
    "wiki/Deno.md": page("Deno"),
    "raw/discord/2026-10-16_dodo-propose.md": capture([["20", "Rust Academy?"]]),
  });
  try {
    const failed = await runGates(root);
    assert(failed.includes("threads"), `threads must fail for an unqueued post, failed: ${failed.join(", ")}`);
  } finally {
    await Deno.remove(root, { recursive: true });
  }
});

Deno.test("the skip is per capture, not a blanket pass", async () => {
  const root = await tree({
    "wiki.yml": wikiConfig(),
    "wiki/Deno.md": page("Deno"),
    "raw/discord/2026-10-16_dodo-propose.md": capture([["20", "Rust Academy?"]]),
    "raw/discord/2026-10-17_dodo-propose.md": capture([["21", "Killer app"]]),
    "raw/discord/.cursor": cursor(["raw/discord/2026-10-16_dodo-propose.md"]),
  });
  try {
    const failed = await runGates(root);
    assert(
      failed.includes("threads"),
      `threads must fail for the unqueued post, failed: ${failed.join(", ")}`,
    );
  } finally {
    await Deno.remove(root, { recursive: true });
  }
});
