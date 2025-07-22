// DealFinder JavaScript

// Mock product data
const mockProducts = [
    {
        id: 1,
        title: "Apple iPhone 14 Pro Max - 128GB - Space Black",
        price: 1099.99,
        originalPrice: 1199.99,
        store: "Amazon",
        storeIcon: "🛒",
        rating: 4.8,
        reviewCount: 1247,
        image: "📱"
    },
    {
        id: 2,
        title: "Samsung Galaxy S23 Ultra - 256GB - Phantom Black",
        price: 1199.99,
        originalPrice: 1299.99,
        store: "Walmart",
        storeIcon: "🏪",
        rating: 4.9,
        reviewCount: 2341,
        image: "📱"
    },
    {
        id: 3,
        title: "MacBook Pro 14-inch - M2 Pro - 512GB",
        price: 1999.99,
        originalPrice: 2199.99,
        store: "Flipkart",
        storeIcon: "📦",
        rating: 4.7,
        reviewCount: 892,
        image: "💻"
    },
    {
        id: 4,
        title: "Sony WH-1000XM4 Wireless Headphones",
        price: 349.99,
        originalPrice: 399.99,
        store: "Amazon",
        storeIcon: "🛒",
        rating: 4.8,
        reviewCount: 1567,
        image: "🎧"
    },
    {
        id: 5,
        title: "Nike Air Max 270 - Men's Running Shoes",
        price: 129.99,
        originalPrice: 150.00,
        store: "Walmart",
        storeIcon: "🏪",
        rating: 4.6,
        reviewCount: 2341,
        image: "👟"
    }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchModal = document.getElementById('searchModal');
const searchResults = document.getElementById('searchResults');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add enter key listener to search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Close modal when clicking outside
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            closeModal();
        }
    });

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to floating cards
    animateFloatingCards();
});

// Search Functions
function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        showNotification('Please enter a search term', 'error');
        return;
    }

    showLoadingModal();
    
    // Simulate API delay
    setTimeout(() => {
        const results = searchProducts(query);
        displaySearchResults(query, results);
        hideLoadingModal();
    }, 1500);
}

function searchProduct(productName) {
    searchInput.value = productName;
    performSearch();
}

function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return mockProducts.filter(product => 
        product.title.toLowerCase().includes(lowerQuery) ||
        product.store.toLowerCase().includes(lowerQuery)
    );
}

function displaySearchResults(query, results) {
    const modal = document.getElementById('searchModal');
    const resultsContainer = document.getElementById('searchResults');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #64748b; margin-bottom: 1rem;"></i>
                <h3 style="color: #1e293b; margin-bottom: 0.5rem;">No products found</h3>
                <p style="color: #64748b;">We couldn't find any products matching "${query}"</p>
                <div style="margin-top: 1rem;">
                    <p style="font-size: 0.9rem; color: #64748b;">Try:</p>
                    <ul style="text-align: left; display: inline-block; color: #64748b;">
                        <li>Checking your spelling</li>
                        <li>Using more general keywords</li>
                        <li>Using fewer keywords</li>
                    </ul>
                </div>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <p style="color: #64748b;">Found ${results.length} results for "${query}"</p>
            </div>
            ${results.map(product => `
                <div class="product-card">
                    <div class="product-image">
                        ${product.image}
                    </div>
                    <div class="product-info">
                        <div class="product-title">${product.title}</div>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-store">
                            ${product.storeIcon} ${product.store} • ⭐ ${product.rating} (${product.reviewCount.toLocaleString()})
                        </div>
                    </div>
                    <button onclick="viewProduct(${product.id})" style="
                        background: #3b82f6; 
                        color: white; 
                        border: none; 
                        padding: 0.5rem 1rem; 
                        border-radius: 5px; 
                        cursor: pointer;
                        transition: background 0.3s ease;
                    " onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#3b82f6'">
                        View Deal
                    </button>
                </div>
            `).join('')}
        `;
    }
    
    modal.style.display = 'block';
}

function viewProduct(productId) {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
        showNotification(`Opening ${product.title} on ${product.store}...`, 'success');
        // In a real app, this would redirect to the product page
        setTimeout(() => {
            closeModal();
        }, 2000);
    }
}

function closeModal() {
    searchModal.style.display = 'none';
    searchInput.value = '';
}

function showLoadingModal() {
    const modal = document.getElementById('searchModal');
    const resultsContainer = document.getElementById('searchResults');
    
    resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
            <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 1rem; color: #64748b;">Searching for the best deals...</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

function hideLoadingModal() {
    // Loading is hidden when results are displayed
}

// Utility Functions
function scrollToSearch() {
    document.getElementById('searchInput').focus();
    document.getElementById('searchInput').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#3b82f6';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function animateFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });
}

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Smooth scroll behavior for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add hover effects to feature cards
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add click effects to store cards
document.addEventListener('DOMContentLoaded', function() {
    const storeCards = document.querySelectorAll('.store-card');
    storeCards.forEach(card => {
        card.addEventListener('click', function() {
            showNotification(`Browsing ${this.querySelector('h3').textContent}...`, 'info');
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key to close modal
    if (e.key === 'Escape' && searchModal.style.display === 'block') {
        closeModal();
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});

// Add search input focus effect
searchInput.addEventListener('focus', function() {
    this.parentElement.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
});

searchInput.addEventListener('blur', function() {
    this.parentElement.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
}); 