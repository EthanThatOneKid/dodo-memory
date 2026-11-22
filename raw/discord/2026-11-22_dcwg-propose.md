---
title: "Discord #propose — 2026-11-22"
source: "Discord REST API, channel 1559218298128695386, UTC timestamps"
channel_type: forum
author:
  - "daniellacosse"
  - "Ethan:Print\"Ethan\";:GoTo Ethan"
created: 2026-11-22
description: "Append-only capture of #propose from 2026-11-22T01:27:34Z to 2026-11-22T17:06:44Z, pulled from the Discord REST API. 13 messages, 2 participants, across 2 threads."
tags:
  - "deno"
  - "dodo"
  - "discord"
---

Append-only capture of `#propose` in the Deno Core Working Group Discord, 2026-11-22T01:27:34Z to 2026-11-22T17:06:44Z. Pulled from the Discord REST API, not pasted from a client, so every timestamp below is the server's own UTC timestamp and every message carries its snowflake id. Message text is reproduced verbatim, including typos. Bot and webhook messages are omitted. Attachment and embed URLs are recorded as sent; they may expire. Threads are grouped under their own headings below, and a forum post's body is the first message under its heading.

---
## Next steps to formalize community (thread 1572787160032084020)

**Ethan:Print"Ethan";:GoTo Ethan** — 2026-11-22T17:01:17Z (`1574107516491792486`)

> ↳ replying to daniellacosse: Or we just start from there and see how we feel. With admins being 1:1 on OSC

OSC? What’s that acronym?

_(2026-11-22T17:01:34Z `1574107588084240656`)_

Open collective?


**daniellacosse** — 2026-11-22T17:01:51Z (`1574107661073383457`)

open source collcetive, yeah


**Ethan:Print"Ethan";:GoTo Ethan** — 2026-11-22T17:04:45Z (`1574108391155040400`)

OSC sounds good. I additionally proposed a W3C community group because the barrier to entry seems relatively low, requiring a minimum of 5 individuals to join.

I’m new to W3C community group formation but I’d like to think that W3C as a web standards community would happily adopt Deno after the efforts put towards compatibility with web test suites and all.

_(2026-11-22T17:05:23Z `1574108548022009918`)_

OSC and W3C solve different things so they might complement each other rather.


**daniellacosse** — 2026-11-22T17:05:58Z (`1574108694151561278`)

yeah, I think W3C could still be in the cards - makes sense specifically around the subgoal of pursuing web standards

_(2026-11-22T17:06:06Z `1574108727404134616`)_

but we're not there yet


**Ethan:Print"Ethan";:GoTo Ethan** — 2026-11-22T17:06:21Z (`1574108793585934539`)

Sounds good 🙂


**daniellacosse** — 2026-11-22T17:06:37Z (`1574108860611039304`)

to start we should probably show up to various W3C meetings, i went to a few recently it was interesting

_(2026-11-22T17:06:40Z `1574108871448985731`)_

rep Deno

_(2026-11-22T17:06:44Z `1574108888997957895`)_

slash Dodo

---

## Snapshot release action (thread 1573872541154418782)

**daniellacosse** — 2026-11-22T01:27:34Z, edited 2026-11-22T02:27:02Z (`1573872541154418782`)

okay going through the existing release process machinery, I think this is the easiest path forward that minimizes changes:

- all the github actions are written in typescript and then run to generate the action config yml. first, I'll identify the core ts that generates the steps that build and sign the binary and separate them out
- then, we author a new, separate "snapshot release" action that is run manually, taking the ref we want to build as input
- the action creates a release build signed and dated with our certs and creates a github release named "Dodo Snapshot <date> <ref>" with the results attached

This approach allows us to build new binaries as we go without having to manage a whole new set of crates.

If a foundation does not materialize we delete the action and revert to Deno's standard release process, which will need to be updated at that time.

_(2026-11-22T01:35:00Z `1573874407930331239`)_

i could also hack together a rudimentary "install" script that pulls the appropriate bin from the appropriate snapshot release to add to ur path
