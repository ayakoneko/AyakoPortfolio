import { useEffect, useRef, useState } from "react";
import "./styles.css";

// ---- EmailJS credentials ----
const SERVICE_ID = "service_1no5yec";
const TEMPLATE_ID = "template_f1qwtdh";
const PUBLIC_KEY  = "sBQDMMEAstpdLa-wT";

export default function PortfolioApp() {
  // Contact form state
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [alert, setAlert] = useState({ type: "", msg: "", show: false });
  const [sending, setSending] = useState(false);

  // Typing effect
  const typingRef = useRef(null);
  useEffect(() => {
    const el = typingRef.current;
    if (!el) return;
    const words = ["software developer", "full-stack tinkerer", "lifelong learner"];
    let w = 0, i = 0, dir = 1;
    const tick = () => {
      el.textContent = words[w].slice(0, i);
      i += dir;
      if (i > words[w].length + 6) dir = -1;      // pause at end
      if (i < 0) { dir = 1; w = (w + 1) % words.length; }
    };
    const id = setInterval(tick, 80);
    return () => clearInterval(id);
  }, []);

  // EmailJS init
  useEffect(() => {
    try { window.emailjs?.init({ publicKey: PUBLIC_KEY }); } catch {}
  }, []);

  // IntersectionObserver for sticky carousel controls (optional)
  useEffect(() => {
    const wrap = document.querySelector(".projects-carousel-wrap");
    const section = document.querySelector("#project");
    if (!wrap || !section || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) wrap.classList.add("controls-fixed");
        else wrap.classList.remove("controls-fixed");
      });
    }, { threshold: 0.2 });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Jump to a carousel slide + smooth scroll
  const goToProjectsSlide = (index) => {
    const el = document.getElementById("projectsCarousel");
    if (el && Number.isInteger(index)) {
      const carousel = window.bootstrap?.Carousel.getOrCreateInstance(el);
      carousel?.to(index);
    }
    document.getElementById("project")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.website) return; // honeypot
    if (!form.name || !form.email || !form.message) {
      setAlert({ type: "warning", msg: "Please fill in required fields.", show: true });
      setTimeout(() => setAlert(a => ({ ...a, show: false })), 6000);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setAlert({ type: "warning", msg: "Please enter a valid email address.", show: true });
      setTimeout(() => setAlert(a => ({ ...a, show: false })), 6000);
      return;
    }

    try {
      setSending(true);
      await window.emailjs?.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name,
        reply_to: form.email,               
        subject: form.subject || "(No subject)",
        message: form.message,
        page_url: window.location.href,
      });
      setAlert({ type: "success", msg: "Thanks! Your message has been sent.", show: true });
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (err) {
      setAlert({ type: "danger", msg: "Something went wrong. Please try again.", show: true });
    } finally {
      setSending(false);
      setTimeout(() => setAlert(a => ({ ...a, show: false })), 6000);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center gap-3" href="#home">
            <img src="/images/logo2.jpg" alt="logo" className="navbar-brand-logo" />
            <p className="brand-name m-0">Ayako Kaneko</p>
          </a>

          <div className="nav-social d-none d-lg-flex">
            <a href="https://www.linkedin.com/in/ayakokaneko" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="/images/LinkedIn.png" alt="LinkedIn" className="nav-social-img" />
            </a>
            <a href="https://github.com/ayakoneko" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src="/images/GitHub.png" alt="GitHub" className="nav-social-img" />
            </a>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Open menu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body">
              <div className="nav-social d-lg-none mb-3">
                <a href="https://www.linkedin.com/in/ayakokaneko" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <img src="/images/LinkedIn.png" alt="LinkedIn" className="nav-social-img" />
                </a>
                <a href="https://github.com/ayakoneko" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <img src="/images/GitHub.png" alt="GitHub" className="nav-social-img" />
                </a>
              </div>

              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item"><a className="nav-link active" aria-current="page" href="#home">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="#profile">Profile</a></li>

                <li className="nav-item dropdown align-items-center d-flex">
                  <a className="nav-link" href="#project" id="projectsLink">Projects</a>
                  <button className="btn btn-link nav-link dropdown-toggle dropdown-toggle-split ms-1 p-0" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Open project list"></button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li><button className="dropdown-item" onClick={() => goToProjectsSlide(0)}>Tetris Game Clone</button></li>
                    <li><button className="dropdown-item" onClick={() => goToProjectsSlide(0)}>Event Booking Website</button></li>
                    <li><button className="dropdown-item" onClick={() => goToProjectsSlide(0)}>Time-capsule Memory System</button></li>
                    <li><button className="dropdown-item" onClick={() => goToProjectsSlide(0)}>My Portfolio</button></li>
                    <li><button className="dropdown-item" onClick={() => goToProjectsSlide(1)}>Todoist Clone</button></li>
                    <li><button className="dropdown-item" onClick={() => goToProjectsSlide(1)}>Smart Home Application</button></li>
                    <li><button className="dropdown-item" onClick={() => goToProjectsSlide(1)}>DICOM Data Management</button></li>
                    <li><button className="dropdown-item" onClick={() => goToProjectsSlide(1)}>XR Flashcard Project</button></li>
                  </ul>
                </li>

                <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="home" className="hero">
        <img className="hero-img" src="/images/tree5.webp" alt="tree street" />
        <div className="hero-overlay"></div>
        <div className="hero-content text-center">
          <h1 className="hero-title">Ayako Kaneko</h1>
          <p className="hero-subtitle"><span ref={typingRef} className="typing-effect"></span></p>
        </div>
      </header>

      {/* Profile */}
      <section className="py-5 bg-light" id="profile">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12">
              <h2 className="fw-bold mb-3">About Me</h2>
              <p className="lead mx-auto mb-2" style={{ maxWidth: 820 }}>
                Aspiring software developer with experience in full-stack web apps and backend systems using Python, PHP/Laravel, and Java. Currently pursuing a Master of IT (GPA 6.50/7.00) with strengths in algorithms, system design, and OOP. Skilled in clean coding, Git, and agile teamwork, with 5 years in financial services bringing strong project delivery, communication, and collaboration skills.
              </p>
              <a href="https://ayakoneko.github.io/resume/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-brand">
                <i className="fa-solid fa-file-pdf me-2"></i> View Resume
              </a>
              <a href="https://github.com/ayakoneko/resume/raw/main/resume.pdf" download className="btn btn-outline-brand ms-2">
                <i className="fa-solid fa-download me-2"></i> Download Resume
              </a>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-xl-10 mx-auto">
              <div className="row align-items-lg-center gy-4 gx-5">
                {/* Photo */}
                <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-end mb-4 mb-lg-0">
                  <img className="profile_picture" src="/images/kaneko-ayako-08082025.jpg" alt="Ayako Kaneko" />
                </div>

                <div className="col-12 col-lg-8 text-center text-lg-start ps-lg-3">
                  {/* Education */}
                  <h3 className="border-bottom pb-2 mt-5 mb-3"><i className="fas fa-graduation-cap me-2"></i>Education</h3>
                  <div className="ps-lg-3">
                    <div className="mb-3">
                      <p className="mb-1"><strong>Griffith University Gold Coast Campus</strong></p>
                      <p className="text-muted mb-0">Master of Information Technology - Software Development (07/2024 - Present)</p>
                    </div>
                    <div className="mb-3">
                      <p className="mb-1"><strong>State University of New York at Geneseo</strong></p>
                      <p className="text-muted mb-0">Bachelor of Science in Accounting (08/2015 - 12/2018)</p>
                    </div>
                  </div>

                  {/* Work Experience */}
                  <h3 className="border-bottom pb-2 mt-5 mb-3"><i className="fas fa-briefcase me-2"></i>Work Experience</h3>
                  <div className="ps-lg-3">
                    <div className="mb-3">
                      <p className="mb-1"><strong>Insight Business Analytics (Gold Coast, QLD)</strong></p>
                      <p className="text-muted mb-0">IT Business Analyst Intern (11/2024 - 02/2025)</p>
                    </div>
                    <div className="mb-3">
                      <p className="mb-1"><strong>Citibank, N.A., Tokyo Branch</strong></p>
                      <p className="text-muted mb-0">Associate Product Manager & Solution Sales Assistant (06/2018 - 06/2024)</p>
                    </div>
                    <div className="mb-3">
                      <p className="mb-1"><strong>Deloitte Tax LLP</strong></p>
                      <p className="text-muted mb-0">Corporate Tax Intern (06/2017 - 08/2017)</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <div className="middle-container" id="project">
        <section className="container-fluid py-5" style={{ backgroundColor: "#e9ecef" }}>
          <div className="container">
            <div className="row text-center mb-3">
              <div className="col">
                <h2 className="font-weight-bold" id="projects_anchor">PROJECTS</h2>
              </div>
            </div>

            <div className="projects-carousel-wrap position-relative">
              <div id="projectsCarousel" className="carousel slide pb-5" data-bs-ride="false">
                <div className="carousel-indicators position-static mt-3">
                  <button type="button" data-bs-target="#projectsCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#projectsCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                </div>

                <div className="carousel-inner">
                  {/* Page 1 */}
                  <div className="carousel-item active">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
                      <ProjectCard id="proj-tetris" img="/images/Tetris.png" title="Tetris Game Clone" text="Desktop clone of Tetris implemented with clear MVC separation and robust game loop." tech={["Java", "MVC", "OOP"]} actions={[
                        { kind: "brand", href: "https://www.youtube.com/shorts/iusKhrHulPc", label: "Demo", icon: "fa-solid fa-video" },
                        { kind: "outline", href: "https://github.com/Cedou90/G11_OOSD_Tetris_Game", label: "Code", icon: "fa-brands fa-github" },
                      ]} />

                      <ProjectCard id="proj-eventbooking" img="/images/EventBookingPHP.png" title="Event Booking System with Laraval" text="Website for event booking with 2 user types (organizer/attendee)." tech={["PHP", "Laravel", "SQLite"]} actions={[
                        { kind: "outline", href: "https://github.com/ayakoneko/EventBookingLaravel", label: "Code", icon: "fa-brands fa-github" },
                      ]} />

                      <ProjectCard id="proj-timecapsule" img="/images/Time-capsule.png" title="Time-capsule Memory System" text="Encrypted messages unlock when a countdown ends. Custom SVG typewriter keyboard for a playful UX." tech={["React", "SVG", "Crypto"]} actions={[
                        { kind: "brand", href: "https://cache-to-the-future.vercel.app/", label: "Link", icon: "fa-solid fa-arrow-up-right-from-square" },
                        { kind: "outline", href: "https://github.com/mrjwei/cache-to-the-future", label: "Code", icon: "fa-brands fa-github" },
                      ]} />

                      <ProjectCard id="proj-portfolio" img="/images/Portfolio.png" title="My Portfolio" text="Responsive portfolio with projects, contact form (EmailJS) and Bootstrap layout." tech={["HTML", "CSS", "JavaScript", "Bootstrap"]} actions={[
                        { kind: "brand", href: "https://ayakoneko.github.io/AyakoPortfolio/", label: "Link", icon: "fa-solid fa-arrow-up-right-from-square" },
                        { kind: "outline", href: "https://github.com/ayakoneko/AyakoPortfolio", label: "Code", icon: "fa-brands fa-github" },
                      ]} />
                    </div>
                  </div>

                  {/* Page 2 */}
                  <div className="carousel-item">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">                    
                      <ProjectCard id="proj-todoist" img="/images/ComingSoon.png" title="Todoist Clone" text="Task management clone focusing on clean API design and pragmatic UX." tech={["Golang", "JavaScript", "PostgreSQL"]} actions={[
                        { kind: "outline", href: "https://github.com/ayakoneko/TodoistClone", label: "Code", icon: "fa-brands fa-github" },
                      ]} />
                      
                      <ProjectCard id="proj-smarthome" img="/images/SmartHome.png" title="Smart Home Application" text="Modular smart-home concept: requirements, use-cases, and secure architecture." tech={["UML", "Use Cases"]} actions={[
                        { kind: "brand", href: "/files/SmartHome-UseCase-Design.pdf", label: "View", icon: "fa-solid fa-file-pdf" },
                        { kind: "outline", href: "/files/SmartHome-UseCase-Design.pdf", label: "Download", icon: "fa-solid fa-download" },
                      ]} />

                      <ProjectCard id="proj-dicom" img="/images/DICOM.png" title="DICOM Data Management" text="Design for scalable medical-imaging data storage and retrieval workflows." tech={["Figma", "System Design"]} />

                      <ProjectCard id="proj-XRflashcard" img="/images/Unity.png" title="XR Flashcard Project" text="Augmented reality learning app with 3D anatomy, narration, and quizzes." tech={["Unity", "C#", "AR"]} actions={[
                        { kind: "brand", href: "https://www.youtube.com/shorts/P--j27ir2gs", label: "Demo", icon: "fa-solid fa-video" },
                      ]} />
                    </div>
                  </div>
                </div>

                <button className="carousel-control-prev projects-outside" type="button" data-bs-target="#projectsCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next projects-outside" type="button" data-bs-target="#projectsCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Contact */}
      <section className="container-fluid py-5 last-container" id="contact">
        <div className="container">
          <div className="row text-center mb-4">
            <div className="col">
              <h2 className="fw-bold" id="contact_anchor">CONTACT</h2>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Left: contact info */}
            <div className="col-12 col-lg-5">
              <div className="contact-card h-100 text-center">
                <h4 className="mb-3">Get in Touch</h4>
                <p className="text-muted small">Feel free to reach out for collaboration or just a friendly hello.</p>

                <div className="socials d-flex justify-content-center align-items-center gap-4 flex-nowrap">
                  <a className="btn btn-outline-brand btn-icon" href="https://www.linkedin.com/in/ayakokaneko" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a className="btn btn-outline-brand btn-icon" href="https://github.com/ayakoneko" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a className="btn btn-outline-brand btn-icon" href="mailto:ayako.kaneko1997@gmail.com" aria-label="Email">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: message form */}
            <div className="col-12 col-lg-7">
              <div className="contact-card">
                <h4 className="mb-3">Message Me</h4>
                <div id="contactAlert" className={`alert ${alert.show ? "" : "d-none"} alert-${alert.type}`} role="alert" aria-live="polite">
                  {alert.msg}
                </div>

                <form id="contactForm" onSubmit={onSubmit} noValidate>
                  <input type="text" name="website" id="website" className="d-none" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />

                  <div className="mb-3">
                    <label className="form-label visually-hidden" htmlFor="cName">Your Name</label>
                    <input id="cName" name="name" type="text" className="form-control contact-input" placeholder="Your Name*" required value={form.name} onChange={onChange} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label visually-hidden" htmlFor="cEmail">Your Email</label>
                    <input id="cEmail" name="email" type="email" className="form-control contact-input" placeholder="Your Email*" required value={form.email} onChange={onChange} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label visually-hidden" htmlFor="cSubject">Subject</label>
                    <input id="cSubject" name="subject" type="text" className="form-control contact-input" placeholder="Subject" value={form.subject} onChange={onChange} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label visually-hidden" htmlFor="cMessage">Your Message</label>
                    <textarea id="cMessage" name="message" rows={4} className="form-control contact-input" placeholder="Your Message*" required value={form.message} onChange={onChange}></textarea>
                  </div>

                  <button className="btn btn-send btn-outline-brand d-inline-flex align-items-center gap-2" type="submit" disabled={sending}>
                    {sending && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                    <i className="fa-solid fa-paper-plane"></i>{sending ? " Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white py-1">
        <div className="container text-center">
          <p>© 2025 Ayako Kaneko - All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function ProjectCard({ id, img, title, text, tech = [], actions = [] }) {
  return (
    <div className="col" id={id}>
      <div className="card card-projects h-100">
        <div className="ratio ratio-16x9 card-thumb overflow-hidden">
          <img src={img} alt={title} className="card-thumb-img" />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>

          <div className="tech-list mb-2">
            {tech.map((t) => (
              <span className="tech-pill" key={t}>{t}</span>
            ))}
          </div>

          <div className="card-actions rows-2 mt-auto mb-2" aria-label="project actions">
            {actions.map((a, idx) => (
              <a key={idx} className={`btn ${a.kind === "brand" ? "btn-brand" : "btn-outline-brand"}`} href={a.href} target="_blank" rel="noopener noreferrer">
                <i className={`${a.icon} me-1`}></i>{a.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
