export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center gap-3" href="#home">
          <img src="/images/logo2.jpg" alt="logo" className="navbar-brand-logo" />
          <p className="brand-name m-0">Ayako Kaneko</p>
        </a>

        <div className="nav-social d-none d-lg-flex">
          <a href="https://www.linkedin.com/in/ayakokaneko" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <img src="/images/LinkedIn.png" alt="LinkedIn" className="nav-social-img" />
          </a>
          <a href="https://github.com/ayakoneko" target="_blank" rel="noreferrer" aria-label="GitHub">
            <img src="/images/GitHub.png" alt="GitHub" className="nav-social-img" />
          </a>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-label="Open menu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="offcanvas offcanvas-end text-bg-dark" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div className="offcanvas-body">
            <div className="nav-social d-lg-none mb-3">
              <a href="https://www.linkedin.com/in/ayakokaneko" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <img src="/images/LinkedIn.png" alt="LinkedIn" className="nav-social-img" />
              </a>
              <a href="https://github.com/ayakoneko" target="_blank" rel="noreferrer" aria-label="GitHub">
                <img src="/images/GitHub.png" alt="GitHub" className="nav-social-img" />
              </a>
            </div>

            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item"><a className="nav-link active" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#profile">Profile</a></li>

              <li className="nav-item dropdown align-items-center d-flex">
                <a className="nav-link" href="#project" id="projectsLink">Projects</a>
                <button className="btn btn-link nav-link dropdown-toggle dropdown-toggle-split ms-1 p-0" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Open project list"></button>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><a className="dropdown-item project-link" href="#proj-tetris" data-slide-to="0">Tetris Game Clone</a></li>
                  <li><a className="dropdown-item project-link" href="#proj-eventbooking" data-slide-to="0">Event Booking Website</a></li>
                  <li><a className="dropdown-item project-link" href="#proj-timecapsule" data-slide-to="0">Time-capsule Memory System</a></li>
                  <li><a className="dropdown-item project-link" href="#proj-todoist" data-slide-to="0">Todoist Clone</a></li>
                  <li><a className="dropdown-item project-link" href="#proj-portfolio" data-slide-to="1">My Portfolio</a></li>
                  <li><a className="dropdown-item project-link" href="#proj-smarthome" data-slide-to="1">Smart Home Application</a></li>
                  <li><a className="dropdown-item project-link" href="#proj-dicom" data-slide-to="1">DICOM Data Management</a></li>
                  <li><a className="dropdown-item project-link" href="#proj-XRflashcard" data-slide-to="1">XR Flashcard Project</a></li>
                </ul>
              </li>

              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
