// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out',
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Terminal Logic
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

// Reusable typing animation function
function typeText(text, callback) {
    let charIndex = 0;
    const typingSpeed = 30; // Speed of typing in milliseconds

    function type() {
        if (charIndex < text.length) {
            terminalOutput.innerHTML += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            terminalOutput.innerHTML += "<br>";
            if (callback) callback();
        }
    }

    // Start typing animation
    type();
}

// Disable input while typing
function disableInput() {
    terminalInput.disabled = true;
}

// Enable input after typing is done
function enableInput() {
    terminalInput.disabled = false;
    terminalInput.focus();
}

const commands = {
    help: () => {
        const helpText = `Available commands:
    - help: Show this help message
    - about: Learn more about WinniePat
    - projects: View my projects
    - neofetch: Display system information
    - cowsay <message>: Make a cow say something
    - fortune: Get a random fortune
    - matrix: Simulate the Matrix code rain
    - date: Show the current date and time
    - echo <message>: Repeat your message
    - weather: Get the weather forecast (simulated)
    - dice: Roll a 6-sided dice
    - rps: Play Rock, Paper, Scissors
    - banner <message>: Display a large ASCII art banner
    - clear: Clear the terminal
    - quit: Close the terminal`;

        disableInput();
        typeText(helpText, enableInput);
        return ""; // Return empty string to avoid immediate output
    },
    about: () => {
        const aboutText = `WinniePat is a passionate developer and Minecraft enthusiast. 
    Explore my portfolio to learn more about my work!`;
        disableInput();
        typeText(aboutText, enableInput);
        return "";
    },
    projects: () => {
        const projectsText = `Check out my projects:
    - Minecraft Events
    - Coding Basics
    - Project 3`;
        disableInput();
        typeText(projectsText, enableInput);
        return "";
    },
    neofetch: () => {
        const neofetchText = `user@winniepat
    ------------
    OS: WinniePat Portfolio
    Host: Web Browser
    Kernel: JavaScript
    Uptime: Since you opened this page
    Shell: Custom Terminal
    Resolution: ${window.screen.width}x${window.screen.height}
    Theme: Hacker Green
    Icons: Material Icons`;
        disableInput();
        typeText(neofetchText, enableInput);
        return "";
    },
    cowsay: (message) => {
        if (!message) return "Usage: cowsay <message>";
        const cowsayText = `
 ${"_".repeat(message.length + 2)}
< ${message} >
 ${"-".repeat(message.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
        disableInput();
        typeText(cowsayText, enableInput);
        return "";
    },
    fortune: () => {
        const fortunes = [
            "You will have a great day!",
            "The code is strong with you.",
            "Stay curious, and you'll find the answers.",
            "A bug is just a misunderstood feature.",
            "Your future is as bright as your terminal.",
            "Keep coding, and you'll unlock the secrets of the universe."
        ];
        const fortuneText = fortunes[Math.floor(Math.random() * fortunes.length)];
        disableInput();
        typeText(fortuneText, enableInput);
        return "";
    },
    matrix: () => {
        // Clear the terminal
        terminalOutput.innerHTML = '';

        // Add Matrix animation
        const matrixAnimation = document.createElement('div');
        matrixAnimation.classList.add('matrix-animation');
        terminalOutput.appendChild(matrixAnimation);

        // Create Matrix code rain
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const numStreams = 50; // Number of vertical streams
        const streamLength = 20; // Number of characters per stream

        for (let i = 0; i < numStreams; i++) {
            const stream = document.createElement('div');
            stream.classList.add('matrix-stream');
            stream.style.left = `${Math.random() * 100}%`;
            stream.style.animationDuration = `${Math.random() * 5 + 5}s`;
            stream.style.animationDelay = `${Math.random() * 2}s`;

            for (let j = 0; j < streamLength; j++) {
                const span = document.createElement('span');
                span.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
                stream.appendChild(span);
            }

            matrixAnimation.appendChild(stream);
        }

        // Stop the animation after 10 seconds
        setTimeout(() => {
            matrixAnimation.remove();
            terminalOutput.innerHTML += "> Matrix simulation ended.<br>";
        }, 10000);

        disableInput();
        typeText("> Entering the Matrix...", enableInput);
        return "";
    },
    date: () => {
        const now = new Date();
        const dateText = `Current date and time: ${now.toLocaleString()}`;
        disableInput();
        typeText(dateText, enableInput);
        return "";
    },
    echo: (message) => {
        if (!message) return "Usage: echo <message>";
        disableInput();
        typeText(message, enableInput);
        return "";
    },
    weather: () => {
        const weatherConditions = ["Sunny", "Cloudy", "Rainy", "Snowy", "Windy"];
        const temperature = Math.floor(Math.random() * 30) - 5; // Random temperature between -5°C and 25°C
        const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const weatherText = `Weather forecast: ${condition}, ${temperature}°C`;
        disableInput();
        typeText(weatherText, enableInput);
        return "";
    },
    dice: () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        const diceText = `You rolled a ${roll}!`;
        disableInput();
        typeText(diceText, enableInput);
        return "";
    },
    rps: () => {
        const choices = ["Rock", "Paper", "Scissors"];
        const userChoice = prompt("Enter your choice (Rock, Paper, Scissors):");
        if (!userChoice) return "Game canceled.";

        const terminalChoice = choices[Math.floor(Math.random() * choices.length)];
        let result;

        if (userChoice === terminalChoice) {
            result = "It's a tie!";
        } else if (
            (userChoice === "Rock" && terminalChoice === "Scissors") ||
            (userChoice === "Paper" && terminalChoice === "Rock") ||
            (userChoice === "Scissors" && terminalChoice === "Paper")
        ) {
            result = "You win!";
        } else {
            result = "You lose!";
        }

        const rpsText = `You chose: ${userChoice}\nTerminal chose: ${terminalChoice}\nResult: ${result}`;
        disableInput();
        typeText(rpsText, enableInput);
        return "";
    },
    banner: (message) => {
        if (!message) return "Usage: banner <message>";
        const bannerText = `
 #####  #     #  #####  #     #  #####  ######
#     # #     # #     # #     # #     # #     #
#       #     # #     # #     # #     # #     #
 #####  #     # #     # #     # #     # ######
      # #     # #     # #     # #     # #     #
#     # #     # #     # #     # #     # #     #
 #####   #####   #####   #####   #####  ######

${message}
`;
        disableInput();
        typeText(bannerText, enableInput);
        return "";
    },
    clear: () => {
        terminalOutput.innerHTML = '';
        return '';
    },
    quit: () => {
        disableInput();
        typeText("> Closing terminal...", () => {
            setTimeout(() => {
                terminalOutput.innerHTML += "> Terminal closed.<br>";
                terminalInput.disabled = true;
            }, 2000);
        });
        return "";
    },
    winnie: () => {
        const winnieText = `
WinniePat is the best!
  \\_\\_    _/_/
     \\__/
    (oo)\\_______
    (__)\\       )\\/\\
        ||----w |
        ||     ||`;
        disableInput();
        typeText(winnieText, enableInput);
        return "";
    },
    secret: () => {
        const secretText = "You found the secret command! 🎉";
        disableInput();
        typeText(secretText, enableInput);
        return "";
    }
};

// Initial typing animation
const textLines = [
    "> Welcome to WinniePat's Portfolio",
    "> Initializing system...",
    "> Loading projects...",
    "> Access granted.",
    "> Type 'help' for commands."
];
let lineIndex = 0;
let charIndex = 0;

function initialTypeText() {
    if (lineIndex < textLines.length) {
        if (charIndex < textLines[lineIndex].length) {
            terminalOutput.innerHTML += textLines[lineIndex].charAt(charIndex);
            charIndex++;
            setTimeout(initialTypeText, 50); // Typing speed
        } else {
            terminalOutput.innerHTML += "<br>";
            lineIndex++;
            charIndex = 0;
            setTimeout(initialTypeText, 200); // Delay between lines
        }
    } else {
        // Enable input after typing animation is done
        terminalInput.disabled = false;
        terminalInput.focus();
    }
}

// Start initial typing animation
initialTypeText();

// Handle user input
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value.trim();
        terminalOutput.innerHTML += `<span class="prompt">user@winniepat:~$</span> ${input}<br>`;

        const [command, ...args] = input.split(' ');
        const response = commands[command] || (() => {
            disableInput();
            typeText(`Command not found: ${command}`, enableInput);
            return "";
        });

        if (typeof response === 'function') {
            const output = response(...args);
            if (output) {
                disableInput();
                typeText(output, enableInput);
            }
        } else {
            disableInput();
            typeText(response, enableInput);
        }

        terminalInput.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll
    }
});