export default function ProjectCard({ id, img, title, text, tech = [], actions = [] }) {
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
            {tech.map(t => <span className="tech-pill" key={t}>{t}</span>)}
          </div>

          <div className="card-actions rows-2 mt-auto mb-2" aria-label="project actions">
            {actions.map((a, idx) => {
              const isDownload = a.kind === "download" || a.download;
              const btnClass = a.kind === "brand" ? "btn-brand" : "btn-outline-brand";

              return (
                <a
                  key={idx}
                  className={`btn ${btnClass}`}
                  href={a.href}
                  {...(isDownload
                      ? { download: a.filename || "" }          // triggers download
                      : { target: "_blank", rel: "noopener noreferrer" } // open in new tab
                    )
                  }
                >
                  <i className={`${a.icon} me-1`} />{a.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
