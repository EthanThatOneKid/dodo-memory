---
"@type": schema:TechArticle
schema:name: TypeScript 7 and type-aware tooling
schema:description: The 2026-10-17 to 2026-11-24 discussion of how a Deno fork keeps up with TypeScript 7, the Rust port tsrs, the sync-types decoupling proposal, and what type-aware linting needs, and why TypeScript upgrades fall outside Deno's promised maintenance.
wazoo:source: dodo
wiki:priority: low
---

# TypeScript 7 and type-aware tooling

A fork of Deno inherits Deno's TypeScript support as it stood at the fork point. This page records how `#general` participants discussed keeping up with TypeScript 7 and its Rust ports. Times are UTC.

## The gap

`lishaduck`, who described himself as a tooling maintainer, asked on 2026-10-17 whether the group had thought about TypeScript 7. He had been excited by a move in Deno 3 to a type-information mechanism he called `sync-types`, which would enable type-aware linting for Deno, and noted that if Dodo is forked from 2.9.7 it does not inherit that. `daniellacosse` said the group had not thought about it, that from what he knew it would not be trivial, and that he would add it to the roadmap if nobody objected. `w` said that as a decision item it belongs on the roadmap.

`lishaduck` clarified he was not saying the group should adopt `sync-types` wholesale, only that "something will need to be done," and that he does not think forking patches of forks is a healthy undertaking. `daniellacosse` observed that the upgrade sneakily feels like part of Deno's promised "12 months of maintenance and bug fixes" but is not, "so we're on our own," which he thought is why nobody, himself included, had raised it. The roadmap's far list now names V8 and TypeScript features among the dependency updates Dodo wants to be able to author; see [Dodo project roadmap](Project_Roadmap.md).

## tsrs

On 2026-10-20 `netop://ウィビ` shared a Cloudflare blog post introducing `tsrs`, described in its embed as a Rust port of TypeScript that is up to eight times faster and uses 70 percent less memory. `daniellacosse` linked its crates and told `lishaduck` it might be the way forward on future TypeScript support. The repository `oxc-project/tsrs` is described on GitHub as a "Rust port of the TypeScript 7 type checker"; read on 2026-10-29 it had about 2,500 stars and a push the day before.[^1] The speed and memory figures are the blog's, not checked here.

`lishaduck`'s view was that it is "pretty much ideal from a technical standpoint" for his tooling, and a decent option if the group stays with unforking, since there is no Go runtime to embed. He said he was watching how well it is stewarded, and guessed it will last because it serves `oxlint`, while noting it was brand new. `daniellacosse` agreed it was too early but worth watching. `CaptainLach` hoped its stewards would not "do anything stupid like bun," pointing to a post from Bun about language changes if TypeScript types become real, and `lishaduck` answered that it is in their best interest not to diverge much. A tangent followed about a library called Effect and an `ESLint` limitation that led its fans to fork the Go-based compiler to add checks; `CaptainLach` said he did not see why, since to him it is mostly web streams but worse. None of this bears on a decision.

## Ende plans to add it; Deno reverts the native compiler (2026-11-06 to 2026-11-07)

`netop://ウィビ` said on 2026-11-07 that after Ende's current round of fixes lands, he will look at adding TypeScript 7 to Ende. He noted Deno had started on a native TypeScript compiler and reverted it, linking [denoland/deno#37088](https://github.com/denoland/deno/pull/37088) and [#37057](https://github.com/denoland/deno/pull/37057): the first removes the native TypeScript compiler module, the second restores the in-process checker as the `deno check` backend, as the first step in rolling back the migration for compatible canary builds.[^2] That puts Ende's TypeScript 7 work after the port of Deno's remaining fixes, not alongside it. See [Ende](Ende_Runtime.md).

It shipped three days later: `netop://ウィビ` announced Ende release `v2026.11.10` on 2026-11-10, which adds TypeScript 7 type checking behind `--unstable-tsc7`. The GitHub API read on 2026-11-11 shows the release published 2026-11-10T02:43:12Z.[^3] See [Ende](Ende_Runtime.md).

## The sync-types decoupling proposal (2026-11-24)

On 2026-11-24 in `#brainstorm` the group returned to the type-checking question, prompted by `daniellacosse` noting that TypeScript 7 may take a discussion, since the group had talked about switching TypeScript engines. `lishaduck` said `tsgo` is "very much not designed with embeddability in mind," and that the `tsrs` project had been thrown out as an option but the group had agreed it was still pretty new and probably worth holding off on any migration for now.

His proposal instead was the `sync-types` work: it is not tied to the TypeScript engine, and in his view is a pretty important improvement either way, as it allows unbundling TypeScript. The group could potentially do that and drop TypeScript from the core at all, just loading `tsgo` or `tsrs` as an extension if `deno check` is desired. That would not affect running TypeScript, just checking it, since Deno uses `swc` under the hood, in his account.

`lishaduck` explained the current arrangement: Deno uses `swc` for stripping types and bundles a fork of TypeScript 6.x for type checking. The group does not want to change how types are stripped — that would be a different discussion — but wants to decouple how types are checked by removing all of the forked functionality. Right now, he said, the fork exists "just to magically inject some files," which `sync-types` handles by just writing them to disk instead. "Just" is pretty load-bearing, he added, but it is mostly that. The payoff he named: all of the "normal" TypeScript tooling (`tseslint`, `oxlint-tsgolint`, `tsrs-lint`, `flint`) can work with it, the group would not have to maintain its own fork of `tsgo` — which he said is much more painful than for the JavaScript version — and it could decouple to allow things like `@effect/tsgo` or `tsrs` to be used out of the box.

`daniellacosse` said he can update the ticket to reflect this, calling it "a major undertaking to be sure," and left it with no owner for now. See [Deno permission-model security](Deno_Permission_Model_Security.md) for the `openRoot` and permission-broker work assigned the same day.

## TypeScript 7.1 and embeddability (2026-11-24)

In the same thread `SpaceMonkey` said TypeScript 7.1 is supposed to change the embeddability picture — "or that was the plan a few months ago" — and that in Denext he just runs it as a sidecar, linking [a gist](https://gist.github.com/nightness/662ebb2c211b00806ea9a925e3169e2b) describing how that is set up. He then said 7.1 was out that day, before correcting himself: nothing official yet. As of 2026-11-24, by his account, the newest version is the nightly `7.1.0-dev.20261124.1`, the RC tag still points at `7.0.1-rc`, and [the 7.1 milestone](https://github.com/microsoft/TypeScript/milestone/225) still has a few open items. None of that was checked here.

## Open questions

- Whether Dodo adopts TypeScript 7, a Rust port, or stays on Deno's current support, and when.
- Whether type-aware linting is in scope. It is `lishaduck`'s interest, and nobody else weighed in.
- Who owns the decision. `w` called it a decision item; nobody has taken it.
- Who owns the `sync-types` work. `daniellacosse` said on 2026-11-24 he can update the ticket, but left it with no owner.

## Related

- [Dodo project roadmap](Project_Roadmap.md): the far goal of authoring its own dependency updates.
- [Rust core rewrite proposal](Rust_Core_Proposal.md): the rewrite that would change which dependencies matter.

## Sources

[^1]: [`oxc-project/tsrs`](https://github.com/oxc-project/tsrs), read through the GitHub API on 2026-10-29: described as a Rust port of the TypeScript 7 type checker, created 2026-10-01, about 2,500 stars, last pushed 2026-10-28.

[^2]: [denoland/deno#37057](https://github.com/denoland/deno/pull/37057), "revert: type-check with native tsc by default", read 2026-11-08: reverts #35938 to restore the in-process TypeScript checker for `deno check`. [denoland/deno#37088](https://github.com/denoland/deno/pull/37088), "revert: remove the native TypeScript compiler module": title and open state read through the GitHub API on 2026-11-08; its merged state was not read.

[^3]: [theende/ende `v2026.11.10`](https://github.com/theende/ende/releases/tag/v2026.11.10), read through the GitHub API on 2026-11-11: published 2026-11-10T02:43:12Z.
