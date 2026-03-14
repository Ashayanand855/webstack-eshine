const slides = document.querySelectorAll('.hero-slider .hero-img');
const bars = document.querySelectorAll('.pagination-bar');
let index = 0;

if (slides.length > 0 && bars.length > 0) {
  setInterval(() => {
    slides[index].classList.remove('active');
    bars[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
    bars[index].classList.add('active');
  }, 3000);
}

// User Session Simulation
const isLoggedIn = true; // Toggle this to true/false to test
let cartItemCount = 0;  // Starts at 0

document.addEventListener('DOMContentLoaded', () => {
    const cartBadge = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.btn-black');
    const productCards = document.querySelectorAll('.product-card');

    function updateCartUI() {
        if (cartBadge) {
            if (isLoggedIn && cartItemCount > 0) {
                cartBadge.textContent = cartItemCount;
                cartBadge.classList.remove('hidden');
            } else {
                cartBadge.classList.add('hidden');
            }
        }
    }

    // Initialize UI
    updateCartUI();

    function handleAddToCart() {
        if (isLoggedIn) {
            cartItemCount++;
            updateCartUI();
        } else {
            console.log("User not logged in. Attempting to show login modal...");
            // Optionally trigger login modal if they aren't logged in
            const loginModal = document.getElementById('login-modal');
            const accountIcon = document.getElementById('account-icon');
            if(accountIcon && loginModal) accountIcon.click();
        }
    }

    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });

    productCards.forEach(card => {
        card.addEventListener('click', handleAddToCart);
        card.style.cursor = 'pointer'; // Make visually clickable
    });

    // Login Modal & Pixel Animation Logic
    const accountIcon = document.getElementById('account-icon');
    const loginModal = document.getElementById('login-modal');
    const closeLogin = document.getElementById('close-login');
    const pixelGrid = document.getElementById('pixel-grid');
    const loginForm = document.getElementById('login-form');

    const cols = 10;
    const rows = 12;
    const totalPixels = cols * rows;

    function createPixels() {
        pixelGrid.innerHTML = '';
        const radius = Math.max(window.innerWidth, window.innerHeight);

        for (let i = 0; i < totalPixels; i++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');

            // Generate a random position completely off-screen
            const angle = Math.random() * Math.PI * 2;
            const startX = Math.cos(angle) * radius;
            const startY = Math.sin(angle) * radius;

            pixel.style.setProperty('--start-x', `${startX}px`);
            pixel.style.setProperty('--start-y', `${startY}px`);

            pixelGrid.appendChild(pixel);
        }
    }

    function animatePixelsAndShowForm() {
        createPixels();
        loginForm.classList.remove('active');
        loginForm.classList.add('hidden');
        closeLogin.style.opacity = '0';
        document.getElementById('login-content').classList.remove('loaded');
        
        const pixels = document.querySelectorAll('.pixel');
        
        // 1. Pixels arrive from border more slowly
        pixels.forEach(pixel => {
            const delay = Math.random() * 800; // 0 to 800ms delay
            setTimeout(() => {
                pixel.classList.add('animate');
            }, delay);
        });

        // 2. Pixels fade out smoothly and form reveals
        setTimeout(() => {
            document.getElementById('login-content').classList.add('loaded'); // Make background white

            pixels.forEach(pixel => {
                const fadeDelay = Math.random() * 600;
                setTimeout(() => {
                    pixel.style.opacity = '0';
                    pixel.style.transform = 'scale(0.8)';
                }, fadeDelay);
            });
            
            setTimeout(() => {
                pixelGrid.innerHTML = ''; // Clear DOM
                loginForm.classList.remove('hidden');
                // Trigger reflow
                void loginForm.offsetWidth;
                loginForm.classList.add('active');
                closeLogin.style.opacity = '1';
            }, 800);

        }, 1800);
    }

    if (accountIcon) {
        accountIcon.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('active');
            animatePixelsAndShowForm();
        });
    }

    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');
    const modalContent = document.getElementById('login-content');

    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalContent.classList.add('expanded');
        });
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalContent.classList.remove('expanded');
        });
    }

    if (closeLogin) {
        closeLogin.addEventListener('click', () => {
            loginModal.classList.remove('active');
            setTimeout(() => {
                loginForm.classList.remove('active');
                loginForm.classList.add('hidden');
                modalContent.classList.remove('expanded'); // Reset expansion state
            }, 300);
        });
    }

    // Avatar Selection Logic
    const avatarUploadBtn = document.getElementById('avatar-upload-trigger');
    const avatarPopover = document.getElementById('avatar-popover');
    const selectedAvatarImg = document.getElementById('selected-avatar');
    const presetAvatars = document.querySelectorAll('.preset-avatar');
    const customUploadInput = document.getElementById('custom-avatar-upload');

    if (avatarUploadBtn && avatarPopover) {
        avatarUploadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            avatarPopover.classList.toggle('hidden');
        });

        // Close Popover on outside click
        document.addEventListener('click', (e) => {
            if (!avatarPopover.contains(e.target) && !avatarUploadBtn.contains(e.target)) {
                avatarPopover.classList.add('hidden');
            }
        });
    }

    if (presetAvatars.length > 0 && selectedAvatarImg) {
        presetAvatars.forEach(avatar => {
            avatar.addEventListener('click', () => {
                // Update Main Image
                selectedAvatarImg.src = avatar.src;
                // Update Selected Stying
                presetAvatars.forEach(a => a.classList.remove('selected'));
                avatar.classList.add('selected');
                // Hide Popover
                avatarPopover.classList.add('hidden');
            });
        });
    }

    if (customUploadInput && selectedAvatarImg) {
        customUploadInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    selectedAvatarImg.src = event.target.result;
                    // Remove selection ring from presets if a custom one is uploaded
                    presetAvatars.forEach(a => a.classList.remove('selected'));
                    avatarPopover.classList.add('hidden');
                };
                reader.readAsDataURL(file);
            }
        });
    }

});
