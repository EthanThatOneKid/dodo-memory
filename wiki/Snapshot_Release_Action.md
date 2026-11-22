---
"@type": schema:TechArticle
schema:name: Snapshot release action
schema:description: "daniellacosse's 2026-11-22 #propose thread on a manually-run snapshot release action for Dodo: separate the TypeScript that builds and signs the binary, build signed dated snapshots as GitHub releases named 'Dodo Snapshot <date> <ref>', and a possible install script."
wazoo:source: dodo
wazoo:thread: "1573872541154418782"
wiki:priority: medium
---

# Snapshot release action

On 2026-11-22 `daniellacosse` opened a `#propose` thread, "Snapshot release action", saying he was tackling the release CI. In `#brainstorm` the same day he linked the thread and said there are a lot of moving parts to the existing CI and he is hesitant to modify it too heavily. All times are UTC.

## The proposal

`daniellacosse` said he had gone through the existing release process machinery and thought the easiest path forward, minimizing changes, was:

- All the GitHub Actions are written in TypeScript and then run to generate the action config yml. First, identify the core TypeScript that generates the steps that build and sign the binary and separate it out.
- Then author a new, separate "snapshot release" action that is run manually, taking the ref to build as input.
- The action creates a release build signed and dated with the group's certs and creates a GitHub release named "Dodo Snapshot <date> <ref>" with the results attached.

This approach, in his view, allows the group to build new binaries as they go without having to manage a whole new set of crates. The characterization of the existing actions as TypeScript-generated is his, not a verified fact about the release machinery.

He added that he could also hack together a rudimentary "install" script that pulls the appropriate binary from the appropriate snapshot release to add to the path.

## If no foundation materializes

`daniellacosse` said that if a foundation does not materialize, the group should delete the action and revert to Deno's standard release process, which would need to be updated at that time.

## Where it stands

A proposal only. No decision is recorded in the capture, and no one else replied in the thread in it. The thread was still open at the end of the capture (2026-11-22T01:35:00Z).

## Related

- [CI and release cadence](CI_and_Release_Cadence.md): the release process this proposal avoids modifying, and the self-hosted runner discussion it follows from.
