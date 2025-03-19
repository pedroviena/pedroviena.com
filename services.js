// Services page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // FAQ toggle functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current FAQ item
      item.classList.toggle('active');
    });
  });
  
  // Testimonial slider functionality
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
  
  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const budget = document.getElementById('budget').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For demonstration, we'll just show an alert
      alert(`Thank you for your inquiry, ${name}! I'll get back to you soon about your project.`);
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Package hover effects
  const packageCards = document.querySelectorAll('.package-card');
  
  packageCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Add a subtle animation to the price
      const price = this.querySelector('.price');
      if (price) {
        price.style.transform = 'scale(1.1)';
        price.style.transition = 'transform 0.3s ease';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      // Reset the animation
      const price = this.querySelector('.price');
      if (price) {
        price.style.transform = 'scale(1)';
      }
    });
  });
  
  // Add animation to service icons on hover
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.service-icon i');
      icon.style.transform = 'scale(1.2) rotate(10deg)';
      icon.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.service-icon i');
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });
  
  // Budget dropdown styling
  const budgetSelect = document.getElementById('budget');
  
  if (budgetSelect) {
    // Add a custom class when the select is focused
    budgetSelect.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    budgetSelect.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  }
});