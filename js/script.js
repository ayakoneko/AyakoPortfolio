//project carousel page - smooth-scroll from dropdown menu
document.querySelectorAll('.dropdown-item.project-link').forEach(a => {
  a.addEventListener('click', () => {
    const slideTo = Number(a.dataset.slideTo);
    const carouselEl = document.querySelector('#projectsCarousel');
    if (carouselEl && Number.isInteger(slideTo)) {
      const carousel = bootstrap.Carousel.getOrCreateInstance(carouselEl);
      carousel.to(slideTo);
    }
    document.getElementById('project')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Project carousel page for smaller screen size
(function(){
    const wrap = document.querySelector('.projects-carousel-wrap');
    const section = document.querySelector('#project');
    if (!wrap || !section) return;

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if (e.isIntersecting) {
          wrap.classList.add('controls-fixed');
        } else {
          wrap.classList.remove('controls-fixed');
        }
      });
    }, { threshold: 0.2 });

    io.observe(section);
  })();

// Message me form submission (with EmailJS)
const SERVICE_ID = "service_1no5yec";
const TEMPLATE_ID = "template_f1qwtdh";
const PUBLIC_KEY  = "sBQDMMEAstpdLa-wT"; 

(function() {
  try {
    emailjs.init({ publicKey: PUBLIC_KEY });
  } catch (e) {
    console.error("EmailJS init failed:", e);
  }
})();

const $ = (sel) => document.querySelector(sel);

function showAlert(type, message) {
  const alertBox = $("#contactAlert");
  alertBox.className = `alert alert-${type}`;
  alertBox.textContent = message;
  alertBox.classList.remove("d-none");
  setTimeout(() => alertBox.classList.add("d-none"), 6000);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = $("#contactForm");
  const btn  = form.querySelector("button[type='submit']");
  const nameInput = $("#cName");
  const emailInput = $("#cEmail");
  const subjectInput = $("#cSubject");
  const messageInput = $("#cMessage");
  const honeypot = $("#website");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot: if filled, bail silently
    if (honeypot && honeypot.value.trim() !== "") {
      return;
    }

    // Basic validation
    const from_name = nameInput.value.trim();
    const from_email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!from_name || !from_email || !message) {
      showAlert("warning", "Please fill in your name, email, and message.");
      return;
    }
    if (!validateEmail(from_email)) {
      showAlert("warning", "Please enter a valid email address.");
      return;
    }

    // Disable while sending
    btn.disabled = true;
    btn.classList.add("disabled");
    const originalBtnHtml = btn.innerHTML;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...`;

    // Build template params
    const templateParams = {
      from_name,
      from_email,
      subject: subject || "(No subject)",
      message,
      page_url: window.location.href
    };

    try {
      const resp = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      // Success
      form.reset();
      showAlert("success", "Thanks! Your message has been sent.");
      console.log("EmailJS response:", resp);
    } catch (err) {
      console.error("EmailJS error:", err);
      showAlert(
        "danger",
        "Sorry, something went wrong sending your message. Please try again later or email me directly."
      );
    } finally {
      btn.disabled = false;
      btn.classList.remove("disabled");
      btn.innerHTML = originalBtnHtml;
    }
  });
});


