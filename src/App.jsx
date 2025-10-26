import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronUp,
  Terminal,
  Code2,
  Braces,
} from "lucide-react";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());

  // Loading effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for swoosh-in effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollTop(window.scrollY > 400);

      const sections = ["home", "about", "skills", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const skills = [
    {
      name: "HTML5",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "GitHub",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "Tailwind",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Vite",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    },
    {
      name: "WordPress",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
    },
    {
      name: "Framer",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
    },
  ];

  const projects = [
    {
      title: "Top Cleaning Website",
      description:
        "A conversion-optimized multi-page website that drives customer bookings and builds trust. Features strategic call-to-action placements, service showcases, and transparent pricing that convert visitors into clients.",
      businessValue:
        "Increases online bookings • Builds brand credibility • Mobile-optimized for on-the-go customers",
      tech: ["WordPress", "HTML", "CSS", "JavaScript"],
      liveUrl: "https://tc-janitorial.com",
      screenshot: "/src/assets/top.png",
    },
    {
      title: "Secure Calculator App",
      description:
        "A feature-rich calculation tool with enterprise-level security. Demonstrates ability to build secure, authenticated applications with real-time data processing and database integration.",
      businessValue:
        "Secure user authentication • Real-time calculations • Cloud database integration",
      tech: ["React", "Vite", "CSS", "Firebase"],
      liveUrl: "https://calculator-delta-khaki.vercel.app/",
      screenshot: "/src/assets/calc.png",
    },
    {
      title: "SaaS Features Page",
      description:
        "A high-converting landing page designed to showcase product value and drive sign-ups. Built with performance optimization and engaging animations that keep visitors scrolling.",
      businessValue:
        "Increases conversion rates • Fast loading speeds • Engaging user experience",
      tech: ["React", "Tailwind CSS", "Vite"],
      liveUrl: "https://mixlr-features-page.vercel.app/",
      screenshot: "/src/assets/mixlr.png",
    },
  ];

  // Code rain effect
  const codeCharacters = [
    "0",
    "1",
    "{",
    "}",
    "<",
    ">",
    "/",
    "*",
    "+",
    "-",
    "=",
    ";",
  ];
  const [codeRain, setCodeRain] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      const drops = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        char: codeCharacters[Math.floor(Math.random() * codeCharacters.length)],
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 2,
      }));
      setCodeRain(drops);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <Terminal className="w-16 h-16 text-green-500 mx-auto mb-6 animate-pulse" />
          <div className="font-mono text-green-500 mb-4">
            <span className="text-2xl">{">"} Loading Portfolio...</span>
          </div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="font-mono text-green-500 mt-4 text-sm">
            {loadingProgress}% complete
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative font-mono">
      {/* Code rain background */}
      <div className="fixed inset-0 z-0 overflow-hidden opacity-20">
        {codeRain.map((drop) => (
          <div
            key={drop.id}
            className="absolute text-green-500 text-sm animate-fall"
            style={{
              left: `${drop.left}%`,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
            }}
          >
            {drop.char}
          </div>
        ))}
      </div>

      {/* Grid background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Content wrapper */}
      <div className="relative z-20">
        {/* Floating Navigation */}
        <nav
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 z-50 ${
            scrollY > 50 ? "w-11/12 max-w-5xl" : "w-11/12 max-w-6xl"
          }`}
        >
          <div className="bg-black/80 backdrop-blur-xl rounded-lg border-2 border-green-500/50 shadow-2xl shadow-green-500/20">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-green-500 font-bold">
                  ~/fouad-portfolio
                </span>
              </div>

              <div className="hidden md:flex space-x-6">
                {["home", "about", "skills", "projects", "contact"].map(
                  (section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`capitalize transition-all duration-300 ${
                        activeSection === section
                          ? "text-green-500"
                          : "text-gray-400 hover:text-green-500"
                      }`}
                    >
                      {"<"}
                      {section}
                      {" />"}
                    </button>
                  )
                )}
              </div>

              <button
                className="md:hidden text-green-500"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 bg-black/90 backdrop-blur-xl rounded-lg border-2 border-green-500/50 overflow-hidden">
              {["home", "about", "skills", "projects", "contact"].map(
                (section, index) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left px-6 py-4 capitalize hover:bg-green-500/10 transition-all border-b border-green-500/20 last:border-b-0"
                  >
                    <span className="text-green-500">{">"}</span> {section}
                  </button>
                )
              )}
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-4 pt-24"
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div
              id="hero-text"
              data-animate
              className={`space-y-6 transition-all duration-1000 ${
                visibleElements.has("hero-text")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
              <div className="flex items-center gap-2 text-green-500">
                <Terminal className="w-5 h-5" />
                <span className="text-sm">const developer = {"{"}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight pl-6">
                <span className="text-gray-500">name:</span>
                <span className="text-white"> "Fouad</span>
                <span className="block text-green-500 animate-pulse">
                  Kamildeen-Aransi"
                </span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed pl-6">
                <span className="text-gray-500">role:</span>{" "}
                <span className="text-white">"Frontend Developer"</span>,<br />
                <span className="text-gray-500">passion:</span>{" "}
                <span className="text-white">
                  "Building digital experiences"
                </span>
              </p>
              <div className="pl-6 text-gray-500">{"}"}</div>
              <button
                onClick={() => scrollToSection("projects")}
                className="bg-green-500 text-black px-8 py-4 rounded font-bold transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 inline-flex items-center gap-2 ml-6"
              >
                <Code2 className="w-5 h-5" />
                view_projects()
              </button>
            </div>

            {/* Headshot with code frame */}
            <div
              id="hero-image"
              data-animate
              className={`relative transition-all duration-1000 delay-300 ${
                visibleElements.has("hero-image")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute -inset-4 border-2 border-green-500/30 rounded-lg"></div>
                <div className="relative bg-black border-2 border-green-500 rounded-lg p-6">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="aspect-square bg-gray-900 rounded flex items-center justify-center border border-green-500/50 overflow-hidden">
                    <img
                      src="/src/assets/pic6.jpg"
                      alt="Fouad Kamildeen-Aransi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4 text-green-500 text-sm">
                    <span className="text-gray-500">{">"}</span> ./headshot.jpg
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-black px-3 py-1 text-xs rounded">
                  ONLINE
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="max-w-4xl">
            <h2
              id="about-title"
              data-animate
              className={`text-5xl md:text-6xl font-bold mb-12 transition-all duration-1000 ${
                visibleElements.has("about-title")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
            >
              <span className="text-green-500">{"<about>"}</span>
            </h2>
            <div
              id="about-content"
              data-animate
              className={`bg-black border-2 border-green-500/50 rounded-lg p-8 md:p-12 shadow-2xl shadow-green-500/20 transition-all duration-1000 delay-200 ${
                visibleElements.has("about-content")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
            >
              <div className="space-y-4 text-lg">
                <p className="text-gray-400">
                  <span className="text-green-500">01</span>{" "}
                  <span className="text-white">{"{"}</span>
                </p>
                <p className="text-gray-300 pl-8">
                  With{" "}
                  <span className="text-green-500 font-bold">2+ years</span> of
                  experience crafting digital experiences, I help businesses
                  stand out online through websites that don't just look
                  beautiful—they{" "}
                  <span className="text-green-500">work harder</span> for you.
                </p>
                <p className="text-white pl-8">{"}"}</p>
                <p className="text-gray-400">
                  <span className="text-green-500">02</span>{" "}
                  <span className="text-white">{"{"}</span>
                </p>
                <p className="text-gray-300 pl-8">
                  Whether you need to boost conversions, establish credibility,
                  or scale your online presence, I deliver{" "}
                  <span className="text-green-500">
                    responsive, fast-loading
                  </span>{" "}
                  websites optimized for every device. Your success is measured
                  in results:{" "}
                  <span className="text-green-500">
                    more leads, more sales, more growth
                  </span>
                  .
                </p>
                <p className="text-white pl-8">{"}"}</p>
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mt-6">
              <span className="text-green-500">{"</about>"}</span>
            </h2>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="max-w-6xl w-full">
            <h2
              id="skills-title"
              data-animate
              className={`text-5xl md:text-6xl font-bold mb-12 transition-all duration-1000 ${
                visibleElements.has("skills-title")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
            >
              <span className="text-green-500">const</span> skills = [
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  id={`skill-${index}`}
                  data-animate
                  className={`bg-black border-2 border-green-500/50 p-6 rounded-lg hover:border-green-500 transition-all transform hover:scale-110 hover:shadow-2xl hover:shadow-green-500/20 text-center ${
                    visibleElements.has(`skill-${index}`)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-20"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-16 h-16 mx-auto mb-4"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-lg hidden items-center justify-center">
                    <span className="text-2xl text-green-500">
                      {skill.name[0]}
                    </span>
                  </div>
                  <p className="font-bold text-white text-sm">"{skill.name}"</p>
                </div>
              ))}
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mt-12">
              <span className="text-green-500">];</span>
            </h2>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="max-w-7xl w-full">
            <h2
              id="projects-title"
              data-animate
              className={`text-5xl md:text-6xl font-bold mb-12 transition-all duration-1000 ${
                visibleElements.has("projects-title")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
            >
              <span className="text-green-500">{"<projects>"}</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  id={`project-${index}`}
                  data-animate
                  className={`bg-black border-2 border-green-500/50 rounded-lg overflow-hidden hover:border-green-500 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 ${
                    visibleElements.has(`project-${index}`)
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-20"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="border-b-2 border-green-500/50 p-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-green-500 ml-2">
                      {project.title.toLowerCase().replace(/\s+/g, "-")}.js
                    </span>
                  </div>

                  {/* Screenshot placeholder */}
                  <div className="h-48 bg-gray-900 flex items-center justify-center border-b-2 border-green-500/20">
                    <img src={project.screenshot} alt="" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-green-500">
                      function{" "}
                      <span className="text-white">
                        {project.title.replace(/\s+/g, "")}()
                      </span>{" "}
                      {"{"}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed text-sm pl-4">
                      <span className="text-gray-500">//</span>{" "}
                      {project.description}
                    </p>

                    <div className="mb-4 p-3 bg-green-500/5 rounded border border-green-500/30 pl-4">
                      <p className="text-xs text-green-500 mb-1">
                        return {"{"}features: [
                      </p>
                      <p className="text-xs text-gray-300 pl-4">
                        "{project.businessValue}"
                      </p>
                      <p className="text-xs text-green-500">]{"}"}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4 pl-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs border border-green-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="text-white mb-4 pl-4">{"}"}</p>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors pl-4"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">view_live()</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mt-12">
              <span className="text-green-500">{"</projects>"}</span>
            </h2>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="max-w-4xl w-full">
            <h2
              id="contact-title"
              data-animate
              className={`text-5xl md:text-6xl font-bold mb-8 transition-all duration-1000 ${
                visibleElements.has("contact-title")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
            >
              <span className="text-green-500">function</span>{" "}
              <span className="text-white">getInTouch()</span> {"{"}
            </h2>
            <div
              id="contact-content"
              data-animate
              className={`bg-black border-2 border-green-500/50 rounded-lg p-12 shadow-2xl shadow-green-500/20 transition-all duration-1000 delay-200 ${
                visibleElements.has("contact-content")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
            >
              <p className="text-xl text-gray-300 mb-8 text-center">
                <span className="text-gray-500">return</span>{" "}
                <span className="text-green-500">
                  "Let's build something amazing together"
                </span>
                ;
              </p>
              {/* <div className="grid md:grid-cols-3 gap-6">
                <a href="mailto:officialfarax@gmail.com">
                  <div className="p-6 bg-green-500/5 rounded-lg border border-green-500/30 hover:border-green-500 transition-all text-center">
                    <Mail className="w-8 h-8 text-green-500 mx-auto mb-4" />
                    <span className="text-xs text-gray-500 block mb-2">
                      email:
                    </span>
                    <span className="text-gray-400 text-sm">
                      officialfarax@gmail.com{" "}
                    </span>
                  </div>
                </a>
                <a href="github.com/Farax01">
                  <div className="p-6 bg-green-500/5 rounded-lg border border-green-500/30 hover:border-green-500 transition-all text-center">
                    <Github className="w-8 h-8 text-green-500 mx-auto mb-4" />
                    <span className="text-xs text-gray-500 block mb-2">
                      github:
                    </span>
                    <span className="text-gray-400 text-sm">@Farax01 </span>
                  </div>
                </a>
                <div className="p-6 bg-green-500/5 rounded-lg border border-green-500/30 hover:border-green-500 transition-all text-center">
                  <Linkedin className="w-8 h-8 text-green-500 mx-auto mb-4" />
                  <span className="text-xs text-gray-500 block mb-2">
                    linkedin:
                  </span>
                  <span className="text-gray-400 text-sm">
                    @Fouad Kamildeen-Aransi
                  </span>
                </div>
              </div> */}
              <div className="grid md:grid-cols-3 gap-6">
                <a
                  href="mailto:officialfarax@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="p-6 bg-green-500/5 rounded-lg border border-green-500/30 hover:border-green-500 transition-all text-center">
                    <Mail className="w-8 h-8 text-green-500 mx-auto mb-4" />
                    <span className="text-xs text-gray-500 block mb-2">
                      email:
                    </span>
                    <span className="text-gray-400 text-sm">
                      officialfarax@gmail.com
                    </span>
                  </div>
                </a>
                <a
                  href="https://github.com/Farax01"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="p-6 bg-green-500/5 rounded-lg border border-green-500/30 hover:border-green-500 transition-all text-center">
                    <Github className="w-8 h-8 text-green-500 mx-auto mb-4" />
                    <span className="text-xs text-gray-500 block mb-2">
                      github:
                    </span>
                    <span className="text-gray-400 text-sm">@Farax01</span>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/fouad-kamildeen-aransi-6a24192a3/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="p-6 bg-green-500/5 rounded-lg border border-green-500/30 hover:border-green-500 transition-all text-center">
                    <Linkedin className="w-8 h-8 text-green-500 mx-auto mb-4" />
                    <span className="text-xs text-gray-500 block mb-2">
                      linkedin:
                    </span>
                    <span className="text-gray-400 text-sm">
                      @Fouad Kamildeen-Aransi
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mt-6">
              <span className="text-green-500">{"}"}</span>
            </h2>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t-2 border-green-500/50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-gray-400">
                <span className="text-green-500">©</span> 2025 Fouad
                Kamildeen-Aransi <span className="text-green-500">|</span> Built
                with React & Tailwind
              </div>

              {/* <div className="flex gap-6">
                <a
                  href="github.com/Farax01"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/fouad-kamildeen-aransi-6a24192a3/"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="mailto:officialfarax@gmail.com"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div> */}
              <div className="flex gap-6">
                <a
                  href="https://github.com/Farax01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>

                <a
                  href="https://www.linkedin.com/in/fouad-kamildeen-aransi-6a24192a3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>

                <a
                  href="mailto:officialfarax@gmail.com"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="text-center mt-6 text-green-500 text-sm">
              <Terminal className="w-4 h-4 inline mr-2" />
              <span className="text-gray-500">{">"}</span> Status: Online and
              ready to collaborate
            </div>
          </div>
        </footer>

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-green-500 text-black p-4 rounded-lg shadow-2xl shadow-green-500/50 hover:scale-110 transition-all z-50 border-2 border-green-500"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}
