// ===== NAVBAR & MOBILE MENU =====
let navbar = document.querySelector(".navbar");
let menuLinks = document.getElementById("menuLinks");
let toggleButton = document.querySelector(".toggle-button");

// Toggle mobile menu function
function toggleMenu() {
  const navbarLinks = document.querySelector(".navbar-links");
  navbarLinks.classList.toggle("Show-Menu");
  
  // Add/remove body scroll lock when menu is open
  if (navbarLinks.classList.contains("Show-Menu")) {
    document.body.style.overflow = 'hidden';
    toggleButton.style.transform = 'rotate(180deg)';
  } else {
    document.body.style.overflow = 'auto';
    toggleButton.style.transform = 'rotate(0deg)';
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Close mobile menu when clicking on menu links
  const navLinks = document.querySelectorAll('.navbar-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const navbarLinks = document.querySelector(".navbar-links");
        navbarLinks.classList.remove("Show-Menu");
        document.body.style.overflow = 'auto';
        if (toggleButton) {
          toggleButton.style.transform = 'rotate(0deg)';
        }
      }
    });
  });

  // Close mobile menu when clicking outside navbar
  document.addEventListener('click', (e) => {
    const navbarLinks = document.querySelector(".navbar-links");
    if (!navbar.contains(e.target) && navbarLinks.classList.contains("Show-Menu")) {
      navbarLinks.classList.remove("Show-Menu");
      document.body.style.overflow = 'auto';
      if (toggleButton) {
        toggleButton.style.transform = 'rotate(0deg)';
      }
    }
  });

  // Handle window resize to reset mobile menu
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      const navbarLinks = document.querySelector(".navbar-links");
      navbarLinks.classList.remove("Show-Menu");
      document.body.style.overflow = 'auto';
      if (toggleButton) {
        toggleButton.style.transform = 'rotate(0deg)';
      }
    }
  });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== FORM VALIDATION =====
function validateForm() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var subject = document.getElementById("subject").value.trim();
  var message = document.getElementById("message").value.trim();

  // Email validation function
  function isValidEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    return pattern.test(email);
  }

  // Check if all fields are filled
  if (name === "" || email === "" || subject === "" || message === "") {
    showAlert("All fields must be filled out", "error");
    return false;
  }

  // Validate name (at least 2 characters, only letters and spaces)
  if (name.length < 2 || !/^[a-zA-Z\s]+$/.test(name)) {
    showAlert("Please enter a valid name (at least 2 characters, letters only)", "error");
    return false;
  }

  // Validate email
  if (!isValidEmail(email)) {
    showAlert("Please enter a valid email address", "error");
    return false;
  }

  // Validate subject (at least 5 characters)
  if (subject.length < 5) {
    showAlert("Subject must be at least 5 characters long", "error");
    return false;
  }

  // Validate message (at least 10 characters)
  if (message.length < 10) {
    showAlert("Message must be at least 10 characters long", "error");
    return false;
  }

  // If all validations pass
  showAlert("Thank you! Your message has been submitted successfully.", "success");
  return true;
}

// ===== CUSTOM ALERT FUNCTION =====
function showAlert(message, type) {
  // Remove existing alerts
  const existingAlert = document.querySelector('.custom-alert');
  if (existingAlert) {
    existingAlert.remove();
  }

  // Create alert element
  const alertDiv = document.createElement('div');
  alertDiv.className = `custom-alert custom-alert-${type}`;
  alertDiv.innerHTML = `
    <div class="custom-alert-content">
      <span class="custom-alert-icon">${type === 'success' ? '✓' : '⚠'}</span>
      <span class="custom-alert-message">${message}</span>
      <button class="custom-alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;

  // Add styles
  alertDiv.style.cssText = `
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10000;
    min-width: 300px;
    max-width: 500px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
    animation: slideDown 0.3s ease;
  `;

  // Add to body
  document.body.appendChild(alertDiv);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentElement) {
      alertDiv.style.animation = 'slideUp 0.3s ease';
      setTimeout(() => alertDiv.remove(), 300);
    }
  }, 5000);
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.service > div, .port, .core, .info-item');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// ===== FORM ENHANCEMENT =====
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact form');
  const inputs = document.querySelectorAll('#contact input, #contact textarea');
  
  // Add floating label effect
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (input.value === '') {
        input.parentElement.classList.remove('focused');
      }
    });
    
    // Check if input has value on page load
    if (input.value !== '') {
      input.parentElement.classList.add('focused');
    }
  });
  
  // Handle form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm()) {
        // Reset form after successful validation
        setTimeout(() => {
          form.reset();
          inputs.forEach(input => {
            input.parentElement.classList.remove('focused');
          });
        }, 2000);
      }
    });
  }
});

// ===== ADD CSS ANIMATIONS FOR ALERTS =====
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
  }
  
  .custom-alert-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .custom-alert-icon {
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .custom-alert-message {
    flex: 1;
  }
  
  .custom-alert-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .custom-alert-close:hover {
    opacity: 0.7;
  }
`;
document.head.appendChild(style);