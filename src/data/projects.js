export const projectPages = [
  // page 0
  [
    {
      id: "proj-tetris",
      img: "/images/Tetris.png",
      title: "Tetris Game Clone",
      text: "Desktop clone of Tetris implemented with clear MVC separation and robust game loop.",
      tech: ["Java", "MVC", "OOP"],
      actions: [
        { kind: "brand", href: "https://www.youtube.com/shorts/iusKhrHulPc", label: "Demo", icon: "fa-solid fa-video" },
        { kind: "outline", href: "https://github.com/Cedou90/G11_OOSD_Tetris_Game", label: "Code", icon: "fa-brands fa-github" }
      ]
    },
    {
      id: "proj-eventbooking",
      img: "/images/EventBookingPHP.png",
      title: "Event Booking System with Laraval",
      text: "Website for event booking with 2 user types (organizer/attendee).",
      tech: ["PHP", "Laravel", "SQLite"],
      actions: [{ kind: "outline", href: "https://github.com/ayakoneko/EventBookingLaravel", label: "Code", icon: "fa-brands fa-github" }]
    },
    {
      id: "proj-timecapsule",
      img: "/images/Time-capsule.png",
      title: "Time-capsule Memory System",
      text: "Encrypted messages unlock when a countdown ends. Custom SVG typewriter keyboard for a playful UX.",
      tech: ["React", "SVG", "Crypto"],
      actions: [
        { kind: "brand", href: "https://cache-to-the-future.vercel.app/", label: "Link", icon: "fa-solid fa-arrow-up-right-from-square" },
        { kind: "outline", href: "https://github.com/ayakoneko/Cache-to-the-Future", label: "Code", icon: "fa-brands fa-github" }
      ]
    },
    {
      id: "proj-todoist",
      img: "/images/ComingSoon.png",
      title: "Todoist Clone",
      text: "Task management clone focusing on clean API design and pragmatic UX.",
      tech: ["Golang", "JavaScript", "PostgreSQL"],
      actions: [{ kind: "outline", href: "https://github.com/ayakoneko/TodoistClone", label: "Code", icon: "fa-brands fa-github" }]
    }
  ],
  // page 1
  [
    {
      id: "proj-portfolio",
      img: "/images/Portfolio.png",
      title: "My Portfolio",
      text: "Responsive portfolio with projects, contact form (EmailJS) and Bootstrap layout.",
      tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      actions: [
        { kind: "brand", href: "https://ayakoneko.github.io/AyakoPortfolio/", label: "Link", icon: "fa-solid fa-arrow-up-right-from-square" },
        { kind: "outline", href: "https://github.com/ayakoneko/AyakoPortfolio", label: "Code", icon: "fa-brands fa-github" }
      ]
    },
    {
      id: "proj-smarthome",
      img: "/images/SmartHome.png",
      title: "Smart Home Application",
      text: "Modular smart-home concept: requirements, use-cases, and secure architecture.",
      tech: ["UML", "Use Cases"],
      actions: [
        { kind: "brand", href: "/files/SmartHome-UseCase-Design.pdf", label: "View", icon: "fa-solid fa-file-pdf" },
        { kind: "outline", href: "/files/SmartHome-UseCase-Design.pdf", label: "Download", icon: "fa-solid fa-download" }
      ]
    },
    {
      id: "proj-dicom",
      img: "/images/DICOM.png",
      title: "DICOM Data Management",
      text: "Design for scalable medical-imaging data storage and retrieval workflows.",
      tech: ["Figma", "System Design"]
    },
    {
      id: "proj-XRflashcard",
      img: "/images/Unity.png",
      title: "XR Flashcard Project",
      text: "Augmented reality learning app with 3D anatomy, narration, and quizzes.",
      tech: ["Unity", "C#", "AR"],
      actions: [{ kind: "brand", href: "https://www.youtube.com/shorts/P--j27ir2gs", label: "Demo", icon: "fa-solid fa-video" }]
    }
  ]
];
