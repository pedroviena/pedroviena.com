// Links page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      // Here you would typically send the email to a server
      // For demonstration, we'll just show an alert
      alert(`Thank you for subscribing with ${email}! You'll receive our latest articles in your inbox.`);
      
      // Reset form
      newsletterForm.reset();
    });
  }
  
  // Add hover effect for link items
  const linkItems = document.querySelectorAll('.link-item');
  
  linkItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      // Add a subtle animation to the icon
      const icon = this.querySelector('.link-icon i');
      icon.style.transform = 'scale(1.2)';
      
      // After a short delay, return to normal
      setTimeout(() => {
        icon.style.transform = 'scale(1)';
      }, 300);
    });
  });
  
  // Add click tracking (for analytics purposes)
  linkItems.forEach(item => {
    item.addEventListener('click', function() {
      const linkText = this.querySelector('.link-text span').textContent;
      console.log(`Link clicked: ${linkText}`);
      
      // Here you would typically send this data to an analytics service
      // For demonstration, we'll just log to console
    });
  });
  
  // Add copy to clipboard functionality for the page URL
  const profileSection = document.querySelector('.profile-section');
  
  if (profileSection) {
    // Create a "Share" button
    const shareButton = document.createElement('button');
    shareButton.className = 'share-button';
    shareButton.innerHTML = '<i class="fas fa-share-alt"></i> Share this page';
    
    // Insert after social icons
    const socialIcons = document.querySelector('.profile-social');
    socialIcons.parentNode.insertBefore(shareButton, socialIcons.nextSibling);
    
    // Add click event
    shareButton.addEventListener('click', function() {
      const pageUrl = window.location.href;
      
      // Check if the Web Share API is available
      if (navigator.share) {
        navigator.share({
          title: 'Pedro Viena - Links',
          url: pageUrl
        }).then(() => {
          console.log('Thanks for sharing!');
        }).catch(console.error);
      } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(pageUrl).then(() => {
          // Show a temporary message
          const message = document.createElement('div');
          message.className = 'copy-message';
          message.textContent = 'Link copied to clipboard!';
          document.body.appendChild(message);
          
          // Remove after 2 seconds
          setTimeout(() => {
            message.classList.add('fade-out');
            setTimeout(() => {
              document.body.removeChild(message);
            }, 300);
          }, 2000);
        }).catch(console.error);
      }
    });
  }
  
  // Add CSS for the share button and copy message
  const style = document.createElement('style');
  style.textContent = `
    .share-button {
      background-color: var(--card);
      border: none;
      border-radius: var(--radius);
      padding: 0.5rem 1rem;
      margin-top: 1rem;
      cursor: pointer;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 1rem auto 0;
      transition: all var(--transition-fast);
    }
    
    .share-button:hover {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }
    
    .copy-message {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--primary);
      color: var(--primary-foreground);
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius);
      font-size: 0.875rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      animation: fadeIn 0.3s ease-out;
    }
    
    .copy-message.fade-out {
      opacity: 0;
      transition: opacity 0.3s ease-out;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translate(-50%, 20px);
      }
      to {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }
  `;
  document.head.appendChild(style);
});