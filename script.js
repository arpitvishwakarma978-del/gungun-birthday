// Gungun's unique birthday website logic

window.onload = () => {
    
    // Elements 
    const loadContainer = document.getElementById('loading-container');
    const gameContainer = document.getElementById('game-container');
    const mainSurprise = document.getElementById('main-surprise');
    const patienceBtn = document.getElementById('patience-btn');
    const trollMessage = document.getElementById('troll-message');
    
    const lettersContainer = document.getElementById('letters-container');
    const unlockBtn = document.getElementById('unlock-btn');
    
    const giftRevealBtn = document.getElementById('gift-reveal-btn');
    const finalGiftReveal = document.getElementById('final-gift-reveal');
    const blowCandleBtn = document.getElementById('blow-candle-btn');

    // --- Phase 1: Pareshan Karne Wala Section ---

    // 1. Dikhne mein Loading ho par actual game tab hi shuru hoga jab Gungun pareshaan ho jaye
    setTimeout(() => {
        trollMessage.innerText = "Wow, you really have a lot of free time. Why don't you go click something?";
        trollMessage.classList.remove('hidden');
        patienceBtn.classList.remove('hidden');
    }, 8000); // 8 seconds baad pareshaan karna start karo

    // Troll messages on click (increase the level each time)
    let trollCount = 0;
    const trollQuotes = [
        "Arey, don't be lazy. I mean *really* bored.",
        "Click it again... I'm not feeling your boredom yet.",
        "Is this the best you can do? I expected more from a professional overthinker.",
        "Almost there! Just one more click to confirm your absolute boredom...",
        "Perfect! Now we can move on."
    ];

    patienceBtn.addEventListener('click', () => {
        if (trollCount < trollQuotes.length - 1) {
            trollMessage.innerText = trollQuotes[trollCount];
            patienceBtn.style.transform = `scale(${1 + (trollCount * 0.1)})`; // Button grows!
            trollCount++;
        } else {
            // End Phase 1, start Phase 2
            loadContainer.classList.add('hidden');
            loadContainer.classList.remove('active');
            gameContainer.classList.remove('hidden');
            gameContainer.classList.add('active');
            setupGame();
        }
    });

    // --- Phase 2: Letter Puzzle Section ---

    function setupGame() {
        const girlNameRaw = "GUNGUN";
        // Ununique order: Backwards (NUGNUG)
        let letters = girlNameRaw.split('');
        const correctOrder = [...letters].reverse(); // N U G N U G
        let shuffled = shuffleArray([...letters]);

        lettersContainer.innerHTML = ''; // Clear container

        shuffled.forEach(letter => {
            const letterSpan = document.createElement('span');
            letterSpan.innerText = letter;
            letterSpan.className = 'letter draggable';
            letterSpan.draggable = true;
            lettersContainer.appendChild(letterSpan);
        });

        // Simple Drag-and-Drop
        let draggingElement = null;

        lettersContainer.addEventListener('dragstart', e => {
            draggingElement = e.target;
            e.target.classList.add('dragging');
        });

        lettersContainer.addEventListener('dragend', e => {
            e.target.classList.remove('dragging');
            draggingElement = null;
        });

        lettersContainer.addEventListener('dragover', e => {
            e.preventDefault();
            const bounding = e.target.getBoundingClientRect();
            const targetElement = e.target.closest('.letter');

            if (targetElement && targetElement !== draggingElement) {
                if (e.clientX < targetElement.getBoundingClientRect().left + targetElement.offsetWidth / 2) {
                     lettersContainer.insertBefore(draggingElement, targetElement);
                } else {
                    lettersContainer.insertBefore(draggingElement, targetElement.nextSibling);
                }
            }
        });

        // Unlock click check
        unlockBtn.addEventListener('click', () => {
            const currentLetters = [...document.querySelectorAll('.letter')].map(l => l.innerText);
            if (currentLetters.join('') === correctOrder.join('')) {
                // Puzzle solved!
                startSurprise();
            } else {
                // Incorrect order
                unlockBtn.innerText = "Try Again! I told you, backwards... like NUGNUG";
                setTimeout(()=> unlockBtn.innerText = "Unlock Surprise", 1500);
            }
        });
    }

    // Shuffle helper function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // --- Phase 3: The Surprise Section ---

    function startSurprise() {
        gameContainer.classList.add('hidden');
        gameContainer.classList.remove('active');
        mainSurprise.classList.remove('hidden');
        mainSurprise.classList.add('active');

        // Start confetti (basic effect)
        createConfetti();
    }

    function createConfetti() {
        const confettiContainer = document.getElementById('confetti-overlay');
        confettiContainer.innerHTML = '';
        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = `${Math.random() * 100}%`;
            piece.style.backgroundColor = getRandColor();
            piece.style.animationDelay = `${Math.random() * 2}s`;
            piece.style.position = 'absolute';
            piece.style.width = '10px';
            piece.style.height = '10px';
            piece.style.top = '-10px';
            confettiContainer.appendChild(piece);
        }
    }

    function getRandColor() {
        const colors = ['#ff4d88', '#ff9eaf', '#fff', '#ffeef2', '#ffcc00'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Interactions
    blowCandleBtn.addEventListener('click', () => {
        document.getElementById('cake').innerHTML = '🎂🕯️🌬️'; // Changing emoji as if blown
        blowCandleBtn.innerText = "Candle Blown! Happy Bday!";
        blowCandleBtn.disabled = true;
    });

    giftRevealBtn.addEventListener('click', () => {
        finalGiftReveal.classList.remove('hidden');
        giftRevealBtn.innerText = "Check DM, lazy!";
        giftRevealBtn.style.opacity = '0.5';
    });
};

