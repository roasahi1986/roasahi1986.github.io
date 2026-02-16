---
title: "Orchestration as Attention-Constrained Decomposition"
description: "Why multi-agent orchestration is necessary, how it decomposes the information-completion problem, and what determines its quality."
date: 2026-02-16
tags: ["LLM"]
---

## 1. From Single Agent to Multiple

A companion article, *[Precision as Information Completion](/blog/Precision-as-Information-Completion/)*, defines the core problem of generative AI as a constrained optimization: given a user's prompt *p*, find the response *r*\* that maximizes the mutual information *I*(*r*; *S* | *p*) = *H*(*S* | *p*) − *H*(*S* | *p*, *r*) — the quantity of uncertainty about the intended representation *S* that the response resolves — subject to the constraint that (*p*, *r*, *W'*) admits at least one coherent *S*, where *W'* is the model's internal representation of reality. Prompt and response are two halves of a single puzzle; neither is independently sufficient; their union constitutes a determinate whole.

That formulation assumes a single context window in which the entire optimization occurs. This article examines what happens when the intended representation *S* is too complex for a single context to resolve with adequate precision — and why the solution is not a larger context window but a structured decomposition of the problem across multiple agents.

### The root cause: attention scarcity

Orchestration arises from a scarcity of attention, not of knowledge. Every agent in a multi-agent system draws on the same base model; no agent possesses information that the others structurally lack. What differs between agents is the narrowness, and therefore the sharpness, of each agent's system prompt.

A system prompt is a set of instructions that constrain the model's behavior within a session. When a single system prompt attempts to encode multiple distinct concerns — architectural decomposition, code style, performance optimization, error handling conventions, documentation standards — these instructions compete for the model's finite attention budget. As the prompt lengthens, the effective weight of each individual instruction diminishes: the model attends to each directive with a smaller fraction of its capacity. The result is a diffuse, partially observed prompt — precisely the condition that, within the information-completion framework, inflates *H*(*S* | *p*) by leaving more decision points inadequately constrained.

Splitting a long system prompt into several short, focused prompts — each assigned to a separate session — restores each instruction's effective weight. Each agent, attending to fewer directives with greater concentration, resolves its portion of *S* with higher precision. The gain is not in what the model knows but in how sharply it applies what it knows within a bounded scope.

---

## 2. Sessions as Personnel, Orchestration as Organizational Design

Each agent session, defined by a narrow system prompt, functions as a specialist — analogous to a professional role within an organization. The system prompt determines the agent's domain of competence: what it attends to, what criteria it applies, what form its output takes. A session configured for architectural decomposition attends to module boundaries, interface contracts, and dependency structure; a session configured for implementation attends to code clarity, idiom correctness, and edge-case handling. The same base model, constrained differently, produces qualitatively different outputs — not because the model's knowledge has changed but because its attention has been directed.

Orchestration, then, is not merely the assignment of roles. It is the design of an organizational structure: the specification of which roles exist, what each role's scope encompasses, and how information flows between roles. Three components define an orchestration:

1. **Role specification** — the content of each agent's system prompt, determining what it focuses on and what standards it enforces
2. **Information flow** — the channels through which one agent's output becomes another agent's input, determining the sequence and dependencies of work
3. **Interface contracts** — the agreements about what form and content each agent's output must satisfy for downstream agents to consume it without ambiguity

Consider a large engineering project. An architect agent decomposes the project into sub-modules with well-defined boundaries and interfaces — ideally modules that correspond to standardized, industry-proven patterns, so that each sub-module's solution space is already well-understood. Implementer agents, each specialized for a distinct concern — one for clean, maintainable code; another for a specific language or toolchain; a third for performance-critical sections — work within the boundaries the architect has drawn. A reviewer agent evaluates outputs against consistency and quality criteria. A documentation agent captures the design and its rationale in a form that survives beyond the session.

No single agent could hold all these concerns in sharp focus simultaneously. The organizational structure does not add knowledge; it allocates attention.

---

## 3. The Asymmetry Between Humans and Agents

In human organizations, a single person routinely switches between roles. The same engineer may write code in the morning, review a colleague's pull request at midday, and draft a design proposal in the afternoon. What remains approximately invariant across these transitions is the person's knowledge — their accumulated understanding of the domain, the codebase, and the organizational context. What changes is the cognitive mode each role demands: the contributor attends to implementation detail, the reviewer to correctness and maintainability, the designer to structural coherence and trade-offs. Each transition carries a switching cost — the time and effort required to re-orient attention from one mode to another.

Agents need not bear this cost. Because an agent instance can be created, configured, and destroyed at negligible expense, the optimal agent organization can maintain a dedicated instance for each role, running concurrently rather than sequentially. The consequence is that the optimal agent organization need not mirror the structure of a human team. It can afford a finer-grained division of labor: where a human team might assign one person to both implementation and review (because hiring a separate reviewer is too expensive), an agent system can instantiate a separate reviewer for each module at no marginal personnel cost.

This asymmetry, however, introduces a coordination problem that human organizations handle implicitly but agent systems must handle explicitly. When a human switches from contributor to reviewer, her knowledge persists across the transition — she remembers what she wrote and why. When two separate agents occupy these roles, no such implicit continuity exists. The reviewer agent has no access to the contributor agent's reasoning unless that reasoning is explicitly communicated through a shared channel.

Coordination between agents is therefore not a matter of concatenating their outputs. It requires maintaining a shared consistency constraint across agent boundaries: verifying that Agent A's output falls within the space of inputs that Agent B can coherently process. The coordinator's function is to enforce an interface contract at the semantic level — ensuring that what one agent promises is what the next agent expects. This contract is the multi-agent analogue of the single-agent consistency constraint ∃ *S* compatible with (*p*, *r*, *W'*), extended across the seams between agents.

---

## 4. Formal Decomposition: Orchestration as Entropy Factoring

The information-completion framework provides a precise language for what orchestration does and how to evaluate whether it does it well.

### 4.1 The global problem

The single-agent formulation seeks *r*\* = argmax *I*(*r*; *S* | *p*), subject to consistency. When *S* is complex — when the intended representation involves many interdependent components — the search space for *r* is vast, and the single context window must simultaneously hold the architectural vision, the implementation details, the quality standards, and the interface specifications. As argued in Section 1, this overloads the attention budget and degrades precision.

### 4.2 Decomposition

Orchestration transforms this global problem into a collection of coupled sub-problems. An architect agent decomposes *S* into sub-representations *S*₁, *S*₂, ..., *S*ₙ, each corresponding to a module with a bounded scope. For each sub-representation, a specialist agent solves a local optimization:

> *r*ᵢ\* = argmax *I*(*r*ᵢ; *S*ᵢ | *p*ᵢ)

where *p*ᵢ is the sub-prompt derived from the architect's specification of module *i*. Each specialist operates within a narrow context, attending only to the concerns relevant to its module.

### 4.3 The global consistency constraint

The sub-problems are not independent. Sub-representations share interfaces: the output format of *S*ᵢ may be the input assumption of *S*ⱼ; a data structure defined in one module may be consumed in another; a design decision in one component may constrain the options available in a neighbor. The global consistency constraint requires that for all pairs *i*, *j*, the sub-representations *S*ᵢ and *S*ⱼ are non-contradictory at their shared boundaries:

> ∀ *i*, *j* : *S*ᵢ and *S*ⱼ are jointly compatible at interface(*i*, *j*)

This constraint is what prevents orchestration from degenerating into mere parallelism. Without it, each agent might produce internally excellent work that is incompatible with its neighbors — a failure mode analogous to software modules that individually pass their unit tests but break when integrated.

### 4.4 The architect's objective

The architect agent's task is not to solve any sub-problem but to find a decomposition that makes the sub-problems as independent as possible. In information-theoretic terms, the architect seeks to minimize the total interface entropy:

> minimize Σᵢⱼ *H*(*S*ᵢ ∩ *S*ⱼ | interface_spec(*i*, *j*))

where *S*ᵢ ∩ *S*ⱼ denotes the portion of the intended representation that both modules share, and interface_spec(*i*, *j*) is the architect's specification of what each module may assume about the other. When this sum approaches zero, the interface specifications fully determine the shared boundaries, and each specialist can work in genuine isolation. When it is large, the interfaces are under-specified, and specialists must make assumptions about their neighbors that may prove incompatible upon integration.

### 4.5 The bottleneck indicator

This analysis identifies where orchestration quality is decided. It is not decided within any single agent's context — each specialist may perform excellently within its scope. It is decided at the interfaces between agents. A system of individually sharp agents connected by vague interfaces will produce internally precise but globally incoherent output. The bottleneck of orchestration quality is interface entropy, not internal entropy.

The practical implication is direct: the architect agent's contribution is not measured by how much of *S* it resolves (it may resolve very little directly) but by how effectively it partitions *S* into sub-problems whose mutual dependencies are small and whose shared boundaries are precisely specified.

---

## 5. Dynamic Orchestration: From Predefined Roles to Generated Teams

### 5.1 The static regime

In current practice, orchestration is developer-predefined. A human designer anticipates the roles a system will need, writes their system prompts, specifies their interaction protocols, and deploys the resulting pipeline. The organizational structure is fixed before any task arrives; tasks are routed through the structure but do not reshape it.

This is adequate when the space of tasks is narrow and predictable. It fails when tasks vary widely in structure, scale, or domain — when a task that arrives tomorrow may require a specialist that no one anticipated today.

### 5.2 The dynamic regime

The next stage is orchestration that generates itself. Given a task, a meta-agent assesses what roles the task requires, instantiates agents to fill those roles, defines their interaction protocols, and dissolves the team when the task is complete. The meta-agent functions as an organizational designer: it writes job descriptions, evaluates whether each proposed role is justified by the task's demands, and avoids over-specialization (creating agents whose system prompts are so narrow that their scopes overlap or whose existence is not warranted by the task's complexity).

This requires three capabilities:

1. **Role assessment** — a meta-agent that can analyze a task, identify the distinct concerns it involves, and determine how many specialist roles are justified
2. **Lifecycle management** — a communication framework that supports creating agents, assigning them system prompts, routing information between them, and destroying them when their work is complete
3. **Negotiation protocol** — a mechanism by which proposed roles are evaluated before instantiation, preventing both under-staffing (too few roles, leading to attention overload) and over-staffing (too many roles, leading to unnecessary coordination overhead)

### 5.3 The product-manager pattern

One organizational pattern recurs across complex tasks and merits explicit description:

- A **product-manager agent**, oriented toward communication and scope definition, first establishes the task's boundaries, success criteria, and principal constraints — reducing *H*(*S* | *p*) at the broadest level before any specialist is engaged
- **Domain-expert agents**, each representing a distinct technical perspective, propose candidate solutions and evaluate trade-offs — exposing the space of viable approaches and the consequences of each
- **Execution agents**, each configured for a specific concern within the chosen approach, carry out the decided plan with narrow focus and high precision
- A **recorder agent** captures the key decisions, their rationale, and the rejected alternatives, producing an artifact that persists beyond the session and can be referenced by future tasks

This pattern embodies a principle: the first investment should be in reducing global uncertainty (scope, constraints, approach), not in resolving local detail. Detail resolved before the global structure is settled may need to be discarded if the structure shifts — wasted entropy reduction.

---

## 6. Experience Consolidation: Learning from Operational Errors

### 6.1 The error signal

In programming tasks, the execution environment generates correction signals that no amount of pre-task planning can fully anticipate. A compilation error reveals a type mismatch. A runtime exception exposes an unhandled edge case. A test failure demonstrates that the output violates its specification. Each of these events carries information: the discrepancy between what was produced and what reality requires.

### 6.2 The correction triple

Each correction can be represented as a triple (*p*, *r*, *δ*): the prompt that initiated the work, the response that was produced, and the modification that resolved the discrepancy. The triple encodes not merely a fact ("this API requires a timeout parameter") but a process pattern ("when integrating with this class of external service, timeout configuration is a decision point that the initial specification is likely to omit").

### 6.3 A third calibration mechanism

Recording these triples to a shared knowledge base constitutes a calibration mechanism for *W'* that is distinct from the two mechanisms identified in the companion article:

| Mechanism | Level of operation | What it calibrates | Persistence |
| --- | --- | --- | --- |
| LoRA | Parameter weights | Distributional priors (style, domain patterns) | Permanent until retrained |
| RAG | Inference-time context | Specific facts and evidence | Dynamic, per-query |
| Experience consolidation | Process knowledge | Patterns of error and repair | Cumulative, grows with use |

LoRA reshapes the model's general tendencies. RAG supplements the model's factual knowledge at the moment of generation. Experience consolidation operates at a third level: it captures **procedural knowledge** — not what is true about the world, but what tends to go wrong when a certain type of task is attempted, and how to correct it. This is closer to a craftsman's accumulated judgment than to either an encyclopedia entry or a stylistic habit.

### 6.4 The self-improvement loop

When correction triples are indexed by task type and failure mode, they become available for two distinct uses:

- **Context injection**: when a new task resembles a previously corrected one, the relevant triple is retrieved and injected into the agent's context, pre-empting the error before it occurs
- **Agent definition**: recurring correction patterns can be distilled into system prompt clauses for future agents — "when working with X, always verify Y" — converting operational experience into structural guidance

This constitutes a reinforcement-learning-like loop: the system encounters errors, records corrections, and incorporates those corrections into future behavior — not by modifying model parameters (as in fine-tuning) but by enriching the informational environment in which agents operate. The knowledge base grows monotonically; each failure, once recorded, reduces the probability of the same failure recurring.

---

## 7. The Asymptotic Boundary

A natural question arises: if orchestration compensates for the model's inability to maintain precision over long, multi-concern contexts, will improvements in model capability eventually eliminate the need for orchestration altogether?

The answer is: partially, but not entirely.

Stronger models maintain higher instruction-following precision over longer contexts, effectively raising the complexity threshold at which external orchestration becomes necessary. Tasks that required three coordinated agents last year may be handled by a single agent next year, because the model's capacity to attend to multiple concerns simultaneously has increased. To this extent, model improvement internalizes orchestration — absorbs into a single forward pass what previously required explicit decomposition.

But the relationship between model capability and task complexity is asymptotic, not convergent. Two structural facts prevent orchestration from being fully absorbed:

1. **Task complexity scales super-linearly with scope.** Doubling the number of components in a system more than doubles the number of inter-component interfaces, because interfaces grow combinatorially while components grow linearly. The attention budget required to hold all interfaces in sharp focus therefore outpaces the growth of available context quality.

2. **Attention quality degrades with context length.** Empirical evidence consistently shows that model performance on instruction-following tasks declines as context length increases, even within the model's nominal context window. Longer contexts do not merely add information; they dilute the effective weight of each instruction. Architectural advances (sparse attention, retrieval-augmented context, hierarchical processing) mitigate this degradation but do not eliminate it.

The consequence is that for any given level of model capability, there exists a task complexity above which external orchestration produces better results than a single agent operating within an overloaded context. Model improvements raise this threshold — moving the crossover point to higher complexity — but the threshold remains finite. Orchestration's necessity is not eliminated by capability growth; it is deferred to more complex tasks.

This is, in the information-theoretic language of the framework, a statement about the scaling relationship between two quantities: the rate at which *H*(*S* | *p*) can be reduced within a single context (bounded by attention quality) and the rate at which *H*(*S*) itself grows with task complexity (driven by combinatorial interface growth). As long as the second outpaces the first beyond some threshold, decomposition across multiple focused contexts will outperform monolithic resolution — and the architectural problem of orchestration will persist.
