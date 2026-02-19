---
title: "Substance, Process, and the Turing Correspondence"
description: "Reducing a multi-agent architecture to one substance and three operations, and establishing its structural relationship to the Turing machine."
date: 2026-02-19
tags: ["LLM"]
---

## 1. Where the Prior Article Stopped

A companion article, *[An Ontology of Multi-Agent Systems](/blog/precision-as-information-completion/)*, reduces every entity in a multi-agent orchestration system to one of four primitives: **agent** (a configured reasoning capacity), **artifact** (a typed, persistent unit of information), **protocol** (a rule governing interaction between agents), and **context** (the assembled input to a specific agent invocation). Three infrastructure components serve these primitives: an artifact store for persistence, an agent runtime for instantiation and lifecycle management, and a protocol engine for state-machine execution. The article demonstrates that nine named roles in a software engineering lifecycle are nine configurations of these four primitives, not nine kinds of entity — and that the proliferation of entity types in conventional multi-agent designs is a symptom of classifying by function rather than by nature.

That analysis resolves the **structural** ontology: what kinds of things the system contains. It leaves unexamined the **process** ontology: what kinds of transformations occur between these things. The four primitives tell us the vocabulary of the system; they do not yet tell us the grammar. Two questions remain open. First: can the four structural primitives themselves be reduced further — do some of them turn out, on closer inspection, to be instances of others? Second: what is the relationship between this architecture and the foundational model of computation — the Turing machine — and what does that relationship reveal about the system's capabilities and limits?

---

## 2. Three Fundamental Operations

Every interaction in the system — every agent invocation, every protocol transition, every artifact state change — is an instance of exactly one of three operations:

**Read.** An agent consumes one or more artifacts as input. Information transfers from the persistent store into a transient context. The operation modifies the context — what the agent attends to — without modifying the artifacts themselves. Reading is how an agent gains access to the accumulated state of the system.

**Write.** An agent produces a new artifact, or modifies an existing artifact's content or status. Information transfers from a transient reasoning process into the persistent store. The operation modifies the store — the system's persistent state — without modifying the agent. Writing is how reasoning results become durable and available to other agents.

**Evaluate.** An agent judges whether a condition holds over one or more artifacts: Does this response satisfy the acceptance criteria? Has this negotiation round converged? Is this artifact internally consistent? Evaluation does not directly modify either the context or the store; it produces a **verdict** that governs control flow. Every protocol transition — every decision about what to do next — is an evaluation result.

These three operations are exhaustive and non-overlapping. Read transfers information inward (store → context). Write transfers information outward (reasoning → store). Evaluate produces control signals (artifacts → verdict). No interaction in the system falls outside these three; no interaction belongs to more than one.

### The convergent-editing protocol as read-evaluate-write triples

The convergent-editing protocol defined in the companion article decomposes entirely into these operations:

1. The lead agent **reads** the current draft artifact and the requirements artifact → **writes** a revised draft
2. Each critic agent **reads** the revised draft → **evaluates** each element against its criteria → **writes** a critique artifact
3. The synthesis agent **reads** all critique artifacts → **evaluates** which modifications conflict → **writes** a merged draft
4. The protocol engine **evaluates** whether any modifications were proposed → if none, the protocol terminates; if some, it loops to step 1

Every step is a read, a write, an evaluation, or a composition of these three in sequence. The protocol contains no operation that falls outside this vocabulary.

### Consequence for protocol representation

If every protocol step is a read-evaluate-write triple with conditional branching on evaluation results, then protocols are not arbitrary state machines. They are programs in a **domain-specific language with three verbs**: read, write, evaluate — with control flow determined by evaluation outcomes. A language with three verbs is far more tractable to validate (does this protocol access only the artifacts it should?), analyze (can this protocol deadlock?), and optimize (can these two reads be parallelized?) than a general-purpose state machine whose transitions can encode arbitrary logic.

---

## 3. Substance Monism: Artifact as the Sole Substance

The four-primitive architecture treats agent, artifact, protocol, and context as four distinct categories. But closer inspection reveals that three of the four are not independent substances — they are special cases of the fourth.

### Agent configurations are artifacts

An agent is defined by its configuration: a system prompt that constrains its attention and a tool set that extends its capabilities. This configuration is a typed, persistent unit of information. It possesses a schema (the structure of a valid agent configuration: prompt field, tool-list field, model-selection field). It possesses provenance (which human or agent authored it, when, based on what requirements). It possesses a status within a lifecycle (draft, active, deprecated). These are the three defining properties of an artifact, as established in the companion article. An agent configuration satisfies the definition of an artifact without remainder.

The agent *instance* — the running reasoning process — is not an artifact; it is ephemeral. But the specification from which the instance is created is an artifact, stored in the artifact store alongside requirements documents and architecture specifications. The "staffing agent" from the nine-role lifecycle is an agent that reads a task specification artifact and writes an agent configuration artifact. There is nothing ontologically special about the output it produces; it is an artifact like any other.

### Protocol definitions are artifacts

This was already established in Section 7 of the companion article. A protocol definition — the state machine that specifies triggering conditions, agent invocations, convergence criteria, and deadlock rules — is a structured, persistent unit of information with a schema, a provenance, and a status lifecycle. It resides in the artifact store and is subject to the same read-write-review cycle as any other artifact.

### Contexts are assemblies of artifacts

A context is not a persistent entity; it is an assembly composed at invocation time. Its components are: the agent's system prompt (an artifact), the set of relevant artifacts selected by the protocol (artifacts), and the conversation history (a sequence of prior inputs and outputs, which can be represented as artifacts). Context is not a fifth kind of thing alongside artifacts; it is a **selection and arrangement of existing artifacts** for a specific invocation.

### The reduction

The four structural primitives collapse to one. **Artifact** is the sole persistent substance in the system. What the companion article called "agents" are agent configuration artifacts plus the ephemeral process of executing them. What it called "protocols" are protocol definition artifacts plus the ephemeral process of executing them. What it called "contexts" are assemblies of artifacts selected for a specific execution step.

The apparent diversity of entity types — agent, artifact, protocol, context — is diversity of **role** within a single ontological category, not diversity of **kind**. An agent configuration artifact and a requirements specification artifact are both artifacts; they differ in their schema and in what the infrastructure does when it reads them (one triggers the agent runtime; the other provides information to a running agent), but they do not differ in their mode of existence.

### The ontological floor

The reduction has a terminus. The three infrastructure components — artifact store, agent runtime, protocol engine — cannot themselves be reduced to artifacts. They are the **machinery** that acts on artifacts: the processes that store them, reason over them, and sequence the reasoning. Artifacts are data; the infrastructure is computation. One can describe the infrastructure *as* artifacts (its documentation, its configuration, its source code are all artifacts), but the running processes that interpret those artifacts are not themselves artifacts.

**Substance and process are irreducibly dual.** The system requires both a persistent medium (artifacts) and operations that act upon it (read, evaluate, write). Neither can be eliminated in favor of the other. Remove the substance and the processes have nothing to act on; remove the processes and the substance is inert. This duality — one kind of thing, three kinds of action — is the ontological floor of the architecture.

### Practical consequences

If artifact is the sole substance, three properties follow:

**Total state capture.** The artifact store is the entire system state. No information resides outside it — not in agent memory (agents are ephemeral), not in protocol engine state (the current protocol state is a function of artifact statuses), not in configuration files (configurations are artifacts). To snapshot the system, snapshot the store. To restore it, restore the store. To audit it, audit the store.

**Uniform evolution history.** Every change to the system — whether to its data, its workflows, or its agent definitions — is an artifact write, recorded with provenance and version history. The complete evolutionary history of the system, from its first configuration to its current state, is captured in a single data structure.

**Complete self-reflection.** The companion article showed that protocols can be modified by agents. But if agent configurations are also artifacts, then agents can modify other agents' configurations — creating, revising, or deprecating agent definitions through the same review cycle that governs any other artifact. The system can redesign itself at every level — from workflow sequencing to role definition to evaluation criteria — using a single mechanism: read an artifact, evaluate it, write a revision.

---

## 4. The Turing Machine Correspondence

The architecture that emerges from the ontological reduction — one persistent substance acted upon by three operations — has a structural correspondent that predates it by ninety years: the Turing machine.

### The isomorphism

| Turing machine | This system |
| --- | --- |
| Tape | Artifact store |
| Symbols on tape | Artifact content |
| Head position | Context — which artifacts the current invocation attends to |
| Transition function | Protocol definitions + agent invocations |
| Head operations (read, write, move) | Read, write, evaluate |

The correspondence is not metaphorical. Each component on the left maps to a structurally equivalent component on the right, performing the same function within the same computational architecture.

The **tape** is the sole persistent medium: all durable information resides on it, and all computation acts upon it. The artifact store has exactly this property. The **head** is an ephemeral process that reads from the tape, computes a result, and writes back to the tape; it has no persistent memory of its own beyond its current state. An agent invocation has exactly this property: it reads artifacts, reasons over them, writes output artifacts, and is then destroyed. The **transition function** determines which action the head takes given the current symbol; protocol definitions determine which agent is invoked given the current artifact states.

The substance monism — all persistent state on the tape, all computation ephemeral — is the same architectural insight in both systems. Turing arrived at it by asking what the minimal requirements for universal computation are. We arrived at it by asking what the minimal ontological categories for multi-agent collaboration are. The convergence is not coincidental; it reflects the fact that both questions have the same answer: one persistent medium and a process that reads from it, transforms what it reads, and writes the result back.

### What the correspondence establishes

The Turing correspondence confirms that the protocol layer of the architecture is **computationally complete**: any workflow expressible as a computation over structured information can be encoded as a protocol definition. This is not a claim that needs independent proof; it follows from the structural equivalence with a Turing machine, which is by definition capable of expressing any computable function.

It also imports a known impossibility: the **halting problem**. In the general case, it is undecidable whether a given protocol will terminate. The deadlock detection mechanism described in the companion article — recognizing repeated identical conflicts across consecutive rounds — is a heuristic for a specific failure mode, not a general solution. Some protocols may cycle indefinitely without repeating an exact state. This is not a flaw in the design; it is a fundamental property of any computationally complete system.

---

## 5. The Black Box Within the Transition Function

In a standard Turing machine, the transition function is a finite, inspectable lookup table. Given a state and a symbol, exactly one action follows. The entire behavior of the machine is determined by the tape contents and this table; both are fully transparent to inspection.

In our system, the transition function has two components, and they differ in a property that the standard Turing machine does not need to distinguish: **inspectability**.

### The transparent component

Protocol definitions are the inspectable part of the transition function. They are artifacts stored in the artifact store: structured, typed, versioned, auditable. Given the current artifact states, the protocol definition unambiguously specifies which agent to invoke, with what context, and what to do with the result. This part of the transition function is as transparent as a Turing machine's lookup table.

### The opaque component

The base model — *W'*, the model's learned internal representation of reality, encoded in billions of parameters — is the non-inspectable part of the transition function. When a protocol invokes an agent, the agent's output is determined jointly by the context it receives (transparent: the selected artifacts) and the model's parameters (opaque: the learned weights). Given the same context, we can run the model and observe what it produces; but we cannot, in general, predict or explain the output without running it.

The opaque component is **computable**. It runs on electronic hardware. It takes a finite input and produces a finite output in finite time. There is nothing uncomputable about it; it is a deterministic function of its inputs and parameters (at a given random seed). But it is **uninterpretable**: the mapping from input to output is encoded in a parameter space too large and too distributed for human inspection to trace the causal path from any specific input feature to any specific output feature.

### The distinction that matters

The boundary between transparent and opaque is not a boundary between computable and uncomputable. Both components are computable; the entire system runs on electronic hardware that is, in the final analysis, a physical realization of a Turing machine. The boundary is between **inspectable and non-inspectable** components of a fully computable transition function.

This distinction is architecturally consequential. The transparent component — protocol definitions — can be validated before execution (does this protocol access only the artifacts it should?), analyzed for structural properties (can this protocol deadlock?), and modified by agents through the standard review cycle. The opaque component — the base model — can only be evaluated empirically: run it, observe its output, judge whether the output meets the criteria. The difference is not in computational power but in **auditability**: the degree to which the system's behavior can be understood, predicted, and corrected without executing it.

---

## 6. *W*, *W'*, and the Boundary of Computation Theory

The first article in this series, *Precision as Information Completion*, introduces two representations of reality: *W* (the actual state of the world) and *W'* (the model's learned approximation of it, encoded in its parameters). The divergence between them — *W'* may be outdated, biased, confidently wrong, or blind to the user's local context — is the source of the model's characteristic failure modes: hallucination, factual error, and contextual mismatch.

A natural question arises when this divergence is placed alongside the Turing machine correspondence: is the *W'*–*W* gap a limitation of computation itself?

It is not. The divergence is a problem that our architecture creates, not a limitation that computation theory imposes.

### What computation theory concerns

Computation theory asks what is computable, in what time, and with what resources. It is indifferent to whether a computed output corresponds to external reality, because that correspondence is not a computational property. A Turing machine that computes 2 + 2 = 5 is not computationally defective — it is a well-defined machine that halts and produces a determinate output. That the output is arithmetically false is a judgment made by an external observer who possesses a standard of correctness that the machine itself does not reference. Computation theory characterizes the nature of computation; it does not adjudicate the truth of computed results.

### What our architecture introduces

Our system introduces *W* and *W'* because it has a specific purpose that goes beyond computation per se: to produce outputs that are not only internally consistent but also **faithful to the world**. This faithfulness requirement is a design constraint that the architecture imposes on itself — a semantic criterion layered on top of the computational substrate. A different intelligent architecture — one that did not claim to represent reality, or one that had direct perceptual access to *W* through sensors and actuators — would face a different version of this problem or would not face it at all.

The Turing machine can serve as the computational carrier for all such architectures. It provides the substrate on which any computable process can be realized, including processes that model reality well, processes that model reality poorly, and processes that do not attempt to model reality at all. The *W'*–*W* divergence is a property of what our specific architecture chooses to compute and how it chooses to validate the results — not a property of computation itself. The Turing machine neither needs to nor should address it, because it operates at a level of abstraction below the one at which the divergence is defined.

### The role of externalization

RAG, LoRA, and the experience consolidation mechanism described in the second article of this series can now be characterized precisely within the Turing correspondence. Each is a mechanism that transfers portions of the opaque component's knowledge — information currently encoded in the non-inspectable parameters of *W'* — onto the inspectable tape, where it becomes an artifact: auditable, versionable, correctable.

RAG retrieves factual information from external sources and places it in the agent's context as an artifact, bypassing the model's potentially outdated or incorrect parametric knowledge. LoRA modifies the model's distributional priors for specific domains, effectively rewriting a portion of *W'* based on curated data. Experience consolidation records correction triples — what was attempted, what failed, how it was fixed — as artifacts that can be retrieved and injected into future agent contexts.

All three mechanisms move information from the opaque side of the transition function to the transparent side: from non-inspectable parameters to inspectable artifacts on the tape. The effect is the same in each case: the system's behavior becomes more predictable, more auditable, and more correctable — not because the model has become more capable, but because more of the knowledge that determines its behavior has been externalized into a medium where it can be examined and revised.
