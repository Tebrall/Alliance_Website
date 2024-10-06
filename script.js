document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation (Hamburger Menu)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        hamburger.classList.toggle('active');
    });

    // Smooth Scroll for Navigation Links
    const links = document.querySelectorAll('.main-nav a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('.main-header').offsetHeight,
                    behavior: 'smooth'
                });
            }

            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                hamburger.classList.remove('active');
            }
        });
    });

    // Hide Navbar on Scroll Down
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down, hide the navbar
            header.style.top = '-100px';
        } else {
            // Scrolling up, show the navbar
            header.style.top = '0';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll values
    });

    // Show greeting bubble when King of Alliance image comes into view
    const kingImage = document.getElementById('king-image');
    const kingGreeting = document.getElementById('king-greeting');

    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const kingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                kingGreeting.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    kingObserver.observe(kingImage);
});
