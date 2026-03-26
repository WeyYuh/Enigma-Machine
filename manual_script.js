// Active link highlighting + smooth scroll + back to top
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.bookmark-link');
    

    // Smooth scroll for sidebar links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // update URL hash without jumping
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });