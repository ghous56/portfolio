// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const section = document.querySelector(targetId);

        if (section) {
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.querySelector('.hamburger i').classList.remove('fa-times');
                document.querySelector('.hamburger i').classList.add('fa-bars');
            }

            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.querySelector('i').classList.toggle('fa-bars');
    hamburger.querySelector('i').classList.toggle('fa-times'); // Change icon to 'X'
});

// Close mobile menu when a dropdown item is clicked
document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        }
    });
});

// Highlight active navigation link on scroll (Optional but highly recommended for modern portfolios)
const sections = document.querySelectorAll('section[id]');
const header = document.querySelector('header'); // Get the header element for scroll calculations

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        // Adjust for sticky header height when calculating section top
        const sectionTop = section.offsetTop - header.offsetHeight;
        const sectionHeight = section.clientHeight;
        
        // Add a small offset to ensure the section is well into view before activating
        if (pageYOffset >= sectionTop - 50 && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.querySelectorAll('a').forEach(a => {
        a.classList.remove('active');
        // Check if the href contains the current section ID
        if (a.getAttribute('href') && a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});


// Hero animation - This now mostly relies on CSS animation (fadeInUp)
// Keeping this as a placeholder if more complex JS animation is desired later
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // You can add more complex JS animations here if needed,
        // but the CSS already handles a subtle fade-in and slide-up.
        heroContent.style.opacity = 1; // Ensure it's visible if initial state is hidden by JS
    }
});

// Form submission feedback using Fetch API for a smoother experience
document.querySelector('.feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            form.style.display = 'none'; // Hide the form
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Thank you for your message! I’ll get back to you soon.';
            // Apply inline styles for the success message for quick visibility
            successMessage.style.cssText = `
                color: var(--primary-color);
                font-size: 1.2rem;
                text-align: center;
                padding: 20px;
                border: 1px solid var(--primary-color);
                border-radius: 8px;
                background-color: #e6f7ff; /* A light blue background */
                margin-top: 20px;
            `;
            // Insert the success message before the form
            form.parentNode.insertBefore(successMessage, form);
            form.reset(); // Clear form fields
            
            // Remove the success message and show the form again after a delay
            setTimeout(() => {
                successMessage.remove();
                form.style.display = 'flex'; // Show the form again (flex because it's a column layout)
            }, 5000); // Display for 5 seconds
        } else {
            // Handle HTTP errors
            response.json().then(data => {
                if (Object.hasOwnProperty.call(data, 'errors')) {
                    alert('Error: ' + data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert('Oops! There was a problem submitting your form. Please try again.');
                }
            });
        }
    })
    .catch(error => {
        // Handle network errors
        alert('Oops! A network error occurred while submitting your form. Please check your internet connection.');
        console.error('Form submission error:', error);
    });
});