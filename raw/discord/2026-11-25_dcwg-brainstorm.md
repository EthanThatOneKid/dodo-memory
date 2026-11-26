---
title: "Discord #brainstorm — 2026-11-25"
source: "Discord REST API, channel 1558965777850302546, UTC timestamps"
channel_type: text
author:
  - "daniellacosse"
  - "paula"
  - "SpaceMonkey"
created: 2026-11-25
description: "Append-only capture of #brainstorm from 2026-11-25T22:29:33Z to 2026-11-26T03:28:21Z, pulled from the Discord REST API. 7 messages, 3 participants."
tags:
  - "deno"
  - "dodo"
  - "discord"
---

Append-only capture of `#brainstorm` in the Deno Core Working Group Discord, 2026-11-25T22:29:33Z to 2026-11-26T03:28:21Z. Pulled from the Discord REST API, not pasted from a client, so every timestamp below is the server's own UTC timestamp and every message carries its snowflake id. Message text is reproduced verbatim, including typos. Bot and webhook messages are omitted. Attachment and embed URLs are recorded as sent; they may expire.

---
**daniellacosse** — 2026-11-25T22:29:33Z (`1575277292861788232`)

> ↳ replying to SpaceMonkey: Not using it at all. For WebRTC I'm porting the built-in extension from my Deno fork (ext/webrtc / deno_webrtc), wired t

I guess dodo-bindgen doesn't really expose globals?

_(2026-11-25T22:29:58Z `1575277395135561729`)_

> ↳ replying to SpaceMonkey: Here is the plan; I haven't started it yet because I'm really trying to get everything perfect in the WebRTC fork first.

Your plan is probably worth a look from <@178483185468833793>

_(2026-11-25T22:30:35Z, edited 2026-11-25T22:30:44Z `1575277552640073749`)_

We may want to do it in batches - not the entire API in one PR


**paula** — 2026-11-26T01:53:53Z (`1575328713233662073`)

dodo will have webrtc? i was just today looking to make a polyfill for it with ffi


**daniellacosse** — 2026-11-26T01:55:51Z (`1575329208379646116`)

it's being worked on!


**SpaceMonkey** — 2026-11-26T03:27:17Z (`1575352219492941865`)

> ↳ replying to daniellacosse: I guess dodo-bindgen doesn't really expose globals?

My bad, AI helped me present a good reason... when I pushed back too, it stated the `--allow-ffi` was more of a concern. It's reply... `Right, it generates an importable module that loads a native lib through Deno.dlopen, so you need --allow-ffi --unstable-ffi (its example runs with --allow-all). You could still assign globalThis.RTCPeerConnection from userland as a polyfill, but FFI code runs with full trust, outside Deno's net permission checks, and it can't hook into structured clone or transfer (RTCCertificate, transferable RTCDataChannel) or worker globals. As a built-in extension, every datagram goes through --allow-net.`

_(2026-11-26T03:28:21Z `1575352487374749759`)_

> ↳ replying to daniellacosse: Your plan is probably worth a look from <@178483185468833793>

Not starting until this weekend (beyond anything it did already).
