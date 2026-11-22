---
"@type": schema:TechArticle
schema:name: Formalizing the community
schema:description: "The 2026-11-19 #propose thread on giving the Deno Core Working Group a formal structure: Ethan's four options, lishaduck's OpenCollective counter, the Open Collective admin question, the question of whether to apply for Open Collective or wait, and the poll planned after Fri Nov 20, 5pm PT."
wazoo:source: dodo
wazoo:thread: "1572787160032084020"
wiki:priority: high
---

# Formalizing the community

On 2026-11-19 Ethan (`Ethan:Print"Ethan";:GoTo Ethan`) opened a `#propose` thread, "Next steps to formalize community", saying things had been moving slowly, in part because the group has no proper channels to make group decisions. The questions he listed as undecided: who decides what LTS means, who runs the test suite and releases, who holds the repos and trademark, who talks to the Deno team, and who controls the money. Funding, he said, is basically blocked until the structure is figured out. He announced the thread in `#general` the same day. All times are UTC.

## Ethan's four options

- **W3C Community Group.** A public home for the LTS baseline and test suite. By Ethan's account it would not own a runtime, hold a trademark, or handle money, but would be a good start. He linked [AI-assisted proposal drafts](https://drive.google.com/drive/folders/1_umRmK5mO5Sci7Tg9SBO5rCsDadO_O0x) for it; the drafts themselves are not in the capture.
- **A nonprofit foundation of the group's own.** It could hold a trademark and money, but Ethan called it a complicated legal process.
- **An informal nonprofit board.** Elect a president, VP, treasurer, and secretary, and hold meetings: structure in place without the legal process.
- **Keep using the GitHub org issue board.** The mods of Dodo keep the [`are-we-dodo-yet` project board](https://github.com/orgs/are-we-dodo-yet/projects/2) up to date, which Ethan described as where the group is now: an interest group keeping things warm while Deno's foundation plays out, with mods posting regular polls and upholding what people vote for.

Ethan noted the group already has the `are-we-dodo-yet` org on GitHub and that the code lives there either way. He asked for concise replies — what the idea is, what problem it solves, who runs it, and who controls the money if there is any — and said a ✅ reaction on the post means agreement with a more formal structure in general, not a vote for any one option. He left the thread open until Fri Nov 20, 5pm PT, then planned a proper poll to narrow it down, and asked the participant at handle `400711308141658112` to run that poll.

## lishaduck's reply

`lishaduck` replied that setting up an OpenCollective would probably be a good idea soon, but that doing anything formal risks conflict with whatever foundation comes, and generally adds more bureaucracy than needed. In his view Dodo is not moving slowly for lack of enthusiasm: the core group of developers have had a lot of life recently, which he called completely normal and OK for open source, which comes "as-is, without warranty of any kind." He credited the participant at handle `178483185468833793` with doing some great work, and said the vast majority of open source functions like this. He added that there are many reasons, technical and not, why Node.js cannot be as agile as Deno, and that the legal team is certainly among them.

He added in a follow-up that this is not to say the topic is not good to bring up: it is most definitely an important topic to think about, especially with foundation talks stalling as they have. That stalling is his characterization; the Deno foundation effort itself is recorded in [Foundation outreach and Bart's reply](Foundation_Outreach.md).

## Open Collective: who approves spending?

On 2026-11-19 (23:40-23:43 UTC) `daniellacosse` asked whether Open Collective lets funds be managed only via administrators, saying he had hoped for a way for multiple community members to approve things the way a pull request is approved. `CaptainLach` answered that members can request and endorse, but approvals are on admins. `daniellacosse` then asked who the group is comfortable with as the admins managing those funds: 1:1 with the admins of this Discord, decided by vote, or simply starting from there, with admins 1:1 on Open Collective, and seeing how it feels.

`lishaduck` replied (2026-11-20T01:20:41Z) that in his mind the Dodo community is the Discord, and therefore the mods of the Discord are the mods of Dodo, adding that the people in the thread are the ones actually doing the work.

## Apply for Open Collective, or wait?

On 2026-11-21 (14:19-14:20 UTC) `daniellacosse` asked the thread's big question: whether the Deno foundation is going to happen, and whether the group should just go ahead and apply for Open Collective or wait a bit longer first. He floated applying and hoping they do not need it. `CaptainLach` answered that they should apply.

## OSC, W3C, or both?

On 2026-11-22 (17:01-17:06 UTC) `Ethan:Print"Ethan";:GoTo Ethan` asked what OSC is. `daniellacosse` answered: Open Source Collective. Ethan then proposed a W3C community group, saying the barrier to entry seems relatively low, requiring a minimum of 5 individuals to join, and that he is new to W3C community group formation but would like to think W3C as a web standards community would happily adopt Deno after the efforts put towards compatibility with web test suites. He added that OSC and W3C solve different things, so they might complement each other rather than compete.

`daniellacosse` agreed that W3C could still be in the cards, making sense specifically around the subgoal of pursuing web standards, but said "we're not there yet". Ethan agreed. `daniellacosse` then suggested that to start, the group should probably show up to various W3C meetings — he had gone to a few recently and found it interesting — to represent Deno, "slash Dodo".

## Where it stands

No option was chosen in the capture, and no poll result is in it. The thread was still open at the end of the capture (2026-11-22T17:06:44Z), with the poll due after Fri Nov 20, 5pm PT. No decision on Open Collective admins is recorded in the capture. The W3C community group option is back on the table as a complement to Open Collective, not a replacement, with showing up to W3C meetings as the suggested first step. The governance question it raises — who has authority to decide — was already open in [Foundation outreach and Bart's reply](Foundation_Outreach.md), and the funding side is in [Sustaining the fork](Fork_Sustainability.md).

## Related

- [Foundation outreach and Bart's reply](Foundation_Outreach.md): the Deno foundation effort whose stalling `lishaduck` cited.
- [Sustaining the fork](Fork_Sustainability.md): how the group proposed to pay for any of it, including the funding the structure question blocks.
- [Deno Core Working Group](Deno_Core_Working_Group.md): the group, which has no stated decision process.
- [Dodo project roadmap](Project_Roadmap.md): the board Ethan's fourth option would keep using.
