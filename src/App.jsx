import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, Phone, ExternalLink, Code, Brain, Database, Cpu, FileCode, Globe, ChevronDown, Sparkles, Zap, Terminal, FileText, Twitter } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: "Agentic Startup Simulator",
      description: "Simulate a fully autonomous startup with CEO, CTO, Designer, and Marketer agents, all working together to generate business strategies, tech solutions, designs, and marketing campaigns.",
      tech: ["Python", "FastAPI", "OpenAI", "JSON", "HuggingFace Transformers"],
      icon: Globe,
      gradient: "from-red-600 to-orange-600",
      link: "https://github.com/DemonEmp9899/Agentic-Startup" 
    },
    {
      title: "Real vs Fake Human Face Classifier",
      description: "CNN-based classifier achieving ~70% accuracy on Kaggle dataset. Implemented data augmentation, early stopping, and custom architecture with Conv2D and MaxPooling2D layers.",
      tech: ["TensorFlow", "Keras", "OpenCV", "CNN"],
      icon: Brain,
      gradient: "from-red-600 to-pink-600",
      link:"https://github.com/DemonEmp9899/DeepFake-Face-Detection"
    },
    {
      title: "RAG-based AI Search System",
      description: "Built Retrieval-Augmented Generation pipeline with custom document chunking and semantic search. Integrated vector embeddings stored in Supabase for efficient retrieval.",
      tech: ["LLMs", "Embeddings", "Supabase", "Next.js", "Vector DB"],
      icon: Database,
      gradient: "from-red-600 to-rose-600",
      link:"https://github.com/DemonEmp9899/RAG-Architecture" 
    },
    {
      title: "Drift-Aware AI Retraining Pipeline",
      description: "A complete automated system that detects AI model drift, logs interactions, monitors performance, and triggers retraining actions — ensuring your model stays accurate and reliable over time.",
      tech: ["Python", "Supabase", "Prometheus", "Grafana"],
      icon: Cpu,
      gradient: "from-red-600 to-red-700",
      link:"https://github.com/DemonEmp9899/drift-aware-ai-retraining-pipeline"
    },
    {
      title: "NLP Pipeline & Text Classification",
      description: "Complete preprocessing pipeline with tokenization, stemming, and lemmatization. Trained ML models with comprehensive evaluation using Accuracy, F1 Score, and ARI metrics.",
      tech: ["NLTK", "spaCy", "scikit-learn", "Python"],
      icon: FileCode,
      gradient: "from-red-600 to-amber-600"
    },
    {
      title: "WebWave - Modern E-commerce Platform",
      description: "Fully responsive e-commerce website with complete shopping flow: Home → Collections → Product → Cart. Modern UI with smooth navigation and user experience.",
      tech: ["React", "Node.js", "React Router", "CSS"],
      icon: Code,
      gradient: "from-red-600 to-yellow-600",
      link:"https://github.com/DemonEmp9899/WebWave"
    }
  ];

  const skillCategories = [
    {
      title: "AI/ML & Deep Learning",
      icon: Brain,
      skills: [
        { name: "Machine Learning", level: 90 },
        { name: "CNNs & Vision Transformers", level: 85 },
        { name: "NLP & Embeddings", level: 88 },
        { name: "RAG Systems", level: 82 },
        { name: "Generative AI & LLMs", level: 85 }
      ]
    },
    {
      title: "Tools & Frameworks",
      icon: Zap,
      skills: [
        { name: "TensorFlow & Keras", level: 90 },
        { name: "PyTorch", level: 80 },
        { name: "scikit-learn", level: 88 },
        { name: "LangChain", level: 82 },
        { name: "OpenCV", level: 85 }
      ]
    },
    {
      title: "Programming & Dev",
      icon: Terminal,
      skills: [
        { name: "Python", level: 95 },
        { name: "JavaScript/TypeScript", level: 85 },
        { name: "React & Node.js", level: 80 },
        { name: "Git & VS Code", level: 90 }
      ]
    }
  ];

  const techStack = ["Python", "TensorFlow", "PyTorch", "React", "Node.js", "LangChain", "OpenCV", "Next.js"];

  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
      {/* Custom Cursor Effect */}
      <div 
        className="fixed w-6 h-6 border-2 border-red-600 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-red-900/50 shadow-lg shadow-red-900/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold group cursor-pointer">
              <span className="text-white transition-all duration-300 group-hover:text-red-600">Rudra</span>
              <span className="text-red-600 animate-pulse">.</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 relative group ${
                    activeSection === item ? 'text-red-600' : 'text-white'
                  }`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full ${activeSection === item ? 'w-full' : ''}`}></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-red-600 transition-colors p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-black/95 backdrop-blur-xl border-t border-red-900/30 px-4 py-4 space-y-4">
            {['home', 'about', 'projects', 'skills', 'contact'].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left capitalize text-white hover:text-red-600 transition-all duration-300 transform hover:translate-x-2 py-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto z-10 w-full">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-block animate-bounce">
              <Sparkles className="text-red-600 mb-4" size={32} />
            </div>
            
            <div className="space-y-2 animate-fade-in">
              <span className="text-red-600 font-mono text-sm sm:text-base tracking-wider block">Hi, I'm</span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="inline-block animate-slide-up text-white hover:text-red-600 transition-colors duration-300 cursor-default">Rudra</span>{' '}
                <span className="inline-block animate-slide-up text-white hover:text-red-600 transition-colors duration-300 cursor-default" style={{ animationDelay: '0.1s' }}>Pratap</span>{' '}
                <span className="inline-block animate-slide-up text-white hover:text-red-600 transition-colors duration-300 cursor-default" style={{ animationDelay: '0.1s' }}>Tomer</span>
                <br />
                <span className="inline-block animate-slide-up text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-600 bg-[length:200%_auto] animate-gradient" style={{ animationDelay: '0.2s' }}>
                  Tomer
                </span>
              </h1>
            </div>

            {/* Animated Tech Stack */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto py-4">
              {techStack.map((tech, index) => (
                <span
                  key={tech}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-900/20 text-red-400 rounded-full border border-red-900/50 text-xs sm:text-sm hover:bg-red-900/40 hover:scale-110 transition-all duration-300 cursor-default animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
              AI/ML Engineer & Final-Year B.Tech Student
            </p>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in px-4" style={{ animationDelay: '0.4s' }}>
              I build intelligent systems using Machine Learning, Deep Learning, NLP, and Generative AI. 
              From creating production-ready AI pipelines to designing modern web apps, I focus on solving 
              real problems with clean engineering and scalable systems.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 pt-8 animate-fade-in px-4" style={{ animationDelay: '0.5s' }}>
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-6 sm:px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-600/50 relative overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 sm:px-8 py-3 border-2 border-red-600 hover:bg-red-600/20 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/30"
              >
                Get in Touch
              </button>
            </div>

            <div className="pt-12 animate-bounce">
              <ChevronDown className="mx-auto text-red-600 cursor-pointer" size={32} onClick={() => scrollToSection('about')} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 sm:py-20 z-10 px-4 sm:px-6" data-animate>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center transition-all duration-1000 transform ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            About <span className="text-red-600">Me</span>
          </h2>
          <div className={`bg-gradient-to-br from-red-950/20 to-black border border-red-900/30 rounded-2xl p-6 sm:p-8 md:p-12 backdrop-blur-sm hover:border-red-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/30 transform ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-base sm:text-lg hover:text-white transition-colors duration-300">
                I'm a final-year B.Tech student specializing in <span className="text-red-400 font-semibold">Artificial Intelligence & Machine Learning</span>. 
                I've worked on multiple real-world projects including Vision Transformers, RAG-based search systems, AI chatbots, and NLP pipelines.
              </p>
              <p className="text-base sm:text-lg hover:text-white transition-colors duration-300">
                Currently, I'm working remotely as an <span className="text-red-400 font-semibold">AI Intern</span>, focusing on embedding models, 
                LLM optimization, and automation agents.
              </p>
              <div className="pt-4">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="text-red-600" size={24} />
                  I love building:
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'End-to-end AI systems',
                    'Computer Vision & NLP models',
                    'GenAI Apps',
                    'Smart tools using Python, TensorFlow, PyTorch, and React'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                      <div className="w-2 h-2 bg-red-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="group-hover:text-white transition-colors duration-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-lg sm:text-xl font-semibold text-red-400 pt-4 animate-pulse">
                In short — I turn ideas into working AI products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-16 sm:py-20 z-10 px-4 sm:px-6" data-animate>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center transition-all duration-1000 transform ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Featured <span className="text-red-600">Projects</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-gradient-to-br from-red-950/20 to-black border border-red-900/30 rounded-xl p-6 hover:border-red-600/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-red-900/40 cursor-pointer block ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${project.gradient} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <ExternalLink className="text-gray-400 group-hover:text-red-600 group-hover:rotate-45 transition-all duration-300" size={20} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-red-900/30 text-red-400 rounded-full border border-red-900/50 hover:bg-red-900/50 hover:scale-110 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </a>
              );
            })}
          </div>
          
          {/* More Projects Link */}
          <div className="text-center mt-12 animate-fade-in">
            <a
              href="https://github.com/DemonEmp9899"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-lg font-semibold text-gray-300 hover:text-red-600 transition-all duration-300"
            >
              <span className="group-hover:translate-x-[-8px] transition-transform duration-300">
                Want to see more?
              </span>
              <span className="text-red-600 group-hover:gap-4 transition-all duration-300">
                Check out all my projects on GitHub
              </span>
              <ExternalLink className="text-red-600 group-hover:rotate-45 group-hover:scale-110 transition-all duration-300" size={20} />
            </a>
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full group-hover:w-32 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Skills Section */}
      <section id="skills" className="relative py-16 sm:py-20 z-10 px-4 sm:px-6" data-animate>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center transition-all duration-1000 transform ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Skills & <span className="text-red-600">Expertise</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {skillCategories.map((category, catIndex) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={catIndex}
                  className={`bg-gradient-to-br from-red-950/20 to-black border border-red-900/30 rounded-xl p-6 backdrop-blur-sm hover:border-red-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/30 hover:scale-105 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${catIndex * 150}ms` }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <IconComponent className="text-red-600" size={28} />
                    <h3 className="text-xl font-bold text-red-400">{category.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="group">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{skill.name}</span>
                          <span className="text-red-600 font-semibold">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-800/50 rounded-full h-2.5 overflow-hidden backdrop-blur-sm">
                          <div
                            className={`bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full transition-all duration-1000 ease-out ${isVisible.skills ? 'animate-fill' : 'w-0'}`}
                            style={{ 
                              width: isVisible.skills ? `${skill.level}%` : '0%',
                              transitionDelay: `${(catIndex * 150) + (skillIndex * 100)}ms`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 sm:py-20 z-10 px-4 sm:px-6" data-animate>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center transition-all duration-1000 transform ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Let's <span className="text-red-600">Connect!</span>
          </h2>
          <div className={`bg-gradient-to-br from-red-950/20 to-black border border-red-900/30 rounded-2xl p-6 sm:p-8 md:p-12 backdrop-blur-sm hover:border-red-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/30 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-center text-gray-300 mb-8 text-base sm:text-lg">
              I'm always open to AI/ML internships, collaborations, and exciting startup opportunities.
            </p>
            <div className="space-y-4 sm:space-y-6">
              <a
                href="mailto:rudratomer@gmail.com"
                className="flex items-center space-x-4 p-4 bg-red-900/20 hover:bg-red-900/40 rounded-lg transition-all duration-300 group border border-red-900/30 hover:border-red-600/50 hover:scale-105"
              >
                <Mail className="text-red-600 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" size={24} />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm sm:text-base break-all">rudratomer3@gmail.com</span>
              </a>
              <a
                href="tel:+918107247644"
                className="flex items-center space-x-4 p-4 bg-red-900/20 hover:bg-red-900/40 rounded-lg transition-all duration-300 group border border-red-900/30 hover:border-red-600/50 hover:scale-105"
              >
                <Phone className="text-red-600 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" size={24} />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">+91 8107247644</span>
              </a>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <a
                  href="https://www.linkedin.com/in/rudra-pratap-tomer-69529924b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-red-900/20 hover:bg-red-900/40 rounded-lg transition-all duration-300 hover:scale-125 hover:rotate-12 border border-red-900/30 hover:border-red-600/50 group"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="text-red-600 group-hover:text-white transition-colors duration-300" size={28} />
                </a>
                <a
                  href="https://github.com/DemonEmp9899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-red-900/20 hover:bg-red-900/40 rounded-lg transition-all duration-300 hover:scale-125 hover:-rotate-12 border border-red-900/30 hover:border-red-600/50 group"
                  aria-label="GitHub Profile"
                >
                  <Github className="text-red-600 group-hover:text-white transition-colors duration-300" size={28} />
                </a>
                <a
                  href="https://x.com/rudra_tomer1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-red-900/20 hover:bg-red-900/40 rounded-lg transition-all duration-300 hover:scale-125 hover:rotate-12 border border-red-900/30 hover:border-red-600/50 group"
                  aria-label="X (Twitter) Profile"
                >
                  <Twitter className="text-red-600 group-hover:text-white transition-colors duration-300" size={28} />
                </a>
                <a
                  href="https://drive.google.com/file/d/1Tc4chHba9PPiDqLwWlTN3zX1qSOkVer4/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-red-900/20 hover:bg-red-900/40 rounded-lg transition-all duration-300 hover:scale-125 hover:-rotate-12 border border-red-900/30 hover:border-red-600/50 group"
                  aria-label="Download Resume"
                >
                  <FileText className="text-red-600 group-hover:text-white transition-colors duration-300" size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-red-900/30 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="hover:text-red-600 transition-colors duration-300">© 2025 Rudra Pratap Tomer. Built with passion for AI/ML.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        @keyframes fill {
          from {
            width: 0%;
          }
        }

        .animate-fill {
          animation: fill 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}