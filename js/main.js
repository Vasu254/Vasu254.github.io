document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".site-nav");
  const backToTop = document.querySelector(".back-to-top");
  const year = document.querySelector("[data-year]");
  const typing = document.querySelector(".typing-text");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const targetPage = href.split("#")[0] || "index.html";

    if (targetPage === currentPage) {
      link.classList.add("active");
    }

    link.addEventListener("click", () => {
      const menu = document.querySelector(".navbar-collapse.show");
      if (menu && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  const handleScroll = () => {
    if (navbar) {
      navbar.classList.toggle("navbar-scrolled", window.scrollY > 20);
    }

    if (backToTop) {
      backToTop.classList.toggle("show", window.scrollY > 350);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (typing) {
    const roles = [
      "Java Full Stack Developer",
      "Spring Boot Developer",
      "React.js Developer",
      "AI/ML Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const role = roles[roleIndex];
      typing.textContent = deleting
        ? role.slice(0, charIndex - 1)
        : role.slice(0, charIndex + 1);

      charIndex += deleting ? -1 : 1;

      if (!deleting && charIndex === role.length) {
        deleting = true;
        setTimeout(tick, 1300);
        return;
      }

      if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }

      setTimeout(tick, deleting ? 45 : 85);
    };

    tick();
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
});
