---
title: "Discord #brainstorm — 2026-11-24"
source: "Discord REST API, channel 1558965777850302546, UTC timestamps"
channel_type: text
author:
  - "lishaduck"
  - "daniellacosse"
  - "SpaceMonkey"
created: 2026-11-24
description: "Append-only capture of #brainstorm from 2026-11-24T22:09:50Z to 2026-11-25T18:39:45Z, pulled from the Discord REST API. 16 messages, 3 participants, across 1 thread."
tags:
  - "deno"
  - "dodo"
  - "discord"
---

Append-only capture of `#brainstorm` in the Deno Core Working Group Discord, 2026-11-24T22:09:50Z to 2026-11-25T18:39:45Z. Pulled from the Discord REST API, not pasted from a client, so every timestamp below is the server's own UTC timestamp and every message carries its snowflake id. Message text is reproduced verbatim, including typos. Bot and webhook messages are omitted. Attachment and embed URLs are recorded as sent; they may expire. Threads are grouped under their own headings below, and a forum post's body is the first message under its heading.

---
**lishaduck** — 2026-11-24T22:09:50Z (`1574909941737590845`)

> ↳ replying to daniellacosse: I'll give you write perms sometime today, i have to step away for a couple hours

I've got org perms to write to the board (switch the deno issues for the dodo issues), but I don't think I have repo write access? I can't edit the status of your issues. IDK, gh perms are always confusing to me.


**daniellacosse** — 2026-11-24T22:10:42Z (`1574910157966811320`)

> ↳ replying to lishaduck: I've got org perms to write to the board (switch the deno issues for the dodo issues), but I don't think I have repo wri

ugh weird i assumed they'd propagate, okay

_(2026-11-24T22:11:03Z `1574910247129063586`)_

can't address this right this second

\[system] 18 — 2026-11-24T22:55:01Z

**lishaduck** — 2026-11-24T23:52:36Z (`1574935805200175167`)

What's "Davey"s github?


**daniellacosse** — 2026-11-24T23:52:46Z (`1574935847558717533`)

<@371201159630815234>

_(2026-11-24T23:53:06Z `1574935930752737303`)_

(I don't know)


**lishaduck** — 2026-11-25T01:17:26Z (`1574957154375565428`)

Found it :)


**daniellacosse** — 2026-11-25T17:16:51Z (`1575198596956037131`)

btw <@634601287173931049> to what extent are you using dodo-bindgen? i don't even know if it'd be used for this


**SpaceMonkey** — 2026-11-25T18:26:07Z (`1575216030882467954`)

> ↳ replying to daniellacosse: btw <@634601287173931049> to what extent are you using dodo-bindgen? i don't even know if it'd be used for this

Not using it at all. For WebRTC I'm porting the built-in extension from my Deno fork (ext/webrtc / deno_webrtc), wired through deno_core ops like WebGPU, so RTCPeerConnection is a real global and doesn't need --allow-ffi. I'm planning on using the Brainwires/rtci fork (of webrtc-rs/rtc) (rtci is published on crates.io). With the fork, I'm aiming for full W3C spec compliance, measured against WPT and performance benchmarking. dodo-bindgen is great for userland Rust libs, but it can't provide the web API itself. Re: multiple data channels, ours carries any number over one SCTP association, and it runs the WPT WebRTC suites in CI. I hope that sounds okay. 🙂

_(2026-11-25T18:39:45Z, edited 2026-11-25T19:32:57Z `1575219460007010365`)_

Here is the plan; I haven't started it yet because I'm really trying to get everything perfect in the WebRTC fork first... https://gist.github.com/nightness/79682acb7394f15a989b5051fb94a13d (Gist edited 1:32PM CST)

---

## Permission propagation (thread 1574910157966811320)

**lishaduck** — 2026-11-24T22:55:01Z (`1574921313859014769`)

> ↳ replying to daniellacosse: ugh weird i assumed they'd propagate, okay

\[no text content]

_(2026-11-24T22:55:02Z `1574921317877293089`)_

Ok, I don't have access to the org settings to confirm this, but it seems org "member"s get the "base permission set", which is set to "read" by default. So uh I can read private repos, yay! lol that's super helpful.
You've got a few options:
1. You can set the the base permission set to write (probably the simplest, does require some trust, but all merges do require 2 reviews)
2. You can add whoever you want to the repo with whatever perms you want (more granular, less visible and transparent)
3. You can create teams like @dodo/triage, etc etc, put people in them, and give those teams access to the appropriate repos. (This is what I usually do, it's a lot of work but gets the granular nature of 2 but is clearer like 1 and in the long run, still saves work over 2 [not as much as 1, but the granularity could be worth it? It never has been for me, but I don't know your plans. Dodo+ Prolite? 😈].)


**daniellacosse** — 2026-11-24T23:03:10Z (`1574923361455312916`)

I'm very minimal process until we need more, I think #1 is fine for now

_(2026-11-24T23:03:31Z, edited 2026-11-24T23:03:55Z `1574923449657458844`)_

but #3 would is good to know, as (if) we scale

_(2026-11-24T23:05:44Z `1574924007969529937`)_

done - base permission changed to write!
