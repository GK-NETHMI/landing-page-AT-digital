// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu functionality
    initializeMobileMenu();
    
    // FAQ functionality
    initializeFAQ();
    
    // Smooth scrolling for navigation links
    initializeSmoothScrolling();
    
});

// Mobile Menu Functions
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle aria-expanded for accessibility
            const isExpanded = !mobileMenu.classList.contains('hidden');
            mobileMenuButton.setAttribute('aria-expanded', isExpanded);
            
            // Change icon based on menu state
            const icon = mobileMenuButton.querySelector('svg path');
            if (isExpanded) {
                // Change to X icon
                icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            } else {
                // Change back to hamburger
                icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                
                // Reset icon to hamburger
                const icon = mobileMenuButton.querySelector('svg path');
                icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenuButton.focus();
            }
        });
    }
}

// FAQ Functions
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = question.querySelector('.faq-icon');
            const iconPath = icon.querySelector('path');
            const span = question.querySelector('span');
            const isOpen = !answer.classList.contains('hidden');

            // Reset all
            faqQuestions.forEach(function(otherQuestion) {
                const otherItem = otherQuestion.parentElement;
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherQuestion.querySelector('.faq-icon');
                const otherIconPath = otherIcon.querySelector('path');
                const otherSpan = otherQuestion.querySelector('span');
                otherAnswer.classList.add('hidden');
                otherIcon.classList.remove('text-white');
                otherIcon.classList.add('text-gray-500');
                otherSpan.classList.remove('text-indigo-600');
                otherSpan.classList.remove('underline');
                otherSpan.classList.remove('cursor-pointer');
                otherIconPath.setAttribute('d', 'M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z');
            });

            // Set active
            if (!isOpen) {
                answer.classList.remove('hidden');
                icon.classList.remove('text-gray-500');
                icon.classList.add('text-indigo-600');
                span.classList.add('text-indigo-600');
                span.classList.add('cursor-pointer');
                // Optionally add underline: span.classList.add('underline');
                iconPath.setAttribute('d', 'M4 10h12a1 1 0 110 2H4a1 1 0 110-2z');
            }
        });

        // Keyboard support
        question.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                question.click();
            }
        });
    });
}

// Smooth Scrolling Functions
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Header scroll effect
function initializeHeaderEffects() {
    const header = document.querySelector('nav');
    
    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 100) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    }, 10));
}

initializeHeaderEffects();

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('image-placeholder');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(function(img) {
        imageObserver.observe(img);
    });
}

// Performance monitoring
function trackPerformance() {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    });
}


trackPerformance();

// Error handling for images
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(function(img) {
        img.addEventListener('error', function() {
            // Replace with placeholder or fallback
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNS41IDQwSDY0LjVWNjBIMzUuNVY0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
            this.alt = 'Image not available';
        });
    });
}


handleImageErrors();
