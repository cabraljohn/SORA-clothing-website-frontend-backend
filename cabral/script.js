document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    let cartCount = 0;
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Cart and Checkout functionality
    const modal = document.getElementById('checkout-modal');
    const cartIcon = document.querySelector('.cart-icon');
    const closeBtn = document.querySelector('.close');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    let cart = [];

    // Open modal when clicking cart icon
    cartIcon.addEventListener('click', () => {
        modal.style.display = 'block';
        updateCartDisplay();
    });

    // Close modal when clicking X
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const product = {
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('p').textContent,
                image: productCard.querySelector('img').src
            };
            
            cart.push(product);
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Button animation
            button.textContent = 'Added!';
            button.style.backgroundColor = '#ff4d4d';
            
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.backgroundColor = '#333';
            }, 1000);
        });
    });

    function updateCartDisplay() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            
            // Convert price string to number (remove ₱ and comma)
            const price = parseFloat(item.price.replace('₱', '').replace(',', ''));
            total += price;

            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                </div>
                <span class="remove-item" data-index="${index}">&times;</span>
            `;
            cartItems.appendChild(itemElement);
        });

        cartTotal.textContent = `₱${total.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

        // Add remove functionality
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                cartCount--;
                cartCountElement.textContent = cartCount;
                updateCartDisplay();
            });
        });
    }

    // Checkout button functionality
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; padding: 20px;">Your cart is empty!</p>';
            return;
        }
        
        // Hide checkout modal
        modal.style.display = 'none';
        
        // Show success message
        const successModal = document.getElementById('success-message');
        successModal.style.display = 'block';
        
        // Reset cart
        cart = [];
        cartCount = 0;
        cartCountElement.textContent = cartCount;
        
        // Close success message when clicking X
        const closeSuccess = document.querySelector('.close-success');
        closeSuccess.addEventListener('click', () => {
            successModal.style.display = 'none';
        });
        
        // Close success message when clicking continue shopping
        const continueShoppingBtn = document.getElementById('continue-shopping');
        continueShoppingBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
        });
        
        // Close success message when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Add scroll animation for elements
    window.addEventListener('scroll', function() {
        const products = document.querySelector('.products');
        const about = document.querySelector('.about');
        const contact = document.querySelector('.contact');

        const elements = [products, about, contact];

        elements.forEach(element => {
            if (element) {
                const position = element.getBoundingClientRect();
                
                // If element is in viewport
                if(position.top < window.innerHeight && position.bottom >= 0) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            }
        });
    });

    // Auth Modal Functionality
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeAuthBtns = document.querySelectorAll('.close-auth');
    const switchAuthBtns = document.querySelectorAll('.switch-auth');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Open login modal
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    // Open register modal
    registerBtn.addEventListener('click', () => {
        registerModal.style.display = 'block';
    });

    // Close auth modals
    closeAuthBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });

    // Switch between login and register
    switchAuthBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            if (target === 'login') {
                registerModal.style.display = 'none';
                loginModal.style.display = 'block';
            } else {
                loginModal.style.display = 'none';
                registerModal.style.display = 'block';
            }
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal || e.target === registerModal) {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    });

    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        
        // Get user data from form
        const userData = {
            name: formData.get('text') || 'User', // Fallback if name not in login form
            email: formData.get('email')
        };
        
        // Update profile info
        updateProfileInfo(userData.name, userData.email);
        
        // Set login state
        isLoggedIn = true;
        currentUser = userData;
        
        // Hide login modal and show profile
        loginModal.style.display = 'none';
        profileModal.style.display = 'block';
        
        // Update nav buttons
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        
        loginForm.reset();
    });

    // Handle register form submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        
        // Get user data from form
        const userData = {
            name: formData.get('text'),
            email: formData.get('email')
        };
        
        // Update profile info
        updateProfileInfo(userData.name, userData.email);
        
        // Set login state
        isLoggedIn = true;
        currentUser = userData;
        
        // Update profile picture
        profilePicture.src = previewImage.src;
        
        // Hide register modal and show success
        registerModal.style.display = 'none';
        
        // Update nav buttons
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        
        registerForm.reset();
    });

    // Profile functionality
    const profileModal = document.getElementById('profile-modal');
    const closeProfileBtn = document.querySelector('.close-profile');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const orderHistoryBtn = document.getElementById('order-history-btn');
    const logoutBtn = document.getElementById('logout-btn');

    let isLoggedIn = false;
    let currentUser = null;

    // Close profile modal
    closeProfileBtn.addEventListener('click', () => {
        profileModal.style.display = 'none';
    });

    // Edit profile button
    editProfileBtn.addEventListener('click', () => {
        // Here you would typically show an edit form
        alert('Edit profile functionality would go here');
    });

    // Order history button
    orderHistoryBtn.addEventListener('click', () => {
        // Here you would typically show order history
        alert('Order history functionality would go here');
    });

    // Logout button
    logoutBtn.addEventListener('click', () => {
        isLoggedIn = false;
        currentUser = null;
        profileModal.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
    });

    // Close profile modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });

    // Add this to the existing script after the cart icon functionality
    const profileIconNav = document.querySelector('.profile-icon-nav');

    profileIconNav.addEventListener('click', () => {
        if (isLoggedIn) {
            profileModal.style.display = 'block';
        } else {
            loginModal.style.display = 'block';
        }
    });

    // Add this after the auth modal functionality
    // Profile Picture Preview
    const profilePicInput = document.getElementById('profile-pic');
    const previewImage = document.getElementById('preview-image');
    const changeProfilePic = document.getElementById('change-profile-pic');
    const profilePicture = document.getElementById('profile-picture');

    // Function to handle image preview
    function handleImagePreview(input, previewElement) {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewElement.src = e.target.result;
                    // If this is the profile picture change, update both images
                    if (input === changeProfilePic) {
                        previewImage.src = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Setup image preview for registration
    handleImagePreview(profilePicInput, previewImage);

    // Setup image preview for profile change
    handleImagePreview(changeProfilePic, profilePicture);

    // Click handler for preview container
    document.querySelector('.preview-container').addEventListener('click', () => {
        profilePicInput.click();
    });

    // Add this after the profile functionality section
    // User data handling
    function updateProfileInfo(name, email) {
        document.getElementById('profile-name').textContent = name;
        document.getElementById('profile-email').textContent = email;
    }
}); 