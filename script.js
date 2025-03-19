// Mouse move effect
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
  const mouseEffect = document.getElementById('mouse-move-effect');
  
  document.addEventListener('mousemove', function(event) {
    const x = event.clientX;
    const y = event.clientY;
    
    mouseEffect.style.background = `radial-gradient(600px at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  });
  
  // For mobile devices, disable the effect
  if (window.innerWidth < 768) {
    mouseEffect.style.display = 'none';
  }
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth < 768) {
      mouseEffect.style.display = 'none';
    } else {
      mouseEffect.style.display = 'block';
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  
  // Preloader
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', function() {
    setTimeout(function() {
      preloader.classList.add('hidden');
    }, 500);
  });
  
  // Custom cursor
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', function(e) {
      const posX = e.clientX;
      const posY = e.clientY;
      
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '1';
      
      cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
      cursorOutline.style.transform = `translate(${posX}px, ${posY}px)`;
      
      // Mouse move effect
      const mouseEffect = document.getElementById('mouse-move-effect');
      mouseEffect.style.background = `radial-gradient(600px at ${posX}px ${posY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
    });
    
    // Change cursor on clickable elements
    const clickables = document.querySelectorAll('a, button, .btn, .filter-btn, .project-card, .blog-card');
    clickables.forEach(element => {
      element.addEventListener('mouseenter', function() {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.borderColor = 'var(--primary)';
      });
      
      element.addEventListener('mouseleave', function() {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.borderColor = 'var(--primary)';
      });
    });
  } else {
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
  }
  
  // Scroll progress indicator
  window.addEventListener('scroll', function() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    scrollProgress.style.width = progress + '%';
    
    // Add scrolled class to navbar
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  });
  
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
  
  mobileMenuToggle.addEventListener('click', function() {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  mobileNavClose.addEventListener('click', function() {
    mobileNav.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
  
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    
    // Save theme preference to localStorage
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.remove('dark');
  }
  
  // Typewriter effect
  const typewriterElement = document.querySelector('.typewriter');
  if (typewriterElement) {
    const textArray = JSON.parse(typewriterElement.getAttribute('data-text'));
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    
    function type() {
      const currentText = textArray[textIndex];
      
      if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
      } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 1500; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typingDelay = 500; // Pause before typing next word
      }
      
      setTimeout(type, typingDelay);
    }
    
    setTimeout(type, 1000);
  }
  
  // Project filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Testimonial slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  let currentSlide = 0;
  
  function showSlide(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    testimonialSlides[index].classList.add('active');
    testimonialDots[index].classList.add('active');
  }
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
      showSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', function() {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    });
    
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
    
    // Auto slide
    setInterval(function() {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    }, 5000);
  }
  
  // Animated counters
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(function() {
      current += step;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
  
  // Intersection Observer for counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(number => {
    counterObserver.observe(number);
  });
  
  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For demonstration, we'll just show an alert
      alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  
  if (backToTop) {
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});