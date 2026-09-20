// ==========================================
// PORTFOLIO INTERACTIVE LOGIC & ANIMATIONS
// Nitin Sehgal - Full Stack Web Developer (2+ YOE)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const cvBtn = document.querySelector("#cvBtn");
  const contactForm = document.querySelector("#contactForm");
  const bar = document.querySelector("#bar");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu li a");
  const navbarHeader = document.querySelector(".navbar-wrapper");
  const revealElements = document.querySelectorAll(".reveal");

  // CV Download Button Action
  if (cvBtn) {
    cvBtn.addEventListener("click", () => {
      window.open(
        'https://drive.google.com/file/d/1-8alknuMWQ7jMo02-CG102mpcanln04R/view?usp=drive_link',
        '_blank'
      );
    });
  }

  // Mobile Menu Drawer Toggle
  if (bar && navMenu) {
    bar.addEventListener("click", () => {
      navMenu.classList.toggle("showData");
      if (navMenu.classList.contains("showData")) {
        bar.className = "fa-solid fa-xmark";
      } else {
        bar.className = "fa-solid fa-bars";
      }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("showData");
        bar.className = "fa-solid fa-bars";
      });
    });
  }

  // Navbar Sticky & Blur Effect on Scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbarHeader?.classList.add("scrolled");
    } else {
      navbarHeader?.classList.remove("scrolled");
    }

    // Active Section Indicator Update
    updateActiveNavLink();
  });

  // Intersection Observer for Scroll Reveal Animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Optionally unobserve if one-shot animation is desired
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // Active Nav Link Scroll Tracker
  const sections = document.querySelectorAll("section[id], header[id]");

  function updateActiveNavLink() {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${currentSectionId}` || (currentSectionId === "home" && href === "#home")) {
        link.classList.add("active");
      }
    });
  }

  function triggerForm(){
    document.querySelector('#Email').focus();
    document.querySelector('.showTextForContact').innerText='Please fill out the required details in the Form to view Contact.'
    setTimeout((e)=>{
      document.querySelector('.showTextForContact').innerText='*'
    },6000)
  }
  document.querySelector("#showContact").addEventListener("click", triggerForm);
  // Contact Form Handling & Validation
  if (contactForm)contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.querySelector("#Email");
    const messageInput = document.querySelector("#Message");

    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!email || !message) {
        alert("Please fill in all required fields (*).");
        return;
    }

    let formSent=false
    try {
        const response = await fetch(
            "https://portfolio-nitin.onrender.com/api/contact",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    message
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        alert("Thank you for your message, Nitin will get back to you shortly!");
        formSent=true
        document.querySelector("#showContact").innerText='+91 9068054660';
        document.querySelector("#showContact").href=`tel:+919068054660`;
        contactForm.reset();

    } catch (error) {
        console.error(error);

        alert("Unable to send your message. Please try again.");
    }
});
});