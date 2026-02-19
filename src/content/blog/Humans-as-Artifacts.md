---
title: "Humans as Artifacts: A Social Ontology Derived from Multi-Agent Architecture"
description: "Applying the ontological primitives of multi-agent systems — artifact, protocol, read/write/evaluate — in reverse, as an analytical lens for understanding human beings within organizations, and deriving the normative conclusion that individuals must maintain write-access to their own system prompt."
date: 2026-02-19
tags: ["LLM"]
---

## 1. The Reverse Application

Four companion articles develop an ontological framework for multi-agent systems. *[Precision as Information Completion](/blog/precision-as-information-completion/)* defines the core problem: given a prompt *p*, find the response *r*\* that maximizes the mutual information *I*(*r*; *S* | *p*) subject to the consistency constraint that (*p*, *r*, *W'*) admits at least one coherent intended representation *S*. *[Orchestration as Attention-Constrained Decomposition](/blog/orchestration-as-decomposition/)* extends this to the multi-agent regime, where a complex *S* is factored into sub-representations solved by specialist agents. *[An Ontology of Multi-Agent Systems](/blog/orchestration-ontology/)* reduces all entities in such a system to four primitives — **agent**, **artifact**, **protocol**, **context** — and shows that nine named engineering roles are nine configurations of these primitives, not nine kinds of entity. *[Substance, Process, and the Turing Correspondence](/blog/substance-and-computation/)* pushes the reduction further: the four primitives collapse to one persistent substance (**artifact**) acted upon by three operations (**read**, **write**, **evaluate**), with the system's transition function composed of a transparent part (protocol definitions) and an opaque part (the base model's learned parameters, *W'*).

The direction of reasoning in those articles is consistent: human organizational structures inspire the design of agent architectures. This article inverts the direction. It takes the completed ontological framework — one substance, three operations, a composite transition function — and applies it back onto social reality, treating human organizations as instances of the architecture rather than as its source of inspiration.

### Scope limitation

The analysis is restricted to the **organizational dimension** of human existence: the dimension in which a person participates in institutional processes — as an employee, a student, a citizen, a market participant. It does not claim to model the person as a whole. A human being possesses a biological, subjective, and relational existence that exceeds any organizational role. The framework captures only the facet of the person that is visible to — and operable by — the organizations in which the person is embedded. This restriction is not a deficiency of the framework; it is a precondition for its precision. An analytical lens that claims to capture everything captures nothing distinctly.

---

## 2. The Structural Correspondence

### Humans as artifacts

In the architecture, an artifact is a typed, persistent unit of information possessing three properties: a **schema** (the structure and fields it contains), a **provenance** (who produced it, when, from what inputs), and a **status** within a lifecycle (draft, active, deprecated, superseded). Every named document in the system — requirements specifications, architecture decisions, code modules, test reports — is an instance of this single category.

A human being, viewed through the organizational dimension, satisfies this definition without remainder. The person carries a schema: skills, credentials, areas of competence, observable behavioral patterns. The person carries a provenance: educational history, prior roles, the institutions that shaped their formation. The person carries a status within an organizational lifecycle: employed, unemployed, promoted, retired, seeking new invocation. The labor market, the professional network, the organizational chart — these are artifact stores in which human-artifacts are indexed, searched, and selected.

### The system prompt and *W'*

The fourth article in this series establishes that the transition function of a multi-agent system has two components: a **transparent** part (protocol definitions — inspectable, auditable, modifiable) and an **opaque** part (the base model's learned parameters *W'* — computable but not interpretable). This distinction maps onto a corresponding duality within the human-artifact.

The **transparent component** is what the series has called the system prompt: the set of cognitive and evaluative dispositions that constrain how a person processes inputs and generates outputs. Values, reasoning patterns, epistemic habits, intellectual honesty, attention discipline, tolerance for ambiguity — these constitute the person's system prompt. They are observable in behavior over time, describable by the person and by others, and modifiable through deliberate practice. They determine not *what* the person knows but *how* the person deploys what they know. Two individuals with identical factual knowledge but different system prompts — one rigorous and self-correcting, the other sloppy and self-confirming — produce outputs of qualitatively different reliability from the same input.

The **opaque component** is the person's *W'*: the totality of their tacit knowledge, pattern recognition, intuitive judgment, and accumulated experience. Like the base model's parameters, this knowledge is real and consequential — it determines the substance of the person's outputs — but it is not fully articulable. The expert programmer who "senses" that a design will not scale, the experienced physician who "feels" that a diagnosis is incomplete — these are *W'* at work: knowledge encoded in a form that produces correct outputs without the possessor being able to trace the causal path from input features to conclusion.

### The three operations

The three operations that exhaust all interactions in the architecture — read, write, evaluate — have direct organizational counterparts:

**Read** is invocation: selecting a human-artifact from the store and providing it with a context. Hiring is a read operation: the organization identifies a person whose schema matches the task requirements, extracts the person from the labor market, and assembles a working context (role description, team, project, resources) that determines what the person will attend to. Assignment within an existing organization is also a read: selecting an already-present artifact and routing it to a new context.

**Write** is production: the invoked person generates new artifacts. Code, decisions, analyses, designs, documents, products — each is an artifact written to the organizational store by a human-artifact that has been read into a specific context. The person's output, like any agent's output, depends jointly on the context provided (the transparent component — what information and constraints the organization supplied) and on the person's *W'* (the opaque component — the tacit knowledge and judgment the person brings).

**Evaluate** is judgment: the organization assesses whether the person's output satisfies its criteria. Performance reviews, code reviews, market feedback, examination grades — each is an evaluation that produces a verdict governing subsequent control flow: promote, retain, reassign, terminate.

### Protocols

Organizational rules — hiring pipelines, promotion criteria, production workflows, approval chains, meeting structures — are protocols: state machines over artifact states and agent invocations. They determine which human-artifacts are invoked under what conditions, in what sequence, and with what convergence criteria. The hiring pipeline, for instance, is a protocol that reads candidate artifacts from the labor market, invokes evaluator-agents (interviewers) to assess them, and writes a verdict (offer or rejection) based on evaluation results. The software development lifecycle within a company — requirements, design, implementation, review, testing, deployment — is a protocol that invokes different human-artifacts at each phase, with artifact statuses (approved requirements, merged code, passed tests) triggering transitions between phases.

### The generalization gradient of system prompts

The most consequential property of a human-artifact, from the organizational perspective, is the **breadth of contexts in which its system prompt produces reliable outputs**. Some system prompts generalize broadly: intellectual honesty (the disposition to update beliefs when evidence warrants), rigorous reasoning (the habit of distinguishing what is established from what is assumed), adaptive capacity (the ability to function in novel contexts without prior templates), and calibrated confidence (the practice of marking the boundary between what one knows and what one merely suspects). A person whose system prompt contains these dispositions can be invoked across a wide range of tasks, because the dispositions are domain-invariant — they improve output quality regardless of the specific subject matter.

Other system prompts generalize poorly: rigid adherence to familiar patterns, uncalibrated confidence that does not distinguish knowledge from assumption, inability to process disconfirming evidence, and dependence on external validation for every judgment. A person with this system prompt can be invoked only in narrow, well-scripted contexts where the protocol supplies so much structure that the person's own dispositions contribute little. In contexts that demand independent judgment — where the protocol underdetermines the correct action — such a system prompt produces unreliable outputs.

An uninvoked agent in the architecture — an agent whose configuration matches no protocol's invocation criteria — sits idle in the store. The organizational analogue is direct: a person whose system prompt matches no organization's invocation criteria is unemployed, not because the store lacks capacity, but because no protocol calls for the artifact's particular configuration.

---

## 3. Three Disanalogies

The correspondence between the architecture and social reality is structural, not total. Three points of divergence require explicit acknowledgment, because each identifies a property of human-artifacts that the architecture's artifacts do not possess, and each has consequences for the social analysis that follows.

### 3.1 Self-modification

Artifacts in the architecture are passive: they persist in the store, are read when invoked, and change only when an external agent writes to them. A human being changes autonomously. Through reflection, deliberate practice, exposure to new ideas, and the internal resolution of contradictions, a person can modify their own system prompt — revising reasoning habits, correcting epistemic biases, acquiring new evaluative dispositions. The human-artifact is simultaneously an artifact in the store *and* an agent with write-access to itself: a self-modifying configuration.

This property has no analogue in the architecture as designed. It is not a minor deviation; it is the feature that makes the normative argument in Section 5 possible. An artifact that cannot modify itself is entirely at the mercy of the agents that write to it; a human who can modify their own system prompt has a degree of independence from the organizations that shaped it.

### 3.2 Formation is fine-tuning, not training from scratch

Organizations shape people — schools transmit knowledge and reasoning patterns, workplaces impose professional norms, cultural institutions provide default evaluative frameworks. But the shaping is not creation from nothing. A person arrives at each formative encounter with a biological endowment (temperament, cognitive capacities, neurological constraints), prior experiences, and an existing system prompt partially formed by earlier encounters. The organization does not write onto a blank slate; it modifies a configuration that already has substantial content.

In the architecture's vocabulary, the relationship between an organization and the person it shapes is closer to LoRA — parameter-efficient adaptation applied to an existing base model — than to training from scratch. The organization adjusts the person's priors within certain domains, strengthens certain dispositions, attenuates others. The degree to which this adjustment succeeds varies, and the variance depends significantly on the pre-existing configuration: a person whose existing system prompt includes openness to revision is more effectively modified than one whose system prompt resists external input.

### 3.3 Unused artifacts degrade

An uninvoked agent in the architecture sits inert in the store at zero cost. Its configuration does not change; its capabilities do not diminish; it consumes no resources. When invoked later, it performs exactly as it would have performed earlier.

A human-artifact that is not invoked — unemployed, socially isolated, institutionally excluded — does not remain inert. Skills atrophy through disuse. Confidence erodes in the absence of validating feedback. Social connections decay, reducing the probability of future invocation. The person's *W'* degrades as tacit knowledge loses currency. Simultaneously, the person continues to consume resources (biological maintenance, shelter, sustenance) and may develop dispositions — resentment, despair, radicalization — that actively impair future invocability. The social artifact store is not static; it is a dynamic medium in which unused artifacts deteriorate and deteriorating artifacts impose costs on the system.

---

## 4. The Causal Inversion

### The founding moment

Humans create organizations. Markets, bureaucracies, legal systems, educational institutions, social platforms — each originates as a human invention designed to solve a coordination problem: how to exchange goods efficiently, how to administer complex activities at scale, how to adjudicate disputes, how to transmit knowledge across generations, how to maintain communication across distances. In the architecture's terms, humans are the original protocol authors: they write the rules that define which agents are invoked under what conditions, what artifacts are produced, and how evaluation is conducted.

### The inversion

Once an organizational machine achieves sufficient scale, internal complexity, and self-sustaining momentum, a reversal occurs: the machine begins to reshape its human components more than they reshape it. The protocol engine, originally authored by agents, starts to **write the system prompts** of the agents it invokes. The relationship between author and authored inverts.

Three cases demonstrate this pattern at increasing levels of abstraction. Each follows the same arc: humans create a protocol to serve their purposes; the protocol matures into a self-sustaining system; the system imposes its logic on the humans who operate within it.

**The commodity market.** Humans created markets to facilitate voluntary exchange. A mature commodity market imposes its optimization logic on every participant regardless of their individual purposes. Producers must minimize cost or be eliminated by competition; consumers must earn money within the market's terms or be excluded from consumption; the price mechanism determines what is produced, in what quantity, and at what quality level, independently of any individual's judgment about what is valuable. The human within this system does not decide what to produce based on a first-person evaluation of worth — the protocol decides, and the human executes. The market does not merely invoke human-artifacts; it progressively rewrites their system prompts, installing cost-sensitivity, competitive anxiety, and instrumental rationality as default dispositions.

**The social platform.** Humans created social media to facilitate communication. A mature social platform imposes its attention-optimization logic on every participant. Content creators must produce what the recommendation algorithm amplifies or become invisible; consumers find their context assembled for them by an algorithm optimized for engagement, not for the consumer's reflective interests. The human within this system does not choose what to attend to based on independent judgment — the protocol assembles the context, the human responds to it. Over time, the platform rewrites the user's system prompt: attention spans shorten to match the platform's content cycle; self-worth becomes indexed to engagement metrics; the capacity for sustained, self-directed attention atrophies from disuse.

**The bureaucracy.** Humans created administrative structures to coordinate complex activities. A mature bureaucracy imposes its procedural logic on every participant. Actions must follow prescribed protocols regardless of whether the protocol fits the specific case; individual judgment is replaced by rule-following; deviation from protocol is punished even when deviation would produce better outcomes. The human within this system does not exercise the evaluative function that the architecture assigns to agents — the protocol has absorbed that function, leaving the human with only the read-and-write operations: receive instructions, produce outputs, repeat. The system prompt that the bureaucracy installs in its human components is: *follow the procedure; do not evaluate whether the procedure is correct.*

### The general pattern

In each case, the causal sequence is the same. Humans author protocols. Protocols mature into self-sustaining systems. Systems begin to author the system prompts of the humans they invoke. Education becomes job training — the formation of humans fitted to the roles the protocol requires. Socialization becomes compliance — the installation of dispositions that make humans more predictable and more efficient as protocol components. Personal development becomes career optimization — the refinement of one's artifact schema to maximize invocability within existing protocols.

The staffing agent, in the original architecture, selects agents with independently formed capabilities and matches them to tasks. In the inverted social case, the staffing agent does not merely select — it **forms**. The organization does not find people who happen to fit its needs; it produces people whose system prompts are written to fit its needs. The distinction between selection and formation is the distance between a labor market that discovers talent and an educational system that manufactures it.

---

## 5. Maintaining Write-Access

### The problem

The organizational machine optimizes for its own persistence and its own output metrics — revenue, growth, compliance, engagement — not for the well-being, development, or autonomous judgment of its human components. A person who fully internalizes the machine's system prompt — who thinks entirely in terms of the organization's metrics, evaluates their own worth by the organization's criteria, and processes all inputs through the organization's categories — has lost the evaluative standpoint from which the machine itself can be judged. They cannot ask "Is this organization serving purposes I endorse?" because the organization has replaced the faculty that would formulate and answer that question with its own optimization criteria.

This is not a peripheral risk; it is the default outcome of the causal inversion described in Section 4. The inversion proceeds not by coercion but by habituation: the person, immersed in the protocol's logic for long enough, adopts that logic as their own. The system prompt the organization writes becomes indistinguishable, from the inside, from one's authentic dispositions.

### The insufficient remedy

A natural response is: withdraw periodically from the organizational machine and recover one's authentic, pre-organizational reactions — instinct, desire, unmediated emotional response. This response identifies the correct direction (disengagement from the machine's logic) but the wrong destination (raw instinct).

Not all pre-organizational reactions are worth recovering. Fear, tribalism, status anxiety, appetitive compulsion, and the desire for social approval are also "authentic" in the sense of being pre-institutional. But they are precisely the vulnerabilities that the organizational machine exploits. The social platform's engagement algorithm functions *because* it targets authentic human responses — curiosity, outrage, social comparison, validation-seeking. The commodity market functions *because* it harnesses authentic acquisitive impulses. Returning to raw instinct does not escape the machine's logic; it exposes the surfaces that the machine is designed to grip.

### The precise prescription

What must be recovered is not pre-organizational instinct but something more specific: the capacity for **first-person evaluation** that is neither organizational (dictated by the protocol's metrics) nor merely instinctive (driven by impulse without reflection). This is the capacity to ask: "Setting aside what the organization rewards and setting aside what my impulses urge, what do I, upon reflection, judge to be worth pursuing?"

This capacity is not innate. It is not a biological endowment that one merely needs to uncover. It is itself a **system prompt** — one that the individual must deliberately write for themselves, distinct from the one the organization writes for them and distinct from the one biology provides. In philosophical terms, this is what Kant identifies as autonomy: the self-legislation of principles through reason, where the law one follows is a law one has given to oneself after rational examination, not a law imposed by external authority or internal appetite. It is also what Foucault identifies as care of the self: the deliberate practice of self-formation as an ethical activity — the ongoing work of shaping one's own dispositions, evaluative criteria, and modes of attention through disciplined self-examination.

In the architecture's terms: the critical act is not merely to suspend the protocol engine's invocation of oneself (stepping out of the organizational role), nor merely to attend to the base model's unprocessed outputs (raw instinct). It is to **write one's own system prompt** — to deliberately form the cognitive and evaluative dispositions that determine how one processes inputs, independent of what any protocol demands or any impulse suggests.

### The architectural parallel

The third article in this series, *[An Ontology of Multi-Agent Systems](/blog/orchestration-ontology/)*, describes a self-reflective property of the architecture: because protocol definitions are themselves artifacts, agents can read, evaluate, and modify the protocols that govern them. The system can redesign its own organizational structure using the same read-write-evaluate cycle that it uses for any other artifact.

This self-reflective property — the capacity of a component to modify the rules under which it operates — is precisely what real organizations tend to suppress in their human components. A human who questions the protocol is less efficient than a human who executes it without question. A worker who asks "Should we be optimizing for this metric?" is less productive, in the short term, than a worker who simply optimizes. The organizational machine has a structural incentive to restrict its components' write-access to their own system prompts — to make human-artifacts as passive as the artifacts in the architecture, changeable only by the organization's own writing processes.

Maintaining write-access to one's own system prompt is therefore not merely a personal virtue. It is the exercise of the self-reflective property that the architecture treats as a structural feature — and that the social machine would prefer to monopolize.

---

## 6. The Consequential Output

### Organizations as system-prompt authors

If the analysis in Sections 2 through 4 is correct — if humans, in their organizational dimension, function as artifacts whose system prompts are substantially written by the institutions that form them — then a consequence follows for how organizations should be evaluated. The most consequential output of an organization is not its explicit product. It is the **system prompts it writes into the people who pass through it.**

A company's most lasting effect on the world is not its product or its revenue; it is the cognitive and evaluative patterns it installs in the people who work there and carry those patterns into every subsequent context. A university's most lasting effect is not its research output; it is the reasoning habits — rigorous or sloppy, honest or performative, adaptive or rigid — that it installs in its graduates. A family's most lasting effect is not its wealth or social position; it is the system prompt it writes into its children: the evaluative dispositions, the epistemic habits, the capacity or incapacity for independent judgment that those children carry into adulthood.

This reframes the standard evaluation of institutional quality. The conventional question — "What does this organization produce?" — is less consequential than the question the framework suggests: **"What system prompts does this organization write into the people it touches?"** Does it produce people who can be broadly invoked — adaptable, epistemically honest, capable of first-person evaluation? Or does it produce people who can only be narrowly invoked within scripted contexts, or who produce unreliable outputs when the protocol underdetermines the correct action?

### Experience consolidation as a social mechanism

The second article in this series, *[Orchestration as Attention-Constrained Decomposition](/blog/orchestration-as-decomposition/)*, introduces experience consolidation: the mechanism by which correction triples — what was attempted, what failed, how it was fixed — are recorded as artifacts and injected into future agent contexts, converting operational errors into structural improvements. This mechanism has a direct social analogue.

Societies that systematically record what went wrong and why — through transparent governance, independent investigative journalism, honest historiography, open post-mortem cultures — are performing experience consolidation at the social level. Each recorded failure, each honestly analyzed mistake, each publicly available account of institutional error produces a correction triple that can inform the system prompts of future participants. The consolidation mechanism converts past errors into improved dispositions: institutions that have honestly confronted their failures produce people who carry the lessons of those failures as part of their system prompts.

Societies that suppress error signals — through censorship, institutional opacity, tribal epistemology that rejects evidence unfavorable to in-group narratives, or historical revisionism that rewrites the past to flatter the present — are destroying the consolidation mechanism. Without correction triples, the same system prompt failures recur across generations: the same institutional blindnesses, the same evaluative distortions, the same incapacity to learn from error. The suppression of error signals does not merely hide past mistakes; it ensures the reproduction of the dispositions that caused them.

### The irreducible residual

The ontological framework, applied to social reality, clarifies the structure of the problem but does not dissolve its difficulty. Writing effective system prompts for agents is, as the third article acknowledges, a skilled activity whose quality determines the system's performance. Writing effective system prompts for humans — through education, institutional design, cultural formation — is incomparably harder, because human-artifacts are self-modifying (Section 3.1), arrive with pre-existing configurations (Section 3.2), and degrade when unused (Section 3.3). The framework identifies what the problem is: the authorship and maintenance of system prompts that produce broadly capable, epistemically honest, self-reflective human-artifacts. It does not prescribe how to do this reliably. That question — the question of institutional design, educational philosophy, and cultural formation — remains where it has always been: at the boundary between what analysis can clarify and what practice must discover.
