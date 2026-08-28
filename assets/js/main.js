/**
 * GorillaTool - Main JavaScript
 * A clean, maintainable JS file for the static site
 */

/* =============================================================================
   EMAILJS SETUP GUIDE
   =============================================================================

   To enable email functionality, follow these steps:

   1. GO TO: https://www.emailjs.com/ and create a free account

   2. ADD EMAIL SERVICE:
      - Dashboard → Email Services → Add New Service
      - Choose your email provider (Gmail, Outlook, etc.)
      - Follow the connection steps
      - Note your SERVICE_ID (e.g., "service_abc123")

   3. CREATE EMAIL TEMPLATES:
      You need 2 templates - one for quotes, one for newsletter:

      QUOTE TEMPLATE:
      - Dashboard → Email Templates → Create New Template
      - Subject: "New Quote Request from {{name}}"
      - Content example:
        ```
        New quote request received:

        Name: {{name}}
        Email: {{email}}
        Company: {{company}}
        Contact: {{contact}}
        Message: {{message}}
        ```
      - Note your TEMPLATE_ID (e.g., "template_quote123")

      NEWSLETTER TEMPLATE:
      - Create another template
      - Subject: "New Newsletter Subscription from {{name}}"
      - Content example:
        ```
        New newsletter subscription:

        Name: {{name}}
        Email: {{email}}
        Company: {{company}}
        ```
      - Note your TEMPLATE_ID (e.g., "template_news456")

   4. GET YOUR PUBLIC KEY:
      - Dashboard → Account → General → Public Key
      - Note your PUBLIC_KEY (e.g., "AbCdEfGhIjKlMnOp")

   5. UPDATE THE CONFIG BELOW:
      Replace the placeholder values with your actual IDs

   ============================================================================= */

// EmailJS Configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: '-0Ytnb58lg5DEuhGY',
    SERVICE_ID: 'service_bldx9hm',
    QUOTE_TEMPLATE_ID: 'template_ez29iok',
    NEWSLETTER_TEMPLATE_ID: 'template_d3c6y4h'
};

(function() {
    'use strict';

    /* =============================================
       EmailJS Initialization
       ============================================= */
    if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('EmailJS initialized successfully');
    } else if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        console.warn('EmailJS: Please configure your credentials in main.js (see EMAILJS SETUP GUIDE)');
    }

    /* =============================================
       DOM Elements
       ============================================= */
    const header = document.querySelector('.site-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navItemsWithDropdown = document.querySelectorAll('.nav-item.has-dropdown');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const quoteModal = document.getElementById('quoteModal');
    const quoteForm = document.getElementById('quoteForm');
    const newsletterModal = document.getElementById('newsletterModal');
    const newsletterForm = document.getElementById('newsletterForm');

    /* =============================================
       Header Scroll Effect
       ============================================= */
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    /* =============================================
       Mobile Menu Toggle
       ============================================= */
    function toggleMobileMenu() {
        mainNav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');

        // Toggle icon
        const icon = mobileMenuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    /* =============================================
       Mobile Dropdown Toggle
       ============================================= */
    function setupMobileDropdowns() {
        navItemsWithDropdown.forEach(item => {
            const link = item.querySelector('a');
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            });
        });
    }

    /* =============================================
       Scroll to Top
       ============================================= */
    function handleScrollToTop() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /* =============================================
       Modal Functions
       ============================================= */
    // Quote Modal
    window.openQuoteModal = function() {
        if (quoteModal) {
            quoteModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeQuoteModal = function() {
        if (quoteModal) {
            quoteModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Newsletter Modal
    window.openNewsletterModal = function() {
        if (newsletterModal) {
            // Pre-fill email if user entered it in the CTA section
            const previewEmail = document.getElementById('newsletter-email-preview');
            const modalEmail = document.getElementById('newsletter-email');
            if (previewEmail && modalEmail && previewEmail.value) {
                modalEmail.value = previewEmail.value;
            }
            newsletterModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeNewsletterModal = function() {
        if (newsletterModal) {
            newsletterModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Close modal on outside click
    function handleModalClick(e) {
        if (e.target === quoteModal) {
            closeQuoteModal();
        }
        if (e.target === newsletterModal) {
            closeNewsletterModal();
        }
    }

    // Close modal on Escape key
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            if (quoteModal && quoteModal.classList.contains('active')) {
                closeQuoteModal();
            }
            if (newsletterModal && newsletterModal.classList.contains('active')) {
                closeNewsletterModal();
            }
        }
    }

    /* =============================================
       Form Handling with EmailJS
       ============================================= */

    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Helper function to send email via EmailJS
    function sendEmailJS(templateId, templateParams, form, closeModalFn, successMessage) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            alert('EmailJS not configured yet.\n\nTo enable email sending:\n1. Go to emailjs.com and create account\n2. Update EMAILJS_CONFIG in main.js\n\nSee setup guide at top of main.js');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, templateId, templateParams)
            .then(function(response) {
                console.log('EmailJS Success:', response.status, response.text);
                alert(successMessage);
                form.reset();
                closeModalFn();
            })
            .catch(function(error) {
                console.error('EmailJS Error:', error);
                alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
    }

    // Quote Form Submit Handler
    function handleQuoteFormSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('quote-name').value.trim();
        const email = document.getElementById('quote-email').value.trim();
        const company = document.getElementById('quote-company').value.trim();
        const contact = document.getElementById('quote-contact').value.trim();
        const message = document.getElementById('quote-message').value.trim();

        // Validate required fields
        if (!name || !email || !company) {
            alert('Please fill in all required fields (Name, Email, Company).');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const templateParams = {
            name: name,
            email: email,
            company: company,
            contact: contact || 'Not provided',
            message: message || 'No message provided'
        };

        sendEmailJS(
            EMAILJS_CONFIG.QUOTE_TEMPLATE_ID,
            templateParams,
            quoteForm,
            closeQuoteModal,
            'Thank you! Your quote request has been sent successfully. We will get back to you soon!'
        );
    }

    // Newsletter Form Submit Handler
    function handleNewsletterFormSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('newsletter-name').value.trim();
        const email = document.getElementById('newsletter-email').value.trim();
        const company = document.getElementById('newsletter-company').value.trim();

        // Validate required fields
        if (!name || !email) {
            alert('Please fill in your name and email.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const templateParams = {
            name: name,
            email: email,
            company: company || 'Not provided'
        };

        sendEmailJS(
            EMAILJS_CONFIG.NEWSLETTER_TEMPLATE_ID,
            templateParams,
            newsletterForm,
            closeNewsletterModal,
            'Thank you for subscribing! You will receive our latest updates and news.'
        );
    }

    /* =============================================
       Swiper Carousels
       ============================================= */
    function initCarousels() {
        // Partners Carousel - Auto-rolling with 5 logos visible
        if (document.querySelector('.partners-carousel')) {
            new Swiper('.partners-carousel', {
                slidesPerView: 5,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                speed: 800,
                grabCursor: true,
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 25,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    },
                },
            });
        }

        // Testimonials Carousel with autoplay
        if (document.querySelector('.testimonials-carousel')) {
            const testimonialsSwiper = new Swiper('.testimonials-carousel', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: false,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                speed: 600,
                effect: 'slide',
                navigation: {
                    nextEl: '.testimonials-next',
                    prevEl: '.testimonials-prev',
                },
                allowTouchMove: true,
                simulateTouch: true,
                on: {
                    reachEnd: function () {
                        // When reaching the end, wait delay time then go to first slide
                        setTimeout(() => {
                            this.slideTo(0, 600);
                        }, 5000);
                    }
                }
            });
        }
    }

    /* =============================================
       Smooth Scroll for Anchor Links
       ============================================= */
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile menu if open
                    if (mainNav.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                }
            });
        });
    }

    /* =============================================
       Search Toggle (placeholder)
       ============================================= */
    function setupSearch() {
        const searchToggle = document.querySelector('.search-toggle');
        if (searchToggle) {
            searchToggle.addEventListener('click', function() {
                // Placeholder - implement search modal/dropdown as needed
                alert('Search functionality coming soon!');
            });
        }
    }

    /* =============================================
       Stats Counter Animation
       ============================================= */
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    const duration = 2000; // Animation duration in ms
                    const start = 0;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Easing function for smooth animation
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(start + (target - start) * easeOut);

                        el.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            el.textContent = target;
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    /* =============================================
       Initialize
       ============================================= */
    function init() {
        // Event Listeners
        window.addEventListener('scroll', function() {
            handleHeaderScroll();
            handleScrollToTop();
        });

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', scrollToTop);
        }

        if (quoteModal) {
            quoteModal.addEventListener('click', handleModalClick);
        }

        if (newsletterModal) {
            newsletterModal.addEventListener('click', handleModalClick);
        }

        if (quoteForm) {
            quoteForm.addEventListener('submit', handleQuoteFormSubmit);
        }

        if (newsletterForm) {
            newsletterForm.addEventListener('submit', handleNewsletterFormSubmit);
        }

        document.addEventListener('keydown', handleEscKey);

        // Initialize components
        setupMobileDropdowns();
        initCarousels();
        setupSmoothScroll();
        setupSearch();
        animateCounters();

        // Initial calls
        handleHeaderScroll();
        handleScrollToTop();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
