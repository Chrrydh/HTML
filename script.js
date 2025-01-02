// Select the calculator container
const calculatorContainer = document.querySelector('.container');

// Minimize Calculator
function minimizeCalculator() {
    calculatorContainer.style.display = 'none'; // Hides the calculator
    setTimeout(() => {
        alert("Calculator minimized. Refresh the page to bring it back.");
    }, 100);
}

// Toggle Enlarge/Restore Calculator
let isEnlarged = false; // Tracks whether the calculator is enlarged or not
function toggleEnlargeCalculator() {
    if (!isEnlarged) {
        calculatorContainer.style.width = '600px'; // Enlarged width
        calculatorContainer.style.height = 'auto'; // Adjust height to fit content
    } else {
        calculatorContainer.style.width = '360px'; // Default width
        calculatorContainer.style.height = 'auto'; // Default height
    }
    isEnlarged = !isEnlarged; // Toggle state
}

// Exit Calculator
function exitCalculator() {
    calculatorContainer.remove(); // Removes the calculator from the DOM
    alert("Calculator closed.");
}

// Menu Overlay Elements
const menuOverlay = document.getElementById('menu-overlay');
const closeMenuButton = document.getElementById('close-menu');

// About Section Elements
const aboutSection = document.getElementById('about-section');
const closeAboutButton = document.getElementById('close-about');

// Open the menu overlay
function openMenu() {
    menuOverlay.style.display = 'flex'; // Show the menu overlay
}

// Close the menu overlay
closeMenuButton.addEventListener('click', () => {
    menuOverlay.style.display = 'none'; // Hide the menu overlay
});

// Close menu by clicking outside the menu box
menuOverlay.addEventListener('click', (event) => {
    if (event.target === menuOverlay) {
        menuOverlay.style.display = 'none'; // Hide the menu
    }
});

// Show the About Section
function showAboutSection() {
    menuOverlay.style.display = 'none'; // Close the menu
    aboutSection.style.display = 'flex'; // Show the About Section
}

// Close the About Section
closeAboutButton.addEventListener('click', () => {
    aboutSection.style.display = 'none'; // Hide the About Section
});
