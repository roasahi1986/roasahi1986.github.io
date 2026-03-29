---
title: "Papers Collection Catalog"
description: "A catalog of approximately 120 unique papers and reference documents organized into 22 thematic categories covering LLMs, diffusion models, GANs, graph neural networks, recommendation systems, evolutionary algorithms, and more."
date: 2026-03-29
tags: ["LLM"]
---

> This catalog summarizes approximately 120 unique papers and reference documents organized into 22 thematic categories. Each entry includes the title, authors, year, and a brief summary.

---

## Table of Contents

1. [LLM — Foundational Architecture and Scaling](#1-llm--foundational-architecture-and-scaling)
2. [LLM — Mixture of Experts](#2-llm--mixture-of-experts)
3. [LLM — Alignment and Preference Learning](#3-llm--alignment-and-preference-learning)
4. [LLM — Prompting and Reasoning](#4-llm--prompting-and-reasoning)
5. [LLM — Knowledge Distillation and Synthetic Data](#5-llm--knowledge-distillation-and-synthetic-data)
6. [LLM — Parameter-Efficient Fine-Tuning](#6-llm--parameter-efficient-fine-tuning)
7. [LLM — Context Window Extension](#7-llm--context-window-extension)
8. [LLM — Attention Mechanism Optimization](#8-llm--attention-mechanism-optimization)
9. [Diffusion Models — Image Generation](#9-diffusion-models--image-generation)
10. [Diffusion Models — Video Generation](#10-diffusion-models--video-generation)
11. [Multimodal Models](#11-multimodal-models)
12. [GAN — Foundations and Training](#12-gan--foundations-and-training)
13. [GAN — Image Translation and Synthesis](#13-gan--image-translation-and-synthesis)
14. [GAN — Domain-Specific Applications](#14-gan--domain-specific-applications)
15. [Graph Neural Networks and Embeddings](#15-graph-neural-networks-and-embeddings)
16. [Recommendation Systems and Information Retrieval](#16-recommendation-systems-and-information-retrieval)
17. [ML Systems and Technical Debt](#17-ml-systems-and-technical-debt)
18. [Efficient Matrix Computation](#18-efficient-matrix-computation)
19. [Evolutionary Algorithms — Optimization](#19-evolutionary-algorithms--optimization)
20. [Evolutionary Computation — Virtual Creatures and Computer Graphics](#20-evolutionary-computation--virtual-creatures-and-computer-graphics)
21. [Artificial Life and Digital Evolution](#21-artificial-life-and-digital-evolution)
22. [Reference Materials](#22-reference-materials)

---

## 1. LLM — Foundational Architecture and Scaling

### 1.1 Attention Is All You Need

- **Authors:** Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin
- **Year:** 2017 (NIPS 2017)
- **Summary:** Proposes the Transformer, a novel architecture based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. It achieves state-of-the-art results on machine translation with significantly less training time.

### 1.2 Scaling Laws for Neural Language Models

- **Authors:** Jared Kaplan, Sam McCandlish, Tom Henighan, Tom B. Brown, Benjamin Chess, Rewon Child, Scott Gray, Alec Radford, Jeffrey Wu, Dario Amodei
- **Year:** 2020
- **Summary:** Establishes empirical power-law scaling laws for language model performance as a function of model size, dataset size, and compute budget, finding that larger models are significantly more sample-efficient.

### 1.3 Training Compute-Optimal Large Language Models (Chinchilla)

- **Authors:** Jordan Hoffmann, Sebastian Borgeaud, Arthur Mensch, Elena Buchatskaya, Trevor Cai, Eliza Rutherford, et al. (DeepMind)
- **Year:** 2022
- **Summary:** Investigates the optimal trade-off between model size and training tokens under a fixed compute budget, finding that model size and training data should be scaled equally. The resulting 70B model "Chinchilla" outperforms much larger models like GPT-3 (175B).

### 1.4 The Llama 3 Herd of Models

- **Authors:** Llama Team, AI @ Meta
- **Year:** 2024
- **Summary:** Presents Llama 3, a family of dense Transformer language models (8B, 70B, 405B parameters) natively supporting multilinguality, coding, reasoning, and tool usage. The 405B flagship model delivers performance comparable to GPT-4 on a wide range of tasks.

### 1.5 Phi-4 Technical Report

- **Authors:** Marah Abdin, Jyoti Aneja, Harkirat Behl, Sébastien Bubeck, Ronen Eldan, et al. (Microsoft Research)
- **Year:** 2024
- **Summary:** Introduces phi-4, a 14B parameter language model centrally focused on data quality, strategically incorporating synthetic data throughout training. Despite its small size, phi-4 achieves strong performance on reasoning-focused benchmarks, surpassing its teacher model GPT-4 on STEM QA tasks.

### 1.6 BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding

- **Authors:** Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova (Google AI Language)
- **Year:** 2019
- **Summary:** Introduces BERT, which pre-trains deep bidirectional representations by jointly conditioning on left and right context. With just one additional output layer, BERT achieves state-of-the-art results on eleven NLP tasks including question answering and language inference.

### 1.7 Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer (T5)

- **Authors:** Colin Raffel, Noam Shazeer, Adam Roberts, Katherine Lee, Sharan Narang, Michael Matena, Yanqi Zhou, Wei Li, Peter J. Liu (Google)
- **Year:** 2020
- **Summary:** Introduces the Text-to-Text Transfer Transformer (T5), a unified framework that converts all text-based language problems into a text-to-text format. Through systematic study of pre-training objectives, architectures, and datasets, it achieves state-of-the-art results on many benchmarks.

### 1.8 PaLM: Scaling Language Modeling with Pathways

- **Authors:** Aakanksha Chowdhery, Sharan Narang, Jacob Devlin, Maarten Bosma, et al. (Google Research)
- **Year:** 2022
- **Summary:** Presents the 540B parameter Pathways Language Model (PaLM), trained on 6144 TPU v4 chips. PaLM demonstrates breakthrough few-shot learning, outperforming finetuned state-of-the-art on multi-step reasoning tasks and surpassing average human performance on the BIG-bench benchmark.

### 1.9 PaLM 2 Technical Report

- **Authors:** Google
- **Year:** 2023
- **Summary:** Introduces PaLM 2, a Transformer-based model with improved multilingual and reasoning capabilities and better compute efficiency than PaLM. It achieves state-of-the-art performance across diverse language, reasoning, coding, and translation tasks.

### 1.10 Gemini: A Family of Highly Capable Multimodal Models

- **Authors:** Gemini Team, Google
- **Year:** 2024
- **Summary:** Introduces the Gemini family of multimodal models (Ultra, Pro, Nano) with remarkable capabilities across image, audio, video, and text understanding. Gemini Ultra achieves state-of-the-art results in 30 of 32 benchmarks and is the first model to reach human-expert performance on MMLU.

### 1.11 Gemini 1.5: Unlocking Multimodal Understanding across Millions of Tokens of Context

- **Authors:** Gemini Team, Google
- **Year:** 2024
- **Summary:** Presents Gemini 1.5 Pro and Flash, highly compute-efficient multimodal models capable of recalling and reasoning over fine-grained information from millions of tokens of context. Achieves near-perfect retrieval (>99%) up to at least 10M tokens.

### 1.12 Gemma: Open Models Based on Gemini Research and Technology

- **Authors:** Gemma Team, Google DeepMind
- **Year:** 2024
- **Summary:** Introduces Gemma, a family of lightweight, state-of-the-art open models (2B and 7B parameters) built from Gemini research and technology. Gemma outperforms similarly sized open models on 11 out of 18 text-based tasks.

---

## 2. LLM — Mixture of Experts

### 2.1 Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity

- **Authors:** William Fedus, Barret Zoph, Noam Shazeer (Google)
- **Year:** 2022
- **Summary:** Introduces the Switch Transformer, which simplifies the Mixture-of-Experts routing algorithm and enables scaling to trillion-parameter models. It achieves up to 7x pre-training speed improvements with constant computational cost per example.

### 2.2 OLMoE: Open Mixture-of-Experts Language Models

- **Authors:** Niklas Muennighoff, Luca Soldaini, Dirk Groeneveld, et al. (Allen Institute for AI, University of Washington, Princeton)
- **Year:** 2024
- **Summary:** Introduces OLMoE-1B-7B, a fully open MoE language model with 7B parameters but only 1B active per token, pretrained on 5 trillion tokens. It outperforms all available models with similar active parameters, with all weights, data, code, and logs open-sourced.

### 2.3 Skywork-MoE: A Deep Dive into Training Techniques for Mixture-of-Experts Language Models

- **Authors:** Tianwen Wei, Bo Zhu, Liang Zhao, et al. (Skywork Team, Kunlun Inc.)
- **Year:** 2024
- **Summary:** Presents training methodologies for Skywork-MoE (146B parameters, 16 experts), initialized from a dense Skywork-13B checkpoint. Introduces gating logit normalization and adaptive auxiliary loss coefficients for improved expert diversification.

---

## 3. LLM — Alignment and Preference Learning

### 3.1 Training Language Models to Follow Instructions with Human Feedback (InstructGPT)

- **Authors:** Long Ouyang, Jeff Wu, Xu Jiang, Diogo Almeida, Carroll L. Wainwright, et al. (OpenAI)
- **Year:** 2022
- **Summary:** Shows that fine-tuning language models with human feedback via RLHF dramatically improves alignment with user intent. The 1.3B InstructGPT model is preferred over the 175B GPT-3 despite having 100x fewer parameters.

### 3.2 Direct Preference Optimization: Your Language Model is Secretly a Reward Model (DPO)

- **Authors:** Rafael Rafailov, Archit Sharma, Eric Mitchell, Stefano Ermon, Christopher D. Manning, Chelsea Finn (Stanford University)
- **Year:** 2023 (NeurIPS 2023)
- **Summary:** Introduces DPO, which eliminates the need for a separate reward model and RL in RLHF by reparameterizing the reward function to enable a simple classification loss. DPO matches or exceeds PPO-based RLHF while being substantially simpler to implement.

### 3.3 Is DPO Superior to PPO for LLM Alignment? A Comprehensive Study

- **Authors:** Shusheng Xu, Wei Fu, Jiaxuan Gao, Wenjie Ye, Weilin Liu, et al. (Tsinghua University, OpenPsi Inc.)
- **Year:** 2024
- **Summary:** Conducts theoretical and empirical analysis showing DPO may have fundamental limitations, while identifying key factors for best PPO performance. Demonstrates that PPO can surpass all alignment methods across dialogue and code generation tasks.

---

## 4. LLM — Prompting and Reasoning

### 4.1 Chain-of-Thought Prompting Elicits Reasoning in Large Language Models

- **Authors:** Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Brian Ichter, Fei Xia, Ed H. Chi, Quoc V. Le, Denny Zhou (Google Research, Brain Team)
- **Year:** 2022 (NeurIPS 2022)
- **Summary:** Demonstrates that providing a few chain-of-thought demonstrations as exemplars in prompts significantly improves large language models' ability to perform complex arithmetic, commonsense, and symbolic reasoning.

### 4.2 Self-Consistency Improves Chain of Thought Reasoning in Language Models

- **Authors:** Xuezhi Wang, Jason Wei, Dale Schuurmans, Quoc Le, Ed H. Chi, Sharan Narang, Aakanksha Chowdhery, Denny Zhou (Google Research, Brain Team)
- **Year:** 2023 (ICLR 2023)
- **Summary:** Proposes self-consistency, a decoding strategy that samples diverse reasoning paths and selects the most consistent answer by marginalization. It boosts chain-of-thought prompting performance significantly (e.g., +17.9% on GSM8K).

### 4.3 Large Language Models are Zero-Shot Reasoners

- **Authors:** Takeshi Kojima, Shixiang Shane Gu, Machel Reid, Yutaka Matsuo, Yusuke Iwasawa (University of Tokyo, Google Research)
- **Year:** 2022 (NeurIPS 2022)
- **Summary:** Shows that simply adding "Let's think step by step" before each answer enables LLMs to perform zero-shot chain-of-thought reasoning, significantly outperforming standard zero-shot performance across diverse reasoning benchmarks without any hand-crafted few-shot examples.

### 4.4 Finetuned Language Models Are Zero-Shot Learners (FLAN)

- **Authors:** Jason Wei, Maarten Bosma, Vincent Y. Zhao, Kelvin Guu, Adams Wei Yu, Brian Lester, Nan Du, Andrew M. Dai, Quoc V. Le (Google Research)
- **Year:** 2022 (ICLR 2022)
- **Summary:** Shows that instruction tuning — finetuning language models on a collection of datasets described via instructions — substantially improves zero-shot performance on unseen tasks. FLAN (137B) surpasses zero-shot GPT-3 (175B) on 20 of 25 evaluated datasets.

### 4.5 Scaling Instruction-Finetuned Language Models (Flan-PaLM)

- **Authors:** Hyung Won Chung, Le Hou, Shayne Longpre, Barret Zoph, Yi Tay, William Fedus, et al. (Google)
- **Year:** 2022
- **Summary:** Explores scaling instruction finetuning across number of tasks (1.8K), model size, and chain-of-thought data. Flan-PaLM 540B outperforms PaLM 540B by +9.4% on average and achieves 75.2% on five-shot MMLU.

---

## 5. LLM — Knowledge Distillation and Synthetic Data

### 5.1 Distilling Step-by-Step! Outperforming Larger Language Models with Less Training Data and Smaller Model Sizes

- **Authors:** Cheng-Yu Hsieh, Chun-Liang Li, Chih-Kuan Yeh, Hootan Nakhost, Yasuhisa Fujii, Alexander Ratner, Ranjay Krishna, Chen-Yu Lee, Tomas Pfister (University of Washington, Google)
- **Year:** 2023
- **Summary:** Introduces a method that extracts LLM rationales as additional supervision for training small models in a multi-task framework, enabling a 770M T5 model to outperform 540B PaLM using only 80% of available data.

### 5.2 Distillation Scaling Laws

- **Authors:** Dan Busbridge, Amitis Shidani, Floris Weers, Jason Ramapuram, Etai Littwin, Russ Webb (Apple, University of Oxford)
- **Year:** 2025 (ICML 2025)
- **Summary:** Proposes distillation scaling laws that estimate distilled model performance based on compute budget and its allocation between student and teacher. Provides compute-optimal distillation recipes for scenarios with and without existing teachers.

### 5.3 Knowledge Distillation Using Frontier Open-Source LLMs: Generalizability and the Role of Synthetic Data

- **Authors:** Anup Shirgaonkar, Nikhil Pandey, Nazmiye Ceren Abay, Tolga Aktas, Vijay Aski (Microsoft)
- **Year:** 2024
- **Summary:** Investigates distillation using Llama-3.1-405B as teacher and 8B/70B students, showing that synthetic data during distillation significantly improves accuracy and can match or surpass the teacher's zero-shot accuracy on some datasets.

### 5.4 On LLMs-Driven Synthetic Data Generation, Curation, and Evaluation: A Survey

- **Authors:** Lin Long, Rui Wang, Ruixuan Xiao, Junbo Zhao, Xiao Ding, Gang Chen, Haobo Wang (Zhejiang University, Harbin Institute of Technology)
- **Year:** 2024 (ACL 2024 Findings)
- **Summary:** Provides a comprehensive survey of LLM-driven synthetic data generation, organizing existing research based on a generic workflow of generation, curation, and evaluation, and highlighting gaps and future directions.

---

## 6. LLM — Parameter-Efficient Fine-Tuning

### 6.1 LoRA: Low-Rank Adaptation of Large Language Models

- **Authors:** Edward Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, Weizhu Chen (Microsoft)
- **Year:** 2022
- **Summary:** Proposes LoRA, which freezes pre-trained model weights and injects trainable low-rank decomposition matrices into each Transformer layer, reducing trainable parameters by 10,000x compared to full fine-tuning while matching or exceeding its quality.

### 6.2 QLoRA: Efficient Finetuning of Quantized LLMs

- **Authors:** Tim Dettmers, Artidoro Pagnoni, Ari Holtzman, Luke Zettlemoyer (University of Washington)
- **Year:** 2023
- **Summary:** Presents QLoRA, which backpropagates gradients through a frozen 4-bit quantized model into LoRA adapters, enabling finetuning of a 65B model on a single 48GB GPU while preserving full 16-bit performance. Introduces 4-bit NormalFloat and Double Quantization.

### 6.3 LoRA-One: One-Step Full Gradient Could Suffice for Fine-Tuning Large Language Models, Provably and Efficiently

- **Authors:** Yuanhe Zhang, Fanghui Liu, Yudong Chen (University of Warwick, University of Wisconsin-Madison)
- **Year:** 2025
- **Summary:** Proves that LoRA adapters align with specific singular subspaces of the one-step full fine-tuning gradient, proposing a theory-driven initialization that achieves immediate subspace alignment and significant empirical improvements over LoRA variants.

### 6.4 SketchTune: Sketch to Adapt — Fine-Tunable Sketches for Efficient LLM Adaptation

- **Authors:** Tianyi Zhang, Junda Su, Aditya Desai, Oscar Wu, Zhaozhuo Xu, Anshumali Shrivastava (Rice University, UC Berkeley, Stevens Institute of Technology)
- **Year:** 2025 (ICML 2025)
- **Summary:** Introduces SketchTune, which compresses LLM weights into compact fine-tunable sketches, avoiding the low-rank assumption of LoRA. It outperforms leading PEFT methods on diverse tasks while using 2.6-3.5x smaller base models.

---

## 7. LLM — Context Window Extension

### 7.1 YaRN: Efficient Context Window Extension of Large Language Models

- **Authors:** Bowen Peng, Jeffrey Quesnelle, Honglu Fan, Enrico Shippole (Nous Research, EleutherAI, University of Geneva)
- **Year:** 2023
- **Summary:** Presents YaRN (Yet another RoPE extensioN), a compute-efficient method to extend the context window of RoPE-based LLMs, requiring 10x less tokens and 2.5x less training steps than previous methods, and enabling extrapolation to 128k context length.

### 7.2 LongRoPE: Extending LLM Context Window Beyond 2 Million Tokens

- **Authors:** Yiran Ding, Li Lyna Zhang, Chengruidong Zhang, Yuanyuan Xu, et al. (Microsoft Research)
- **Year:** 2024
- **Summary:** Extends pre-trained LLM context windows to 2048k tokens with only 1k fine-tuning steps within 256k training lengths, through exploiting non-uniformities in positional interpolation and a progressive extension strategy.

### 7.3 Leave No Context Behind: Efficient Infinite Context Transformers with Infini-attention

- **Authors:** Tsendsuren Munkhdalai, Manaal Faruqui, Siddharth Gopal (Google)
- **Year:** 2024
- **Summary:** Introduces Infini-attention, which incorporates a compressive memory into vanilla attention, combining masked local attention and long-term linear attention in a single Transformer block to scale LLMs to infinitely long inputs with bounded memory.

### 7.4 Titans: Learning to Memorize at Test Time

- **Authors:** Ali Behrouz, Peilin Zhong, Vahab Mirrokni (Google Research)
- **Year:** 2024
- **Summary:** Introduces a new neural long-term memory module that learns to memorize historical context, complementing attention's short-term memory. The Titans architecture family scales to over 2M context window with higher accuracy than baselines in needle-in-haystack tasks.

---

## 8. LLM — Attention Mechanism Optimization

### 8.1 FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness

- **Authors:** Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré (Stanford University, University at Buffalo)
- **Year:** 2022
- **Summary:** Proposes FlashAttention, an IO-aware exact attention algorithm that uses tiling to reduce memory reads/writes between GPU HBM and SRAM, achieving 2-4x wall-clock speedup and linear memory complexity without any approximation.

### 8.2 FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning

- **Authors:** Tri Dao (Princeton University, Stanford University)
- **Year:** 2023
- **Summary:** Improves upon FlashAttention with better work partitioning between GPU thread blocks and warps, reducing non-matmul FLOPs and achieving ~2x speedup over FlashAttention, reaching 50-73% of theoretical maximum FLOPs/s on A100.

### 8.3 FlashAttention-3: Fast and Accurate Attention with Asynchrony and Low-precision

- **Authors:** Jay Shah, Ganesh Bikshandi, Ying Zhang, Vijay Thakkar, Pradeep Ramani, Tri Dao (Colfax Research, Meta, NVIDIA, Princeton University, Together AI)
- **Year:** 2024
- **Summary:** Exploits Hopper GPU features including warp-specialization for overlapping computation and data movement, interleaved matmul/softmax, and FP8 block quantization. Achieves 1.5-2x speedup over FlashAttention-2 on H100, reaching 75% utilization with FP16 and close to 1.2 PFLOPs/s with FP8.

---

## 9. Diffusion Models — Image Generation

### 9.1 Denoising Diffusion Probabilistic Models (DDPM)

- **Authors:** Jonathan Ho, Ajay Jain, Pieter Abbeel (UC Berkeley)
- **Year:** 2020 (NeurIPS 2020)
- **Summary:** Demonstrates high quality image synthesis using diffusion probabilistic models, achieving state-of-the-art FID of 3.17 on CIFAR10. Establishes a novel connection between diffusion models and denoising score matching with Langevin dynamics.

### 9.2 High-Resolution Image Synthesis with Latent Diffusion Models (Stable Diffusion)

- **Authors:** Robin Rombach, Andreas Blattmann, Dominik Lorenz, Patrick Esser, Björn Ommer (LMU Munich, IWR Heidelberg, Runway ML)
- **Year:** 2022
- **Summary:** Applies diffusion models in the latent space of pretrained autoencoders, achieving a near-optimal balance between complexity reduction and detail preservation. Introduces cross-attention for conditioning on text or bounding boxes, enabling high-resolution synthesis with significantly reduced computational requirements.

### 9.3 Classifier-Free Diffusion Guidance

- **Authors:** Jonathan Ho, Tim Salimans (Google Research, Brain Team)
- **Year:** 2022
- **Summary:** Shows that guidance can be performed without a separate classifier by jointly training conditional and unconditional diffusion models and combining their score estimates, achieving a quality-diversity trade-off similar to classifier guidance.

### 9.4 Scalable Diffusion Models with Transformers (DiT)

- **Authors:** William Peebles, Saining Xie (UC Berkeley, New York University)
- **Year:** 2023
- **Summary:** Explores replacing the commonly-used U-Net backbone in latent diffusion models with a transformer operating on latent patches. DiTs with higher Gflops consistently achieve lower FID, and the largest DiT-XL/2 achieves state-of-the-art FID of 2.27 on ImageNet 256x256.

### 9.5 SDXL: Improving Latent Diffusion Models for High-Resolution Image Synthesis

- **Authors:** Dustin Podell, Zion English, Kyle Lacey, Andreas Blattmann, Tim Dockhorn, Jonas Müller, Joe Penna, Robin Rombach (Stability AI)
- **Year:** 2023
- **Summary:** Presents SDXL with a 3x larger UNet backbone, a second text encoder for larger cross-attention context, multiple novel conditioning schemes, and a refinement model. Achieves results competitive with black-box state-of-the-art image generators.

### 9.6 Scaling Rectified Flow Transformers for High-Resolution Image Synthesis (Stable Diffusion 3)

- **Authors:** Patrick Esser, Sumith Kulal, Andreas Blattmann, Rahim Entezari, Jonas Müller, et al. (Stability AI)
- **Year:** 2024
- **Summary:** Improves noise sampling techniques for rectified flow models and presents a novel Multimodal Diffusion Transformer (MMDiT) architecture that uses separate weights for image and text modalities with bidirectional information flow. Demonstrates predictable scaling trends and outperforms state-of-the-art models.

---

## 10. Diffusion Models — Video Generation

### 10.1 Video Diffusion Models

- **Authors:** Jonathan Ho, Tim Salimans, Alexey Gritsenko, William Chan, Mohammad Norouzi, David J. Fleet (Google Research)
- **Year:** 2022
- **Summary:** Proposes a diffusion model for video generation using a 3D U-Net architecture, enabling joint training from image and video data. Introduces a new conditional sampling technique for spatial and temporal video extension, achieving state-of-the-art results on video prediction benchmarks.

### 10.2 VideoGPT: Video Generation using VQ-VAE and Transformers

- **Authors:** Wilson Yan, Yunzhi Zhang, Pieter Abbeel, Aravind Srinivas (UC Berkeley)
- **Year:** 2021
- **Summary:** Presents VideoGPT, which uses VQ-VAE with 3D convolutions and axial self-attention to learn discrete latent representations of video, then autoregressively models the latents with a GPT-like architecture, generating competitive samples on BAIR Robot and UCF-101 datasets.

### 10.3 CogVideo: Large-scale Pretraining for Text-to-Video Generation via Transformers

- **Authors:** Wenyi Hong, Ming Ding, Wendi Zheng, Xinghan Liu, Jie Tang (Tsinghua University, BAAI)
- **Year:** 2022
- **Summary:** Presents CogVideo, a 9B-parameter transformer for text-to-video generation, trained by inheriting a pretrained text-to-image model (CogView2). Proposes a multi-frame-rate hierarchical training strategy and outperforms all publicly available models at a large margin.

### 10.4 Stable Video Diffusion: Scaling Latent Video Diffusion Models to Large Datasets

- **Authors:** Andreas Blattmann, Tim Dockhorn, Sumith Kulal, Daniel Mendelevitch, et al. (Stability AI)
- **Year:** 2023
- **Summary:** Presents a latent video diffusion model trained through three stages: text-to-image pretraining, video pretraining, and high-quality video finetuning. Demonstrates the necessity of well-curated pretraining data and achieves competitive text-to-video and image-to-video generation.

### 10.5 Sora: A Review on Background, Technology, Limitations, and Opportunities of Large Vision Models

- **Authors:** Yixin Liu, Kai Zhang, Yuan Li, Zhiling Yan, et al. (Lehigh University, Microsoft Research)
- **Year:** 2024
- **Summary:** Provides a comprehensive review of OpenAI's Sora text-to-video generative AI model, covering its underlying technologies (diffusion transformers, spacetime latent patches), applications across industries, remaining challenges in safety and bias, and future directions.

---

## 11. Multimodal Models

### 11.1 InternVL: Scaling up Vision Foundation Models and Aligning for Generic Visual-Linguistic Tasks

- **Authors:** Zhe Chen, Jiannan Wu, Wenhai Wang, Weijie Su, Guo Chen, et al. (Shanghai AI Laboratory, Nanjing University, et al.)
- **Year:** 2024
- **Summary:** Designs a large-scale vision-language foundation model that scales the vision encoder to 6 billion parameters and progressively aligns it with LLMs using web-scale image-text data. Broadly applicable to both contrastive and generative visual-linguistic tasks.

### 11.2 InternVL 2.5: Expanding Performance Boundaries of Open-Source Multimodal Models

- **Authors:** Zhe Chen, Weiyun Wang, Yue Cao, et al. (Shanghai AI Laboratory, et al.)
- **Year:** 2024
- **Summary:** Builds upon InternVL 2.0 with significant enhancements in training strategies and data quality. The first open-source MLLM to surpass 70% on the MMMU benchmark, rivaling GPT-4o and Claude-3.5-Sonnet on multi-discipline reasoning and document understanding.

### 11.3 VITA: Towards Open-Source Interactive Omni Multimodal LLM

- **Authors:** Chaoyou Fu, Haojia Lin, Zuwei Long, et al. (Nanjing University, Tencent Youtu Lab, Xiamen University, CASIA)
- **Year:** 2024
- **Summary:** Introduces the first open-source MLLM capable of simultaneously processing Video, Image, Text, and Audio modalities with an advanced interactive experience. Features non-awakening interaction and audio interrupt interaction through a duplex deployment scheme.

### 11.4 Emu3.5: Native Multimodal Models are World Learners

- **Authors:** Emu3.5 Team (BAAI)
- **Year:** 2025
- **Summary:** A large-scale multimodal world model that natively predicts the next state across vision and language, pre-trained on over 10 trillion tokens from internet videos. Supports long-horizon interleaved vision-language generation, any-to-image generation, and world exploration.

### 11.5 TV2TV: A Unified Framework for Interleaved Language and Video Generation

- **Authors:** Xiaochuang Han, Youssef Emad, Melissa Hall, et al. (Meta FAIR)
- **Year:** 2025
- **Summary:** Introduces TV2TV, which decomposes video generation into interleaved text and video generation. The model "thinks in words" about subsequent content before "acting in pixels" to produce frames, achieving 91% human preference over comparable text-to-video models.

### 11.6 Mogao: An Omni Foundation Model for Interleaved Multi-Modal Generation

- **Authors:** Chao Liao, Liyang Liu, Xun Wang, et al. (ByteDance Seed)
- **Year:** 2025
- **Summary:** Presents a unified framework enabling interleaved multi-modal generation through a causal approach, integrating autoregressive text generation with diffusion-based image synthesis via deep-fusion design and dual vision encoders. Achieves state-of-the-art in multi-modal understanding and text-to-image generation.

---

## 12. GAN — Foundations and Training

### 12.1 Generative Adversarial Nets

- **Authors:** Ian J. Goodfellow, Jean Pouget-Abadie, Mehdi Mirza, Bing Xu, David Warde-Farley, Sherjil Ozair, Aaron Courville, Yoshua Bengio (Université de Montréal)
- **Year:** 2014
- **Summary:** Proposes the GAN framework: simultaneously training a generator G that captures the data distribution and a discriminator D that estimates the probability a sample is real. This minimax game requires no Markov chains or inference networks.

### 12.2 Improved Techniques for Training GANs

- **Authors:** Tim Salimans, Ian Goodfellow, Wojciech Zaremba, Vicki Cheung, Alec Radford, Xi Chen (OpenAI)
- **Year:** 2016
- **Summary:** Presents several techniques to encourage convergence of GAN training, achieving state-of-the-art results in semi-supervised classification on MNIST, CIFAR-10, and SVHN, and generating MNIST samples indistinguishable from real data by humans.

### 12.3 Wasserstein GAN

- **Authors:** Martin Arjovsky, Soumith Chintala, Léon Bottou (Courant Institute, Facebook AI Research)
- **Year:** 2017
- **Summary:** Proposes using the Wasserstein (Earth-Mover) distance as the training objective for GANs, providing more meaningful and smoother gradients that correlate with sample quality, improving training stability.

### 12.4 Progressive Growing of GANs for Improved Quality, Stability, and Variation

- **Authors:** Tero Karras, Timo Aila, Samuli Laine, Jaakko Lehtinen (NVIDIA, Aalto University)
- **Year:** 2018 (ICLR 2018)
- **Summary:** Proposes progressively growing both generator and discriminator from low to high resolution during training, speeding up training and greatly stabilizing it. Produces unprecedented 1024x1024 CelebA images.

### 12.5 Self-Attention Generative Adversarial Networks (SAGAN)

- **Authors:** Han Zhang, Ian Goodfellow, Dimitris Metaxas, Augustus Odena (Rutgers University, Google Brain)
- **Year:** 2019
- **Summary:** Proposes SAGAN, which allows attention-driven long-range dependency modeling for image generation, enabling details to be generated using cues from all feature locations. Boosts ImageNet Inception Score from 36.8 to 52.52.

### 12.6 Large Scale GAN Training for High Fidelity Natural Image Synthesis (BigGAN)

- **Authors:** Andrew Brock, Jeff Donahue, Karen Simonyan (Heriot-Watt University, DeepMind)
- **Year:** 2019 (ICLR 2019)
- **Summary:** Trains GANs at the largest scale then attempted, studying scale-specific instabilities. Introduces the "truncation trick" for controlling fidelity-variety trade-off. BigGAN achieves IS of 166.5 and FID of 7.4 on ImageNet 128x128.

### 12.7 PacGAN: The Power of Two Samples in Generative Adversarial Networks

- **Authors:** Zinan Lin, Ashish Khetan, Giulia Fanti, Sewoong Oh (Carnegie Mellon University, UIUC)
- **Year:** 2018
- **Summary:** Proposes "packing" — modifying the discriminator to make decisions based on multiple samples — as a principled approach to mitigating mode collapse in GANs. Uses binary hypothesis testing theory to prove packing naturally penalizes mode collapse.

### 12.8 Noise-contrastive Estimation: A New Estimation Principle for Unnormalized Statistical Models

- **Authors:** Michael Gutmann, Aapo Hyvärinen (University of Helsinki)
- **Year:** 2010
- **Summary:** Presents a new estimation principle that performs nonlinear logistic regression to discriminate between observed data and artificially generated noise, providing a consistent estimator that directly works for unnormalized models. Foundational to understanding GAN-like discriminative training.

---

## 13. GAN — Image Translation and Synthesis

### 13.1 Image-to-Image Translation with Conditional Adversarial Networks (pix2pix)

- **Authors:** Phillip Isola, Jun-Yan Zhu, Tinghui Zhou, Alexei A. Efros (UC Berkeley)
- **Year:** 2017
- **Summary:** Investigates conditional adversarial networks as a general-purpose solution to image-to-image translation, learning both the mapping and an appropriate loss function. Demonstrates effectiveness on tasks from label-to-photo synthesis to image colorization.

### 13.2 Unpaired Image-to-Image Translation using Cycle-Consistent Adversarial Networks (CycleGAN)

- **Authors:** Jun-Yan Zhu, Taesung Park, Phillip Isola, Alexei A. Efros (UC Berkeley)
- **Year:** 2017
- **Summary:** Learns to translate images between domains without paired examples by introducing a cycle consistency loss that enforces F(G(X)) ≈ X. Enables style transfer, object transfiguration, season transfer, and photo enhancement without paired training data.

### 13.3 A Style-Based Generator Architecture for Generative Adversarial Networks (StyleGAN)

- **Authors:** Tero Karras, Samuli Laine, Timo Aila (NVIDIA)
- **Year:** 2019
- **Summary:** Proposes an alternative generator architecture borrowing from style transfer literature, enabling automatic unsupervised separation of high-level attributes (pose, identity) from stochastic variation (freckles, hair), with intuitive scale-specific control of synthesis.

### 13.4 Coupled Generative Adversarial Networks (CoGAN)

- **Authors:** Ming-Yu Liu, Oncel Tuzel (MERL)
- **Year:** 2016
- **Summary:** Proposes CoGAN for learning joint distributions of multi-domain images without requiring corresponding image tuples, achieved through weight-sharing constraints. Applications include domain adaptation and cross-domain image transformation.

### 13.5 Generative Image Inpainting with Contextual Attention

- **Authors:** Jiahui Yu, Zhe Lin, Jimei Yang, Xiaohui Shen, Xin Lu, Thomas S. Huang (UIUC, Adobe Research)
- **Year:** 2018
- **Summary:** Proposes a deep generative model for image inpainting that explicitly utilizes surrounding image features as references through a contextual attention mechanism, producing higher-quality results than existing methods on faces, textures, and natural images.

### 13.6 Semantic Segmentation using Adversarial Networks

- **Authors:** Pauline Luc, Camille Couprie, Soumith Chintala, Jakob Verbeek (Facebook AI Research, INRIA)
- **Year:** 2016
- **Summary:** Proposes using adversarial training for semantic segmentation, where an adversarial network discriminates between ground-truth and predicted segmentation maps, detecting and correcting higher-order inconsistencies. Improves accuracy on Stanford Background and PASCAL VOC 2012.

---

## 14. GAN — Domain-Specific Applications

### 14.1 Generative Adversarial Networks Recover Features in Astrophysical Images of Galaxies beyond the Deconvolution Limit

- **Authors:** Kevin Schawinski, Ce Zhang, Hantian Zhang, Lucas Fowler, Gokula Krishnan Santhanam (ETH Zurich)
- **Year:** 2017
- **Summary:** Trains a GAN on galaxy images from the Sloan Digital Sky Survey to recover features from degraded images with performance far exceeding simple deconvolution, significantly enhancing the study of astrophysical objects.

### 14.2 Learning Particle Physics by Example: Location-Aware Generative Adversarial Networks for Physics Synthesis

- **Authors:** Luke de Oliveira, Michela Paganini, Benjamin Nachman
- **Year:** 2017
- **Summary:** Introduces a Location-Aware GAN to synthesize realistic calorimeter jet images that reproduce key physics observables, linking ML generative modeling to high-energy physics fast-simulation needs.

### 14.3 CaloGAN: Simulating 3D High Energy Particle Showers in Multi-Layer Electromagnetic Calorimeters with GANs

- **Authors:** Michela Paganini, Luke de Oliveira, Benjamin Nachman
- **Year:** 2018
- **Summary:** Presents CaloGAN, a GAN-based fast simulator for electromagnetic showers in longitudinally segmented calorimeters, achieving large CPU/GPU speedups versus full GEANT4 simulation.

### 14.4 Accelerating Science with Generative Adversarial Networks: An Application to 3D Particle Showers in Multi-Layer Calorimeters

- **Authors:** Michela Paganini, Luke de Oliveira, Benjamin Nachman
- **Year:** 2017
- **Summary:** Proposes a deep generative model for fast, high-fidelity electromagnetic calorimeter shower simulation with very large speedups over traditional simulation while reproducing many shower properties.

### 14.5 Precise Simulation of Electromagnetic Calorimeter Showers using a Wasserstein Generative Adversarial Network

- **Authors:** Martin Erdmann, Jonas Glombitza, Thorben Quast
- **Year:** 2019
- **Summary:** Trains a Wasserstein GAN on GEANT4 showers to generate energy depositions conditioned on beam energy and impact position, reproducing realistic fluctuations and correlations comparable to GEANT4.

### 14.6 Fast and Accurate Simulation of Particle Detectors using Generative Adversarial Networks

- **Authors:** Pasquale Musella, Francesco Pandolfi
- **Year:** 2018
- **Summary:** Applies GANs to model detector response to hadronic jets, reporting high fidelity and order-of-magnitude speedups over traditional Monte Carlo approaches.

### 14.7 Fast Simulation of Muons Produced at the SHiP Experiment using Generative Adversarial Networks

- **Authors:** SHiP Collaboration
- **Year:** 2019
- **Summary:** Uses GANs for fast simulation of muon production at the SHiP experiment, demonstrating GAN-based simulation as a viable alternative to full Monte Carlo simulation for particle physics experiments.

### 14.8 Transferring Multiscale Map Styles Using Generative Adversarial Networks

- **Authors:** Yuhao Kang, Song Gao, Robert Roth
- **Year:** 2019
- **Summary:** Proposes a GAN-based framework to transfer styles from reference maps and artwork onto GIS vector data across scales, with a CNN classifier to assess whether design characteristics are preserved.

### 14.9 Conditional LSTM-GAN for Melody Generation from Lyrics

- **Authors:** Yi Yu, Simon Canales (National Institute of Informatics, EPFL)
- **Year:** 2019
- **Summary:** Proposes a conditional LSTM-GAN for generating melodies from lyrics, where both generator and discriminator are conditioned on lyrics and alignment between syllables and notes is generated simultaneously.

### 14.10 Generating Videos with Scene Dynamics

- **Authors:** Carl Vondrick, Hamed Pirsiavash, Antonio Torralba (MIT, UMBC)
- **Year:** 2016
- **Summary:** Proposes a GAN for video generation with a spatio-temporal convolutional architecture that untangles foreground from background. The model learns useful features for recognizing actions with minimal supervision from unlabeled video.

### 14.11 Generative Adversarial Imitation Learning (GAIL)

- **Authors:** Jonathan Ho, Stefano Ermon (OpenAI, Stanford University)
- **Year:** 2016
- **Summary:** Proposes a framework for directly extracting a policy from expert demonstrations by drawing an analogy between imitation learning and GANs. The resulting model-free algorithm achieves significant performance gains over existing methods in complex, high-dimensional environments.

### 14.12 Streetscape Augmentation using Generative Adversarial Networks: Insights Related to Health and Wellbeing

- **Authors:** Jasper S. Wijnands, Kerry A. Nice, Jason Thompson, Haifeng Zhao, Mark Stevenson (University of Melbourne)
- **Year:** 2019
- **Summary:** Uses GANs to translate Google Street View images between areas of good and bad health outcomes, identifying that areas with good health are characterized by green space and urban compactness, while high social capital areas have wider footpaths and more grass.

---

## 15. Graph Neural Networks and Embeddings

### 15.1 Graph Attention Networks (GAT)

- **Authors:** Petar Veličković, Guillem Cucurull, Arantxa Casanova, Adriana Romero, Pietro Liò, Yoshua Bengio
- **Year:** 2018 (ICLR 2018)
- **Summary:** Introduces GATs, which use masked self-attention so nodes can weight their neighbors without spectral matrix operations, enabling both inductive and transductive graph learning with state-of-the-art results.

### 15.2 node2vec: Scalable Feature Learning for Networks

- **Authors:** Aditya Grover, Jure Leskovec (Stanford University)
- **Year:** 2016
- **Summary:** Introduces node2vec with biased random walks to learn flexible network neighborhood representations in low-dimensional space, improving multi-label classification and link prediction over prior methods.

### 15.3 struc2vec: Learning Node Representations from Structural Identity

- **Authors:** Leonardo F. R. Ribeiro, Pedro H. P. Saverese, Daniel R. Figueiredo
- **Year:** 2017
- **Summary:** Presents struc2vec, which builds a multilayer graph of structural similarities across scales to learn embeddings that capture structural identity rather than proximity, outperforming prior methods on structural classification tasks.

### 15.4 Structural Deep Network Embedding (SDNE)

- **Authors:** Daixin Wang, Peng Cui, Wenwu Zhu (Tsinghua University)
- **Year:** 2016
- **Summary:** Proposes SDNE, a semi-supervised deep model combining first- and second-order proximity to capture nonlinear network structure for reconstruction, classification, link prediction, and visualization.

### 15.5 Graph Embedding Techniques, Applications, and Performance: A Survey

- **Authors:** Palash Goyal, Emilio Ferrara
- **Year:** 2018
- **Summary:** Surveys graph embedding methods including factorization, random walks, and deep learning approaches, comparing them on common tasks and datasets, with a companion GEM Python library.

### 15.6 PyTorch-BigGraph: A Large-scale Graph Embedding System

- **Authors:** Adam Lerer, Ledell Wu, Jiajun Shen, Timothée Lacroix, Luca Wehrstedt, Abhijit Bose, Alex Peysakhovich (Facebook AI Research)
- **Year:** 2019
- **Summary:** Describes PBG, a multi-relation embedding system using graph partitioning to train on graphs with billions of nodes and trillions of edges on single or distributed machines.

### 15.7 Strategies for Pre-training Graph Neural Networks

- **Authors:** Weihua Hu, Bowen Liu, Joseph Gomes, Marinka Zitnik, Percy Liang, Vijay Pande, Jure Leskovec (Stanford University)
- **Year:** 2020 (ICLR 2020)
- **Summary:** Proposes pre-training GNNs at both node and graph levels with self-supervised objectives to reduce negative transfer and improve downstream generalization on molecular and protein tasks.

### 15.8 EvolveGCN: Evolving Graph Convolutional Networks for Dynamic Graphs

- **Authors:** Aldo Pareja, Giacomo Domeniconi, Jie Chen, Tengfei Ma, et al. (IBM Research, MIT)
- **Year:** 2020
- **Summary:** Proposes EvolveGCN, which evolves GCN parameters with an RNN over time instead of maintaining full node embedding histories, handling dynamic graphs including those with changing node sets.

### 15.9 DynamicGEM: A Library for Dynamic Graph Embedding Methods

- **Authors:** Palash Goyal, Ninareh Mehrabi, Emilio Ferrara, Sujit Rokka Chhetri, Arquimedes Canedo
- **Year:** 2018
- **Summary:** Presents DynamicGEM, an open-source Python library for dynamic graph node embeddings with evaluation for reconstruction, link prediction, classification, and temporal visualization.

### 15.10 Cleora: A Simple, Strong and Scalable Graph Embedding Scheme

- **Authors:** Barbara Rychalska, Piotr Bąbel, Konrad Gołuchowski, Andrzej Michałowski, Jacek Dąbrowski
- **Year:** 2021
- **Summary:** Presents Cleora, an unsupervised, scalable embedding method based on iterative neighbor averaging and normalization, simpler than contrastive methods yet competitive on link prediction and node classification.

### 15.11 SNoRe: Scalable Unsupervised Learning of Symbolic Node Representations

- **Authors:** Sebastian Mežnar, Nada Lavrač, Blaž Škrlj
- **Year:** 2020
- **Summary:** Proposes SNoRe for interpretable symbolic node features from neighborhood hashes, coupled with SHAP-style explanations, reporting competitive results versus graph autoencoders and node2vec at scale.

### 15.12 Karate Club: An API Oriented Open-Source Python Framework for Unsupervised Learning on Graphs

- **Authors:** Benedek Rozemberczki, Oliver Kiss, Rik Sarkar
- **Year:** 2020
- **Summary:** Introduces Karate Club, a Python framework bundling 30+ graph mining algorithms for community detection, node/graph embedding with a consistent API emphasizing scalability and ease of use.

### 15.13 Exploring the Representational Power of Graph Autoencoder

- **Authors:** Maroun Haddad, Mohamed Bouguessa
- **Year:** 2021
- **Summary:** Empirically studies which topological features (degree, clustering, centralities) are preserved in graph autoencoder embeddings under SUM aggregation and second-order proximity, linking preservation to downstream task performance.

### 15.14 Learning Role-based Graph Embeddings (Role2Vec)

- **Authors:** Nesreen K. Ahmed, Ryan A. Rossi, John Boaz Lee, Ted Willke, Rong Zhou, Xiangnan Kong, Hoda Eldardiry
- **Year:** 2019
- **Summary:** Introduces Role2Vec with attributed random walks to generalize random-walk embeddings for both inductive and transductive settings, achieving large AUC gains with much smaller storage requirements.

### 15.15 Is a Single Embedding Enough? Learning Node Representations that Capture Multiple Social Contexts

- **Authors:** Alessandro Epasto, Bryan Perozzi (Google Research)
- **Year:** 2019
- **Summary:** Learns multiple node embeddings from ego-network decomposition so each vector reflects a different local community, improving link prediction and enabling visual analysis of community structure.

### 15.16 Fast Sequence Based Embedding with Diffusion Graphs

- **Authors:** Benedek Rozemberczki, Rik Sarkar
- **Year:** 2020
- **Summary:** Proposes using diffusion graphs to generate vertex sequences quickly for sequence-based neural embedding, claiming better speed and accuracy that improves with edge density.

### 15.17 A Comprehensive Survey on Community Detection with Deep Learning

- **Authors:** Xing Su, Shan Xue, Fanzhen Liu, Jia Wu, et al.
- **Year:** 2021
- **Summary:** Surveys deep learning for community detection, proposing a taxonomy covering deep neural networks, deep NMF, and deep sparse filtering, along with datasets, metrics, and implementation guidelines.

### 15.18 Finding Community Structure in Very Large Networks

- **Authors:** Aaron Clauset, M. E. J. Newman, Cristopher Moore
- **Year:** 2004
- **Summary:** Presents a fast hierarchical agglomerative community detection algorithm running in near-linear time on sparse graphs, applied to very large networks including a retailer co-purchase network.

### 15.19 Community Detection via Semi-Synchronous Label Propagation Algorithms

- **Authors:** Gennaro Cordasco, Luisa Gargano
- **Year:** 2010
- **Summary:** Proposes a semi-synchronous LPA that mixes synchronous and asynchronous update merits, proving convergence to stable labelings with improved quality, efficiency, and stability over asynchronous LPA.

### 15.20 Ego-Splitting Framework: from Non-Overlapping to Overlapping Clusters

- **Authors:** Alessandro Epasto, Silvio Lattanzi, Renato Paes Leme (Google Research)
- **Year:** 2017
- **Summary:** Proposes ego-splitting: partitions ego-networks locally, splits nodes into persona nodes, then globally partitions the expanded graph to recover overlapping communities at very large scale with theoretical guarantees.

### 15.21 Efficient Relation-aware Scoring Function Search for Knowledge Graph Embedding

- **Authors:** Shimin Di, Quanming Yao, Yongqi Zhang, Lei Chen
- **Year:** 2021
- **Summary:** Encodes a large relation-aware scoring-function search space as a supernet and uses one-shot alternative minimization search to improve knowledge graph embedding beyond prior AutoML approaches.

### 15.22 Modeling Multi-Destination Trips with Sketch-Based Model

- **Authors:** Michał Daniluk, Barbara Rychalska, Konrad Gołuchowski, Jacek Dąbrowski
- **Year:** 2021
- **Summary:** Applies Cleora embeddings and the EMDE sketch-based model to Booking.com trip data for next-destination recommendation, achieving 2nd place in the challenge.

---

## 16. Recommendation Systems and Information Retrieval

### 16.1 Swivel: Improving Embeddings by Noticing What's Missing

- **Authors:** Noam Shazeer, Ryan Doherty, Colin Evans, Chris Waterson (Google)
- **Year:** 2016
- **Summary:** Proposes Swivel, which factorizes pointwise mutual information with a loss that explicitly treats unobserved co-occurrences and scales via sharding and vectorized SGD, learning better word embeddings than methods using only observed pairs.

### 16.2 Accelerating Large-Scale Inference with Anisotropic Vector Quantization (ScaNN)

- **Authors:** Ruiqi Guo, Philip Sun, Erik Lindgren, Quan Geng, David Simcha, Felix Chern, Sanjiv Kumar (Google Research)
- **Year:** 2020
- **Summary:** Introduces anisotropic quantization losses that emphasize errors along directions that hurt inner-product retrieval more than reconstruction MSE, improving maximum inner-product search (MIPS) at scale.

### 16.3 Efficient and Robust Approximate Nearest Neighbor Search using Hierarchical Navigable Small World Graphs (HNSW)

- **Authors:** Yu. A. Malkov, D. A. Yashunin
- **Year:** 2018/2020
- **Summary:** Builds a multi-layer navigable small-world graph for approximate k-NN search, providing strong performance with logarithmic-style scaling and good recall, especially on clustered data distributions.

### 16.4 An Efficient Manifold Density Estimator for All Recommendation Systems (EMDE)

- **Authors:** Jacek Dąbrowski, Barbara Rychalska, Michał Daniluk, Dominika Basaj, Konrad Gołuchowski, et al. (Synerise, Warsaw University of Technology)
- **Year:** 2021
- **Summary:** Uses local-similarity vector representations to build fixed-size, composable manifold density estimates and recasts multi-modal recommendation as conditional weighted density estimation, reporting strong results on top-k and session tasks.

---

## 17. ML Systems and Technical Debt

### 17.1 Machine Learning: The High-Interest Credit Card of Technical Debt

- **Authors:** D. Sculley, Gary Holt, Daniel Golovin, Eugene Davydov, Todd Phillips, Dietmar Ebner, Vinay Chaudhary, Michael Young (Google)
- **Year:** 2014 (NIPS 2014 Workshop)
- **Summary:** Reframes ML systems through the lens of technical debt, arguing that fast ML wins create large, compounding maintenance costs via entanglement, feedback loops, data dependencies, and other ML-specific risks.

### 17.2 Hidden Technical Debt in Machine Learning Systems

- **Authors:** D. Sculley, Gary Holt, Daniel Golovin, Eugene Davydov, Todd Phillips, Dietmar Ebner, Vinay Chaudhary, Michael Young, Jean-François Crespo, Dan Dennison (Google)
- **Year:** 2015 (NeurIPS 2015)
- **Summary:** Argues that ML systems accrue system-level technical debt — boundary erosion, glue code, configuration issues, undeclared consumers, and data dependencies — that ordinary code-focused cleanup cannot fully address.

---

## 18. Efficient Matrix Computation

### 18.1 Multiplying Matrices Without Multiplying

- **Authors:** Davis Blalock, John Guttag (MIT)
- **Year:** 2021
- **Summary:** Introduces a learning-based approximate matrix multiplication algorithm that often runs 100x faster than exact products and 10x faster than existing approximate methods, using hashing, averaging, and byte shuffling instead of traditional multiply-adds.

### 18.2 Matrix Sketching for Supervised Classification with Imbalanced Classes

- **Authors:** Roberta Falcone, Angela Montanari, Laura Anderlucci (University of Bologna)
- **Year:** 2019
- **Summary:** Proposes matrix sketching as a tool for rebalancing class sizes in supervised classification with imbalanced classes, using random projections to compress the majority class dataset efficiently.

---

## 19. Evolutionary Algorithms — Optimization

### 19.1 Gene Expression Programming: A New Adaptive Algorithm for Solving Problems

- **Authors:** Candida Ferreira
- **Year:** 2001
- **Summary:** Introduces gene expression programming (GEP), a genetic algorithm using linear chromosomes expressed as expression trees, achieving high efficiency on symbolic regression and Boolean learning problems.

### 19.2 Genetic Programming: A Paradigm for Genetically Breeding Populations of Computer Programs to Solve Problems

- **Authors:** John R. Koza (Stanford University)
- **Year:** 1990
- **Summary:** Introduces the genetic programming paradigm where populations of computer programs represented as parse trees are evolved via fitness-proportionate reproduction and crossover to solve problems like Boolean multiplexer learning and block stacking.

### 19.3 Evolutionary Algorithms in Control Systems Engineering: A Survey

- **Authors:** P.J. Fleming, R.C. Purshouse
- **Year:** 2002
- **Summary:** Surveys the widespread adoption of evolutionary algorithms in control systems for controller design, model identification, fault diagnosis, and multiobjective optimization.

### 19.4 Evolutionary Algorithms for the Physical Design of VLSI Circuits

- **Authors:** (Scanned document — authors not extractable)
- **Year:** Unknown
- **Summary:** Addresses the application of evolutionary algorithms to VLSI physical design problems such as circuit placement and routing.

### 19.5 A Novel Meta-Heuristic Optimization Algorithm Inspired by Group Hunting of Animals: Hunting Search

- **Authors:** R. Oftadeh, M.J. Mahjoob, M. Shariatpanahi
- **Year:** 2010
- **Summary:** Proposes the Hunting Search (HuS) algorithm, inspired by group hunting behavior of lions and wolves, demonstrating effectiveness on benchmark constrained and unconstrained optimization problems.

### 19.6 A Two-Population Evolutionary Algorithm for Constrained Optimization Problems

- **Authors:** P.A. Simionescu, G.V. Dozier, R.L. Wainwright
- **Year:** ~2006
- **Summary:** Proposes a two-population evolutionary approach where one population evolves inside and another outside the feasible domain, with cross-population crossover to enhance search along constraint boundaries.

### 19.7 Constrained Optimization Problem Solving Using Estimation of Distribution Algorithms

- **Authors:** P.A. Simionescu, D.G. Beale, G.V. Dozier
- **Year:** ~2004
- **Summary:** Tests two EDA variants on constrained continuous optimization problems, comparing penalty and repair operators in elitist and non-elitist implementations.

### 19.8 How a Generative Encoding Fares as Problem-Regularity Decreases

- **Authors:** Jeff Clune, Charles Ofria, Robert T. Pennock
- **Year:** 2008 (PPSN X)
- **Summary:** Compares generative versus direct representations on problems of varying regularity, finding that generative encodings degrade to underperform direct encodings as problem regularity decreases.

### 19.9 An Overview of Evolutionary Algorithms in Multiobjective Optimization

- **Authors:** Carlos M. Fonseca, Peter J. Fleming
- **Year:** 1994
- **Summary:** Provides an early overview of how evolutionary algorithms can be applied to multiobjective optimization problems, establishing foundational concepts for the field.

### 19.10 Multiobjective Evolutionary Algorithms: Analyzing the State-of-the-Art

- **Authors:** David A. Van Veldhuizen, Gary B. Lamont
- **Year:** 2000
- **Summary:** Rigorously defines multiobjective optimization, classifies existing MOEAs, and evaluates contemporary techniques including fitness functions, Pareto ranking, and niching.

### 19.11 The Use of Evolutionary Algorithms for Optimization in the Modern Entrepreneurial Economy: Interdisciplinary Perspective

- **Authors:** Marek Sieja, Krzysztof Wach
- **Year:** 2019
- **Summary:** Reviews the concept and typology of evolutionary algorithms and their potential applications for optimization in economics, finance, and entrepreneurship.

---

## 20. Evolutionary Computation — Virtual Creatures and Computer Graphics

### 20.1 Evolving Virtual Creatures

- **Authors:** Karl Sims
- **Year:** 1994 (SIGGRAPH)
- **Summary:** Describes a system using genetic algorithms to automatically generate the morphology and neural control systems of virtual creatures capable of swimming, walking, jumping, and following behaviors in simulated 3D worlds.

### 20.2 Evolving 3D Morphology and Behavior by Competition

- **Authors:** Karl Sims
- **Year:** 1994 (Artificial Life IV)
- **Summary:** Presents a co-evolutionary system where virtual creatures with genetically determined morphology and neural controllers compete in physically simulated 3D worlds, producing diverse strategies and counter-strategies.

### 20.3 Artificial Evolution for Computer Graphics

- **Authors:** Karl Sims
- **Year:** 1991 (SIGGRAPH '91)
- **Summary:** Describes how evolutionary techniques of variation and interactive perceptual selection can create complex simulated structures, textures, and animations for computer graphics.

### 20.4 Evolving Coordinated Quadruped Gaits with the HyperNEAT Generative Encoding

- **Authors:** Jeff Clune, Benjamin E. Beckmann, Charles Ofria, Robert T. Pennock
- **Year:** ~2009
- **Summary:** Demonstrates that HyperNEAT, a generative neural network encoding, can evolve coordinated quadruped gaits without manual problem decomposition, vastly outperforming direct encodings.

### 20.5 Aesthetically Evolved Virtual Pets

- **Authors:** Thomas S. Ray
- **Year:** ~2001 (Artificial Life VII)
- **Summary:** Applies aesthetic, emotional, and empathetic selection to Karl Sims' Evolved Virtual Creatures framework, producing beautiful or strange virtual pets to which humans may form emotional bonds.

### 20.6 Interactive Evolution of Dynamical Systems

- **Authors:** (Scanned document — details not extractable)
- **Year:** Unknown
- **Summary:** Presents a system for interactively evolving dynamical systems via user-guided selection.

### 20.7 Choreographed Image Flow

- **Authors:** (Scanned document — details not extractable)
- **Year:** Unknown
- **Summary:** Addresses techniques for generating or controlling image flow and animation using evolutionary or procedural methods.

### 20.8 Particle Animation and Rendering Using Data Parallel Computation

- **Authors:** (Scanned document — details not extractable)
- **Year:** Unknown
- **Summary:** Addresses techniques for animating and rendering particle systems using data-parallel computation.

### 20.9 Interactive Evolution of Equations for Procedural Models

- **Authors:** (Scanned document — details not extractable)
- **Year:** Unknown
- **Summary:** Presents a system for interactively evolving mathematical equations that define procedural models.

---

## 21. Artificial Life and Digital Evolution

### 21.1 An Approach to the Synthesis of Life (Tierra)

- **Authors:** Thomas S. Ray
- **Year:** 1991 (Artificial Life II, SFI Studies)
- **Summary:** Presents the Tierra system for synthesizing (not merely simulating) life via self-replicating computer programs capable of open-ended evolution, aiming to generate diversity and complexity paralleling the Cambrian explosion.

### 21.2 Documentation for the Tierra Simulator

- **Authors:** Thomas S. Ray
- **Year:** 1998 (Tierra V5.0, originally 1991)
- **Summary:** Provides comprehensive documentation for the Tierra simulator, an artificial life system where self-replicating machine code organisms evolve by natural selection in a virtual computer environment.

### 21.3 Artificial Life Programs and Evolution

- **Authors:** Thomas S. Ray
- **Year:** ~1994
- **Summary:** Discusses how evolution can inhabit digital computation media, arguing that digital organisms represent a dramatically alien form of life governed by the logical laws of the computer rather than physical laws.

### 21.4 Evolution of Complexity: Tissue Differentiation in Network Tierra

- **Authors:** Thomas S. Ray
- **Year:** ~2001
- **Summary:** Describes experiments using evolution to generate complexity in self-replicating multi-threaded computer codes within the Network Tierra system, aiming to achieve tissue-like differentiation.

### 21.5 Evolving Parallel Computation

- **Authors:** Kurt Thearling, Thomas S. Ray
- **Year:** 1997
- **Summary:** Demonstrates that evolution can produce significant increases in parallelism in self-replicating digital organisms in a shared-memory virtual computer environment.

### 21.6 Evolving a Team of Asymmetric Predator Agents That Do Not Compute in Predator-Prey Pursuit Problem

- **Authors:** Ivan Tanev, Milen Georgiev, Katsunori Shimohara, Thomas Ray
- **Year:** 2018 (AIMSA 2018)
- **Summary:** Uses genetic algorithms to evolve simple predator agents with a single sensor and no computation (direct sensor-to-actuator mapping) that successfully capture prey via asymmetric morphology with angular sensor offsets.

### 21.7 Evolution, Robustness and Generality of a Team of Simple Agents with Asymmetric Morphology in Predator-Prey Pursuit Problem

- **Authors:** Milen Georgiev, Ivan Tanev, Katsunori Shimohara, Thomas Ray
- **Year:** 2019
- **Summary:** Extends the asymmetric-morphology predator agent work, demonstrating that the evolved behaviors are both general (solving unforeseen initial situations) and robust to perception noise.

### 21.8 The Surprising Creativity of Digital Evolution: A Collection of Anecdotes from the Evolutionary Computation and Artificial Life Research Communities

- **Authors:** Joel Lehman, Jeff Clune, Dusan Misevic, et al. (~40+ authors)
- **Year:** 2020 (Artificial Life, 26(2))
- **Summary:** Compiles first-hand anecdotes from researchers documenting surprising, creative, and unexpected outcomes produced by digital evolution, arguing that evolutionary surprise is a universal property of complex evolving systems.

### 21.9 Neuromodulation in Artificial Systems

- **Authors:** Esther Lo (Master's thesis, University of Oklahoma; advisor: Thomas Ray)
- **Year:** 2012
- **Summary:** A master's thesis exploring how biological neuromodulation mechanisms can be applied to artificial systems, reviewing neural communication and neuromodulation concepts.

---

## 22. Reference Materials

### 22.1 Google AI Blog: Announcing ScaNN — Efficient Vector Similarity Search

- **Type:** Blog post (Google AI Blog, 2020)
- **Summary:** Announces ScaNN (Scalable Nearest Neighbors), Google's open-source library for efficient vector similarity search at scale.

### 22.2 Vector Quantization — Wikipedia

- **Type:** Wikipedia article
- **Summary:** Encyclopedia article covering vector quantization, a technique for compressing vectors by mapping them to a finite set of representative codewords.

### 22.3 MLOps: Continuous Delivery and Automation Pipelines in Machine Learning

- **Type:** Google Cloud architecture document
- **Summary:** Google Cloud guide on MLOps practices for continuous integration, delivery, and automation of ML pipelines in production systems.

### 22.4 Online Machine Learning — Wikipedia

- **Type:** Wikipedia article
- **Summary:** Encyclopedia article covering online learning, a paradigm where a model is updated incrementally as new data arrives rather than being trained on the full dataset at once.

---

*Catalog generated on 2026-03-29. Total unique entries: ~120 papers + 4 reference documents across 22 categories.*
