import { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { projectPages } from "../../data/projects";

export default function Projects() {
  useEffect(() => {
    // dropdown → scroll + slide
    const links = document.querySelectorAll(".dropdown-item.project-link");
    const onClick = (e) => {
      const a = e.currentTarget;
      const slideTo = Number(a.dataset.slideTo);
      const el = document.querySelector("#projectsCarousel");
      if (el && Number.isInteger(slideTo)) {
        const carousel = window.bootstrap?.Carousel.getOrCreateInstance(el);
        carousel?.to(slideTo);
      }
      document.getElementById("project")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    links.forEach(a => a.addEventListener("click", onClick));
    return () => links.forEach(a => a.removeEventListener("click", onClick));
  }, []);

  useEffect(() => {
    // fix outside controls when section in view
    const wrap = document.querySelector(".projects-carousel-wrap");
    const section = document.querySelector("#project");
    if (!wrap || !section) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => wrap.classList.toggle("controls-fixed", e.isIntersecting));
    }, { threshold: 0.2 });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <div className="middle-container" id="project">
      <section className="container-fluid py-5" style={{ backgroundColor: "#e9ecef" }}>
        <div className="container">
          <div className="row text-center mb-3">
            <div className="col"><h2 className="font-weight-bold" id="projects_anchor">PROJECTS</h2></div>
          </div>

          <div className="projects-carousel-wrap position-relative">
            <div id="projectsCarousel" className="carousel slide pb-5" data-bs-ride="false">
              <div className="carousel-indicators position-static mt-3">
                {projectPages.map((_, i) => (
                  <button key={i} type="button" data-bs-target="#projectsCarousel" data-bs-slide-to={i} className={i===0?"active":""} aria-label={`Slide ${i+1}`} aria-current={i===0?"true":undefined}></button>
                ))}
              </div>

              <div className="carousel-inner">
                {projectPages.map((items, i) => (
                  <div className={`carousel-item ${i===0?"active":""}`} key={i}>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
                      {items.map(p => <ProjectCard key={p.id} {...p} />)}
                    </div>
                  </div>
                ))}
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
  );
}
