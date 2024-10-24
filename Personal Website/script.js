let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Toggle the menu icon and navbar visibility
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');  // Toggle between the 'menu' and 'X' icon
    navbar.classList.toggle('active');  // Show or hide the navbar
};

/*========= scroll section active link logic =========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let header = document.querySelector('.header');

window.onscroll = () => { 
    let top = window.scrollY; // Declare the top variable to track the scroll position

    // Sticky navbar logic
    header.classList.toggle('sticky', top > 100);


    // Scroll section active link logic
    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*="' + id + '"]').classList.add('active');
            });
        }
    });
};


/*========= dark light mode =========*/
let darkModeIcon = document.querySelector('#darkMode-icon');

// Toggle dark mode and icon change
darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun'); // Toggle to sun icon
    document.body.classList.toggle('bx-sun')
    darkModeIcon.classList.toggle('bx-moon'); // Toggle to moon icon

    // Add or remove dark mode class from the body or main container
    document.body.classList.toggle('dark-mode'); // Change this to the appropriate class for dark mode
};


/*========= scroll reveal =========*/
ScrollReveal({ 
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
 });

 // Reveal elements
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content  h1, .about-img img',{ origin: 'left' });
ScrollReveal().reveal('.home-content  h3, .home-content p,  .about-content',{ origin: 'right' });