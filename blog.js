// Blog specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Blog search functionality
  const searchInput = document.getElementById('blog-search-input');
  const blogPosts = document.querySelectorAll('.blog-post-card');
  
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      
      blogPosts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        const content = post.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(post.querySelectorAll('.post-tag')).map(tag => tag.textContent.toLowerCase());
        
        const isMatch = title.includes(searchTerm) || 
                        content.includes(searchTerm) || 
                        tags.some(tag => tag.includes(searchTerm));
        
        if (isMatch) {
          post.style.display = 'block';
          setTimeout(() => {
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
          }, 100);
        } else {
          post.style.opacity = '0';
          post.style.transform = 'translateY(20px)';
          setTimeout(() => {
            post.style.display = 'none';
          }, 300);
        }
      });
    });
  }
  
  // Blog filter functionality
  const filterBtns = document.querySelectorAll('.blog-filters .filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      blogPosts.forEach(post => {
        const categories = post.getAttribute('data-category');
        
        if (filter === 'all' || categories.includes(filter)) {
          post.style.display = 'block';
          setTimeout(() => {
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
          }, 100);
        } else {
          post.style.opacity = '0';
          post.style.transform = 'translateY(20px)';
          setTimeout(() => {
            post.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
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
  
  // Pagination functionality
  const paginationLinks = document.querySelectorAll('.pagination-numbers a');
  const paginationPrev = document.querySelector('.pagination-prev');
  const paginationNext = document.querySelector('.pagination-next');
  
  if (paginationLinks.length > 0) {
    paginationLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        paginationLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Get page number
        const page = parseInt(this.textContent);
        
        // Enable/disable prev/next buttons
        if (page === 1) {
          paginationPrev.classList.add('disabled');
        } else {
          paginationPrev.classList.remove('disabled');
        }
        
        if (page === paginationLinks.length) {
          paginationNext.classList.add('disabled');
        } else {
          paginationNext.classList.remove('disabled');
        }
        
        // Scroll to top of blog posts
        document.querySelector('.blog-posts-grid').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Here you would typically load new posts via AJAX
        // For demonstration, we'll just show an alert
        console.log(`Loading page ${page}`);
      });
    });
    
    // Previous page button
    if (paginationPrev) {
      paginationPrev.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (this.classList.contains('disabled')) return;
        
        // Find current active page
        const activePage = document.querySelector('.pagination-numbers a.active');
        const currentPage = parseInt(activePage.textContent);
        const prevPage = currentPage - 1;
        
        if (prevPage >= 1) {
          // Click the previous page link
          document.querySelector(`.pagination-numbers a:nth-child(${prevPage})`).click();
        }
      });
    }
    
    // Next page button
    if (paginationNext) {
      paginationNext.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (this.classList.contains('disabled')) return;
        
        // Find current active page
        const activePage = document.querySelector('.pagination-numbers a.active');
        const currentPage = parseInt(activePage.textContent);
        const nextPage = currentPage + 1;
        
        if (nextPage <= paginationLinks.length) {
          // Click the next page link
          document.querySelector(`.pagination-numbers a:nth-child(${nextPage})`).click();
        }
      });
    }
  }
});