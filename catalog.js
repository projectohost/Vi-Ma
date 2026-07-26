// База даних ігор (з твоїми картинками)
let games = [
    { id: 1, title: "warcraft", price: 1200, genre: "rpg", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAj9gnzRrwDguBOjNd3y8MhWiHCMQbMTkonRFlFtuSoQIjvrcUiU_A2EY-&s=10" },
    { id: 2, title: "warhammer 40k", price: 850, genre: "action", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-kWYeujPKhRgIwd0TY9TWYulF4cINTEYJ-tRNP2ohrA&s=10" },
    { id: 3, title: "half life 2", price: 450, genre: "sim", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZJk58W68yo-wVVnmAeAt0rxB8smFtBOVsz2scQaVig&s=10" },
    { id: 4, title: "gacha life 2", price: 1500, genre: "strategy", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyzjn2JUrFHet6PcYnCD3t95OBcBLQnsvt6PS5Yots9g&s=10" },
    { id: 5, title: "Myster Furry hot muscles", price: 6767, genre: "action", img: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1578220/2b44eb2081f6410206afa084555438c370ab4e63/header.jpg?t=1779295559" }
];

let cart = []; // Масив для кошика

// Отримуємо елементи сторінки
const gameList = document.getElementById('game-list');
const searchInput = document.getElementById('search');
const genreSelect = document.getElementById('genre');
const priceInput = document.getElementById('price');
const priceValue = document.getElementById('price-value');

// Елементи кошика
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCount = document.getElementById('cart-count');

// === Функція відображення ігор ===
function renderGames(gamesToRender) {
    gameList.innerHTML = ''; 

    if (gamesToRender.length === 0) {
        gameList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 20px;">Ігор не знайдено :(</p>';
        return;
    }

    gamesToRender.forEach(game => {
        // Перевіряємо, чи є гра вже в кошику, щоб правильно показати кнопку
        const isAlreadyInCart = cart.find(item => item.id === game.id);
        const btnText = isAlreadyInCart ? "✓ В кошику" : "У кошик";
        const btnStyle = isAlreadyInCart ? "background: #5c7e10;" : "background: #66c0f4;";

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${game.img}" alt="${game.title}" style="height: 150px; object-fit: cover;">
            <h3>${game.title}</h3>
            <p>₴${game.price}</p>
            <button class="buy-btn" data-id="${game.id}" style="${btnStyle}">${btnText}</button>
        `;
        gameList.appendChild(card);
    });
}

// === Функція фільтрації та пошуку ===
function filterGames() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = genreSelect.value;
    const maxPrice = parseInt(priceInput.value);

    const filteredGames = games.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm);
        const matchesGenre = selectedGenre === 'all' || game.genre === selectedGenre;
        const matchesPrice = game.price <= maxPrice;

        return matchesSearch && matchesGenre && matchesPrice;
    });

    renderGames(filteredGames);
}

// === Обробники подій для фільтрів ===
searchInput.addEventListener('input', filterGames);
genreSelect.addEventListener('change', filterGames);

priceInput.addEventListener('input', (e) => {
    priceValue.textContent = `₴${e.target.value}`;
    filterGames();
});

// === Логіка додавання нової гри ===
const addGameBtn = document.getElementById('add-game-btn');
const newTitleInput = document.getElementById('new-title');
const newPriceInput = document.getElementById('new-price');
const newGenreSelect = document.getElementById('new-genre');

addGameBtn.addEventListener('click', () => {
    const title = newTitleInput.value.trim();
    const price = parseInt(newPriceInput.value);
    const genre = newGenreSelect.value;

    if (title === '' || isNaN(price)) {
        alert("Будь ласка, введіть назву та коректну ціну гри!");
        return;
    }

    const newGame = {
        id: games.length + 1,
        title: title,
        price: price,
        genre: genre,
        img: `https://picsum.photos/400/200?random=${games.length + 1}` 
    };

    games.push(newGame);

    newTitleInput.value = '';
    newPriceInput.value = '';

    filterGames(); 
    alert(`Гру "${title}" успішно додано!`);
});

// === ЛОГІКА КОШИКА ===

// Відкриття та закриття
cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Делегування подій для кнопок "У кошик" (працює навіть після фільтрації)
gameList.addEventListener('click', (e) => {
    if (e.target.classList.contains('buy-btn')) {
        const gameId = parseInt(e.target.getAttribute('data-id'));
        addToCart(gameId);
    }
});

function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    const alreadyInCart = cart.find(item => item.id === gameId);
    
    if (alreadyInCart) {
        alert("Ця гра вже є у вашому кошику!");
        return;
    }

    cart.push(game);
    updateCart();
    
    // Оновлюємо вигляд конкретної кнопки
    const btn = document.querySelector(`.buy-btn[data-id="${gameId}"]`);
    if (btn) {
        btn.textContent = "✓ В кошику";
        btn.style.background = "#5c7e10";
    }
}

// Викликається з HTML через onclick="removeFromCart(id)"
window.removeFromCart = function(gameId) {
    cart = cart.filter(item => item.id !== gameId);
    updateCart();
    
    // Повертаємо кнопці звичайний вигляд
    const btn = document.querySelector(`.buy-btn[data-id="${gameId}"]`);
    if(btn) {
        btn.textContent = "У кошик";
        btn.style.background = "#66c0f4";
    }
};

function updateCart() {
    cartCount.textContent = cart.length; 
    cartItemsContainer.innerHTML = ''; 
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Кошик порожній</p>';
    } else {
        cart.forEach(item => {
            total += item.price;
            
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>₴${item.price}</p>
                </div>
                <span class="remove-item" onclick="removeFromCart(${item.id})">✖</span>
            `;
            cartItemsContainer.appendChild(div);
        });
    }
    
    cartTotalPrice.textContent = `₴${total}`; 
}

// Оформлення замовлення
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Ваш кошик порожній!');
    } else {
        alert(`Дякуємо за покупку на суму ₴${cartTotalPrice.textContent.replace('₴', '')}! Ігри додані до вашої бібліотеки.`);
        cart = []; 
        updateCart();
        cartModal.classList.remove('active');
        
        // Скидаємо всі кнопки на сторінці
        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.textContent = "У кошик";
            btn.style.background = "#66c0f4";
        });
    }
});

// Запуск при завантаженні сторінки
renderGames(games);