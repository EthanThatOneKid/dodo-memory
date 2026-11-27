---
title: "Discord #brainstorm — 2026-11-26"
source: "Discord REST API, channel 1558965777850302546, UTC timestamps"
channel_type: text
author:
  - "daniellacosse"
  - "SpaceMonkey"
created: 2026-11-26
description: "Append-only capture of #brainstorm from 2026-11-26T21:18:02Z to 2026-11-27T16:55:07Z, pulled from the Discord REST API. 11 messages, 2 participants."
tags:
  - "deno"
  - "dodo"
  - "discord"
---

Append-only capture of `#brainstorm` in the Deno Core Working Group Discord, 2026-11-26T21:18:02Z to 2026-11-27T16:55:07Z. Pulled from the Discord REST API, not pasted from a client, so every timestamp below is the server's own UTC timestamp and every message carries its snowflake id. Message text is reproduced verbatim, including typos. Bot and webhook messages are omitted. Attachment and embed URLs are recorded as sent; they may expire.

---
**daniellacosse** — 2026-11-26T21:18:02Z (`1575621683199475737`)

well, we are looking into locking down permissions on a per-extension basis. what would that entail?


**SpaceMonkey** — 2026-11-27T00:48:25Z, edited 2026-11-27T00:49:26Z (`1575674628242800720`)

> ↳ replying to daniellacosse: well, we are looking into locking down permissions on a per-extension basis. what would that entail?

I'm busy until Saturday, but I had the AI write up what per-extension permissions would take: https://gist.github.com/nightness/291ed7805f239099d2e37bc3ed0e8018

The gist recommends per-extension grants for every extension now, a per-native-extension process for real kernel enforcement, and integrated extensions whose I/O goes through Dodo's checks. It argues against treating in-process native code (linked or FFI/bindgen) as sandboxed, and against a seccomp/Landlock-restricted thread as a boundary.

Summary:
- **Today:** every extension checks one process-wide grant (the single `PermissionsContainer` in `OpState`, 86 call sites), so `--allow-net` applies to all of them.
- **Layer 1, a grant per extension:** a manifest per extension approved at load, its own container (user flags ∩ manifest) keyed by extension id, the caller's grant intersected too, and CLI/prompts that name the extension. Mostly mechanical; enough for JS/WASM, but only guardrails for native code, which can skip the checks.
- **Layer 2, kernel enforcement:** a host process per native extension applies a policy from the manifest (Landlock+seccomp, Seatbelt, AppContainer); ops go over IPC, data paths stay in the host, and a broker hands over fds for what a static policy can't express.
- **Hard parts:** Windows parity, process startup, crash/lifecycle handling, extensions that assume in-process `OpState`.
- **WebRTC:** already checks every socket and resolved host via `check_net`, so it fits both layers with no redesign.
- **Already built** in the Denext-Deno fork: the kernel side (Landlock/seccomp, Seatbelt, a broker, an exec gate). The host process and op proxy would be new.


**daniellacosse** — 2026-11-27T15:16:54Z, edited 2026-11-27T15:17:25Z (`1575893185761382432`)

> ↳ replying to SpaceMonkey: I'm busy until Saturday, but I had the AI write up what per-extension permissions would take: https://gist.github.com/ni

Mm - this would be a huge change and I think requires broader discussion, though the design sketched out here is not far off from where previous discussions have landed (multiple isolates communicating over IPC).

I think for now the crucial part is this: 

> WebRTC: already checks every socket and resolved host via `check_net`

As long as you're building WebRTC with permission checking mechanisms in place, it should be unblocked I believe

_(2026-11-27T15:17:58Z `1575893457518596107`)_

But someone with a deeper understanding can feel free to weigh in

_(2026-11-27T15:19:09Z `1575893754680705045`)_

That said, the point of my brining this up was to solve the FFI problem/concern

_(2026-11-27T15:19:32Z, edited 2026-11-27T15:19:44Z `1575893848779919492`)_

I think it would be cool to have the WebRTC implementation be an IRL demo of how deno-bindgen works, if possible

_(2026-11-27T16:33:57Z `1575912576879951983`)_

(if it's too late that's fine)


**SpaceMonkey** — 2026-11-27T16:44:20Z (`1575915192389341384`)

> ↳ replying to daniellacosse: Mm - this would be a huge change and I think requires broader discussion, though the design sketched out here is not far

Sorry, a million things going on atm... It's never too late... We can do that... We'll need a shim to handle the permission layer with the [rtci](https://github.com/Brainwires/rtci) library, which originated from [webrtc-rs/rtc](https://github.com/webrtc-rs/rtc) but is now far surpassing it, and I've decided to publish my own release under the new name (rtci). I'm strictly following all the RFC's for WebRTC. (AI wrote most of the remaining...)

The integrated approach is already done and tested in the Denext-Deno fork: WebRTC as a built-in extension, with every socket and resolved host checked by check_net. Putting it in Dodo cost me almost nothing, and it's just a draft PR. So for Dodo we can go the bindgen + shim route you described:

- The Rust side is the same WebRTC engine, built as a dodo-bindgen library.
- One permission gate: before the native side reaches any host or port (sockets, STUN/TURN servers, ICE candidates), it asks the JS shim, and the shim answers from Deno.permissions. No answer means no connection.
- Scoped FFI: it's loaded with --allow-ffi scoped to just that library, so --allow-net still limits what it can reach.
- Real globals: the shim installs RTCPeerConnection and friends.

It'd be a real-world demo of bindgen, with Dodo's permission model enforced.

I'll put it on its own branch that's only the bindgen + shim option, no runtime changes, so it's easy to review on its own. We'll also benchmark it against the built-in version (throughput, latency, connection setup, CPU, and memory), so the trade-off is measured.


**daniellacosse** — 2026-11-27T16:54:00Z (`1575917624347459595`)

Sounds good to me!

_(2026-11-27T16:54:39Z `1575917786960502836`)_

No worries on the timing, it's thanksgiving week over here and has been a bit crazy as well.

_(2026-11-27T16:55:07Z `1575917904614916298`)_

Not to mention i'm still ipad only *laughs until i cry*
