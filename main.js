// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate numbers if it's a stat number
            if (entry.target.querySelector('.stat-number')) {
                animateNumbers(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// Number animation
function animateNumbers(container) {
    const numbers = container.querySelectorAll('.stat-number');
    numbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                num.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                num.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// Select service from button
function selectLayanan(layananName) {
    // Scroll to form
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    
    // Select the service in dropdown
    const select = document.getElementById('layanan');
    select.value = layananName;
    
    // Highlight the card temporarily
    const cards = document.querySelectorAll('.layanan-card');
    cards.forEach(card => {
        if (card.getAttribute('data-layanan') === layananName) {
            card.classList.add('layanan-selected');
            setTimeout(() => {
                card.classList.remove('layanan-selected');
            }, 2000);
        }
    });
    
    // Update price display if exists
    updateHarga();
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Form submission handling
document.getElementById('orderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    const btnText = submitBtn.querySelector('span');
    const btnIcon = submitBtn.querySelector('.fa-paper-plane');
    const alertSuccess = document.getElementById('alertSuccess');
    const alertError = document.getElementById('alertError');
    
    // Show loading
    submitBtn.disabled = true;
    loading.style.display = 'block';
    btnText.style.display = 'none';
    btnIcon.style.display = 'none';
    
    try {
        const formData = new FormData(this);
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alertSuccess.style.display = 'flex';
            alertError.style.display = 'none';
            this.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                alertSuccess.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Submit failed');
        }
    } catch (error) {
        alertError.style.display = 'flex';
        alertSuccess.style.display = 'none';
        
        // Hide error message after 5 seconds
        setTimeout(() => {
            alertError.style.display = 'none';
        }, 5000);
    } finally {
        // Reset button
        submitBtn.disabled = false;
        loading.style.display = 'none';
        btnText.style.display = 'inline';
        btnIcon.style.display = 'inline-block';
    }
});

// Update price estimation based on service
function updateHarga() {
    const layanan = document.getElementById('layanan').value;
    // This function can be expanded to show price estimates dynamically
    console.log('Layanan dipilih:', layanan);
}

// Smooth scroll for navigation links
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

// Form validation enhancement
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.checkValidity()) {
            this.style.borderColor = '#5a8f7b';
        } else if (this.value !== '') {
            this.style.borderColor = '#e53e3e';
        }
    });
});