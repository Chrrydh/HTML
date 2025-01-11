let memory = 0; // Memory storage
let history = []; // History storage
let currentOperator = null; // Current operator

const display = document.getElementById("display");

// Append a number or operator to the display
function appendNumber(number) {
    if (display.value === "0") display.value = "";
    display.value += number;
}

// Append a decimal point
function appendPeriod() {
    if (!display.value.includes(".")) {
        display.value += ".";
    }
}

// Clear the entire display
function clearAll() {
    display.value = "0";
    currentOperator = null;
}

// Clear the last entry
function clearEntry() {
    display.value = display.value.slice(0, -1) || "0";
}

// Backspace function
function backspace() {
    display.value = display.value.slice(0, -1) || "0";
}

// Set the current operator
function setOperator(operator) {
    if (display.value !== "") {
        currentOperator = operator;
        display.value += ` ${operator} `;
    }
}

// Calculate the result
function calculate() {
    try {
        // Handle percentages in expressions
        const formattedExpression = display.value.replace(/(\d+)%/g, (match, percentage) => {
            const parts = display.value.split(" ");
            if (parts.length === 3 && !isNaN(parts[0])) {
                const baseValue = parseFloat(parts[0]);
                return `(${baseValue} * ${percentage} / 100)`;
            }
            return `(${percentage} / 100)`;
        });

        const result = eval(formattedExpression.replace("×", "*").replace("÷", "/"));
        
        // Save to history
        history.push(`${display.value} = ${result}`);
        updateHistory();

        display.value = result;
    } catch (error) {
        alert("Invalid expression");
        display.value = "";
    }
}

// Percentage computation (appends % without immediate calculation)
function calculatePercentage() {
    let value = display.value.trim();
    if (!value.endsWith("%")) {
        display.value += "%";
    }
}

// Toggle the sign of the current number
function toggleNegative() {
    let value = display.value.trim();

    if (!value.includes(" ")) {
        // Single number: toggle its sign
        if (value === "0") return; // Don't toggle sign for zero
        display.value = value.startsWith("-") ? value.slice(1) : `-${value}`;
    } else {
        // Expression: toggle the last number only
        const parts = value.split(" ");
        const lastIndex = parts.length - 1;

        if (!isNaN(parts[lastIndex]) && parts[lastIndex] !== "0") {
            parts[lastIndex] = parts[lastIndex].startsWith("-")
                ? parts[lastIndex].slice(1)
                : `-${parts[lastIndex]}`;
        }

        display.value = parts.join(" ");
    }
}

// Memory functions
function memoryClear() {
    memory = 0;
    alert("Memory Cleared");
}

function memoryRecall() {
    display.value = memory;
}

function memoryAdd() {
    memory += parseFloat(display.value || 0);
}

function memorySubtract() {
    memory -= parseFloat(display.value || 0);
}

function memorySave() {
    memory = parseFloat(display.value || 0);
    alert(`Memory Saved: ${memory}`);
}

function memoryShow() {
    alert(`Memory: ${memory}`);
}

// Conversion functions
function convertToBinaryMode() {
    const number = parseInt(display.value || 0, 10);
    display.value = number.toString(2);
}

function convertToOctalMode() {
    const number = parseInt(display.value || 0, 10);
    display.value = number.toString(8);
}

function convertToHexMode() {
    const number = parseInt(display.value || 0, 10);
    display.value = number.toString(16).toUpperCase();
}

// About Section
function displayAboutSection() {
    const aboutSection = document.getElementById("about-section");
    aboutSection.style.display = "flex";
}

function closeAboutSection() {
    const aboutSection = document.getElementById("about-section");
    aboutSection.style.display = "none";
}

// History Section
function showHistorySection() {
    const historySection = document.getElementById("history-section");
    const historyList = document.getElementById("history-list");

    // Populate the history list
    historyList.innerHTML = history
        .map(item => `<li>${item}</li>`)
        .join("");

    // Show the history section
    historySection.style.display = "flex";
}

function closeHistorySection() {
    const historySection = document.getElementById("history-section");
    historySection.style.display = "none";
}

function clearHistory() {
    history = [];
    updateHistory();
    alert("History Cleared");
}

// Update history dynamically
function updateHistory() {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = history
        .map(item => `<li>${item}</li>`)
        .join("");
}

// Minimize Calculator
function minimizeCalculator() {
    const calculatorContainer = document.querySelector(".container");
    calculatorContainer.style.display = "none";
    setTimeout(() => {
        alert("Calculator minimized. Refresh to bring it back.");
    }, 100);
}

// Toggle Enlarge/Restore Calculator
let isEnlarged = false;
function toggleEnlargeCalculator() {
    const calculatorContainer = document.querySelector(".container");
    if (!isEnlarged) {
        calculatorContainer.style.width = "600px";
    } else {
        calculatorContainer.style.width = "400px";
    }
    isEnlarged = !isEnlarged;
}

// Exit Calculator
function exitCalculator() {
    const calculatorContainer = document.querySelector(".container");
    calculatorContainer.remove();
    alert("Calculator closed.");
}