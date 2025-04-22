document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    setupMobileNav();
    
    // Carousel Functionality
    setupCarousel();
    
    // Slope Simulator
    setupSlopeSimulator();
    
    // FAQ Accordion
    setupFAQ();
    
    // Contact Form
    setupContactForm();
});

// Mobile Navigation Functions
function setupMobileNav() {
    const header = document.querySelector('header .header-container');
    const nav = document.querySelector('nav ul');
    
    // Create menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    header.appendChild(menuToggle);
    
    // Create close button for mobile nav
    const closeNav = document.createElement('button');
    closeNav.className = 'nav-close';
    closeNav.innerHTML = '<i class="fas fa-times"></i>';
    nav.appendChild(closeNav);
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        nav.classList.add('active');
    });
    
    // Close mobile menu
    closeNav.addEventListener('click', function() {
        nav.classList.remove('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
}

// Carousel Functions
function setupCarousel() {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselNav = document.querySelector('.carousel-nav');
    
    // Exit if carousel elements don't exist
    if (!carousel || !prevBtn || !nextBtn || !carouselNav) return;
    
    const slides = carousel.querySelectorAll('img');
    const slideCount = slides.length;
    let currentSlide = 0;
    
    // Create carousel navigation dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        carouselNav.appendChild(dot);
    });
    
    // Update carousel display
    function updateCarousel() {
        // Update slides
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update navigation dots
        const dots = carouselNav.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance carousel
    const autoAdvance = setInterval(nextSlide, 5000);
    
    // Pause auto-advance on hover
    carousel.parentElement.addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
    });
    
    // Touch support for carousel
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        } else if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
}

// Slope Simulator Functions
// Replace the existing setupSlopeSimulator function in your JavaScript file
function setupSlopeSimulator() {
    const verticalSlider = document.getElementById('vertical-slope-slider');
    const horizontalSlider = document.getElementById('horizontal-slope-slider');
    const greenSurface = document.querySelector('.green-surface');
    const resetButton = document.querySelector('.reset-simulator');
    const ball = document.querySelector('.ball');
    
    // Exit if simulator elements don't exist
    if (!verticalSlider || !horizontalSlider || !greenSurface || !ball) return;
    
    // Function to update the slope and ball position
    function updateSlope() {
        const verticalValue = verticalSlider.value;
        const horizontalValue = horizontalSlider.value;
        
        // Calculate rotation values (max 10 degrees for each axis)
        const rotateX = (verticalValue / 100) * 5; // Vertical tilt (positive = uphill)
        const rotateY = (horizontalValue / 100) * 5; // Horizontal tilt (positive = right break)
        
        // Apply 3D transforms to create the slope effect
        greenSurface.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Calculate ball position based on slope
        // For more realistic physics, ball moves more on steeper slopes
        const ballX = 50 + (horizontalValue / 5); // Horizontal movement
        const ballY = 20 + (verticalValue / -5); // Vertical movement (negative because down = higher Y value)
        
        // Apply position change to ball
        ball.style.left = `${ballX}%`;
        ball.style.top = `${ballY}px`;
        
        // Change ball shadow based on slope for better visual effect
        const shadowX = horizontalValue / 20;
        const shadowY = verticalValue / -20;
        ball.style.boxShadow = `${shadowX}px ${shadowY}px 4px rgba(0, 0, 0, 0.3)`;
    }
    
    // Event listeners for slider changes
    verticalSlider.addEventListener('input', updateSlope);
    horizontalSlider.addEventListener('input', updateSlope);
    
    // Reset button functionality
    resetButton.addEventListener('click', function() {
        verticalSlider.value = 0;
        horizontalSlider.value = 0;
        updateSlope();
    });
    
    // Initialize with flat surface
    updateSlope();
}

// FAQ Accordion Functions
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Toggle current item
            item.classList.toggle('active');
            
            // If the item is active, show the answer with animation
            if (item.classList.contains('active')) {
                answer.style.display = 'block';
                
                // If using a screen reader or prefers-reduced-motion, skip animation
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (!prefersReducedMotion) {
                    answer.style.maxHeight = '0';
                    setTimeout(() => {
                        answer.style.transition = 'max-height 0.3s ease';
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }, 10);
                }
            } else {
                answer.style.display = 'none';
            }
        });
    });
    
    // Open first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        if (firstAnswer) {
            firstAnswer.style.display = 'block';
        }
    }
}

// Contact Form Functions
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Form would normally send to server here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Calculate header height to account for sticky header
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add class to header when scrolling
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    // Debounce resize events
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Reset carousel position on resize
        const carousel = document.querySelector('.carousel');
        const carouselNav = document.querySelector('.carousel-nav');
        if (carousel && carouselNav) {
            const activeDot = carouselNav.querySelector('.carousel-dot.active');
            if (activeDot) {
                const index = Array.from(carouselNav.children).indexOf(activeDot);
                carousel.style.transform = `translateX(-${index * 100}%)`;
            }
        }
    }, 250);
});

// Check if CSS is properly loaded, add fallback if not
window.addEventListener('load', function() {
    setTimeout(function() {
        const header = document.querySelector('header');
        if (getComputedStyle(header).position !== 'sticky') {
            // Add fallback for browsers that don't support position: sticky
            header.style.position = 'fixed';
            header.style.width = '100%';
            document.body.style.paddingTop = header.offsetHeight + 'px';
        }
    }, 100);
});