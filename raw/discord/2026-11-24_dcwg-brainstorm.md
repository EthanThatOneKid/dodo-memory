---
title: "Discord #brainstorm — 2026-11-24"
source: "Discord REST API, channel 1558965777850302546, UTC timestamps"
channel_type: text
author:
  - "SpaceMonkey"
  - "daniellacosse"
  - "lishaduck"
  - "CaptainLach"
created: 2026-11-24
description: "Append-only capture of #brainstorm from 2026-11-24T13:46:58Z to 2026-11-24T19:54:41Z, pulled from the Discord REST API. 61 messages, 4 participants."
tags:
  - "deno"
  - "dodo"
  - "discord"
---

Append-only capture of `#brainstorm` in the Deno Core Working Group Discord, 2026-11-24T13:46:58Z to 2026-11-24T19:54:41Z. Pulled from the Discord REST API, not pasted from a client, so every timestamp below is the server's own UTC timestamp and every message carries its snowflake id. Message text is reproduced verbatim, including typos. Bot and webhook messages are omitted. Attachment and embed URLs are recorded as sent; they may expire.

---
**SpaceMonkey** — 2026-11-24T13:46:58Z (`1574783393063903352`)

> ↳ replying to daniellacosse: <@634601287173931049> did a first pass on the generated issues - let me know if there's anything in denext that lines up

I assigned the last 4 to myself. Working on the PR's... The first two here require a fork of [Laufey](https://github.com/littledivy/laufey).
[attachment] image.png (https://cdn.discordapp.com/attachments/1558965777850302546/1574783392720093254/image.png?ex=6b06e6d2&is=6b059552&hm=8ad68e0f63710a77b175f6448ddb56e0fe3d7a274cda1de2ac53ee0cd206d3fb&)


**daniellacosse** — 2026-11-24T13:48:07Z, edited 2026-11-24T13:48:56Z (`1574783678595203175`)

<@1559636246362333259> is working on the fork, we can assign those to them i guess


**SpaceMonkey** — 2026-11-24T13:50:22Z, edited 2026-11-24T13:50:31Z (`1574784248584474717`)

Okay, do you need anything from me then? The last three there, and Summer's suggestions regarding permissions is still experimental; needs testing.


**daniellacosse** — 2026-11-24T13:51:00Z (`1574784406340767755`)

and ts 7 may take a discussion, iirc we were talking about switching ts engines <@1491274297761861784> (just woke up ill go find that convo)


**SpaceMonkey** — 2026-11-24T13:52:14Z (`1574784714785427507`)

No hurry, I'll be around for a few hours


**lishaduck** — 2026-11-24T13:55:16Z (`1574785481521102859`)

Yeah so tsgo is very much not designed with embeddability in mind, so I'd just thrown out that there's the tsrs project but we all agreed that it was still pretty new and it was probably worth holding off on any migration for now.

_(2026-11-24T13:56:16Z `1574785731317207172`)_

The sync\-types stuff iiuc isn't tied to the ts engine, and imo is a pretty important improvement either way, as it allows unbundling typescript.

_(2026-11-24T13:59:13Z `1574786474262528071`)_

So we could potentially do that and drop ts from the core at all, just loading tsgo or tsrs as an extension if `deno check` is desired. (This doesn't affect running ts, just checking it, Deno uses swc under the hood iirc)


**SpaceMonkey** — 2026-11-24T14:16:16Z (`1574790763928354838`)

TypeScript 7.1 is supposed to change this and be embeddable, or that was the plan a few months ago. In Denext I just run it as a sidecar... I had the AI write up a description of how we've set that up. https://gist.github.com/nightness/662ebb2c211b00806ea9a925e3169e2b 

Edit... Or I guess 7.1 is out TODAY! What are the odds? 😄 https://devopen.io/typescript-7-1-release-date/

_(2026-11-24T14:19:05Z, edited 2026-11-24T14:25:18Z `1574791473180835892`)_

Nothing official yet, though 🙁
Edit: `the newest version is the nightly 7.1.0-dev.20261124.1, and the RC tag still points at 7.0.1-rc.` 🙁
https://github.com/microsoft/TypeScript/milestone/225 - Still a few open


**daniellacosse** — 2026-11-24T14:46:57Z (`1574798487890034859`)

> ↳ replying to SpaceMonkey: I assigned the last 4 to myself. Working on the PR's... The first two here require a fork of [Laufey](https://github.com

okay hi hello - does this include the issues under "No Owner" in the "Current Work" tab, or is it just what's in needs review?


**SpaceMonkey** — 2026-11-24T14:47:48Z, edited 2026-11-24T14:47:57Z (`1574798700520145018`)

They were listed as no owner on the board


**daniellacosse** — 2026-11-24T14:50:22Z (`1574799346963316766`)

in your list I'm only seeing issues that are currently in the needs review tab: https://github.com/orgs/are-we-dodo-yet/projects/2/views/6

so i'm just confirming that the "ready" issues with no owner, none of those currently have relevant denext work
[embed] Dodo Roadmap • are-we-dodo-yet Roadmap for Dodo: the community Deno fork.

_(2026-11-24T14:51:10Z, edited 2026-11-24T14:51:18Z `1574799549002678273`)_

that second list is short it's just:
- support bun packages
- OPFS support
- gamepad api support
- automate pulling upstream deno changes


**SpaceMonkey** — 2026-11-24T14:52:01Z (`1574799759510867981`)

```Close — of the Ready ones with no owner, three have nothing (#24 OPFS, #25 Gamepad, #2 upstream sync), but two partly overlap:
- #32 webview network restrictions: we have a top-level navigation guard — navigations stay on the app's origin, other http(s) links open in the system browser, with an origin allowlist. It doesn't filter subresource/fetch requests, so it'd be a starting point, not the whole thing.
- #13 Bun packages: we have Deno.SQL, which implements Bun's Bun.sql API, and deno test supports the Vitest/Jest API (most of what bun:test is). No bun: specifiers or Bun.* globals though, so only relevant if that card ever gets picked up.```


**daniellacosse** — 2026-11-24T14:52:28Z (`1574799874761953322`)

> ↳ replying to SpaceMonkey: Okay, do you need anything from me then? The last three there, and Summer's suggestions regarding permissions is still e

sounds like we can start with openRoot and the permission broker? I'll assign those to you


**SpaceMonkey** — 2026-11-24T14:52:42Z (`1574799934157225985`)

That works 🙂

_(2026-11-24T14:54:33Z `1574800400521887816`)_

<@400711308141658112> Did you know the fork is on Deno 2.9.7, but 2.9.8 is released?

_(2026-11-24T14:55:16Z `1574800581141205163`)_

If you want I can also open a PR to catch up with the upstream Deno branch

_(2026-11-24T14:55:36Z `1574800664662507571`)_

Or at least to the 2.9.8 commit


**daniellacosse** — 2026-11-24T14:55:45Z (`1574800702872748073`)

it's just a partial emudra fix, but we should do that anyway

_(2026-11-24T14:55:56Z `1574800748078833677`)_

thank you!!


**SpaceMonkey** — 2026-11-24T14:56:00Z (`1574800765577601117`)

np 🙂


**daniellacosse** — 2026-11-24T15:03:32Z (`1574802658563457190`)

> ↳ replying to lishaduck: The sync\-types stuff iiuc isn't tied to the ts engine, and imo is a pretty important improvement either way, as it allo

oh, I'd for some reason thought deno had its own custom ts implementation, thank goodness

there's a script for updating swc dependencies: https://github.com/are-we-dodo-yet/dodo/blob/b00f96f63ed0959c0d3b38d14f668febd59ea410/auxiliary/ast/scripts/update_swc_deps.ts#L16

here's the docs on that: https://github.com/are-we-dodo-yet/dodo/blob/b00f96f63ed0959c0d3b38d14f668febd59ea410/auxiliary/ast/README.md?plain=1#L53


**lishaduck** — 2026-11-24T15:04:11Z, edited 2026-11-24T15:04:15Z (`1574802822229393419`)

> ↳ replying to SpaceMonkey: <@400711308141658112> Did you know the fork is on Deno 2.9.7, but 2.9.8 is released?

Lach had said there was some problematic "fixes" upstream... lemme hunt that down. Would be nice for Git to say we're up\-to\-date tho


**daniellacosse** — 2026-11-24T15:05:10Z (`1574803071542759556`)

yeah he'd said the emudra fix was incomplete, which is why I wasn't worried about it - but we should be showing the latest version regardless

_(2026-11-24T15:05:23Z `1574803123552387306`)_

let us know if you find anything else

_(2026-11-24T15:06:14Z `1574803338481107025`)_

> ↳ replying to daniellacosse: oh, I'd for some reason thought deno had its own custom ts implementation, thank goodness  there's a script for updating

sounds like updating swc is separate from supporting sync-types, that that part is more involved?


**lishaduck** — 2026-11-24T15:07:07Z (`1574803559902486529`)

> ↳ replying to daniellacosse: sounds like updating swc is separate from supporting sync-types, that that part is more involved?

So Deno uses swc for stripping types *and* bundles a fork of TS 6.x for type checking.


**daniellacosse** — 2026-11-24T15:07:14Z (`1574803592584634379`)

ahh


**lishaduck** — 2026-11-24T15:07:25Z (`1574803637891244033`)

We don't want to change how types are stripped, that'd be a different discussion

_(2026-11-24T15:07:53Z `1574803753410891916`)_

But we want to decouple how it's checked by removing all of the forked functionality.

_(2026-11-24T15:08:20Z `1574803865977495705`)_

rn it's just to magically inject some files, which we can handle by just writing them to disk, which is what sync\-types does

_(2026-11-24T15:08:39Z `1574803946382295214`)_

\*just is pretty load bearing but it's mostly to magically inject some files

_(2026-11-24T15:09:58Z `1574804280362274887`)_

Obviously that's less magical but it means all of the "normal" ts tooling (tseslint, oxlint\-tsgolint, tsrs\-lint, flint) can work with it :)

_(2026-11-24T15:10:45Z `1574804476718481459`)_

Also means we don't have to maintain our own fork of tsgo (which is much more painful than for the js version), and we can decouple to allow things like `@effect/tsgo` or `tsrs` to be used out\-of\-the\-box.


**daniellacosse** — 2026-11-24T15:20:30Z (`1574806929551790081`)

Got it - I can update the ticket to reflect this. A major undertaking to be sure

_(2026-11-24T15:25:15Z `1574808123003375657`)_

I'll leave it with no owner for now


**lishaduck** — 2026-11-24T15:30:29Z (`1574809442090881065`)

Is it worth switching the board from status fields to [native statuses](https://github.blog/changelog/2026-11-23-issue-statuses-and-repository-boards-are-in-public-preview/?)?
[embed] Issue statuses and repository boards are in public preview - GitHub... Open or closed doesn’t always tell you where an issue stands. You can now use more specific statuses to give your team and agents shared context about what’s in flight…


**daniellacosse** — 2026-11-24T15:32:40Z (`1574809991859278017`)

i wish!! there are some issues in there from the deno project that we can't edit

_(2026-11-24T15:33:32Z `1574810210361671712`)_

so this lets us set status on issues we don't own


**lishaduck** — 2026-11-24T15:40:40Z, edited 2026-11-24T15:43:16Z (`1574812002629582941`)

It looks like there's 4\-3 of which are bugs in desktop. Would it be unreasonable to suggest copying them into the appropriate repos, so we can generally control our backlog?


**daniellacosse** — 2026-11-24T15:43:30Z (`1574812717657759767`)

as long as we link back to the original issue - the hope was to be able to go back to the original issue and inform people that the bug was fixed in dodo

we'd also lose continuity with any updates on the source ticket, but linking back would work there too


**lishaduck** — 2026-11-24T15:44:30Z (`1574812969970442243`)

> ↳ replying to daniellacosse: as long as we link back to the original issue - the hope was to be able to go back to the original issue and inform peop

Yeah, I think it's probably *impolite* at least to put process into Deno's repo, so we'd need our own copy eventually.


**daniellacosse** — 2026-11-24T15:46:45Z (`1574813533512794223`)

Mm, true. But if our changes are being upstreamed it's important to keep those links around at least.

_(2026-11-24T15:47:20Z `1574813684214267955`)_

We can drop the "this was fixed in dodo" step

_(2026-11-24T15:48:24Z `1574813949327577192`)_

Unfortunately i believe such a task is quite annoying for me rn because i only have access to an ipad atm

_(2026-11-24T15:48:44Z `1574814034581000324`)_

But ill make a note


**lishaduck** — 2026-11-24T16:00:20Z (`1574816952189460571`)

I mean, I'd be happy to do it!


**daniellacosse** — 2026-11-24T16:00:48Z (`1574817069894213653`)

Oh, sure! You have write access?


**lishaduck** — 2026-11-24T16:01:08Z (`1574817155495493643`)

> ↳ replying to daniellacosse: Oh, sure! You have write access?

I mean, anybody can file an issue :)


**daniellacosse** — 2026-11-24T16:01:36Z (`1574817273225416736`)

True that: go for it. I thought you meant also updating all the fields


**lishaduck** — 2026-11-24T16:01:55Z (`1574817350543216742`)

> ↳ replying to daniellacosse: True that: go for it. I thought you meant also updating all the fields

I'd be happy to do that too, but yeah I'd need perms for that :)

_(2026-11-24T16:30:44Z `1574824606156595283`)_

Filed those issues!


**daniellacosse** — 2026-11-24T16:30:55Z (`1574824650314088541`)

I'll give you write perms sometime today, i have to step away for a couple hours


**SpaceMonkey** — 2026-11-24T17:48:55Z (`1574844281292591195`)

[Dodo #39 - chore: sync upstream Deno v2.9.8](https://github.com/are-we-dodo-yet/dodo/pull/39) includes the complete eMudhra fix: rustls-webpki 0.103.16 plus webpki-roots/root-certs 1.0.10, with no 0.26 shim left in Cargo.lock, so cargo audit is clean on those advisories.


**daniellacosse** — 2026-11-24T18:21:11Z (`1574852401612071076`)

> ↳ replying to lishaduck: Filed those issues!

invite sent!

_(2026-11-24T18:21:40Z `1574852520382177384`)_

> ↳ replying to SpaceMonkey: [Dodo #39 - chore: sync upstream Deno v2.9.8](https://github.com/are-we-dodo-yet/dodo/pull/39) includes the complete eMu

probably something <@178483185468833793> will want to take a look at


**CaptainLach** — 2026-11-24T19:51:26Z (`1574875112740487210`)

We already had no references to eMudhra, our implementation is even more complete that upstream deno implementation

_(2026-11-24T19:52:41Z `1574875428592685260`)_

As for aws-lc (cryptography) - I doubt your update will pass test in its current implementation, we should merge the updates first: https://github.com/are-we-dodo-yet/dodo/pull/20
[embed] build: update dependencies by CertainLach · Pull Request #20 · ar... Why?
Deno used dependency pinning too much, making it very hard to deal with depndency conflicts when embedding it. It would be much easier if it was using dependabot and latest-ish package version...

_(2026-11-24T19:54:41Z `1574875929581457488`)_

I will look into that, it seems very wrong that there is an UAF in safe code?..
https://github.com/denoland/deno/pull/37026
[embed] fix(core): keep op contexts alive until the isolate is disposed by ... Fixes #37025
The bug
With V8 150.x, FunctionTemplateInfo keeps raw pointers to the CFunction overloads passed to FunctionTemplate::build_fast. deno_core stores those overloads in each OpCtx (OpCtx:...
