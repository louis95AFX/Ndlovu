document.addEventListener('DOMContentLoaded', () => {
    // === Product Pagination Logic ===

    const productCards = document.querySelectorAll('.product-card');
    const paginationControls = document.getElementById('paginationControls');
    const productsPerPage = 9;
    let currentPage = 1;

    // Calculate total number of pages needed
    const totalPages = Math.ceil(productCards.length / productsPerPage);

    /**
     * Shows the products for the given page number and hides the rest.
     * @param {number} page The page number to display (starting at 1).
     */
    function displayPage(page) {
        currentPage = page;
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;

        productCards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        updatePaginationButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top of products on page change
    }

    /**
     * Generates and updates the pagination buttons.
     */
    function updatePaginationButtons() {
        paginationControls.innerHTML = ''; // Clear existing buttons

        // 1. Previous Button
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> PREV';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                displayPage(currentPage - 1);
            }
        });
        paginationControls.appendChild(prevButton);

        // 2. Page Number Buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => displayPage(i));
            paginationControls.appendChild(pageButton);
        }

        // 3. Next Button
        const nextButton = document.createElement('button');
        nextButton.innerHTML = 'NEXT <i class="fas fa-chevron-right"></i>';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                displayPage(currentPage + 1);
            }
        });
        paginationControls.appendChild(nextButton);
    }


    // === Footer Shipping Policy Toggle Logic (Kept your original JS functionality) ===

    const shippingToggle = document.getElementById('shipping-toggle');
    const shippingInfo = document.getElementById('shipping-info');

    if (shippingToggle && shippingInfo) {
        shippingToggle.addEventListener('click', (e) => {
            e.preventDefault();
            shippingInfo.classList.toggle('hidden');
        });
    }

    // --- INITIALIZATION ---
    displayPage(1); // Load the first page when the site opens
});

// ======== Cart Functionality ========
let cart = [];

function updateCartDisplay() {
    const container = document.getElementById('cartItemsContainer');
    const subtotalElem = document.getElementById('cartSubtotal');

    container.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.qty;

        const itemDiv = document.createElement('div');
        itemDiv.style.marginBottom = '10px';
        itemDiv.innerHTML = `
            ${item.name} - R${item.price} x 
            <input type="number" min="1" value="${item.qty}" style="width:50px" onchange="updateQty(${index}, this.value)">
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        container.appendChild(itemDiv);
    });

    subtotalElem.textContent = `Subtotal: R${subtotal}`;
}

function updateQty(index, qty) {
    cart[index].qty = parseInt(qty);
    updateCartDisplay();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// ======== Add to Cart Buttons ========
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        const name = card.querySelector('.product-name').textContent.trim();
        const priceText = card.querySelector('.product-price').textContent.replace(/[^\d.]/g, '');
        const price = parseFloat(priceText) || 0;

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        updateCartDisplay();
    });
});

// ======== Checkout Button ========
document.getElementById('checkoutButton').addEventListener('click', () => {
    if(cart.length === 0){
        alert("Your cart is empty!");
        return;
    }
    alert("Proceeding to checkout...");
});
