document.addEventListener("DOMContentLoaded", () => {
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;
    const calculator = document.querySelector(".calculator");
    const aboutSection = document.getElementById("about-section");
    const calculatorSection = document.getElementById("calculator-section");
    const menuToggle = document.getElementById("menu-toggle");
    const menuDropdown = document.getElementById("menu-dropdown");
    const aboutBtn = document.getElementById("about-btn");
    const calculatorBtn = document.getElementById("calculator-btn");
    const display = document.getElementById("display");
  
    let currentInput = ""; // Current input for the calculator
    let memoryValue = null; // Memory storage variable
  
    // Theme switch functionality
    themeIcon.addEventListener("click", () => {
        if (body.classList.contains("dark")) {
            body.classList.replace("dark", "light-mode");
            calculator.classList.replace("dark", "light-mode");
            themeIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem("theme", "light");
        } else {
            body.classList.replace("light-mode", "dark");
            calculator.classList.replace("light-mode", "dark");
            themeIcon.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem("theme", "dark");
        }
    });
  
    // Menu toggle functionality
    menuToggle.addEventListener("click", () => {
        menuDropdown.style.display = menuDropdown.style.display === "block" ? "none" : "block";
    });
  
    aboutBtn.addEventListener("click", () => {
        aboutSection.style.display = "block";
        calculatorSection.style.display = "none";
        menuDropdown.style.display = "none";
    });
  
    calculatorBtn.addEventListener("click", () => {
        aboutSection.style.display = "none";
        calculatorSection.style.display = "block";
        menuDropdown.style.display = "none";
    });
  
    // Append numbers/operators to display
    window.appendToCalculation = (value) => {
        if (currentInput === "Invalid") currentInput = ""; // Reset on invalid input
        currentInput += value;
        display.innerText = currentInput;
    };
  
    // Calculate the result
    window.computeResult = () => {
        try {
            currentInput = eval(currentInput).toString();
            display.innerText = currentInput;
        } catch (e) {
            display.innerText = "Invalid";
            currentInput = "";
        }
    };
  
    // Clear entire display
    window.clearDisplay = () => {
        currentInput = "";
        display.innerText = "0";
    };
  
    // Clear last character
    window.clearEntry = () => {
        currentInput = currentInput.slice(0, -1);
        display.innerText = currentInput || "0";
    };
  
    // Handle memory functions
    window.handleMemory = (action) => {
        switch (action) {
            case "MC": // Memory Clear
                memoryValue = null;
                console.log("Memory Cleared");
                break;
            case "MR": // Memory Recall
                if (memoryValue !== null) {
                    currentInput = memoryValue.toString();
                    display.innerText = currentInput;
                }
                console.log("Memory Recalled:", memoryValue);
                break;
            case "M+": // Memory Add
                memoryValue = (memoryValue || 0) + parseFloat(currentInput || "0");
                console.log("Memory Added. New Memory Value:", memoryValue);
                break;
            case "M-": // Memory Subtract
                memoryValue = (memoryValue || 0) - parseFloat(currentInput || "0");
                console.log("Memory Subtracted. New Memory Value:", memoryValue);
                break;
            case "MS": // Memory Save
                memoryValue = parseFloat(currentInput || "0");
                console.log("Memory Saved:", memoryValue);
                break;
            case "M": // Display Memory in Console
                console.log("Memory Value:", memoryValue);
                break;
        }
    };
  
    // Convert base (BIN, OCT, HEX)
    window.convertBase = (base) => {
        let num;
  
        try {
            num = parseInt(currentInput, 10);
            if (isNaN(num)) {
                display.innerText = "Invalid";
                currentInput = "";
                return;
            }
        } catch (error) {
            display.innerText = "Invalid";
            currentInput = "";
            return;
        }
  
        switch (base) {
            case "BIN": // Binary
                currentInput = num.toString(2);
                break;
            case "OCT": // Octal
                currentInput = num.toString(8);
                break;
            case "HEX": // Hexadecimal
                currentInput = num.toString(16).toUpperCase();
                break;
            default:
                display.innerText = "Invalid Base";
                return;
        }
        display.innerText = currentInput;
    };
  
    // Delete last input character
    window.deleteLast = () => {
        currentInput = currentInput.slice(0, -1);
        display.innerText = currentInput || "0";
    };
  
    // Handle percentage calculation
    window.calculatePercentage = () => {
        if (currentInput === "") return;
        try {
            currentInput = (parseFloat(currentInput) / 100).toString();
            display.innerText = currentInput;
        } catch (e) {
            display.innerText = "Invalid";
            currentInput = "";
        }
    };
  
    // Handle plus/minus toggle
    window.togglePlusMinus = () => {
        if (currentInput === "") return;
        try {
            currentInput = (parseFloat(currentInput) * -1).toString();
            display.innerText = currentInput;
        } catch (e) {
            display.innerText = "Invalid";
            currentInput = "";
        }
    };
  
    // Function to toggle the memory panel
    function toggleMemoryPanel() {
        const memoryDropdown = document.getElementById('memory-dropdown');
        memoryDropdown.classList.toggle('open'); // Toggle the 'open' class
    }
  
    // Add event listener to the "M" button
    document.querySelector('.memory-dropdown').addEventListener('click', toggleMemoryPanel);
  
  });