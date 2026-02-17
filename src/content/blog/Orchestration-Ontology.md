---
title: "An Ontology of Multi-Agent Systems"
description: "From nine engineering roles to four primitives: an ontological reduction that yields a simpler, more extensible multi-agent architecture."
date: 2026-02-17
tags: ["LLM"]
---

## 1. Prologue: Notation and Prior Results

Two companion articles establish the framework that this article extends. *[Precision as Information Completion](/blog/precision-as-information-completion/)* defines the core problem of generative AI: given a user's prompt *p*, find the response *r*\* that maximizes the mutual information *I*(*r*; *S* | *p*) = *H*(*S* | *p*) − *H*(*S* | *p*, *r*) — the quantity of uncertainty about the intended representation *S* that the response resolves — subject to the constraint that (*p*, *r*, *W'*) admits at least one coherent *S*, where *W'* is the model's internal representation of reality. *[Orchestration as Attention-Constrained Decomposition](/blog/orchestration-as-decomposition/)* extends this to the multi-agent regime: when *S* is too complex for a single context to resolve with adequate precision, an architect agent decomposes *S* into sub-representations *S*₁, *S*₂, ..., *S*ₙ, each solved by a specialist agent, with interface entropy — the residual uncertainty at the boundaries between sub-representations — as the bottleneck indicator of orchestration quality.

Those articles establish *why* orchestration is needed and *what metric* governs its quality. This article asks a different question: **what primitives does an orchestration system require?** If we enumerate every entity that such a system contains — agents, documents, workflows, coordination mechanisms — how many fundamentally distinct kinds of things are there? The answer determines the complexity of the infrastructure: more kinds require more specialized machinery; fewer kinds permit a more general, more extensible design.

---

## 2. The Nine-Role Lifecycle: A Concrete Starting Point

To ground the analysis in a concrete and familiar domain, consider a multi-agent system designed to execute the full lifecycle of a software engineering project. The following nine roles, each assigned to a dedicated agent or group of agents, span the lifecycle from intake to delivery:

### 2.1 Main agent

**Function**: the user-facing interface and orchestration dispatcher. It receives the user's request, determines which downstream agents to invoke, and relays results back to the user.

**System prompt concerns**: communication clarity, expectation management, task routing logic, progress reporting conventions.

**Consumes**: the user's prompt. **Produces**: routing decisions, status summaries. **Interacts with**: every other role (as dispatcher).

### 2.2 Requirements agent

**Function**: crystallizes the task's scope, boundaries, and acceptance criteria. Operates in collaboration with domain-expert agents who supply technical perspective on feasibility and trade-offs.

**System prompt concerns**: scope interrogation techniques, ambiguity detection, acceptance-criterion formulation, stakeholder communication.

**Consumes**: the user's prompt (via main agent), domain-expert opinions. **Produces**: a requirements specification with defined boundaries and measurable success criteria. **Interacts with**: main agent, domain-expert agents.

### 2.3 Documentation agent

**Function**: transforms the requirements specification into a persistent, structured document that downstream agents can reference without loss of fidelity.

**System prompt concerns**: technical writing standards, schema compliance, cross-referencing conventions.

**Consumes**: the requirements specification. **Produces**: a formatted requirements document stored for downstream retrieval. **Interacts with**: requirements agent, artifact storage.

### 2.4 Architect agents

**Function**: decompose the task into sub-modules with well-defined boundaries and interfaces. Multiple architect agents, each specialized in a distinct architectural concern (data flow, security, scalability, developer experience), negotiate via structured debate to converge on a single decomposition.

**System prompt concerns**: module boundary identification, interface contract specification, dependency analysis, trade-off evaluation between competing decomposition strategies.

**Consumes**: the requirements document. **Produces**: an architecture specification comprising module definitions, interface contracts, and dependency graphs. **Interacts with**: each other (negotiation), requirements agent (clarification).

### 2.5 Staffing agent

**Function**: for each sub-module defined by the architects, selects or creates an execution agent whose system prompt and tool access are fitted to the module's specific demands.

**System prompt concerns**: capability-to-task matching, system prompt composition, tool selection, workload assessment.

**Consumes**: the architecture specification. **Produces**: configured execution agent instances. **Interacts with**: architect agents (to clarify module requirements), the agent runtime (to instantiate agents).

### 2.6 Execution agents

**Function**: implement the code for their assigned sub-module within the boundaries the architects have drawn. Each execution agent is specialized for a distinct concern: one for clean and maintainable code, another for a specific language or toolchain, a third for performance-critical sections.

**System prompt concerns**: coding standards, language idioms, edge-case handling, interface compliance with the architecture specification.

**Consumes**: the architecture specification (their module's section), interface contracts. **Produces**: code artifacts, implementation notes. **Interacts with**: other execution agents (at interface boundaries), the artifact store.

### 2.7 Test agents

**Function**: verify that implementation artifacts satisfy their specifications. Specialized by testing concern — unit testing, integration testing, performance benchmarking, security auditing — because each concern demands distinct expertise, tooling, and evaluation criteria.

**System prompt concerns**: test strategy for the assigned concern, assertion design, coverage metrics, failure reporting format.

**Consumes**: code artifacts, architecture specification, requirements document. **Produces**: test results, identified defects filed to an issue store. **Interacts with**: execution agents (to clarify intent), the issue store.

### 2.8 Debug agents

**Function**: investigate failures identified by test agents. The diagnostic skill set — hypothesis generation, root-cause isolation, evidence gathering, differential diagnosis — differs from both the implementation skill set and the testing skill set. Debug agents produce not only fixes but investigation reports that record the causal chain from symptom to root cause.

**System prompt concerns**: systematic diagnostic methodology, evidence-based reasoning, root-cause analysis, report writing.

**Consumes**: defect reports, code artifacts, test results, architecture specification. **Produces**: investigation reports, proposed fixes. **Interacts with**: test agents (symptom clarification), execution agents (fix application).

### 2.9 Rearchitecture trigger

**Function**: when a proposed fix is systemic — when it requires modifying module boundaries, interface contracts, or the decomposition itself — the debug agent's recommendation is routed back to the architect agents for a new round of negotiation. This closes the feedback loop, allowing the system to correct not only code-level errors but structural errors in the decomposition.

**Consumes**: investigation reports flagged as systemic. **Produces**: a rearchitecture request routed to architect agents. **Interacts with**: debug agents, architect agents.

---

## 3. The Redundancy Problem

The nine-role design is functionally complete: every phase of the software engineering lifecycle has a responsible agent, and every agent's inputs and outputs are specified. But a closer inspection reveals that the design contains more entity types than the domain requires. The surplus is not in the roles themselves — each serves a genuine function — but in the **infrastructure** that the design implicitly demands.

Three categories of redundancy are visible:

### 3.1 Agent-type redundancy

The main agent, requirements agent, documentation agent, architect agents, staffing agent, execution agents, test agents, debug agents, and rearchitecture trigger are enumerated as nine distinct kinds of entity. But what differs between them? Each is a base model bound to a system prompt that constrains its attention, equipped with a set of tools, and invoked with a context assembled from prior artifacts and conversation history. The architect agent and the debug agent are not different in kind; they are different in configuration. They relate to each other as two books relate — differing in content, not in the nature of their being.

Yet if the architecture treats them as distinct types, each requires its own instantiation logic, its own lifecycle management interface, and its own integration point with the rest of the system. Nine types of entity means nine sets of boilerplate, nine sets of assumptions to maintain, and nine surfaces for inconsistency.

### 3.2 Document-type redundancy

The requirements specification, the architecture specification, defect reports, investigation reports, test results, and implementation notes are enumerated as distinct document kinds. But structurally, each is a unit of typed, persistent information with a schema (what fields it contains), a provenance (who produced it, when, based on what inputs), and a status (draft, under review, accepted, superseded). A requirements document and a test report differ in their schema — in what they say — not in their mode of existence.

Yet if each document type is implemented as a separate data structure with its own storage logic, its own retrieval interface, and its own versioning mechanism, the result is duplicated infrastructure across every document type.

### 3.3 Coordination-pattern redundancy

Architect negotiation, requirements refinement (requirements agent + domain experts), code review (execution agent + reviewer), and debug triage (debug agent + architect) all follow the same abstract pattern: multiple agents examine a shared artifact, propose modifications, resolve conflicts, and converge on an accepted version. They differ in the artifact type they operate on, the agents who participate, and the criteria for convergence — but the pattern itself is invariant.

Yet the nine-role design implicitly treats each coordination instance as a bespoke interaction, to be designed and implemented separately. The negotiation protocol among architects bears no formal relationship to the review protocol between implementers and reviewers, even though their structures are isomorphic.

### 3.4 The cost

Each category of redundancy extracts the same toll: infrastructure that could be written once is written many times, and each copy must be independently maintained, tested, and extended. When a new role is needed — say, a security auditor — the architect must implement a new agent type, a new document type (security audit report), and a new coordination pattern (security review protocol), even though all three are structurally identical to entities that already exist. The system grows linearly in infrastructure complexity with each new role, when it should grow only in configuration.

---

## 4. Ontological Reduction: Four Primitives

The redundancies identified in Section 3 are not accidental. They arise from a single source: the nine-role design classifies entities by **what they do** (their function in the lifecycle) rather than by **what they are** (their fundamental nature). An ontological analysis — asking not "what role does this entity play?" but "what kind of thing is this entity?" — reveals that every entity in the system belongs to one of exactly four categories.

### 4.1 Agent

An **agent** is a configured reasoning capacity: a base model bound to a system prompt that constrains its attention, equipped with a set of tools that extend its capabilities, and invoked with a context that determines what it attends to. Every named role in Section 2 — main agent, requirements agent, architect, implementer, tester, debugger, staffing agent — is an instance of this single category. They differ in the content of their system prompt, not in their ontological kind.

The distinction between an "architect agent" and a "debug agent" is a distinction of configuration, not of species. Both are agents. One attends to module boundaries and dependency structures; the other attends to diagnostic methodology and root-cause isolation. The base model, the instantiation mechanism, the lifecycle management, and the interface with the rest of the system are identical.

### 4.2 Artifact

An **artifact** is a typed, persistent unit of information. It possesses three properties: a schema (the structure and fields it contains), a provenance (which agent produced it, at what time, based on which inputs), and a status within a lifecycle (draft, under review, accepted, superseded). Every named document in Section 2 — requirements specifications, architecture specifications, code modules, test results, defect reports, investigation reports — is an instance of this single category. They differ in their schema, not in their mode of existence.

A requirements document and a test report are both artifacts. One contains scope boundaries, acceptance criteria, and constraint declarations; the other contains test assertions, pass/fail verdicts, and failure descriptions. The storage mechanism, the versioning logic, the retrieval interface, and the status lifecycle are identical.

### 4.3 Protocol

A **protocol** is a rule governing interaction between agents. It specifies which artifact states trigger which agent invocations, in what sequence, under what conditions, and with what convergence criterion. Every coordination pattern in Section 2 — architect negotiation, requirements refinement with domain experts, code review, debug triage, the rearchitecture feedback loop — is an instance of this single category. They differ in their rules, not in their nature.

A protocol can be represented as a state machine whose states are conditions on the artifact store (e.g., "a draft architecture specification exists with status 'under review'"), whose transitions are agent invocations (e.g., "invoke each architect agent to produce a structured critique"), and whose terminal states are convergence conditions (e.g., "a full round of critique produces no modifications"). The architect negotiation protocol and the code review protocol are two different state machines, but they run on the same engine.

### 4.4 Context

A **context** is the assembled input to a specific agent invocation. It comprises three components: the agent's system prompt (which constrains its attention), the set of artifacts relevant to the current invocation (which provide the information it operates on), and the conversation history (which provides continuity with prior turns). Context is not a persistent entity stored in its own right; it is the *totality of what is present to an agent at the moment of its invocation* — analogous to a visual field rather than an object within it.

Context is what distinguishes two invocations of the same agent configuration. An architect agent invoked with the initial requirements document as context produces an initial decomposition; the same agent invoked with the initial decomposition plus a round of critiques as context produces a revised decomposition. The agent is the same; the context has changed; the output differs accordingly.

### 4.5 The claim

These four categories — agent, artifact, protocol, context — are exhaustive: every entity in the nine-role system belongs to exactly one of them. And they are minimal: removing any one of them leaves the system unable to express a necessary aspect of multi-agent collaboration. Agents without artifacts have no persistent memory; artifacts without protocols have no mechanism for transformation; protocols without agents have no reasoning capacity to execute them; all three without context have no way to vary their behavior across invocations.

The nine roles are nine configurations of these four primitives, not nine kinds. The proliferation of entity types in Section 2 is a symptom of classifying by function rather than by nature. Once the ontological categories are identified, the infrastructure need support only four kinds of things — and every new role, document type, or coordination pattern is an addition of configuration, not of machinery.

---

## 5. The Architecture That Follows

The four primitives determine three infrastructure components — one for each primitive that requires persistent machinery. (Context, being an assembled input rather than a stored entity, requires no dedicated infrastructure; it is composed at invocation time from the other three.)

### 5.1 Artifact store

The artifact store is the system's persistent memory. It stores artifacts of any type, distinguished by schema but unified in storage mechanism. Every artifact carries:

- A **type identifier** and **schema** — determining what fields it contains and what constitutes a valid instance
- **Provenance** — which agent produced it, at what time, in response to what inputs, under what protocol
- A **status** within a lifecycle — draft, under review, accepted, superseded — with transitions governed by protocols
- **Version history** — the complete sequence of prior states, enabling rollback and audit

The artifact store is the physical realization of the interface specifications between sub-problems identified in the companion article. Interface entropy is minimized not by agents communicating directly with each other but by agents writing to and reading from well-typed, precisely specified artifacts. The store is the system's coordination substrate: agents do not need to know about each other; they need only know about the artifacts they consume and produce.

### 5.2 Agent runtime

The agent runtime instantiates, manages, and destroys agents. It accepts a configuration — a system prompt, a set of tools, and a context — and produces a running agent instance. The runtime is indifferent to what the system prompt contains; it provides the same lifecycle management for an architect agent as for a debug agent. Its responsibilities are:

- **Instantiation** — binding a system prompt and tool set to a model invocation
- **Context assembly** — gathering the relevant artifacts and history into the context that the agent will receive
- **I/O routing** — directing the agent's output to the artifact store as a new artifact (or artifact modification)
- **Lifecycle management** — creating and destroying agent instances as protocols demand

The runtime does not encode any knowledge of roles or phases. It knows how to run an agent; it does not know or care whether that agent is an architect, a tester, or a staffing coordinator.

### 5.3 Protocol engine

The protocol engine executes protocols as state machines. It watches the artifact store for conditions that trigger transitions, invokes agents through the agent runtime when transitions fire, and monitors for convergence and deadlock. Its responsibilities are:

- **Trigger detection** — monitoring the artifact store for states that match a protocol's transition conditions (e.g., "a new defect report has been filed with severity 'critical'")
- **Agent invocation** — requesting the agent runtime to instantiate and run the appropriate agent with the appropriate context
- **Convergence detection** — recognizing when a protocol's terminal condition has been met (e.g., a full negotiation round with no modifications)
- **Deadlock detection** — recognizing when a protocol has stalled (e.g., two agents producing contradictory modifications in alternation without convergence) and escalating to a resolution mechanism

### 5.4 The nine-role lifecycle as a protocol definition

Within this architecture, the entire nine-role lifecycle from Section 2 is expressed not as hardcoded infrastructure but as a protocol definition — a declarative specification that the protocol engine executes:

| Phase | Triggering condition | Agent configuration | Produced artifact | Next trigger |
| --- | --- | --- | --- | --- |
| Intake | User submits request | Main agent (routing prompt) | Routing decision | Requirements |
| Requirements | Routing decision filed | Requirements agent + domain experts (negotiation protocol) | Requirements specification (accepted) | Documentation |
| Documentation | Requirements accepted | Documentation agent (formatting prompt) | Requirements document | Architecture |
| Architecture | Requirements document filed | Architect agents (negotiation protocol) | Architecture specification (accepted) | Staffing |
| Staffing | Architecture accepted | Staffing agent (matching prompt) | Configured execution agents | Implementation |
| Implementation | Execution agents created | Execution agents (implementation prompts) | Code artifacts | Testing |
| Testing | Code artifacts filed | Test agents (testing prompts) | Test results + defect reports | Debug or Delivery |
| Debugging | Defect reports filed | Debug agents (diagnostic prompt) | Investigation reports + fixes | Rearchitecture or Retest |
| Rearchitecture | Investigation report flagged systemic | Architect agents (negotiation protocol) | Revised architecture specification | Staffing |

Adding a new phase — say, security review between testing and delivery — requires three additions to this table: a triggering condition ("all test results accepted"), an agent configuration ("security auditor prompt + security scanning tools"), and an artifact type ("security audit report"). No infrastructure changes. The artifact store already stores artifacts of any type; the agent runtime already instantiates agents from any prompt; the protocol engine already executes any state machine. The new phase is configuration, not code.

---

## 6. Negotiation as a Generic Protocol

Among the coordination patterns in the nine-role lifecycle, one recurs across multiple phases: **multi-party convergence on a shared artifact**. Architect negotiation, requirements refinement, code review, and debug triage all instantiate this pattern. The ontological reduction reveals that they are parameterized instances of a single protocol, differing only in the values of their parameters.

### 6.1 The convergent-editing protocol

The protocol proceeds in rounds. Each round has four steps:

1. **Proposal** — a designated lead agent produces or revises a draft artifact. In the first round, this is the initial proposal; in subsequent rounds, it is the synthesis of the prior round's modifications.

2. **Structured critique** — each participant agent reads the current draft and produces a critique artifact containing, for each element of the draft, one of three verdicts: endorsement (the element is adequate as stated), modification (a specific alternative is proposed, with justification), or flag (the element requires information the critic lacks).

3. **Synthesis** — a designated synthesis agent merges the critiques. Non-contradictory modifications — those that address different elements, or that converge on the same change — are incorporated directly. Contradictory modifications — those that propose incompatible alternatives for the same element — are escalated.

4. **Conflict resolution** — for each escalated conflict, an arbiter agent (which may be the lead, a dedicated evaluator, or a majority vote among participants) evaluates the competing modifications against the acceptance criteria defined in the requirements artifact, and selects or composes a resolution.

### 6.2 Convergence and deadlock

The protocol terminates when a full round of structured critique produces **no modifications** — every participant endorses every element of the current draft. This is the convergence criterion: consensus is mechanically detectable as the absence of proposed changes.

Deadlock occurs when the same conflict recurs across consecutive rounds without resolution — two or more participants produce the same incompatible modifications in alternation. The protocol engine detects this pattern (identical escalated conflicts in round *k* and round *k* + 1) and triggers a deadlock resolution rule: either escalating to a higher-authority agent, or falling back to the acceptance criteria as a mechanical tie-breaker.

### 6.3 Parameterization

The four negotiation instances in the nine-role lifecycle are parameterizations of this single protocol:

| Instance | Artifact type | Participants | Lead | Convergence criterion | Arbiter |
| --- | --- | --- | --- | --- | --- |
| Architecture negotiation | Architecture specification | Architect agents | Lead architect | No modifications in a full round | Trade-off evaluator agent |
| Requirements refinement | Requirements specification | Requirements agent + domain experts | Requirements agent | No modifications in a full round | Product-manager agent |
| Code review | Code artifact | Execution agent + reviewer agents | Execution agent | No modifications in a full round | Senior reviewer agent |
| Debug triage | Investigation report | Debug agent + architect agents | Debug agent | No modifications in a full round | Risk-assessment agent |

One protocol implementation, four instantiations. Adding a fifth — say, security review of architecture specifications — requires specifying the five parameters in a new row, not writing new coordination logic.

### 6.4 Information-theoretic interpretation

Each round of critique reduces *H*(*A* | requirements), where *A* is the artifact under negotiation. The modifications in each round carry information — they expose disagreements that the current draft has not resolved. Convergence occurs when the critiques carry no further information: *I*(critique_round_*k*; *A* | all prior rounds) ≈ 0. At this point, the artifact is as determined as the collective knowledge and judgment of the participants can make it.

---

## 7. Self-Reflective Extension: Protocols as Artifacts

The four-primitive architecture admits a recursive extension that significantly increases its generality: **protocol definitions are themselves artifacts.**

A protocol definition — the state machine that specifies triggering conditions, agent invocations, convergence criteria, and deadlock rules — is a structured, persistent unit of information. It possesses a schema (the grammar of valid state machines), a provenance (who defined it, when, for what purpose), and a status lifecycle (draft, active, deprecated). It therefore satisfies the definition of an artifact given in Section 4.2. There is no ontological reason to exclude it from the artifact store.

Storing protocol definitions as artifacts has three consequences:

### 7.1 Protocols become versionable and auditable

Like any artifact, a protocol stored in the artifact store carries version history. When a workflow is modified — a new phase added, a convergence criterion tightened, a deadlock rule changed — the modification is recorded, and the prior version is available for comparison or rollback. The system maintains a complete history of its own organizational evolution.

### 7.2 Protocols become readable by agents

Any agent whose context includes a protocol artifact can reason about the protocol — analyze its structure, identify inefficiencies, predict failure modes. A meta-protocol agent can be configured with a system prompt that instructs it to monitor workflow performance (e.g., how many negotiation rounds each protocol instance requires before convergence, how often deadlock is triggered, how frequently rearchitecture loops occur) and propose modifications to the protocol definition.

### 7.3 Protocols become modifiable through the same review cycle

A proposed protocol modification is itself an artifact — a draft revision of an existing protocol definition. It can be submitted to the convergent-editing protocol for review: participant agents (perhaps the architect agents and the main agent) evaluate whether the proposed change improves workflow efficiency without introducing unacceptable risk, and the standard critique-synthesis-resolution cycle produces an accepted or rejected verdict.

This is the self-reflective closure: the system reasons about and modifies its own organizational structure using the same primitives — agents, artifacts, protocols, contexts — that it uses to perform its primary work. No additional infrastructure is required for self-modification; the existing infrastructure, by treating protocols as artifacts, already supports it.

The practical value is that the system can adapt its own workflows to observed patterns of failure and inefficiency without human intervention. If a particular negotiation protocol consistently requires five rounds before convergence, a meta-protocol agent can propose adding a preliminary alignment step that reduces the typical round count — and this proposal passes through the same review process as any other artifact modification.

---

## 8. Implications and Boundaries

### 8.1 Extensibility

The four-primitive architecture decouples capability from infrastructure. Adding a new capability to the system — security auditing, accessibility review, internationalization, compliance verification — requires three configuration additions:

1. A system prompt defining the new agent's expertise and evaluation criteria
2. An artifact schema defining the structure of the new agent's output
3. A protocol rule (or a new row in an existing protocol's parameterization table) specifying when the new agent is invoked and how its output integrates into the workflow

No infrastructure component — neither the artifact store, nor the agent runtime, nor the protocol engine — requires modification. The new capability is a configuration change, not a code change. The system grows in capability without growing in structural complexity.

### 8.2 Domain generality

Nothing in the four-primitive architecture is specific to software engineering. The primitives — configured reasoning capacity, typed persistent information, interaction rules, assembled invocation input — are domain-neutral. A research workflow (literature review agents, hypothesis-generation agents, experimental-design agents, statistical-analysis agents, with negotiation protocols for methodology decisions) is a different set of agent configurations, artifact schemas, and protocol definitions deployed on the same infrastructure. A legal review pipeline (contract-analysis agents, compliance-check agents, risk-assessment agents, with convergent-editing protocols for opinion drafts) is another. The infrastructure is invariant; the configurations vary.

This generality is a direct consequence of the ontological reduction. By identifying the categories that are domain-invariant — agent, artifact, protocol, context — and building infrastructure only for those categories, the architecture avoids encoding domain-specific assumptions into its structural layer. Domain knowledge resides entirely in configuration: in the content of system prompts, the schemas of artifacts, and the rules of protocols.

### 8.3 The residual hard problem

The ontological reduction simplifies the architecture but does not reduce the total difficulty of building an effective multi-agent system. It relocates the difficulty: from **infrastructure engineering** (building distinct machinery for each role, document type, and coordination pattern) to **configuration authoring** (writing effective system prompts, designing informative artifact schemas, specifying robust protocol rules).

This relocation is a genuine gain. Infrastructure complexity scales with the number of entity types and their interactions — a combinatorial surface. Configuration complexity scales with the number of roles and their individual specifications — a linear surface. But configuration authoring is itself a skilled activity. A poorly written system prompt produces a poorly performing agent regardless of how elegant the runtime that hosts it. A poorly designed artifact schema loses information at every handoff. A poorly specified convergence criterion causes negotiation protocols to cycle indefinitely or converge prematurely.

The quality of a multi-agent system built on this architecture depends, in the final analysis, on the quality of its configurations — which are authored by humans, or by agents whose own configurations were authored by humans, or by the self-reflective process described in Section 7 (which is itself governed by configurations). At every level, the system's performance is bounded by the precision of its specifications. The ontological reduction ensures that the specifications are the *only* constraint on performance — that no unnecessary infrastructure complexity stands between a good specification and good behavior. But it cannot guarantee that the specifications themselves will be good. That responsibility remains where it has always been: with the authors, human or artificial, who write them.
