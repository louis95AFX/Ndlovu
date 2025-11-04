document.addEventListener('DOMContentLoaded', () => {
    // === Product Pagination Logic ===

    const productCards = document.querySelectorAll('.product-card');
    const paginationControls = document.getElementById('paginationControls');
    const productsPerPage = 10;
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