export default function Profile() {
  return (
    <section className="py-5 bg-light" id="profile">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <h2 className="fw-bold mb-3">About Me</h2>
            <p className="lead mx-auto mb-2" style={{ maxWidth: 820 }}>
              Aspiring software developer with experience in full-stack web apps and backend systems using Python, PHP/Laravel, and Java. Currently pursuing a Master of IT with strengths in algorithms, system design, and OOP. Skilled in clean coding, Git, and agile teamwork, with 5 years in financial services bringing strong project delivery, communication, and collaboration skills.
            </p>
            <a href="https://ayakoneko.github.io/resume/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-brand">
              <i className="fa-solid fa-file-pdf me-2" /> View Resume
            </a>
            <a href="https://github.com/ayakoneko/resume/raw/main/resume.pdf" download className="btn btn-outline-brand ms-2">
              <i className="fa-solid fa-download me-2" /> Download Resume
            </a>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-xl-10 mx-auto">
            <div className="row align-items-lg-center gy-4 gx-5">
              <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-end mb-4 mb-lg-0">
                <img className="profile_picture" src="/images/kaneko-ayako-08082025.jpg" alt="Ayako Kaneko" />
              </div>

              <div className="col-12 col-lg-8 text-center text-lg-start ps-lg-3">
                <h3 className="border-bottom pb-2 mt-5 mb-3"><i className="fas fa-graduation-cap me-2" />Education</h3>
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

                <h3 className="border-bottom pb-2 mt-5 mb-3"><i className="fas fa-briefcase me-2" />Work Experience</h3>
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
  );
}
