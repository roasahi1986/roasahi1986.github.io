---
title: "Neural Network Quantization: Development, Challenges, and an Entropy-Guided Approach"
description: "A survey of neural network quantization from early binary-weight experiments to modern LLM deployment methods like GPTQ, AWQ, and SmoothQuant, alongside a detailed account of an entropy-guided adaptive activation quantization approach that anticipated several subsequent research directions."
date: 2026-03-23
tags: ["LLM"]
---

## 1. Overview and Motivation

A neural network in its native form stores parameters and computes intermediate values in 32-bit or 16-bit floating point. Quantization replaces these representations with low-bitwidth integers — typically 8, 4, or fewer bits — so that both the storage footprint and the arithmetic cost of inference shrink by a corresponding factor. A 32-bit weight compressed to 4 bits occupies one-eighth the memory; the multiply-accumulate operations that dominate inference time become cheaper in proportion.

Three forces drive the adoption of quantization:

1. **Model compression.** Transformer-based language models now routinely exceed tens of billions of parameters. Serving a 70-billion-parameter model in FP16 requires roughly 140 GB of accelerator memory — more than a single high-end GPU can provide. Quantizing weights to 4 bits reduces this to approximately 35 GB, bringing the model within reach of commodity hardware.

2. **Inference acceleration.** Lower-precision arithmetic executes faster on modern hardware. INT8 matrix multiplication on an NVIDIA A100 achieves roughly twice the throughput of FP16; INT4 widens the gap further. For latency-sensitive applications — real-time translation, interactive agents, on-device assistants — this speedup is not optional.

3. **Edge deployment.** Mobile phones, embedded controllers, and IoT devices impose hard constraints on power, memory, and silicon area. Quantization is often the difference between a model that fits on-device and one that requires a round trip to the cloud.

The fundamental tension in quantization is between compression and fidelity. Every reduction in bitwidth discards information. The art lies in choosing *which* information to discard — and *how* to discard it — so that the model's task-relevant behavior is preserved.

## 2. Taxonomy of Quantization Methods

Quantization methods vary along several orthogonal axes. Understanding this taxonomy clarifies why no single method dominates all settings.

### 2.1 By Timing: PTQ vs. QAT

**Post-Training Quantization (PTQ)** takes a model that has already been trained in full precision and converts it to lower precision without further gradient-based optimization. PTQ is fast, requires no labeled training data (at most a small calibration set for range estimation), and introduces no training overhead. It is typically sufficient for 8-bit quantization with negligible accuracy loss. At lower bitwidths (4-bit and below), PTQ methods must work harder to compensate for the larger quantization error.

**Quantization-Aware Training (QAT)** inserts simulated quantization operations (fake quantization nodes) into the forward pass during training. The network learns to compensate for quantization noise through gradient descent, using the straight-through estimator to propagate gradients through the non-differentiable rounding step. QAT generally produces better results at very low bitwidths but requires access to training data, a training pipeline, and additional compute.

### 2.2 By Target: Weights, Activations, and Gradients

**Weight quantization** converts the learned parameters of the network. Weights are fixed after training, so their distribution can be analyzed statically. They typically follow narrow, roughly symmetric distributions centered near zero, making them comparatively easy to quantize.

**Activation quantization** converts the intermediate tensor values produced during inference. Activations are data-dependent: their distributions shift with each input and can exhibit heavy tails and outliers. This makes activation quantization substantially harder than weight quantization.

**Gradient quantization** reduces the precision of gradients during distributed training to lower communication bandwidth. It is orthogonal to inference-time quantization and will not be the focus of this document.

### 2.3 By Granularity

- **Per-tensor**: a single scale and zero-point for the entire tensor. Simplest and most hardware-friendly, but a single outlier can distort the quantization range for all elements.
- **Per-channel**: separate quantization parameters for each output channel. Standard for weight quantization in modern frameworks.
- **Per-group**: subdivides each channel into groups of fixed size (e.g., 128 elements), each with its own scale. Used in recent LLM quantization methods (GPTQ, AWQ) to achieve finer granularity without full per-element overhead.

### 2.4 By Mapping Function: Uniform vs. Non-Uniform

**Uniform quantization** spaces quantization levels evenly across the representable range. Given a floating-point value $x$ in $[x_{\min}, x_{\max}]$ and a target of $b$ bits, the quantized value is:

$$q = \left\lfloor \frac{x - x_{\min}}{x_{\max} - x_{\min}} \cdot (2^b - 1) \right\rceil$$

Uniform quantization maps directly to standard integer arithmetic and is well-supported by hardware.

**Non-uniform quantization** spaces levels unevenly, allocating finer resolution where values are dense and coarser resolution where they are sparse. Logarithmic quantization, power-of-two quantization, and learned codebook methods fall into this category. Non-uniform schemes can better match skewed distributions, but their hardware support is less mature.

### 2.5 By Bitwidth Strategy: Fixed vs. Mixed Precision

**Fixed-precision** methods apply the same bitwidth to all layers (e.g., W8A8 — 8-bit weights, 8-bit activations everywhere).

**Mixed-precision** methods assign different bitwidths to different layers or groups, allocating more precision where sensitivity is high and less where the model tolerates coarser representation. The challenge is combinatorial: a network with $L$ layers and $k$ candidate bitwidths has $k^L$ possible configurations. Methods such as HAQ (2019) use reinforcement learning to search this space; others rely on sensitivity analysis or information-theoretic criteria.

## 3. Historical Development

### 3.1 Early Exploration (2015--2016)

The earliest wave of neural network quantization research pursued an extreme hypothesis: can networks function with binary or ternary weights?

**BinaryConnect** (Courbariaux et al., NeurIPS 2015) constrained weights to $\{-1, +1\}$ during forward and backward passes while maintaining full-precision shadow weights for gradient accumulation. The key insight was that multiply-accumulate operations — the dominant cost in neural network inference — reduce to simple additions when one operand is binary. BinaryConnect achieved near-state-of-the-art accuracy on MNIST, CIFAR-10, and SVHN, demonstrating that extreme quantization was feasible for small-scale tasks.

**XNOR-Net** (Rastegari et al., ECCV 2016) extended binarization to both weights and activations, replacing convolutions with XNOR and popcount operations. This yielded 58× faster convolutions and 32× memory savings, but at a significant accuracy cost on ImageNet — revealing the fundamental trade-off between compression ratio and representational capacity.

**DoReFa-Net** (Zhou et al., 2016) generalized beyond binary to arbitrary low bitwidths for weights, activations, and gradients independently, using stochastic quantization for gradients. It demonstrated that different components of the network tolerate different levels of quantization, laying the conceptual groundwork for mixed-precision approaches.

These early works established two lasting lessons: (1) neural networks are remarkably tolerant of reduced precision, and (2) the tolerance is not uniform — different quantities (weights vs. activations vs. gradients) and different layers demand different treatment.

### 3.2 Engineering Maturation (2017--2020)

The second era shifted from exploring extremes to making quantization practical and deployable.

**INT8 deployment** became an industry standard. NVIDIA's TensorRT, Google's TensorFlow Lite, and Qualcomm's SNPE all provided toolchains for converting trained models to 8-bit integer representations with minimal accuracy loss. For the first time, quantization was not a research curiosity but a production requirement.

**Mixed-precision training** (Micikevicius et al., ICLR 2018) demonstrated that training itself could use reduced precision: FP16 for most operations, with FP32 master copies of weights and loss scaling to prevent underflow. This halved training memory and accelerated computation on Tensor Core hardware, becoming the default training configuration for large-scale experiments.

**Automated mixed-precision quantization** emerged as a response to the combinatorial complexity of per-layer bitwidth assignment. HAQ (Wang et al., CVPR 2019) framed bitwidth allocation as a reinforcement learning problem, using a hardware-aware reward signal to jointly optimize accuracy and latency. This line of work established that bitwidth allocation is best treated as a structured optimization problem rather than a manual heuristic.

### 3.3 The LLM Era (2022--Present)

The emergence of large language models with tens to hundreds of billions of parameters created a new quantization regime. Models of this scale cannot be retrained cheaply, making PTQ the dominant paradigm. At the same time, the sheer memory footprint makes quantization mandatory rather than optional for most deployment scenarios.

**GPTQ** (Frantar et al., 2022) introduced a one-shot weight quantization method based on approximate second-order information (an extension of the Optimal Brain Surgeon framework). It can quantize a 175-billion-parameter model in approximately four GPU-hours, achieving 3-bit or 4-bit weight precision with negligible accuracy loss. GPTQ enabled, for the first time, running GPT-175B on a single GPU.

**AWQ** (Lin et al., MLSys 2024 Best Paper) observed that not all weights are equally important: the saliency of a weight channel is better predicted by the magnitude of its corresponding activations than by the magnitude of the weight itself. Protecting just 1% of salient weights (identified via activation magnitudes) dramatically reduces quantization error, while the remaining 99% can be aggressively quantized. AWQ does not require backpropagation, preserving generalization across domains.

**SmoothQuant** (Xiao et al., ICML 2023) addressed the complementary problem of activation quantization. Its core insight is that the difficulty of quantization can be *migrated* between weights and activations via a mathematically equivalent per-channel scaling transformation. Since weights are inherently easier to quantize, absorbing some of the activation's dynamic range into the weight matrix makes both quantities amenable to INT8 representation. SmoothQuant enabled W8A8 quantization for models up to 530 billion parameters with negligible accuracy loss, and has been adopted into NVIDIA TensorRT-LLM, Microsoft ONNX Runtime, and Amazon SageMaker.

These three methods — GPTQ, AWQ, and SmoothQuant — collectively define the current toolkit for LLM deployment quantization, targeting different aspects of the problem (weight-only vs. weight-and-activation, second-order correction vs. saliency-aware scaling vs. difficulty migration).

## 4. The Central Challenge of Activation Quantization

Weight quantization and activation quantization differ not merely in degree but in kind. Understanding this asymmetry is essential background for the approach described in Section 5.

### 4.1 Distributional Asymmetry

Weights, shaped by regularization and optimization dynamics, typically settle into narrow, roughly symmetric distributions centered near zero. Their range is known at deployment time and does not change across inputs. These properties make weight quantization relatively straightforward: a per-channel uniform quantizer with calibrated scale factors achieves good results.

Activations, by contrast, are functions of the input data. Their distributions vary across inputs, across layers, and across channels within a layer. More critically, activation distributions in transformer models exhibit heavy tails: a small number of channels carry values that are orders of magnitude larger than the rest.

### 4.2 The Outlier Problem

Recent analysis of transformer activations reveals the severity of this problem in quantitative terms. In BERT, the kurtosis of activation distributions increases with depth, reaching values above 270 in the final layers. Approximately 55% of activation energy concentrates in the top 1% of channels. These are not statistical anomalies — they encode structured, task-relevant signal. Clipping them destroys model accuracy; accommodating them under uniform quantization wastes the vast majority of quantization levels.

Consider a concrete example. Suppose an activation tensor has values mostly in $[0, 10]$, but a few outlier channels reach $1000$. Under 8-bit uniform quantization across the full $[0, 1000]$ range, the step size is approximately $4$. Values in the dense $[0, 10]$ region — where most of the information resides — are all crushed into just 2--3 distinct quantized levels, while the range $[10, 1000]$ consumes the remaining 250+ levels that are almost entirely unused.

### 4.3 Approaches to the Outlier Problem

Several strategies have emerged to address this challenge:

- **Clipping-based methods** truncate outliers beyond a calibrated percentile. However, because outlier channels carry genuine signal, aggressive clipping degrades accuracy.
- **Per-channel quantization** assigns separate ranges to each channel, preventing a single outlier channel from distorting the quantization of others. This helps but increases metadata overhead.
- **Difficulty migration** (SmoothQuant) redistributes the dynamic range between weights and activations, smoothing activation outliers before quantization.
- **Non-uniform quantization** allocates finer resolution to the dense region of the distribution and coarser resolution to the sparse tail, addressing the root cause of the utilization problem.

## 5. Entropy-Guided Adaptive Activation Quantization

This section describes a quantization method that the author designed and experimented with over a decade ago. The work predates the LLM era and the widespread attention to activation outliers that followed. No experimental data from that period are available; what follows is a presentation of the ideas and the reasoning behind them.

### 5.1 Design Philosophy: Decoupled Treatment of Weights and Activations

The method begins from a simple empirical observation: weights and activations present fundamentally different quantization challenges, and treating them identically is suboptimal.

Weights occupy narrow, roughly symmetric ranges. They lack significant long-tail behavior. Straightforward uniform quantization with calibrated scale factors keeps accuracy degradation within acceptable bounds. No elaborate scheme is needed.

Activations, however, exhibit the distributional pathologies described in Section 4 — wide ranges, heavy tails, and outlier channels that waste quantization levels under uniform treatment. The method therefore directs its primary effort toward activation quantization, applying simple uniform quantization to weights.

### 5.2 Entropy-Based Adaptive Bitwidth Allocation

The core technical contribution is an information-theoretic criterion for determining the quantization bitwidth of each activation tensor.

**Calibration procedure.** After training a full-precision model, run inference over the training set. For each activation in the network, record its empirical value distribution across all training examples.

**Entropy computation.** Compute the Shannon entropy of each activation's empirical distribution:

$$H = -\sum_{i} p(x_i) \log_2 p(x_i)$$

where $p(x_i)$ is the probability of the activation falling into the $i$-th bin of a discretized histogram.

**Bitwidth assignment.** For each output tensor, average the entropies of all its constituent activations. This mean entropy serves as the target bitwidth for quantizing that tensor.

The intuition is direct: Shannon entropy measures the effective information content of a random variable in bits. If an activation's distribution has an entropy of 5.3 bits, then 5.3 bits suffice in principle to represent its information content without loss. Allocating significantly more bits wastes capacity; allocating significantly fewer bits destroys information. The mean entropy across a tensor provides a principled, data-driven estimate of the minimum bitwidth that preserves the tensor's information content.

This approach yields a *mixed-precision* quantization scheme as a natural consequence, without requiring combinatorial search or reinforcement learning — the bitwidths emerge directly from the distributional statistics of the trained model.

### 5.3 Three Quantization Schemes

Given a target bitwidth for each tensor, the method explores three different quantization functions, each addressing the outlier-induced utilization problem with increasing aggressiveness.

**Scheme 1: Uniform quantization.** The baseline approach. For an activation value $x$ in a tensor with observed range $[x_{\min}, x_{\max}]$ and target bitwidth $b$:

$$q = \left\lfloor \frac{x - x_{\min}}{x_{\max} - x_{\min}} \cdot (2^b - 1) \right\rceil$$

This is the simplest scheme and works well when the activation distribution is roughly uniform. When it is not — when outliers stretch the range — many quantization levels go unused.

**Scheme 2: Square-root quantization.** Apply a square-root transformation before uniform quantization:

$$q = \left\lfloor \frac{\sqrt{x} - \sqrt{x_{\min}}}{\sqrt{x_{\max}} - \sqrt{x_{\min}}} \cdot (2^b - 1) \right\rceil$$

The square root is a concave function that compresses the upper end of the range and expands the lower end. For a right-skewed distribution — where most values are small but a few are large — this transformation pulls the bulk of the distribution into a more uniform shape before quantization, increasing the number of quantization levels that are actually utilized.

**Scheme 3: Logarithmic quantization.** Apply a base-2 logarithm before uniform quantization:

$$q = \left\lfloor \frac{\log_2(x) - \log_2(x_{\min})}{\log_2(x_{\max}) - \log_2(x_{\min})} \cdot (2^b - 1) \right\rceil$$

The logarithm is more aggressively concave than the square root. It compresses the large-value region more strongly, allocating proportionally more quantization levels to the small-value region where the density of activations is highest.

**The shared motivation.** All three schemes target the same problem: under uniform quantization of a skewed distribution, the quantization levels are not equally utilized. Outlier values claim a disproportionate share of the representable range, while the dense core of the distribution is under-resolved. The square-root and logarithmic transformations reshape the distribution before quantization, making the mapping between floating-point values and integer levels more efficient. The goal is that every integer code in the quantized representation carries approximately equal probability — an echo of the principle from information theory that optimal codes assign shorter representations to more probable symbols.

### 5.4 Empirical Finding: The Layer-Depth Entropy Gradient

An empirical observation from the calibration procedure revealed a consistent pattern: **the entropy of activation distributions decreases monotonically with layer depth.**

Layers close to the input exhibit high entropy and require higher bitwidths to preserve their information content. Layers close to the output exhibit low entropy — typically 2 to 4 bits — and tolerate aggressive quantization.

**Interpretation.** Quantization discards information in an undirected manner: it truncates precision uniformly across all dimensions of the representation, without distinguishing between task-relevant and task-irrelevant components. In early layers, the network has not yet refined the input representation toward the task objective. These layers carry a broad mixture of features — some relevant to the downstream task, many not. Because the task-relevant information has not yet been concentrated or separated from the irrelevant, undirected truncation at this stage has a high probability of destroying signal that the network will need later.

In deeper layers, the successive transformations of the network have progressively distilled the representation. Task-relevant information has been concentrated into fewer effective dimensions; redundant and irrelevant features have been suppressed. The remaining information is lower-dimensional in an information-theoretic sense — hence the lower entropy — and tolerates coarser representation because what remains is predominantly what the task requires, with less to accidentally destroy.

This observation provides an information-theoretic justification for a design principle that would later become standard in mixed-precision quantization: **allocate higher precision to early layers and lower precision to later layers.** Automated bitwidth-allocation methods such as HAQ (2019) would rediscover this pattern through reinforcement-learning-based search over the space of per-layer bitwidths, arriving empirically at configurations that the entropy gradient predicts *a priori*.

### 5.5 Connections to Subsequent Work

The ideas in this method anticipate several lines of research that emerged years later:

**Entropy-driven bitwidth allocation.** A mixed-precision quantization method published in *Nature Scientific Reports* (2025) computes the entropy of each layer's output during inference and uses it to adaptively allocate per-layer bitwidths — closely paralleling the approach described above. The convergence is unsurprising: Shannon entropy is the natural measure of information content, and information content is the natural criterion for determining how many bits a representation requires.

**Non-uniform quantization.** The logarithmic quantization scheme shares conceptual ground with the Additive Powers-of-Two (APoT) method (Li et al., ICLR 2020), which constrains quantization levels to sums of power-of-two terms to better match bell-shaped and long-tailed distributions. AdaLog and related methods optimize the logarithmic base to accommodate power-law-like activation distributions. The POST (Power of Square Root of Two) method uses $\sqrt{2}$ as an exponential base, occupying a conceptual position between the square-root and logarithmic schemes described here.

**Activation outlier management.** The focus on activation distribution pathologies — outliers stretching the quantization range, wasting bitwidth, and degrading the effective resolution of the quantized representation — anticipates the central problem that SmoothQuant (2023) and subsequent LLM-era methods were designed to solve. Where the approach described here reshapes the distribution via a nonlinear transformation before quantization, SmoothQuant reshapes it via a linear per-channel scaling that migrates difficulty to the weight side. The two strategies are complementary: they attack the same distributional pathology from different angles.

## 6. Current Landscape and Outlook

### 6.1 The Present Mainstream

The de facto standard for LLM deployment in 2025--2026 is **W4A8**: 4-bit weights with 8-bit activations. Weight-only quantization methods (GPTQ, AWQ) handle the weight side; activation quantization methods (SmoothQuant, or simply retaining FP16/INT8 for activations) handle the activation side. This configuration reduces memory by approximately 4× relative to FP16 while preserving near-full-precision accuracy for most tasks.

Frameworks supporting this pipeline are mature and widely deployed: NVIDIA TensorRT-LLM, vLLM, HuggingFace Transformers with `bitsandbytes` and AutoGPTQ, and llama.cpp for CPU-based inference.

### 6.2 Frontier Directions

Several research frontiers are pushing beyond the current standard:

**Ultra-low bitwidth.** Methods exploring 2-bit and even 1.58-bit (ternary) representations aim to shrink models further. BitNet b1.58 (Microsoft, 2024) demonstrated that training a transformer from scratch with ternary weights ($\{-1, 0, 1\}$) can match full-precision performance at smaller model scales, though scaling this approach to the largest models remains an open problem.

**Zero-shot quantization.** Methods that require no calibration data address privacy-sensitive deployment scenarios (healthcare, finance, enterprise) where even a small calibration set may be unavailable. These methods synthesize proxy data or use noise-optimization strategies to calibrate quantization parameters.

**Algorithm-hardware co-design.** Quantization methods that are jointly designed with hardware accelerators can exploit non-standard number formats (e.g., microscaling formats, block floating point) that do not fit neatly into the uniform/non-uniform dichotomy but offer better accuracy-efficiency trade-offs on specific silicon.

**Dynamic quantization.** Rather than committing to a fixed quantization scheme at deployment time, dynamic methods adjust precision at runtime based on input characteristics — allocating more bits to difficult inputs and fewer to easy ones. This extends the mixed-precision idea from the layer dimension to the input dimension.

The trajectory is clear: quantization is not a post-hoc compression trick but an integral part of the model deployment stack, co-evolving with model architectures, training procedures, and hardware capabilities.
