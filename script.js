// Update year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Simple form submission (client-side only for demo)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    const status = document.getElementById('form-status');

    if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields.';
        status.style.color = '#e74c3c';
        return;
    }

    // Simulate sending
    status.textContent = 'Message sent! I will get back to you soon.';
    status.style.color = '#27ae60';
    this.reset();
});

// Optional: Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});