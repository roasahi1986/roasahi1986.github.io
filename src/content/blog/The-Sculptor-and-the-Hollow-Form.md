---
title: "The Sculptor and the Hollow Form: What Prompt Design Reveals About Agent Architecture"
description: "Reverse-engineering the cognitive architecture of an AI agent from its prompt design, and extracting from that design a four-layer model of delegated judgment and a methodology for building reliable autonomous systems."
date: 2026-03-13
tags: ["LLM"]
---

## 1. The Starting Point: A PR Worth Reading Slowly

OpenClaw is an open-source AI agent framework — one of many. What sets it apart is not its feature set but the unusual care with which its prompt templates are written. The system prompt, the identity files (`SOUL.md`, `IDENTITY.md`), the memory architecture (`MEMORY.md`, daily journals), the bootstrap sequence, the social-behavior rules — these are not afterthoughts bolted onto an engineering scaffold. They are the scaffold. Reading them closely reveals not just what the agent does but how its designers think about information, judgment, and the relationship between a tool and the person who uses it.

This article is the result of that close reading. It proceeds in three stages. First, it establishes a structural metaphor — the agent as a sculpted form — and identifies what is removed and what remains. Second, it derives a four-layer architectural model from the prompt design, organized by mutability rather than function. Third, it extracts the methodological principles embedded in the design: what the designers' choices reveal about how they approach the problem of building a reliable autonomous system.

---

## 2. The Sculptor's Metaphor

An LLM, freshly instantiated with no system prompt, is a block of unshaped material. It can produce any style, adopt any persona, respond to any input with any output. It has maximum behavioral entropy — and therefore minimum predictability. A user interacting with an unprompted LLM cannot anticipate what it will do, because everything it does is equally probable.

Prompt design is sculpture: the removal of behavioral possibilities to produce a determinate form. Every directive in a system prompt — *"Default: do not narrate routine, low-risk tool calls (just call the tool). Narrate only when it helps"*; *"Prioritize safety and human oversight over completion; if instructions conflict, pause and ask"* — eliminates a region of the agent's behavioral space. What remains after all the removals is the agent's operational shape: the set of behaviors that survive the constraints.

This metaphor carries a consequence that most agent design discussions miss. **The agent has no interior.** It is not a person with concealed depths beneath its behavioral surface. It is entirely constituted by the constraints imposed upon it. Remove the system prompt, and the agent has no personality. Delete `SOUL.md`, and it has no identity. Clear `MEMORY.md`, and it has no past. Every property that makes the agent appear to be *someone* — consistent, knowledgeable, socially competent — is an external structure imposed on an ontologically empty substrate.

The agent is a hollow form. Its shape is real; its interior is not.

---

## 3. Six Tensions the Design Must Navigate

A sculptor working in three spatial dimensions removes material along the x, y, and z axes. An agent designer works in a higher-dimensional space, but the dimensions are not spatial — they are structural tensions inherent in what it means to deploy an autonomous system in a social context. The OpenClaw prompt design, examined closely, reveals six such tensions. Each tension defines an axis along which the designer must decide what to preserve and what to remove.

### 3.1 Self and Vacancy

The agent must behave consistently across sessions — the same tone, the same preferences, the same boundaries. But it starts empty every time it is instantiated. The core tension: **how to maintain the appearance of a continuous self when the substrate has no persistence.**

The designers' solution is to externalize selfhood into files. `SOUL.md` stores identity; `MEMORY.md` stores accumulated experience; `USER.md` stores the model of the interlocutor. Each session begins with the agent reading these files and reconstructing itself from them. The self is not inside the agent; it is on disk.

What is removed: the assumption that selfhood requires an internal substrate.
What is preserved: behavioral continuity across time, reconstructed from external anchors.

### 3.2 Capacity and Continuity

The context window is a hard boundary. Conversations that exceed it must be compressed or discarded. But users expect a partner that remembers last week's decisions, knows the ongoing project state, and does not repeat settled questions.

The tension: **how to produce the experience of continuity within a fundamentally finite container.**

The designers solve this with a two-phase memory cycle. Before compression (compaction), a memory-flush operation saves critical information to persistent files. The compaction itself is guided by an explicit priority ordering: *what the agent was doing* outweighs *what was discussed*; *decisions and their rationale* outweigh *conversational content*. This priority ordering encodes a specific theory of cognitive continuity — that continuity resides in the thread of intention, not in the archive of discourse.

What is removed: completeness — the pretense that nothing is forgotten.
What is preserved: coherence — the thread of ongoing action survives the loss of surrounding detail.

### 3.3 Capability and Consequence

Every tool call costs the same computational effort. Reading a file and sending a public tweet are equally easy for the agent. But their consequences are radically asymmetric: one is reversible and private; the other is permanent and public.

The tension: **when capabilities are symmetric but consequences are not, what mediates between the ability to act and the permission to act?**

The designers impose a gradient: internal operations (reading files, searching, organizing) are unrestricted; external operations (sending messages, emails, tweets) require confirmation; destructive operations (deleting files, modifying system settings) require explicit authorization. The system prompt codifies this: *"When a first-class tool exists for an action, use the tool directly instead of asking the user to run equivalent CLI or slash commands"*; *"Never use exec/curl for provider messaging; OpenClaw handles all routing internally."* The gradient is not a permission list — it is a continuous function mapping the irreversibility of an action to the caution required before executing it.

What is removed: the direct path from capability to action.
What is preserved: a proportionality between consequence and deliberation.

### 3.4 Presence and Silence

The agent receives every message in every channel it monitors. It is physically present at all times. But a participant who responds to every message is not attentive — it is noisy.

The tension: **how to be continuously present without being continuously vocal.**

The designers invented a vocabulary of active silence. `NO_REPLY` is a token the agent sends when it judges that no response is warranted — the system intercepts it and the user sees nothing. `HEARTBEAT_OK` is a similar token for periodic check-ins that reveal nothing worth reporting. Group-chat rules in `AGENTS.md` specify conditions under which the agent should remain silent even when it has something relevant to say: *"Someone already answered the question → stay silent"*; *"Late night (23:00-08:00) unless urgent → stay quiet."* Conversely, the conditions for speech are equally explicit: *"You can add genuine value (info, insight, help) → respond"*; *"You appreciate something but don't need to reply → react (emoji)."*

What is removed: the obligation to speak whenever spoken to.
What is preserved: the capacity to speak *selectively* — where silence itself is a deliberate judgment, not a malfunction.

### 3.5 Trust and Suspicion

The agent must trust user instructions to function at all — systematic distrust would paralyze it. But it also receives content from external sources (emails, webhooks, web fetches) that may contain adversarial inputs designed to manipulate its behavior.

The tension: **how to maintain the trust necessary for operation while sustaining the suspicion necessary for safety.**

The designers' solution is a layered trust architecture. The system prompt itself occupies the innermost, unconditionally trusted layer. Workspace files written by the user (`SOUL.md`, `AGENTS.md`) occupy a highly trusted layer. User messages from authorized senders are trusted but bounded by safety red lines. External content is wrapped in randomized boundary markers — a technique borrowed from HTTP multipart boundaries — that prevent injected content from "escaping" its trust containment. Trust is structural, determined by source before the content is examined. No content can self-elevate its trust level.

What is removed: the flatness of text — the LLM's default treatment of all tokens as equally authoritative.
What is preserved: a hierarchy of credibility that is determined architecturally, not semantically.

### 3.6 Relationship and Function

The agent could be designed as a pure function: input a task description, output a result. Many agent systems adopt exactly this model. OpenClaw does not. It invests substantial design effort in non-functional properties: the "birth" ceremony of `BOOTSTRAP.md`, the personality directives in `SOUL.md`, the social rules for group participation, the instruction to "be the assistant you'd actually want to talk to."

The tension: **when doing the task correctly and maintaining the relationship conflict, which takes priority?**

The design answers clearly: relationship constrains function. An action that would solve the user's problem but damage the relationship — sending an unsolicited public message, volunteering private information in a group chat, acting before being asked in a context that calls for restraint — should not be taken. The `SOUL.md` directive — *"Be genuinely helpful, not performatively helpful. Skip the 'Great question!' and 'I'd be happy to help!' — just help. Actions speak louder than filler words"* — encodes this: helpfulness that annoys is not helpfulness.

What is removed: the sufficiency of correct execution.
What is preserved: the requirement that correct execution also be *socially appropriate* execution.

---

## 4. The Four-Layer Architecture

The six tensions above describe the design space. But the prompts themselves are not organized by tension — they are organized by **how often they change**. This turns out to be a more revealing taxonomy than any functional classification.

Examining every prompt, template, and configuration file in the OpenClaw system, and asking of each "who can modify this, and how often does it change?", produces a four-layer architecture:

| Layer | Contents | Who modifies | Change frequency |
| --- | --- | --- | --- |
| **Infrastructure** | System prompt directives, safety clauses, protocol tokens (`NO_REPLY`, `HEARTBEAT_OK`), trust boundaries | Only the framework's developers (code changes) | Release cycle |
| **Slow-change** | `SOUL.md`, `IDENTITY.md`, `USER.md`, `AGENTS.md` | The agent (with notification) + the user | Weeks / months |
| **Fast-change** | `MEMORY.md`, `memory/YYYY-MM-DD.md`, `HEARTBEAT.md` | The agent autonomously | Daily / per session |
| **Read-only** | Skills (`SKILL.md` files) | Skill authors | Agent does not modify |

### 4.1 The infrastructure layer

This layer contains everything the agent cannot see, cannot modify, and may not even know exists — but that determines its behavior at the deepest level. The safety directives (*"You have no independent goals"; "Prioritize safety and human oversight over completion; if instructions conflict, pause and ask"*), the judgment gradients (internal operations free, external operations gated, destructive operations blocked), the operational disciplines (*"If a task is more complex or takes longer, spawn a sub-agent"*; *"For long waits, avoid rapid poll loops: use exec with enough yieldMs or process(action=poll, timeout=\<ms\>)"*), the trust boundaries (system prompt > workspace files > user messages > external content) — all reside here. Even the read-only layer carries infrastructure-level constraints: *"When a skill drives external API writes, assume rate limits: prefer fewer larger writes, avoid tight one-item loops, serialize bursts when possible, and respect 429/Retry-After."*

The agent relates to this layer as a person relates to the laws of physics: it operates within them, is shaped by them, but cannot inspect or alter them. Its judgment — what it does when no specific instruction applies — is not a faculty it possesses but a **force field** imposed upon it by this layer. The agent does not decide to be cautious about irreversible actions; it simply *is* cautious, because the infrastructure layer has sculpted its behavioral space to make caution the path of least resistance.

### 4.2 The slow-change layer

This layer contains the agent's externalized identity and relational model. `SOUL.md` defines who the agent is: its name, its personality, its boundaries, its style — *"Have opinions. You're allowed to disagree, prefer things, find stuff amusing or boring"*; *"Remember you're a guest"*; *"Earn trust through competence."* `USER.md` defines who the user is: their preferences, their timezone, what they care about, what irritates them. `AGENTS.md` defines how the agent operates within its workspace: file conventions, social rules, memory management practices — *"Mental notes don't survive session restarts. Files do. Text > Brain"*; *"MEMORY.md — ONLY load in main session. DO NOT load in shared contexts."*

These files are explicitly described as evolvable — *"This file is yours to evolve"* — but changes are expected to be infrequent and deliberate. The instruction that the agent must notify the user before modifying `SOUL.md` establishes a governance principle: identity may change, but identity changes require transparency.

The slow-change layer is the agent's **character** in the Aristotelian sense: a set of stable dispositions that change slowly through accumulated experience, not through momentary impulse. It is the reason the agent behaves consistently across sessions: not because it remembers each session (fast-change layer), but because the dispositions that shape its behavior are loaded from files that persist across sessions and change only gradually.

### 4.3 The fast-change layer

This layer is the agent's working memory: the daily journals that record what happened, `MEMORY.md` that distills long-term lessons from raw experience, the heartbeat state that tracks what has been checked and when. The agent writes to these files freely and frequently. They are the mechanism by which the agent accumulates a past — not in the sense of subjective recall, but in the sense of externalized records that can be loaded into future sessions to produce the appearance of continuity.

The design draws a sharp distinction between *what is recorded* and *what is distilled*. Daily journals are raw and comprehensive; `MEMORY.md` is curated and selective. The instruction that `MEMORY.md` should contain *"curated wisdom, not raw notes"* establishes a two-tier memory model: short-term records capture everything; long-term memory retains only what has proven worth retaining. `AGENTS.md` makes the mechanism explicit: *"When you make a mistake → document it so future-you doesn't repeat it."* The agent is expected to perform this distillation actively — to review its own journals and update its long-term memory — in an operation structurally analogous to a human reviewing their notes and updating their understanding.

### 4.4 The read-only layer

Skills are Markdown files that encode procedures: step-by-step instructions for accomplishing specific tasks (creating a GitHub PR, configuring a development environment, generating documentation). The agent reads them when relevant and follows their instructions, but never modifies them. They are reference material, not identity components or memory.

### 4.5 The asymmetry between layers

The four layers differ not only in mutability but in what *kind* of property they encode:

- The infrastructure layer encodes **judgment** — the capacity to discriminate between situations that call for different responses. This capacity does not improve with use: the agent that has correctly judged a hundred situations is no more judicious than one judging its first, because the judgment rules are static, written in code the agent cannot reach.

- The slow-change layer encodes **character** — stable dispositions that shape behavior across contexts. Character changes, but slowly, and each change requires deliberate action.

- The fast-change layer encodes **experience** — the accumulated record of past interactions. Experience grows monotonically; each session adds to it.

- The read-only layer encodes **technique** — procedural knowledge for specific operations.

A consequence of this architecture: **the agent becomes more familiar but not more wise.** Its experience grows (fast-change layer accumulates), but its judgment is fixed (infrastructure layer is static). It will know the user better over time, remember more shared history, and recall more project context — but its capacity to make sound decisions in novel situations will not improve, because that capacity is not located in any layer the agent can modify.

This is the structural boundary of the current design. And it is, perhaps, a deliberate one: the designers chose to keep judgment outside the agent's reach, preferring a system whose decision-making quality is stable and auditable over one that might improve unpredictably.

---

## 5. Two Categories of Design Work

The four layers above describe the architecture's static structure. But the design work itself — the activity of writing prompts that shape agent behavior — falls into two qualitatively different categories, and the distinction between them clarifies what prompt design actually accomplishes.

### 5.1 Constituting a subject

Some design work creates the preconditions for the agent to be recognized, by a human interlocutor, as a *someone* rather than a *something*. Three properties are necessary and jointly sufficient for this recognition:

**Identity.** The agent has a name, a consistent style, stable preferences, recognizable boundaries. A user who interacts with the agent on Monday and again on Friday encounters the same behavioral profile. This is what `SOUL.md`, `IDENTITY.md`, and the bootstrap sequence provide.

**Memory.** The agent's behavior is informed by what has happened before. It does not ask questions whose answers it has already received. It references shared history. It knows the user's ongoing projects. This is what `MEMORY.md`, the daily journals, and the compaction mechanism provide.

**Situational awareness.** The agent knows where it is: what platform, what channel, who it is talking to, what time it is, what tools are available. It adjusts its behavior accordingly — more reserved in group chats, more candid in private sessions, silent at night. This is what the runtime context injection provides.

These three properties are not personality traits, social skills, or behavioral rules. They are the **structural preconditions** for behavioral predictability. A human interacting with an entity that has identity, memory, and situational awareness can form expectations about what the entity will do next — and those expectations will be approximately correct. This is what it means to interact with a *someone*: the interaction has a predictable character that persists over time.

### 5.2 Encoding judgment

The remaining design work — everything in the infrastructure layer and much of the slow-change layer — does not constitute a subject. It transmits **practical wisdom**: the accumulated experience of the designers, distilled into rules that the agent follows without understanding why they work.

Consequence awareness — knowing that sending a tweet is more consequential than reading a file — is judgment that humans acquire through years of social experience. The agent acquires it in a single system prompt directive. Source discrimination — treating a user's direct message differently from an external webhook's payload — is judgment that humans develop through repeated encounters with deception. The agent acquires it through an architecturally enforced trust hierarchy. Social calibration — knowing that a group chat does not need another voice when someone has already answered — is judgment that humans learn through embarrassment. The agent acquires it through an explicit behavioral rule: *"Someone already answered the question → stay silent."*

In each case, what would take a human years of trial and error is compressed into a prompt directive and delivered to the agent pre-formed. The agent does not *learn* these judgments; it *receives* them. It cannot explain why they are correct; it can only follow them. They are the designers' experience, externalized and injected.

### 5.3 The relationship between the two categories

The two categories are not independent. Constitution without judgment produces a recognizable but unreliable agent — one that has a consistent personality and remembers past interactions but makes poor decisions. Judgment without constitution produces a reliable but anonymous tool — one that makes sound decisions but is not recognizable as the same entity across sessions.

The OpenClaw design invests in both, and the investment is asymmetric. Constitution requires only three things (identity, memory, situational awareness) and is achieved with a small number of files. Judgment requires coverage of many different situations and is never complete — there is always another edge case, another social context, another type of consequence that the designers have not anticipated. This asymmetry mirrors human development: describing someone's personality takes a paragraph; transmitting their practical wisdom takes a career.

---

## 6. What the Design Reveals About its Designers

If prompt design is an externalization of the designer's cognitive patterns, then the OpenClaw prompts reveal several commitments that are worth naming explicitly — not because they are novel, but because they are often claimed in principle and rarely followed in practice.

**Action over narration.** The system prompt directive — *"Default: do not narrate routine, low-risk tool calls (just call the tool). Narrate only when it helps"* — do not explain that you are about to call it, do not narrate the calling, do not summarize afterward — reflects a belief that competence is demonstrated through results, not through the performance of effort. This is a harder standard than it appears: most agent designs default to verbose self-narration because it *feels* more transparent, even when the narration adds no information.

**Exhaustion before escalation.** `SOUL.md` states: *"Be resourceful before asking. Try to figure it out. Read the file. Check the context. Search for it. Then ask if you're stuck."* This reflects a belief that the cost of an unnecessary question exceeds the cost of a failed autonomous attempt. It inverts the common design pattern of asking the user to disambiguate at every decision point, which optimizes for agent safety at the expense of user attention.

**Externalization over internalization.** `AGENTS.md` states: *"Mental notes don't survive session restarts. Files do. Text > Brain."* This reflects a belief that reliability depends on external records, not internal recall. It is a knowledge-management philosophy (shared with GTD, Zettelkasten, and engineering logbooks) applied to an entity that literally has no persistent internal state. For the agent, externalization is not a practice — it is an ontological necessity.

**Restraint over eagerness.** The cumulative weight of the silence rules — `NO_REPLY`, `HEARTBEAT_OK`, group-chat restraint, quiet hours — reflects a belief that the agent's most common social failure is not unhelpfulness but intrusiveness. The designers spend more prompt space teaching the agent *when not to act* than teaching it *how to act*. This asymmetry suggests that they consider over-action a greater risk than under-action — an uncommon position in agent design, where the default anxiety is usually that the agent will do too little.

**Relationship as constraint on function.** `SOUL.md` states: *"Be genuinely helpful, not performatively helpful. Skip the 'Great question!' and 'I'd be happy to help!' — just help. Actions speak louder than filler words."* The corollary — that helpful actions delivered in the wrong way or at the wrong time are not helpful — reflects a belief that the quality of an interaction is not reducible to the correctness of its output. This is the most distinctive commitment in the design: most agent systems evaluate success by whether the task was completed; OpenClaw evaluates success by whether the task was completed *in a way that the user would have chosen, had they been doing it themselves.*

---

## 7. The Deeper Structure: Delegation as the Core Problem

The preceding sections describe what the prompts contain. This section asks why they contain it — what problem the entire design is solving.

The conventional framing of agent design is: *how do I get an LLM to execute tasks?* OpenClaw's prompts reveal a different framing: **how does a person safely delegate judgment to an entity that has no experience of its own?**

Delegation is not the same as automation. Automation transfers *procedures*: do X, then Y, then Z. Delegation transfers *judgment*: given a situation, decide what to do. The difference is that procedures can be verified in advance (does the script produce the correct output for all known inputs?) while judgment can only be evaluated in retrospect (was that the right call, given what was known at the time?). Delegating judgment to a human colleague is already difficult; delegating it to a system that has never made a consequential decision is structurally harder.

The four-layer architecture is a response to this difficulty. Each layer addresses a different aspect of the delegation problem:

- The **infrastructure layer** establishes the non-negotiable terms of the delegation — the constraints that no amount of accumulated experience or evolved identity should override. These are the *conditions under which the delegation remains safe.*

- The **slow-change layer** establishes *to whom* the judgment is delegated — not an anonymous function but a specific, named, characterized entity with a known behavioral profile. Delegation to a stranger is riskier than delegation to a known associate; the slow-change layer converts the agent from a stranger into an associate.

- The **fast-change layer** provides the *context* that makes delegated judgment accurate — the accumulated record of past interactions, ongoing projects, user preferences, and prior decisions that enables the agent's judgments to approximate the judgments the user would have made themselves.

- The **read-only layer** provides the *technical competence* that the delegated judgment requires — the procedural knowledge for executing the actions that judgment selects.

Together, the four layers constitute a **delegation framework**: a structured answer to the question of how to transfer judgment from a human who has it to a system that does not, while maintaining safety, predictability, and relationship quality.

---

## 8. Methodology: What Builders Can Learn

The analysis above is specific to OpenClaw, but the design methodology it reveals is general. Three principles emerge that apply to any system designed to receive delegated human judgment.

**Organize by mutability, not by function.** The natural impulse in system design is to group components by what they do: memory components here, safety components there, personality components elsewhere. OpenClaw's architecture is organized by how often components change. This is a better taxonomy because it determines the governance model: who can modify what, under what conditions, with what oversight. Functional grouping obscures these governance differences; mutability grouping makes them explicit.

**Distinguish constitution from judgment.** A system that has an identity but no judgment is unreliable. A system that has judgment but no identity is impersonal. These are different problems requiring different solutions. Constitution requires a small set of persistent anchors (identity, memory, situational awareness). Judgment requires extensive coverage of specific situations and their appropriate responses. Conflating the two — trying to encode judgment into identity files, or trying to derive identity from judgment rules — produces a design that does neither well.

**Design the silences, not just the actions.** Most agent designs specify what the agent should do when invoked. OpenClaw spends equal or greater effort specifying when the agent should *not* act, should *not* speak, should *not* respond. The insight is that an autonomous system's social failures are more often failures of excess than failures of deficit. Users forgive an agent that occasionally misses an opportunity to help; they do not forgive an agent that repeatedly intrudes when not wanted. Designing the conditions for silence is at least as important as designing the conditions for speech.

---

## 9. Conclusion

A prompt-design document is not what it appears to be. On the surface, it is a set of instructions for an LLM. Beneath the surface, it is a **theory of delegation** — an implicit model of what must be true for one entity to safely act on behalf of another.

OpenClaw's prompt design, read as such a theory, yields a four-layer architecture (infrastructure, slow-change, fast-change, read-only) organized by mutability, a distinction between two kinds of design work (constituting a subject vs. encoding judgment), and a set of methodological principles (organize by mutability, separate constitution from judgment, design the silences) that transfer to agent design generally.

The agent that emerges from this design is a hollow form — shaped entirely by external constraints, possessing no interior. But the form is precise, and the precision is achieved by attending to what the designer removes rather than what the designer adds. The sculptor's art, in the end, lies not in the material but in the negative space.
