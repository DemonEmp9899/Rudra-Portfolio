import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, Github, Linkedin, Mail, Phone, ExternalLink, Code, Brain,
  Database, Cpu, FileCode, Globe, ChevronDown, Sparkles, Zap, Terminal,
  FileText, Twitter, FlaskConical, BookOpen, Newspaper, ArrowUpRight,
  GraduationCap, Briefcase, Calendar, MapPin, Tag, ChevronRight, Send,
  Bot, MessageCircle, Minimize2
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const PAPERS = [
  {
    id: 'mental-health',
    title: 'AI Mental Health Assistant',
    venue: 'IEEE Conference',
    year: '2025',
    tags: ['NLP', 'RoBERTa', 'Sentiment Analysis', 'HCI'],
    status: 'Accepted — IEEE',
    summary: 'Designed an NLP-based, emotion-aware chatbot using RoBERTa for real-time sentiment analysis and empathetic response generation, improving conversational engagement and user experience.',
    blog: {
      heading: 'Building an Emotion-Aware AI Mental Health Chatbot',
      body: `Mental health support systems have long suffered from a fundamental mismatch: people in distress need empathy, but software delivers logic. This paper set out to bridge that gap.

**The Core Problem**

Standard chatbot pipelines treat every message as a neutral query. A user saying "I feel completely hopeless today" receives the same parsing pipeline as "What's the weather in Delhi?" — tokens, intent, slot-fill, response. The emotional signal is discarded almost immediately.

Our approach keeps it alive.

**Architecture Overview**

We fine-tuned a RoBERTa-base model on a curated dataset of ~14,000 therapy session transcripts and mental-health forum posts (sourced ethically via academic partnerships). The classifier outputs one of seven affective states: neutral, anxious, depressed, angry, hopeful, relieved, and joyful. This label gates the downstream response generator.

The response layer is a RAG system backed by a corpus of evidence-based CBT (Cognitive Behavioral Therapy) coping strategies. Different emotional states retrieve from different sub-corpora — an anxious user gets grounding exercises, a depressed user gets behavioral activation prompts, and so on.

**Key Results**

- Sentiment classification accuracy: 87.3% on held-out test set
- Human evaluators rated responses as "empathetic" 79% of the time vs 41% for a baseline GPT-3.5 prompt
- Average session length increased by 2.3× vs rule-based chatbot
- Users reported feeling "heard" significantly more often (p < 0.01)

**What We Learned**

The biggest insight was that *tone modulation* mattered more than factual accuracy. A technically correct coping tip delivered in clinical language felt cold. The same tip prefixed with an acknowledgment phrase ("That sounds really difficult — here's something that might help…") changed the perception entirely.

We also discovered that the model occasionally hallucinated therapeutic advice that sounded plausible but wasn't grounded in evidence. This is why the RAG retrieval layer is non-negotiable — generation alone is insufficient for mental health contexts.

**Future Work**

We're exploring multimodal inputs (voice tone, typing cadence) and longitudinal session memory so the assistant can track mood trajectories over days rather than treating each conversation as isolated.

*Accepted and presented at IEEE Conference 2025.*`
    }
  },
  {
    id: 'deeplab',
    title: 'Satellite Image Segmentation Using DeepLabV3+',
    venue: 'MAITRI Conference',
    year: '2025',
    tags: ['Computer Vision', 'DeepLabV3+', 'Remote Sensing', 'Segmentation'],
    status: 'Accepted — MAITRI',
    summary: 'Implemented a DeepLabV3+ multiclass segmentation pipeline for Ganga river shrinkage analysis (2014–2025) using Sentinel-2, Landsat-8, and Dynamic World data, achieving high IoU/F1 through NDWI preprocessing, BCE+Dice loss, and outperforming UNet and SegNet baselines.',
    blog: {
      heading: 'Watching a River Disappear: Segmenting the Ganga with DeepLabV3+',
      body: `The Ganga river has shrunk dramatically over the last decade. Satellite imagery captures this — but only if you can parse it accurately. This paper builds the pipeline that does exactly that.

**Why the Ganga?**

The Ganga basin supports ~43% of India's population. Changes in river width, floodplain extent, and water body boundaries have enormous downstream effects on agriculture, groundwater, and urban planning. Yet systematic, high-frequency monitoring has historically required expensive manual annotation of satellite tiles.

We wanted to automate it.

**Data Sources**

We pulled three satellite products:
- **Sentinel-2** (10m resolution, 13-band multispectral) for 2014–2025
- **Landsat-8** (30m, 11 bands) as a historical baseline pre-2015
- **Dynamic World** (Google's near-real-time land cover dataset) for pseudo-label generation

The key preprocessing step was NDWI (Normalized Difference Water Index) computation: \`NDWI = (Green − NIR) / (Green + NIR)\`. NDWI highlights water bodies while suppressing vegetation and urban pixels — critical for isolating river extents in cluttered floodplain scenes.

**Model Architecture**

DeepLabV3+ uses an encoder-decoder structure with atrous (dilated) convolutions at multiple rates, allowing the model to capture both fine-grained texture and coarse spatial context simultaneously. We used a ResNet-101 backbone pretrained on ImageNet.

Our loss function combined Binary Cross-Entropy and Dice Loss:
\`L = α·BCE + (1−α)·Dice\` with α = 0.4

Dice Loss specifically penalises under-segmentation of small water bodies — a common failure mode for standard CE-only training.

**Results vs Baselines**

| Model | IoU | F1 | Params |
|---|---|---|---|
| SegNet | 0.71 | 0.74 | 29M |
| UNet | 0.78 | 0.81 | 31M |
| **DeepLabV3+ (ours)** | **0.89** | **0.91** | 59M |

The 11-point IoU gap over UNet is largely attributable to atrous spatial pyramid pooling capturing river bends and braided channels that UNet's symmetric skip-connections miss.

**Key Finding**

The Ganga's main channel narrowed by an estimated 23% between 2014 and 2025 in the Varanasi–Allahabad stretch. The seasonal variance also increased — wet-season width became more extreme while dry-season minimums hit new lows.

**Limitations & Next Steps**

Cloud cover remains the biggest challenge (Sentinel-2 optical sensors are blind through monsoon cloud decks). We're currently integrating SAR (Synthetic Aperture Radar) data from Sentinel-1, which penetrates clouds, as a fusion modality.

*Accepted and presented at MAITRI Conference 2025.*`
    }
  },
  {
    id: 'pakdd',
    title: 'NAS-Optimized Transformer with MLA for Code Generation',
    venue: 'PAKDD 2025',
    year: '2025',
    tags: ['NAS', 'Transformers', 'MLA', 'Code Generation', 'Fine-tuning'],
    status: 'Submitted — PAKDD 2025',
    summary: 'Optimized a Transformer architecture using Neural Architecture Search and fine-tuned it on a coding dataset. Applied Multi-head Latent Attention (MLA) for efficient memory architecture, reducing KV-cache overhead while maintaining generation quality.',
    blog: {
      heading: 'Searching for a Better Transformer: NAS + MLA for Code LLMs',
      body: `Large language models for code are getting bigger. But bigger isn't always better — especially when you're constrained by GPU memory during inference. This paper asks: can we find a *smarter* architecture rather than just a larger one?

**The Problem with Standard Transformers for Code**

Multi-head attention in standard Transformers maintains a KV-cache that scales linearly with sequence length × number of heads × hidden dimension. For code generation tasks with long context (full files, multi-file repos), this becomes a serious bottleneck.

Meanwhile, most code LLMs are adapted from general-purpose language models — their architectures were never optimized for the structural patterns of source code: nesting, scope, token repetition, long-range dependencies between function definitions and calls.

**Neural Architecture Search**

We formulated the architecture search as a discrete optimization over:
- Number of attention heads (8–32)
- Feed-forward expansion ratio (2×, 4×, 8×)
- Depth (number of layers, 12–36)
- Activation functions (GeLU, SwiGLU, ReLU²)
- Positional encoding type (RoPE, ALiBi, learned)

We used an evolutionary search strategy with a proxy task (loss on a 10% subset after 5K steps) to rank candidate architectures. The search ran over ~400 candidate configurations on 4× A100s over 72 hours.

**Multi-head Latent Attention (MLA)**

Inspired by DeepSeek's MLA mechanism, we compress the KV-cache through a low-rank projection:

\`K, V = LoRAProjection(h_t)\` where the projection dimension is 4–8× smaller than the full head dimension.

At inference time, this reduces KV-cache memory by ~6× with less than 2% degradation on code benchmarks. For a 7B model serving 10 concurrent users with 8K context, this is the difference between fitting on one GPU or three.

**Training & Fine-tuning**

We fine-tuned the NAS-selected architecture on The Stack v2 (a deduplicated, permissively licensed code corpus of ~67B tokens) plus CodeContests for competitive programming patterns.

Fine-tuning used a cosine schedule with warmup, gradient checkpointing, and flash attention.

**Results**

| Model | HumanEval | MBPP | KV-Cache (GB/8K ctx) |
|---|---|---|---|
| CodeLlama-7B (baseline) | 34.8% | 41.2% | 18.4 GB |
| StarCoder2-7B | 37.6% | 43.8% | 17.9 GB |
| **Ours (NAS + MLA)** | **41.3%** | **46.7%** | **3.1 GB** |

The 6× memory reduction with a quality *improvement* over baselines is the headline result.

**Implications**

This work suggests that architecture search conditioned on the *deployment constraints* (memory budget, latency SLA) is more valuable than scaling. A smaller, well-shaped model that fits on a single GPU and serves many users may be more practically useful than a larger model that requires multi-GPU serving infrastructure.

*Submitted to PAKDD 2025. Under review.*`
    }
  }
];

const PROJECTS = [
  {
    title: 'Voice RAG AI',
    description: 'End-to-end voice-enabled Retrieval-Augmented Generation system enabling document upload, semantic retrieval, and context-aware question answering with speech-to-text and text-to-speech.',
    tech: ['FastAPI', 'RAG', 'FAISS', 'Groq LLMs', 'Whisper'],
    icon: Globe,
    accent: '#7c3aed',
    link: 'https://github.com/DemonEmp9899/Voice-Rag-AI',
    featured: true,
  },
  {
    title: 'Agentic Startup Simulator',
    description: 'Multi-agent AI system simulating a startup team with CEO, CTO, Designer, and Marketer agents, generating business strategies and tech solutions via an orchestration pipeline.',
    tech: ['Python', 'FastAPI', 'OpenAI', 'LangGraph', 'JSON'],
    icon: Cpu,
    accent: '#0ea5e9',
    link: 'https://github.com/DemonEmp9899/Agentic-Startup',
    featured: true,
  },
  {
    title: 'Fake News Detection',
    description: 'End-to-end NLP pipeline for binary text classification using TF-IDF and Transformer embeddings. Achieved 98.8% accuracy with TF-IDF + Logistic Regression, outperforming RoBERTa/BERT models.',
    tech: ['NLP', 'TF-IDF', 'RoBERTa', 'Logistic Regression', 'scikit-learn'],
    icon: FileCode,
    accent: '#f59e0b',
    link: 'https://github.com/DemonEmp9899/Real-and-Fake-News-Detection',
    featured: false,
  },
  {
    title: 'Fashion Retrieval System',
    description: 'Multi-attribute, zero-shot fashion image retrieval system that handles compositional natural language queries like "professional business attire inside an office" without supervised training.',
    tech: ['CLIP', 'Zero-Shot', 'FAISS', 'Python', 'Computer Vision'],
    icon: Brain,
    accent: '#ec4899',
    link: 'https://github.com/DemonEmp9899/Fashion-Retreival-System',
    featured: false,
  },
  {
    title: 'Real vs Fake Face Classifier',
    description: 'CNN-based deepfake classifier achieving ~70% accuracy on Kaggle dataset with data augmentation, early stopping, and custom Conv2D + MaxPooling2D architecture.',
    tech: ['TensorFlow', 'Keras', 'OpenCV', 'CNN'],
    icon: Database,
    accent: '#10b981',
    link: 'https://github.com/DemonEmp9899/DeepFake-Face-Detection',
    featured: false,
  },
  {
    title: 'RAG-based AI Search',
    description: 'Retrieval-Augmented Generation pipeline with custom document chunking and semantic search. Integrated vector embeddings stored in Supabase for efficient retrieval at scale.',
    tech: ['LLMs', 'Embeddings', 'Supabase', 'Next.js', 'Vector DB'],
    icon: Code,
    accent: '#6366f1',
    link: 'https://github.com/DemonEmp9899/RAG-Architecture',
    featured: false,
  },
];

const EXPERIENCE = [
  {
    role: 'AI SDE Intern',
    company: 'Trovex.ai',
    period: 'March 2026 – Present',
    location: 'Remote',
    points: [
      'Developing scalable AI-powered platform features using Generative AI, LLMs, and multi-agent architectures for intelligent task automation.',
    ],
    color: '#a78bfa',
  },
  {
    role: 'AI SDE Intern',
    company: 'Bcon Club',
    period: 'December 2025 – January 2026',
    location: 'Remote',
    points: [
      'Designed and deployed a Voice AI calling system using Speech-to-Text (STT), Text-to-Speech (TTS), and Large Language Models (LLMs) for real-time conversational AI automation.',
    ],
    color: '#38bdf8',
  },
  {
    role: 'Data Analyst Intern',
    company: 'Shukla E-Waste Processor',
    period: 'September 2025 – December 2025',
    location: 'Remote',
    points: [
      'Analyzed 10,000+ records of e-waste collection, recycling, and logistics data to identify patterns, improve operational efficiency, and support decision-making.',
    ],
    color: '#34d399',
  },
];

// Skills with proficiency levels (size for tag cloud)
const SKILL_TAGS = [
  { name: 'Python', size: 5 },
  { name: 'PyTorch', size: 4 },
  { name: 'TensorFlow', size: 4 },
  { name: 'LLMs', size: 5 },
  { name: 'RAG Systems', size: 5 },
  { name: 'NLP', size: 5 },
  { name: 'LangChain', size: 4 },
  { name: 'LangGraph', size: 4 },
  { name: 'FastAPI', size: 3 },
  { name: 'Transformers', size: 5 },
  { name: 'scikit-learn', size: 4 },
  { name: 'Computer Vision', size: 4 },
  { name: 'FAISS', size: 3 },
  { name: 'React', size: 3 },
  { name: 'SQL', size: 3 },
  { name: 'Docker', size: 3 },
  { name: 'Git', size: 4 },
  { name: 'Multi-Agent', size: 4 },
  { name: 'Vector DBs', size: 3 },
  { name: 'OpenAI API', size: 4 },
  { name: 'Whisper', size: 3 },
  { name: 'CNNs', size: 4 },
  { name: 'DeepLabV3+', size: 3 },
  { name: 'NAS', size: 3 },
  { name: 'JavaScript', size: 3 },
];

const BLOGS = [
  {
    title: 'Zero-Shot Fashion Retrieval: When Single Embeddings Arent Enough',
    summary: 'Breaking down fashion images into independent attributes — colors, garments, scenes — and retrieving across them. A clean two-stage architecture that handles compositional queries without supervised training.',
    date: 'Jan 2026',
    readTime: '3 min read',
    tags: ['Computer Vision', 'CLIP', 'Zero-Shot', 'Fashion', 'Vector Search'],
    link: 'https://medium.com/@rudratomer2004/i-built-a-zero-shot-fashion-retrieval-system-that-understands-compositional-queries-c65756c661de',
    platform: 'Medium',
  },
  // {
  //   title: 'Neural Architecture Search in 2025: Is It Worth It?',
  //   summary: 'A practitioner take on whether NAS actually delivers on its promise or just shifts the hyperparameter search problem upstream.',
  //   date: 'February 2026',
  //   readTime: '6 min read',
  //   tags: ['NAS', 'Research', 'Deep Learning'],
  //   link: 'https://medium.com/@rudratomer3',
  //   platform: 'Medium',
  // },
  // {
  //   title: 'Multi-Agent Systems: From Theory to Actual Product',
  //   summary: 'Walked through building an agentic startup simulator — the architecture decisions, failure modes, and what worked.',
  //   date: 'January 2026',
  //   readTime: '10 min read',
  //   tags: ['Agents', 'LangGraph', 'Python'],
  //   link: 'https://medium.com/@rudratomer3',
  //   platform: 'Medium',
  // },
];

const STATS = [
  { value: 3, suffix: '', label: 'Papers Published' },
  { value: 98.8, suffix: '%', label: 'Model Accuracy' },
  { value: 3, suffix: '', label: 'Internships' },
  { value: 10, suffix: 'K+', label: 'Rows Analyzed' },
];

const NAV_ITEMS = ['home', 'about', 'experience', 'projects', 'research', 'blogs', 'skills', 'contact'];

const TYPING_ROLES = ['AI/ML Engineer', 'Researcher', 'Builder', 'LLM Architect', 'Problem Solver'];

/* ─────────────────────────────────────────────
   PARTICLE CANVAS
───────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMouse);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(167,139,250,0.5)';
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        // connect to mouse
        const dx = particles[i].x - mx;
        const dy = particles[i].y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(56,189,248,${0.3 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }} />;
}

/* ─────────────────────────────────────────────
   TYPING HERO
───────────────────────────────────────────── */
function TypingRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const target = TYPING_ROLES[roleIdx];
    if (paused) {
      const t = setTimeout(() => { setDeleting(true); setPaused(false); }, 1800);
      return () => clearTimeout(t);
    }
    if (!deleting) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        setPaused(true);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setRoleIdx((roleIdx + 1) % TYPING_ROLES.length);
      }
    }
  }, [displayed, deleting, paused, roleIdx]);

  return (
    <span className="grad-text">
      {displayed}<span className="typing-cursor">|</span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   STATS BAR
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   STATS BAR
───────────────────────────────────────────── */
function StatBar({ visible }) {
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const started = useRef(false);

  useEffect(() => {
    if (visible && !started.current) {
      started.current = true;
      STATS.forEach((stat, i) => {
        const duration = 1600;
        const steps = 60;
        const inc = stat.value / steps;
        let current = 0;
        const t = setInterval(() => {
          current = Math.min(current + inc, stat.value);
          setCounts(prev => {
            const next = [...prev];
            next[i] = stat.value % 1 === 0 ? Math.round(current) : Math.round(current * 10) / 10;
            return next;
          });
          if (current >= stat.value) clearInterval(t);
        }, duration / steps);
      });
    }
  }, [visible]);

  return (
    <div className="stats-bar py-6 px-5 sm:px-8" id="stats" data-animate>
      <div className={`max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {STATS.map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="text-2xl sm:text-3xl font-black grad-text font-mono">
              {counts[i]}{stat.suffix}
            </div>
            <div className="text-gray-400 text-xs sm:text-sm tracking-wide font-medium whitespace-nowrap">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SKILL TAG CLOUD
───────────────────────────────────────────── */
function SkillTagCloud({ visible }) {
  const sizeMap = { 3: 'tag-sm', 4: 'tag-md', 5: 'tag-lg' };
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {SKILL_TAGS.map((sk, i) => (
        <span
          key={sk.name}
          className={`skill-tag ${sizeMap[sk.size] || 'tag-md'} transition-all duration-500`}
          style={{
            transitionDelay: `${i * 40}ms`,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          {sk.name}
        </span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAPER MODAL
───────────────────────────────────────────── */
function PaperModal({ paper, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const renderBlog = (text) => {
    return text.split('\n\n').map((para, i) => {
      if (para.startsWith('**') && para.endsWith('**')) {
        return <h3 key={i} className="text-lg font-bold text-violet-300 mt-6 mb-2">{para.replace(/\*\*/g, '')}</h3>;
      }
      if (para.includes('|')) {
        const rows = para.split('\n').filter(r => r.trim());
        return (
          <div key={i} className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              {rows.map((row, ri) => {
                if (row.includes('---')) return null;
                const cells = row.split('|').filter(c => c.trim());
                const Tag = ri === 0 ? 'th' : 'td';
                return (
                  <tr key={ri} className={ri === 0 ? 'bg-violet-900/30' : 'border-b border-white/5'}>
                    {cells.map((cell, ci) => (
                      <Tag key={ci} className="px-3 py-2 text-left text-gray-300 font-normal">{cell.trim()}</Tag>
                    ))}
                  </tr>
                );
              })}
            </table>
          </div>
        );
      }
      const parts = para.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="text-gray-300 leading-relaxed mb-3">
          {parts.map((part, pi) =>
            part.startsWith('**') ? <strong key={pi} className="text-white font-semibold">{part.replace(/\*\*/g, '')}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div
        className="relative z-10 bg-[#0d0d18] border border-violet-500/20 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl shadow-violet-900/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-violet-900/40 to-indigo-900/40 p-6 border-b border-white/5 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {paper.tags.map(t => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">{t}</span>
              ))}
            </div>
            <h2 className="text-xl font-bold text-white leading-snug">{paper.blog.heading}</h2>
            <p className="text-violet-400 text-sm mt-1">{paper.venue} · {paper.year}</p>
          </div>
          <button onClick={onClose} className="shrink-0 p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh] scrollbar-thin">
          {renderBlog(paper.blog.body)}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TERMINAL EASTER EGG (Ctrl+`)
───────────────────────────────────────────── */
function Terminal_EasterEgg({ go }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState(['Welcome to rudra.sh — type "help" for commands']);
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const run = (cmd) => {
    const c = cmd.trim().toLowerCase();
    let out = '';
    if (c === 'help') out = 'Commands: skills · projects · contact · about · clear · exit';
    else if (c === 'skills') { out = 'Navigating to skills...'; setTimeout(() => go('skills'), 600); }
    else if (c === 'projects') { out = 'Navigating to projects...'; setTimeout(() => go('projects'), 600); }
    else if (c === 'contact') { out = 'Navigating to contact...'; setTimeout(() => go('contact'), 600); }
    else if (c === 'about') { out = 'Navigating to about...'; setTimeout(() => go('about'), 600); }
    else if (c === 'clear') { setLines([]); setInput(''); return; }
    else if (c === 'exit') { setOpen(false); return; }
    else if (c === 'whoami') out = 'Rudra Pratap Tomer — AI/ML Engineer & Researcher';
    else if (c === 'ls') out = 'about/  experience/  projects/  research/  blogs/  skills/  contact/';
    else out = `command not found: ${cmd}. Type "help".`;
    setLines(prev => [...prev, `$ ${cmd}`, out]);
    setInput('');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-violet-500/40" style={{ background: '#050508' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{ background: '#0d0d18' }}>
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-gray-500 text-xs font-mono ml-2">rudra.sh</span>
        </div>
        <div className="p-4 h-56 overflow-y-auto font-mono text-sm space-y-1 scrollbar-thin">
          {lines.map((l, i) => (
            <div key={i} className={l.startsWith('$') ? 'text-violet-300' : 'text-gray-400'}>{l}</div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-4 py-3 border-t border-white/5">
          <span className="text-violet-400 font-mono text-sm">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && run(input)}
            className="flex-1 bg-transparent text-green-300 font-mono text-sm outline-none caret-green-400"
            placeholder="type a command..."
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mouse, setMouse] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState({});
  const [activePaper, setActivePaper] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const current = NAV_ITEMS.find(id => {
        const el = document.getElementById(id);
        if (el) { const r = el.getBoundingClientRect(); return r.top <= 120 && r.bottom >= 120; }
        return false;
      });
      if (current) setActiveSection(current);
    };
    const onMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove', onMouse);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMouse); };
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => setVisible(p => ({ ...p, [e.target.id]: e.isIntersecting }))),
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-animate]').forEach(el => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  const vis = (id) => visible[id]
    ? 'opacity-100 translate-y-0 blur-none'
    : 'opacity-0 translate-y-8 blur-sm';

  // Bento: first 2 projects are featured (large), rest are normal
  const featuredProjects = PROJECTS.filter(p => p.featured);
  const regularProjects = PROJECTS.filter(p => !p.featured);

  return (
    <div className="bg-[#07070f] text-white min-h-screen font-sans overflow-x-hidden" style={{ fontFamily: "'Outfit', 'DM Sans', sans-serif" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&display=swap');

        :root {
          --accent: #7c3aed;
          --accent2: #a78bfa;
          --accent3: #c4b5fd;
          --teal: #2dd4bf;
          --gold: #fbbf24;
          --bg: #07070f;
          --surface: #0f0f1e;
          --border: rgba(124,58,237,0.18);
          --border-hover: rgba(124,58,237,0.5);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        ::selection { background: rgba(124,58,237,0.4); color: #fff; }

        body { background: var(--bg); overflow-x: hidden; }

        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #7c3aed55; border-radius: 99px; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(28px) blur(4px); } to { opacity:1; transform:translateY(0) blur(0); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
        @keyframes driftX { 0%,100% { transform: translateX(0); } 50% { transform: translateX(24px); } }
        @keyframes driftY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes gradShift { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }
        @keyframes barFill { from { width:0%; } }
        @keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-10px); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes dotPulse { 0%{opacity:.2} 20%{opacity:1} 100%{opacity:.2} }

        .anim-fade-up { animation: fadeUp 0.7s ease-out forwards; opacity:0; }
        .anim-scale { animation: scaleIn 0.6s ease-out forwards; opacity:0; }
        .drift-x { animation: driftX 8s ease-in-out infinite; }
        .drift-y { animation: driftY 6s ease-in-out infinite; }
        .grad-text {
          background: linear-gradient(135deg, #a78bfa, #38bdf8, #34d399);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradShift 4s ease infinite;
        }
        .bar-fill { animation: barFill 1.4s ease-out forwards; }
        .float-anim { animation: float 3s ease-in-out infinite; }
        .typing-cursor { animation: blink 1s step-end infinite; -webkit-text-fill-color: #a78bfa; }
        .dot-pulse span { animation: dotPulse 1.2s infinite; }
        .dot-pulse span:nth-child(2) { animation-delay: .2s; }
        .dot-pulse span:nth-child(3) { animation-delay: .4s; }

        .card-glow {
          background: var(--surface);
          border: 1px solid var(--border);
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .card-glow:hover {
          border-color: var(--border-hover);
          box-shadow: 0 0 40px rgba(124,58,237,0.15);
          transform: translateY(-4px);
        }

        .nav-link { position: relative; }
        .nav-link::after {
          content: ''; position: absolute; left: 0; bottom: -4px;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #7c3aed, #38bdf8);
          transition: width 0.3s;
          border-radius: 99px;
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .tag {
          font-size: 0.7rem;
          padding: 2px 10px;
          border-radius: 99px;
          border: 1px solid rgba(124,58,237,0.3);
          background: rgba(124,58,237,0.1);
          color: #c4b5fd;
          letter-spacing: 0.04em;
        }

        /* Skill tag cloud sizes */
        .skill-tag {
          border-radius: 99px;
          border: 1px solid rgba(124,58,237,0.3);
          background: rgba(124,58,237,0.08);
          color: #c4b5fd;
          letter-spacing: 0.03em;
          cursor: default;
          transition: all 0.25s;
          display: inline-block;
        }
        .skill-tag:hover {
          background: rgba(124,58,237,0.25);
          border-color: rgba(167,139,250,0.6);
          transform: scale(1.08);
          color: #e9d5ff;
        }
        .tag-sm { font-size: 0.72rem; padding: 3px 10px; }
        .tag-md { font-size: 0.85rem; padding: 5px 14px; font-weight: 500; }
        .tag-lg { font-size: 1.05rem; padding: 7px 18px; font-weight: 700; border-color: rgba(167,139,250,0.5); background: rgba(124,58,237,0.18); color: #e9d5ff; }

        .section-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }
        .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: #7c3aed;
          text-transform: uppercase;
        }

        .mesh-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 80% 80% at 20% 10%, rgba(124,58,237,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 80% 90%, rgba(45,212,191,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 60% 40%, rgba(56,189,248,0.04) 0%, transparent 60%);
        }

        .grid-lines {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        .stats-bar {
          background: linear-gradient(90deg, rgba(124,58,237,0.06) 0%, rgba(56,189,248,0.04) 50%, rgba(52,211,153,0.06) 100%);
          border-top: 1px solid rgba(124,58,237,0.12);
          border-bottom: 1px solid rgba(124,58,237,0.12);
        }

        /* Stagger reveal for sections */
        .stagger-child { transition: opacity 0.6s ease, transform 0.6s ease, filter 0.6s ease; }
      `}</style>

      {/* Custom Cursor */}
      <div
        className="fixed w-5 h-5 rounded-full border border-violet-400/60 pointer-events-none z-[200] mix-blend-difference transition-transform duration-75"
        style={{ left: mouse.x, top: mouse.y, transform: 'translate(-50%,-50%)' }}
      />
      <div
        className="fixed w-1.5 h-1.5 rounded-full bg-violet-400 pointer-events-none z-[201]"
        style={{ left: mouse.x, top: mouse.y, transform: 'translate(-50%,-50%)', transition: 'left 0.05s, top 0.05s' }}
      />

      {/* Backgrounds */}
      <div className="mesh-bg" />
      <div className="grid-lines" />

      {/* Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="drift-x absolute top-10 left-1/4 w-72 h-72 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="drift-y absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-teal-400/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-sky-500/6 blur-3xl drift-x" style={{ animationDelay: '3s' }} />
      </div>

      {/* ── NAV ── */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl border-b border-white/5' : ''}`}
        style={{ background: scrolled ? 'rgba(7,7,15,0.85)' : 'transparent' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex justify-between items-center">
          <button onClick={() => go('home')} className="text-xl font-bold tracking-tight">
            <span className="text-white">rudra</span><span className="text-violet-400">.</span>
          </button>
          <div className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => go(item)}
                className={`nav-link text-sm font-medium capitalize transition-colors duration-300 ${activeSection === item ? 'text-violet-300 active' : 'text-gray-400 hover:text-white'}`}
              >
                {item}
              </button>
            ))}
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white transition-colors p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          style={{ background: 'rgba(7,7,15,0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(124,58,237,0.15)' }}>
          <div className="px-6 py-5 flex flex-col gap-4">
            {NAV_ITEMS.map(item => (
              <button key={item} onClick={() => go(item)}
                className={`text-left capitalize text-sm font-medium transition-all duration-200 hover:translate-x-1 ${activeSection === item ? 'text-violet-300' : 'text-gray-400'}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 px-5 sm:px-8 z-10 overflow-hidden">
        {/* Particle background */}
        <div className="absolute inset-0 z-0">
          <ParticleCanvas />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-mono mb-8 anim-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for AI/ML roles & research collaborations
          </div>

          <h1 className="section-title text-white mb-4 anim-fade-up" style={{ animationDelay: '0.1s' }}>
            Rudra Pratap Tomer
          </h1>

          <div className="text-2xl sm:text-3xl font-bold mb-6 anim-fade-up h-10" style={{ animationDelay: '0.15s' }}>
            <TypingRole />
          </div>

          <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-10 anim-fade-up" style={{ animationDelay: '0.2s' }}>
            I build intelligent systems — from production RAG pipelines and multi-agent architectures to published research
            in IEEE, MAITRI, and PAKDD.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10 anim-fade-up" style={{ animationDelay: '0.3s' }}>
            {['Python', 'PyTorch', 'LLMs', 'RAG', 'LangGraph', 'FastAPI', 'Transformers', 'NLP'].map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 anim-fade-up" style={{ animationDelay: '0.4s' }}>
            <button onClick={() => go('projects')}
              className="px-7 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-600/30"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
              View Projects
            </button>
            <button onClick={() => go('research')}
              className="px-7 py-3 rounded-xl font-semibold text-sm text-violet-300 border border-violet-500/40 hover:border-violet-400 hover:bg-violet-500/10 transition-all duration-300 hover:scale-105">
              Read Research
            </button>
            <a href="https://drive.google.com/file/d/1Tc4chHba9PPiDqLwWlTN3zX1qSOkVer4/view?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="px-7 py-3 rounded-xl font-semibold text-sm text-gray-400 border border-white/10 hover:border-white/25 hover:text-white transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
              <FileText size={15} /> Resume
            </a>
          </div>

          <div className="pt-16 float-anim">
            <ChevronDown className="mx-auto text-violet-500/50 cursor-pointer" size={28} onClick={() => go('about')} />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div data-animate id="stats">
        <StatBar visible={!!visible['stats']} />
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="relative z-10 py-24 px-5 sm:px-8" data-animate>
        <div className="max-w-5xl mx-auto">
          <div className={`transition-all duration-700 ${vis('about')}`}>
            <div className="section-label mb-3">01 — About</div>
            <h2 className="section-title text-white mb-12">Who I Am</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`card-glow rounded-2xl p-7 transition-all duration-700 delay-100 ${vis('about')}`}>
            <p className="text-gray-300 leading-relaxed mb-5">
          I'm a final-year B.Tech CSE student at <span className="text-violet-300 font-semibold">Bennett University</span> (CGPA 7.5) specialising in AI/ML.
          I've shipped production systems at <span className="text-teal-400 font-semibold">Trovex.ai</span>, published research at <span className="text-amber-400 font-semibold">IEEE</span> and <span className="text-amber-400 font-semibold">MAITRI</span>, and I thrive at the intersection of rigorous engineering and creative problem-solving.
        </p>
        <p className="text-gray-300 leading-relaxed">
         Right now, I'm exploring <span className="text-teal-400 font-semibold">LLMs</span> and <span className="text-sky-400 font-semibold">agentic architectures</span> — building, breaking, and learning what makes them actually work. My goal? To become a <span className="text-amber-400 font-semibold">Forward-Deployed AI Engineer</span>, bridging research and real-world products.
        </p>
            </div>
            <div className={`space-y-4 transition-all duration-700 delay-200 ${vis('about')}`}>
              {[
                { icon: GraduationCap, label: 'Bennett University', sub: 'B.E. CSE · Sept 2022 – Present · CGPA 7.5', color: '#a78bfa' },
                { icon: Brain, label: 'Research Focus', sub: 'NLP · Computer Vision · LLM Optimization · Voice-Native LLMs · Multi-Agent', color: '#38bdf8' },
                { icon: Globe, label: '3 Papers Published / Submitted', sub: 'IEEE · MAITRI · PAKDD 2025', color: '#34d399' },
                { icon: Sparkles, label: 'I build', sub: 'LLM pipelines · RAG · GenAI agents · Production AI', color: '#fbbf24' },
              ].map(({ icon: Icon, label, sub, color }) => (
                <div key={label} className="card-glow rounded-xl p-4 flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}20` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{label}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="relative z-10 py-24 px-5 sm:px-8" data-animate>
        <div className="max-w-5xl mx-auto">
          <div className={`transition-all duration-700 ${vis('experience')}`}>
            <div className="section-label mb-3">02 — Experience</div>
            <h2 className="section-title text-white mb-12">Work History</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600/50 via-teal-400/30 to-transparent" />
            <div className="space-y-8 pl-12">
              {EXPERIENCE.map((exp, i) => (
                <div
                  key={i}
                  className={`card-glow rounded-2xl p-6 relative transition-all duration-700 ${vis('experience')}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="absolute -left-[2.6rem] top-7 w-3 h-3 rounded-full border-2 border-[#07070f]" style={{ background: exp.color }} />
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                      <div className="text-sm font-semibold mt-0.5" style={{ color: exp.color }}>{exp.company}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <Calendar size={12} /> {exp.period}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1">
                        <MapPin size={12} /> {exp.location}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.points.map((pt, pi) => (
                      <li key={pi} className="flex items-start gap-2 text-gray-400 text-sm leading-relaxed">
                        <ChevronRight size={14} className="mt-0.5 shrink-0" style={{ color: exp.color }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS (Bento Grid) ── */}
      <section id="projects" className="relative z-10 py-24 px-5 sm:px-8" data-animate>
        <div className="max-w-5xl mx-auto">
          <div className={`transition-all duration-700 ${vis('projects')}`}>
            <div className="section-label mb-3">03 — Projects</div>
            <h2 className="section-title text-white mb-12">What I've Built</h2>
          </div>

          {/* Bento grid: 2 featured + 4 regular */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Featured projects: span 2 columns each on lg */}
            {featuredProjects.map((project, i) => {
              const Icon = project.icon;
              return (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`card-glow rounded-2xl p-6 flex flex-col gap-4 group transition-all duration-700 lg:col-span-${i === 0 ? '2' : '1'} ${vis('projects')}`}
                  style={{ transitionDelay: `${i * 80}ms`, minHeight: '200px' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${project.accent}25` }}>
                      <Icon size={24} style={{ color: project.accent }} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: `${project.accent}18`, color: project.accent }}>Featured</span>
                      <ArrowUpRight size={16} className="text-gray-600 group-hover:text-violet-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-violet-200 transition-colors duration-300">{project.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </a>
              );
            })}

            {/* Regular projects */}
            {regularProjects.map((project, i) => {
              const Icon = project.icon;
              return (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`card-glow rounded-2xl p-5 flex flex-col gap-4 group transition-all duration-700 ${vis('projects')}`}
                  style={{ transitionDelay: `${(i + 2) * 80}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${project.accent}20` }}>
                      <Icon size={20} style={{ color: project.accent }} />
                    </div>
                    <ArrowUpRight size={16} className="text-gray-600 group-hover:text-violet-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base mb-2 group-hover:text-violet-200 transition-colors duration-300">{project.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </a>
              );
            })}
          </div>

          <div className={`text-center mt-10 transition-all duration-700 delay-500 ${vis('projects')}`}>
            <a href="https://github.com/DemonEmp9899" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-300 transition-colors duration-300">
              <Github size={16} /> View all projects on GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <section id="research" className="relative z-10 py-24 px-5 sm:px-8" data-animate>
        <div className="max-w-5xl mx-auto">
          <div className={`transition-all duration-700 ${vis('research')}`}>
            <div className="section-label mb-3">04 — Research</div>
            <h2 className="section-title text-white mb-4">Published Work</h2>
            <p className="text-gray-500 text-sm mb-12">Click any paper to read the full blog post.</p>
          </div>
          <div className="space-y-5">
            {PAPERS.map((paper, i) => (
              <button
                key={paper.id}
                onClick={() => setActivePaper(paper)}
                className={`card-glow rounded-2xl p-6 w-full text-left group transition-all duration-700 ${vis('research')}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium"
                        style={{
                          background: paper.status.includes('Submitted') ? 'rgba(251,191,36,0.15)' : 'rgba(52,211,153,0.15)',
                          color: paper.status.includes('Submitted') ? '#fbbf24' : '#34d399',
                          border: `1px solid ${paper.status.includes('Submitted') ? 'rgba(251,191,36,0.3)' : 'rgba(52,211,153,0.3)'}`,
                        }}>
                        <FlaskConical size={11} />
                        {paper.status}
                      </span>
                      <span className="text-gray-600 text-xs font-mono">{paper.year}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-violet-200 transition-colors duration-300 leading-snug">{paper.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{paper.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {paper.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all duration-300">
                    <BookOpen size={18} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOGS ── */}
      <section id="blogs" className="relative z-10 py-24 px-5 sm:px-8" data-animate>
        <div className="max-w-5xl mx-auto">
          <div className={`transition-all duration-700 ${vis('blogs')}`}>
            <div className="section-label mb-3">05 — Blogs</div>
            <h2 className="section-title text-white mb-12">Writing</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOGS.map((blog, i) => (
              <a
                key={i}
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`card-glow rounded-2xl p-5 flex flex-col gap-4 group transition-all duration-700 ${vis('blogs')}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-600 font-mono">
                    <Newspaper size={13} className="text-violet-500" />
                    {blog.platform}
                  </div>
                  <ArrowUpRight size={15} className="text-gray-700 group-hover:text-violet-400 transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-violet-200 transition-colors duration-300">{blog.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{blog.summary}</p>
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-2">
                  <span className="text-gray-600 text-xs font-mono">{blog.date}</span>
                  <span className="text-gray-700 text-xs">·</span>
                  <span className="text-gray-600 text-xs">{blog.readTime}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </a>
            ))}
          </div>
          <div className={`text-center mt-10 transition-all duration-700 delay-300 ${vis('blogs')}`}>
            <a href="https://medium.com/@rudratomer2004" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-300 transition-colors duration-300">
              <Newspaper size={15} /> Read all posts on Medium <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* ── SKILLS (Tag Cloud) ── */}
      <section id="skills" className="relative z-10 py-24 px-5 sm:px-8" data-animate>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-700 ${vis('skills')}`}>
            <div className="section-label mb-3">06 — Skills</div>
            <h2 className="section-title text-white mb-4">Toolkit</h2>
            <p className="text-gray-500 text-sm mb-12">Tag size reflects proficiency level.</p>
          </div>
          <div className={`card-glow rounded-2xl p-8 sm:p-12 transition-all duration-700 delay-100 ${vis('skills')}`}>
            <SkillTagCloud visible={!!visible['skills']} />
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 py-24 px-5 sm:px-8" data-animate>
        <div className="max-w-3xl mx-auto text-center">
          <div className={`transition-all duration-700 ${vis('contact')}`}>
            <div className="section-label mb-3">07 — Contact</div>
            <h2 className="section-title text-white mb-5">Let's Talk</h2>
            <p className="text-gray-500 text-base mb-12">
              Open to AI/ML internships, research collaborations, and interesting problems.
            </p>
          </div>
          <div className={`card-glow rounded-2xl p-8 sm:p-10 transition-all duration-700 delay-100 ${vis('contact')}`}>
            <div className="space-y-4 mb-8">
              <a href="mailto:rudratomer3@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 group text-left">
                <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center">
                  <Mail size={17} className="text-violet-400" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors text-sm">rudratomer3@gmail.com</span>
              </a>
              <a href="tel:+918107267144"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 group text-left">
                <div className="w-9 h-9 rounded-lg bg-teal-500/15 flex items-center justify-center">
                  <Phone size={17} className="text-teal-400" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors text-sm">+91 8107267144</span>
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { href: 'https://www.linkedin.com/in/rudra-pratap-tomer-69529924b/', icon: Linkedin, label: 'LinkedIn', color: '#38bdf8' },
                { href: 'https://github.com/DemonEmp9899', icon: Github, label: 'GitHub', color: '#a78bfa' },
                { href: 'https://x.com/rudra_tomer1', icon: Twitter, label: 'Twitter', color: '#34d399' },
                { href: 'https://medium.com/@rudratomer2004', icon: Newspaper, label: 'Medium', color: '#fbbf24' },
                { href: 'https://drive.google.com/file/d/15kZrJkCbtXQB5CFQiEqIKGLqNs2P5XvO/view?usp=sharing', icon: FileText, label: 'Resume', color: '#f472b6' },
              ].map(({ href, icon: Icon, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 p-4 rounded-xl border border-white/5 hover:border-white/15 transition-all duration-300 hover:scale-105 group w-16"
                  aria-label={label}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}18` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <span className="text-gray-600 text-xs">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-5 text-center">
        <p className="text-gray-600 text-sm font-mono">
          © 2025 Rudra Pratap Tomer · Built with React + Vite
        </p>
        <p className="text-gray-700 text-xs mt-2 font-mono">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-600">Ctrl+`</kbd> to open terminal
        </p>
      </footer>

      {/* Paper Modal */}
      {activePaper && <PaperModal paper={activePaper} onClose={() => setActivePaper(null)} />}

      {/* Terminal Easter Egg */}
      <Terminal_EasterEgg go={go} />
    </div>
  );
}