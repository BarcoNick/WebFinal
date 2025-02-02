// Game Deals Swiper
const gameContainer = document.getElementById('game-container');

fetch("https://www.cheapshark.com/api/1.0/deals?upperPrice=15", {
    method: "GET",
})
.then(responseInfo => {
    if (!responseInfo.ok) {
        throw new Error(`HTTP error! status: ${responseInfo.status}`);
    }
    return responseInfo.json();
})
.then(mosuliInfo => {
    mosuliInfo.slice(0, 6).forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('swiper-slide');
        gameDiv.innerHTML = `
            <div class="game">
                <img src="${game.thumb}" alt="${game.title}">
                <div class="game-title">${game.title}</div>
                <p>Price: $${game.salePrice} (Was: $${game.normalPrice})</p>
                <p>Savings: ${game.savings}%</p>
                ${game.metacriticScore ? `<p>Metacritic: ${game.metacriticScore}</p>` : ''}
                ${game.steamRatingText ? `<p>Steam: ${game.steamRatingText} (${game.steamRatingPercent}%)</p>` : ''}
            </div>
        `;
        gameContainer.appendChild(gameDiv);
    });

    const swiper = new Swiper('.swiper', {
        slidesPerView: 'auto',
        breakpoints: {
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
        },
        spaceBetween: 10,
        loop: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
})
.catch(error => {
    console.error("Error fetching data:", error);
    gameContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
});

// Header Hide on SCroll
let prevScrollPos = window.scrollY;
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    const currentScrollPos = window.scrollY;
    header.classList.toggle('hidden', prevScrollPos <= currentScrollPos);
    prevScrollPos = currentScrollPos;
});

// Accordion Blogs
document.querySelectorAll(".accordion-container").forEach(item => {
    item.addEventListener("click", () => item.classList.toggle("active"));
});

// Cookie Banner
function acceptCookies() {
    localStorage.setItem('cookieAccepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('cookieAccepted') === 'true') {
        document.getElementById('cookie-banner').style.display = 'none';
    }
});


// Sign In
document.getElementById('signin-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('password-error');
    let errorMessage = "Error, Try Again!";

    if (password.length < 8) {
        errorMessage = "Password must be at least 8 characters long.";
    } 

    if (errorMessage) {
        passwordError.textContent = errorMessage;
        return;
    }

    passwordError.textContent = "";

    alert("Sign in submitted");
});


// Sign Up
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const passwordError = document.getElementById('password-error');
    let errorMessage = "Error, Me ravi!";

    if (password.length < 8) {
        errorMessage = "Password must be at least 8 characters long.";
    } else if (password !== confirmPassword) {
        errorMessage = "Passwords do not match!";
    }

    if (errorMessage) {
        passwordError.textContent = errorMessage;
        return;
    }

    passwordError.textContent = "";

    alert("Signed Up");
});

// Burger
const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('nav');

burgerMenu.addEventListener('click', () => {
    nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
    });
});