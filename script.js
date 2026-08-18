// Update year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !email || !subject || !message) {
                showStatus('Please fill in all fields.', 'error');
                return;
            }

            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showStatus('Please enter a valid email address.', 'error');
                return;
            }

            // Show submitting state
            showStatus('Sending your message...', 'info');
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span> <span class="loader"></span>';

            // Simulate API call (in real implementation, you'd send to Formspree, Getform, or your own backend)
            setTimeout(() => {
                // Simulate success
                showStatus('Message sent successfully! I will get back to you within 24 hours.', 'success');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 1500);
        });
    }

    // Function to show status messages
    function showStatus(message, type) {
        statusEl.textContent = message;
        statusEl.className = '';

        if (type === 'error') {
            statusEl.style.color = '#e53e3e';
        } else if (type === 'success') {
            statusEl.style.color = '#38a169';
        } else if (type === 'info') {
            statusEl.style.color = '#3182ce';
        } else {
            statusEl.style.color = '#4a5568';
        }

        statusEl.style.display = 'block';

        // Auto-hide after 5 seconds for non-error messages
        if (type !== 'error') {
            setTimeout(() => {
                statusEl.style.display = 'none';
            }, 5000);
        }
    }

    // Add loader CSS if not exists
    if (!document.querySelector('.loader')) {
        const style = document.createElement('style');
        style.textContent = `
            .loader {
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 2px solid #fff;
                border-top-color: transparent;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
                vertical-align: middle;
                margin-left: 8px;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav links on scroll (if we had a navbar)
    // This is preparatory code for if we add a navbar later
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 100; // Offset for header height

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop &&
                scrollPosition < section.offsetTop + section.offsetHeight) {
                const id = section.getAttribute('id');
                // We would add active class to corresponding nav link here
                // document.querySelector(`nav a[href="#${id}"]`)?.classList.add('active');
            }
        });
    });

    // Add subtle animations on scroll for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in-up');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    // Check for elements on initial load and on scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Add CSS for animations if not present
    if (!document.querySelector('#animation-css')) {
        const style = document.createElement('style');
        style.id = 'animation-css';
        style.textContent = `
            .animate__animated {
                animation-duration: 0.8s;
                animation-fill-mode: both;
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translate3d(0, 40px, 0);
                }
                to {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add hover effect to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add click effect to project cards for better feedback
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px)';
        });

        item.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });

    // Optional: Add a simple tooltip for social icons in footer
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        const platform = icon.getAttribute('aria-label');
        if (platform) {
            icon.title = platform;
        }
    });
});

// Function to debounce resize events for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Re-check layout on resize (for responsive adjustments)
window.addEventListener('resize', debounce(function() {
    // You could add responsive-specific logic here if needed
}, 250));