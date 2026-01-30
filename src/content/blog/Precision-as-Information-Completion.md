---
title: "Precision as Information Completion"
description: "A framework for understanding and optimizing generative AI responses."
date: 2026-02-12
tags: ["LLM"]
---

## 1. The User's Premise

Every act of prompting a generative AI presupposes an information deficit. A user who already possesses the complete answer does not pose the question; a user who lacks nothing does not seek completion. The prompt is therefore a partial specification: it encodes some fraction of the information needed to determine a complete, coherent representation, and leaves the remainder unspecified. The user's expectation is that the AI's response will supply this remainder — that prompt and response, taken together, will constitute a fully determined intended representation in which every decision point has been resolved and no significant ambiguity persists.

This framing yields a foundational reorientation. The prompt and the response are not two independent objects — one an instruction, the other an execution — but two complementary halves of a single whole, related as two pieces of a puzzle are related. Each piece is shaped by the contour of the other: the prompt's gaps define what the response must supply, and the model's capabilities constrain what the prompt must specify. Neither piece is independently sufficient as a complete representation; only their union achieves determinacy.

From this it follows that the quality of a response cannot be evaluated in isolation. A response is adequate only relative to the prompt it completes, just as a puzzle piece is correct only relative to the piece it adjoins. The unit of evaluation is not the response alone but the composite whole.

---

## 2. The Problem Landscape

### 2.1 The Gradient of User Contribution

The amount of structure a user furnishes in a prompt varies continuously. At one extreme, the user specifies nearly everything — the principal contours have been traced, the major landmarks fixed, the scale established — and the response need only fill in local detail between known points. At the other extreme, the user gestures toward a region of meaning without drawing its boundaries, and the response must construct most of the representational structure from the model's own knowledge.

A distinction is commonly drawn between two supposedly different problems: *unclear expression of a formed intent* and *expression of an unformed intent*. Within this framework, that distinction dissolves. Both are instances of the same underlying phenomenon — varying fractions of the intended representation furnished by the user. What appears to be a difference in kind is a difference in magnitude: how much of the puzzle the user has already assembled. A prompt that is "vague" and a prompt that is "underspecified" differ not in the type of deficiency but in the quantity of structure yet to be supplied.

### 2.2 The Reality Constraint

The intended representation composed by prompt and response must be not only internally coherent but also compatible with the state of the world. Current generative AI models encode their representation of reality — call it *W'* — within their parameters, learned from training data. *W'* is not an external input to the system; it is an intrinsic component of the generation process itself.

This architectural fact is simultaneously the source of the model's capability and the origin of its characteristic risks. *W'* may be outdated, bounded by the training data cutoff. It may be systematically biased, reflecting distributional skews in the corpora from which it was learned. It may be confidently wrong, producing fluent but factually incorrect output. And it may be blind to the user's local context — the specific codebase, organization, or domain situation that the user inhabits but the model has never observed.

Techniques such as retrieval-augmented generation, tool use, and context-window injection are attempts to partially externalize *W'*: to narrow the gap between the model's learned representation and the actual state of affairs. Parameter-efficient adaptation methods — notably LoRA — operate at a deeper level, modifying the model's distributional priors for specific domains or users, thereby reshaping *W'* itself rather than supplementing it at inference time. Neither approach eliminates the divergence entirely; both reduce it within bounded regions.

### 2.3 Sources of Prompt Imprecision

When a prompt fails to adequately constrain the intended representation, the failure falls into one or more of seven categories, distinguished by the *type* of information that is missing:

1. **Referential vagueness** — the objects of the request cannot be uniquely identified ("fix that function" — which function?)
2. **Goal underspecification** — the desired action is named but its purpose is absent, or the purpose is stated but no actionable path is indicated ("optimize this code" — optimize for what property?)
3. **Scope ambiguity** — the boundaries of the request are undefined, admitting interpretations that range from minutes of effort to months ("refactor the authentication system" — the login flow, or the entire identity infrastructure?)
4. **Constraint omission** — the user holds requirements in mind but does not express them ("build a dashboard" — on what stack, for what data, serving what audience?)
5. **Vague criteria** — success is described in subjective or relative terms, without a measurable baseline ("make it faster" — faster by what margin, measured how, under what conditions?)
6. **Structural confusion** — multiple heterogeneous requests are entangled without hierarchy, sequence, or priority ("refactor this module, add a feature, and fix that bug")
7. **Epistemic error** — a false factual premise is embedded in the prompt ("the database is slow" — when the actual bottleneck lies in the application layer)

These seven types are mutually exclusive in their mechanism but not in their occurrence: a single prompt routinely exhibits several simultaneously.

### 2.4 Precision Mechanisms

When the nature of a deficiency has been identified, the act of refining expression toward precision draws on six distinct mechanisms, each employing a different cognitive and linguistic strategy:

1. **Cartographer** — progressive concretization: maps a domain from the abstract to the specific, layer by layer, as Tocqueville maps the influence of equality through the institutions of American society
2. **Geometer** — axiomatic deduction: proceeds from premises through logical necessity to conclusions, as Madison derives the structure of government from the non-negotiable facts of human nature
3. **Anatomist** — conceptual decomposition: dissects a seemingly unitary concept into its constituent necessary conditions, as Aristotle decomposes virtue into genus, differentia, and standard of judgment
4. **Watchmaker** — causal mechanism tracing: exhibits each gear of a causal chain in sequence, leaving no step hidden, as Darwin assembles the mechanism of natural selection from variation, differential survival, and heredity
5. **Sculptor** — negative definition: carves the boundary of a concept by removing what it is not, as Mill defines civil liberty by first excluding liberty of the will
6. **Lapidary** — maximum compression: achieves the highest semantic density per word, every term load-bearing and non-substitutable, as Hobbes condenses the state of nature into five irreducible adjectives

These mechanisms are not mutually exclusive in practice. Precise expression typically employs several in combination, with one serving as the dominant structural strategy and others contributing at local points where they are needed.

---

## 3. Formal Definition

### 3.1 Variables

Let:

- ***p*** denote the user's prompt — the observed partial specification
- ***r*** denote the model's response — the variable to be optimized
- ***S*** denote the intended representation — the fully determined configuration of meaning that (*p*, *r*) jointly aim to constitute
- ***W'*** denote the model's internal representation of reality, encoded in its parameters

### 3.2 Constraint: Consistency

The pair (*p*, *r*) is consistent if and only if there exists at least one coherent intended representation *S* that is simultaneously compatible with *p*, with *r*, and with *W'*. In the language of constrained optimization: the feasible set is non-empty.

Consistency has two faces, exhaustively partitioning its scope:

- **Internal consistency**: *p* and *r* do not contradict each other, and *r* does not contradict itself
- **External consistency**: the joint implications of (*p*, *r*) do not contradict *W'*

If no such *S* exists — if the prompt asserts one thing and the response asserts the contrary, or if their joint implications are incompatible with the model's representation of reality — the consistency constraint is violated and no valid intended representation can be composed.

### 3.3 Objective: Informativeness

The informativeness of a response *r*, given a prompt *p*, is the quantity of uncertainty about *S* that *r* resolves:

> ***I*(*r*; *S* | *p*) = *H*(*S* | *p*) − *H*(*S* | *p*, *r*)**

where *H* denotes Shannon entropy. This is the conditional mutual information between the response and the intended representation, given the prompt.

- *H*(*S* | *p*) is the residual uncertainty about *S* after the user has provided the prompt — the volume of distinct intended representations still compatible with *p*
- *H*(*S* | *p*, *r*) is the residual uncertainty after both prompt and response are given — the volume of distinct intended representations still compatible with the pair

A maximally informative response drives *H*(*S* | *p*, *r*) toward zero: the intended representation is fully determined, every decision point resolved, no significant ambiguity remaining. This terminal condition is what is conventionally called *completeness*. Completeness requires no independent definition; it is the achieved state when informativeness has been maximized — the point at which entropy reduction has done its full work.

### 3.4 The Compact Formulation

The problem of generating an optimal response reduces to:

> ***r*\* = argmax *I*(*r*; *S* | *p*)**
>
> **subject to: ∃ *S* compatible with (*p*, *r*, *W'*)**

One constraint governs what is admissible; one objective governs what is optimal among the admissible. Consistency determines the feasible set; informativeness selects within it.

### 3.5 Multi-Turn Extension

In a multi-turn conversation, each contribution — whether from user or model — should monotonically decrease *H*(*S* | conversation history):

| Stage | Entropy | Event |
| --- | --- | --- |
| Initial | *H*(*S*) | No information exchanged; maximum uncertainty |
| After *p*₁ | *H*(*S* \| *p*₁) | User's first prompt reduces uncertainty |
| After *r*₁ | *H*(*S* \| *p*₁, *r*₁) | Model's response reduces it further |
| After *p*₂ | *H*(*S* \| *p*₁, *r*₁, *p*₂) | User's follow-up narrows again |
| Terminal | *H*(*S* \| full history) ≈ 0 | Intended representation fully determined |

A turn that fails to reduce *H* is wasted. A turn that increases *H* — by introducing new ambiguity or contradiction — is a regression. The quality of any single turn is measured by its marginal contribution: the mutual information it provides about *S* given everything that preceded it.

---

## 4. Exact Solution

The exact solution requires three steps:

1. **Enumerate** all intended representations *S* consistent with *p* and *W'*
2. **For each candidate response** *r*, compute *H*(*S* | *p*, *r*) — the residual uncertainty about *S* after incorporating *r*
3. **Select** the *r* that minimizes *H*(*S* | *p*, *r*), equivalently maximizes *I*(*r*; *S* | *p*)

This procedure is intractable. The space of possible intended representations is continuous and unbounded. The conditional distribution *P*(*S* | *p*) has no closed form. No known algorithm enumerates the feasible set or computes the entropy exactly over natural-language semantic spaces.

The exact formulation serves not as an implementable algorithm but as a normative standard: it defines what a perfect response would be, against which all practical approximations can be evaluated.

---

## 5. Approximation Methods

### 5.1 Approximating the Objective: Semantic Entropy Estimation

Three methods exist, ordered by increasing fidelity and cost:

**Token-level entropy.** During generation, the model computes a probability distribution over the next token at each position. The entropy of this distribution is directly available from the logits, at zero marginal cost. Positions where token-level entropy spikes indicate decision points at which the prompt provides insufficient constraint. *Limitation*: this measures syntactic uncertainty — uncertainty about which word comes next — not semantic uncertainty — uncertainty about what the response means. Two phrasings of the same idea register as high token entropy; a confidently wrong answer registers as low token entropy.

**Sampling diversity.** Generate *N* independent responses to the same prompt (*N* = 5–20) and measure the variance among them. High variance indicates that the prompt leaves many degrees of freedom; low variance indicates tight constraint. *Limitation*: surface-level lexical diversity does not reliably indicate semantic divergence. Two responses may differ in wording while converging in meaning, or agree in phrasing while diverging in implication.

**Semantic entropy** (Kuhn et al., 2023). Generate *N* responses, then cluster them by semantic equivalence using a natural language inference model — specifically, bidirectional entailment. Compute entropy over the resulting semantic clusters rather than over raw text. This collapses paraphrases into a single equivalence class and measures uncertainty at the level of meaning, not wording. *This is currently the closest practical approximation to H(S | p).*

| Method | Cost | What it measures | Best suited for |
| --- | --- | --- | --- |
| Token-level entropy | ≈ 0 (byproduct of generation) | Syntactic uncertainty | Fast screening for high-uncertainty positions |
| Sampling diversity | *N* forward passes | Lexical variation | Moderate-cost triage |
| Semantic entropy | *N* passes + NLI classification | Semantic uncertainty | Reliable entropy estimation where fidelity matters |

### 5.2 Approximating the Constraint: Consistency Verification

Consistency — the existence of at least one coherent *S* compatible with (*p*, *r*, *W'*) — is a logical property, not an information-theoretic quantity. Its verification in natural language resists clean formalization: decomposing text into atomic assertions is itself an unsolved problem, and the space of logical implications of a natural-language text is not enumerable.

Three approaches, each with a distinct scope of applicability:

**LLM-as-judge.** A separate model instance — or the same model invoked independently — reads (*p*, *r*) as a whole and evaluates whether it is internally coherent and factually plausible. This leverages the strongest currently available natural-language understanding, but provides no formal guarantee: the judge may miss subtle contradictions, or share the generator's systematic blind spots.

**Domain-specific formal methods.** In domains that possess formal semantics — executable code, mathematical proof, structured data — consistency can be verified by type checkers, test suites, theorem provers, or schema validators. These methods are precise and model-independent, but applicable only where formal semantics exist. Natural language lies outside their reach.

**External grounding.** Retrieval-augmented verification fetches evidence from authoritative external sources and checks whether the claims in *r* align with the retrieved facts. This narrows the gap between *W'* (the model's learned reality) and *W* (actual reality), but its reliability depends on retrieval quality and source trustworthiness.

No single method suffices across all domains. In practice, consistency verification requires a layered strategy: formal methods where formal semantics are available, retrieval-based grounding where factual accuracy is paramount, and LLM-as-judge as the general-purpose fallback where neither formal verification nor retrieval applies.

### 5.3 Strategy Selection: The Entropy Threshold

The gradient of user contribution governs a consequential operational choice. When *H*(*S* | *p*) is low — the user has furnished most of the structure — the model should complete the representation directly. When *H*(*S* | *p*) is high — vast uncertainty remains — direct completion risks embedding numerous unsupported assumptions into the structure. In this regime, the more prudent strategy is to first expose the model's assumptions for the user's judgment before committing to the detail that depends upon them.

The threshold between these two strategies is not fixed. Three factors determine its position:

- **Error cost**: in high-stakes domains, lower residual entropy must be tolerated before committing to completion
- **Reversibility**: if the response can be easily revised, aggressive completion carries less risk
- **User preference**: some users prefer decisive answers; others prefer to see the space of alternatives

Practical approximation: an LLM-as-judge makes a meta-level assessment — "Given this prompt, how many substantially different valid responses could be produced?" — combined with heuristic signals drawn from the seven deficiency types enumerated in Section 2.3. The goal is not a precise entropy value but a reliable binary classification: *complete directly* or *expose assumptions first*.

---

## 6. Open Problems

Three boundaries of this framework remain unresolved. Each represents a point where the formal definition is precise but the practical approximation is not.

**The perspective of entropy.** The ideal *H*(*S* | *p*) should reflect the user's actual knowledge state, not the model's estimate of it. The prompt *p* may be a lossy compression of the user's knowledge: the user may know facts relevant to *S* that they have not expressed — because they judged them obvious, forgot to mention them, or did not anticipate that the model would need them. This divergence creates two distinct classes of uncertainty within *H*(*S* | *p*): *genuine gaps* (information the user does not possess and needs the model to supply) and *pseudo-gaps* (information the user possesses but has not communicated). The optimal strategy for each class differs — genuine gaps call for model completion; pseudo-gaps call for elicitation — but the model has no reliable method to distinguish between them without further interaction.

**The divergence of *W'*.** The model's internal representation of reality is frozen at training time, filtered through distributional biases in its training corpora, and blind to the user's local context. Retrieval-augmented generation, tool use, context injection, and parameter-efficient adaptation each reduce this divergence within bounded regions, but none eliminates it in general. A framework that treats *W'* as given — without modeling its error distribution or confidence boundaries — cannot distinguish between responses that are consistent with reality and responses that are merely consistent with the model's potentially incorrect beliefs about reality.

**The intractability of consistency detection.** Consistency in natural language cannot be verified by any known model-independent method. The most practical current approach — LLM-as-judge — relies on the very language-understanding capabilities whose outputs it is meant to evaluate, creating a circularity that limits the reliability of the verification. In domains with formal semantics, this problem is solved by construction; in unrestricted natural language, it remains open. This is the weakest link in the framework's chain from definition to implementation.
