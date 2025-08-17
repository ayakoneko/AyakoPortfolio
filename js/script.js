<script>
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href').slice(1);
      const slideTo  = Number(link.dataset.slideTo) || 0;

      // Close offcanvas if open (mobile)
      const ocEl = document.getElementById('offcanvasNavbar');
      if (ocEl) {
        const oc = bootstrap.Offcanvas.getInstance(ocEl);
        if (oc) oc.hide();
      }

      // Go to the projects section
      const section = document.getElementById('project');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Show correct slide
      const carouselEl = document.getElementById('projectsCarousel');
      const carousel   = bootstrap.Carousel.getOrCreateInstance(carouselEl, { interval: false, wrap: false });
      carousel.to(slideTo);

      // After slide finishes, center the card
      const scrollToCard = () => {
        const target = document.getElementById(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        carouselEl.removeEventListener('slid.bs.carousel', scrollToCard);
      };
      carouselEl.addEventListener('slid.bs.carousel', scrollToCard);

      // Fallback in case slide was already visible
      setTimeout(scrollToCard, 350);
    });
  });
</script>
