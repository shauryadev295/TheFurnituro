// Product Data - Store this in a real application
const productData = [
    {
        id: 1,
        name: "Imperial Velvet Sofa Collection",
        description: "Majestic elegance with bold craftsmanship and rich textures.",
        price: 74999,
        category: "Living Room",
        images: ["Mokker.png"],
        materials: "Premium teakwood frame, hand-carved detailing, and luxurious deep purple velvet upholstery.",
        dimensions: "Sofa: 220cm W x 95cm D x 115cm H Chaise Lounge: 190cm W x 75cm D x 100cm H Chair: 90cm W x 85cm D x 110cm H",
        weight: "Sofa: 90kg Chaise Lounge: 70kg Chair: 35kg (each)"
    },
    {
        id: 2,
        name: "Royal Heritage Wooden Swing (Jhula)",
        description: "An exquisite centerpiece blending tradition with luxury, perfect for modern or classic interiors.",
        price: 64999,
        category: "Dining Room",
        images: ["Mokker (2).png"],
        materials: "Solid teakwood with intricate hand-carvings, polished to a rich golden hue. Padded seating with deep purple velvet fabric. Heavy-duty metal chains for superior strength.",
        dimensions: "Overall Structure: 200cm W x 100cm D x 220cm H Seat Size: 150cm W x 60cm D",
        weight: "120kg"
    },
    {
        id: 3,
        name: "Regal Carved Teakwood Bed Set",
        description: "Elevate your bedroom with this majestic hand-carved teakwood bed set, a true celebration of traditional craftsmanship and timeless beauty.",
        price: 44999,
        category: "Bedroom",
        images: ["ChatGPT Image Apr 27, 2025, 01_12_09 PM.png"],
        materials: "Solid mahogany frame, with velvet headboard and gold leaf detailing..",
        dimensions: "King Size Bed Frame: 205cm W x 220cm L x 145cm H (headboard height)",
        weight: "Bed Frame: 160kg"
    },
    {
        id: 4,
        name: "Royal Heritage Sofa Set",
        description: "Timeless grandeur with hand-carved details for a regal touch.",
        price: 74999,
        category: "Living Room",
        images: ["ChatGPT Image Apr 28, 2025, 03_53_54 PM.png"],
        materials: "Premium teakwood frame with intricately hand-carved detailing, upholstered in luxurious patterned fabric.",
        dimensions: "Sofa: 210cm W x 90cm D x 110cm H Chair: 90cm W x 85cm D x 105cm H",
        weight: "Sofa: 75kg Chair: 30kg (each)"
    },
    {
        id: 5,
        name: "Classic Teakwood Rocking Chairs",
        description: "Graceful craftsmanship for timeless relaxation and comfort.",
        price: 9999,
        category: "Living Room",
        images: ["ChatGPT Image Apr 28, 2025, 04_00_30 PM.png"],
        materials: "Solid teakwood with hand-woven cane backrest and seat panels.",
        dimensions: "60cm W x 90cm D x 110cm H",
        weight: "18kg"
    },
    {
        id: 6,
        name: "Ornate Teakwood Corner Shelf",
        description: "Exquisite craftsmanship designed to add elegance to every corner.",
        price: 10000,
        category: "Living Room",
        images: ["ChatGPT Image Apr 28, 2025, 04_17_31 PM.png"],
        materials: "Hand-carved solid teakwood with intricate floral motifs.",
        dimensions: "50cm W x 50cm D x 170cm H",
        weight: "22kg"
    },
    {
        id: 7,
        name: "Baroque Elegance Dresser with Mirror",
        description: "A magnificent statement of classic luxury, ideal for opulent interiors and refined spaces.",
        price: 6899,
        category: "Accessories",
        images: ["ChatGPT Image Apr 28, 2025, 04_15_27 PM.png"],
        materials: "Premium hand-carved solid teakwood with an antique golden polish finish. The mirror features ornate sculpted detailing, enhancing its regal charm.",
        dimensions: "Dresser: 140cm W x 50cm D x 95cm H Mirror: 100cm W x 170cm H Total Height (Dresser + Mirror): 265cm",
        weight: "110kg"
    },
    {
        id: 8,
        name: "Regal Carved Teakwood Bed Set",
        description: "STimeless craftsmanship meets luxurious comfort — a perfect centerpiece for elegant bedrooms.",
        price: 44999,
        category: "Bedroom",
        images: ["ChatGPT Image Apr 28, 2025, 04_32_11 PM.png"],
        materials: "Solid mahogany frame, with velvet headboard and gold leaf detailing.",
        dimensions: "King Size Bed Frame: 205cm W x 220cm L x 145cm H (headboard height)",
        weight: "Bed Frame: 160kg"
    }
];


// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMobileNavBtn = document.getElementById('close-mobile-nav');
const mobileNav = document.getElementById('mobile-nav');
const productGrid = document.getElementById('product-grid');
const productModal = document.getElementById('product-modal');
const categoryBtns = document.querySelectorAll('.category-btn');
const navLinks = document.querySelectorAll('a[data-page]');
const pages = document.querySelectorAll('.page');
const contactForm = document.getElementById('contact-form');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Loading animation
  setTimeout(() => {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.visibility = 'hidden';
      mainContent.classList.remove('hidden');
  }, 3000);

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  closeMobileNavBtn.addEventListener('click', toggleMobileMenu);

  // Navigation
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetPage = this.getAttribute('data-page');
          
          // Update navigation active state
          navLinks.forEach(navLink => {
              if (navLink.getAttribute('data-page') === targetPage) {
                  navLink.classList.add('active');
              } else {
                  navLink.classList.remove('active');
              }
          });
          
          // Show the target page, hide others
          pages.forEach(page => {
              if (page.id === targetPage) {
                  page.classList.add('active');
              } else {
                  page.classList.remove('active');
              }
          });
          
          // Close mobile menu if it's open
          if (mobileNav.classList.contains('active')) {
              toggleMobileMenu();
          }
          
          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  });

  // Initialize the product grid
  loadProducts(productData);

  // Category filter buttons
  categoryBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const category = this.getAttribute('data-category');
          
          // Update active button
          categoryBtns.forEach(button => button.classList.remove('active'));
          this.classList.add('active');
          
          // Filter products
          if (category === 'all') {
              loadProducts(productData);
          } else {
              const filteredProducts = productData.filter(product => product.category === category);
              loadProducts(filteredProducts);
          }
      });
  });


  // Scroll reveal animation
  initScrollReveal();
});

// Toggle mobile menu
function toggleMobileMenu() {
  mobileNav.classList.toggle('active');
}

// Load products into the grid
function loadProducts(products) {
  if (!productGrid) return;
  
  productGrid.innerHTML = '';
  
  products.forEach((product, index) => {
      const card = createProductCard(product, index);
      productGrid.appendChild(card);
  });
}

// Create product card element
function createProductCard(product, index) {
  const card = document.createElement('div');
  card.classList.add('product-card');
  card.style.animationDelay = `${index * 0.1}s`;
  
  card.innerHTML = `
      <span class="category-tag">${product.category}</span>
      <div class="image-container">
          <img src="${product.images[0]}" alt="${product.name}">
          <div class="overlay"></div>
      </div>
      <div class="card-content">
          <h3>${product.name}</h3>
          <p class="description">${product.description}</p>
          <div class="card-footer">
              <span class="price">Rs.${product.price.toLocaleString()}</span>
              <button class="view-btn">View Details</button>
          </div>
          <div class="corner corner-tl"></div>
          <div class="corner corner-br"></div>
      </div>
  `;
  
  // Add click event to open modal
  card.addEventListener('click', () => {
      showProductModal(product);
  });
  
  // Add to visible products after a small delay
  setTimeout(() => {
      card.classList.add('visible');
  }, 100);
  
  return card;
}

// Show product modal
function showProductModal(product) {
    const modalBody = productModal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <div class="modal-image">
            <img src="${product.images[0]}" alt="${product.name}">
            <div class="overlay"></div>
            <span class="modal-category">${product.category}</span>
        </div>
        <div class="modal-details">
            <div class="modal-header">
                <h2>${product.name}</h2>
                <div class="price">Rs.${product.price.toLocaleString()}</div>
            </div>
            
            <div class="modal-description">
                <p>${product.description}</p>
            </div>
            
            <div class="modal-specs">
                <div class="spec-item">
                    <h4>Materials</h4>
                    <p>${product.materials}</p>
                </div>
                <div class="spec-item">
                    <h4>Dimensions</h4>
                    <p>${product.dimensions}</p>
                </div>
                <div class="spec-item">
                    <h4>Weight</h4>
                    <p>${product.weight}</p>
                </div>
            </div>
        </div>
    `;
    
    // Show the modal
    productModal.classList.add('active');
    
    // Close button functionality
    const closeModal = productModal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        productModal.classList.remove('active');
    });
    
    // Close when clicking outside the modal content
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
        }
    });
}

// Initialize scroll reveal animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!revealElements.length) return;
  
  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
          }
      });
  }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
      revealObserver.observe(element);
  });
}

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
      header.style.padding = '0.6rem 0';
      header.style.background = 'rgba(38, 20, 7, 0.95)';
  } else {
      header.style.padding = '1rem 0';
      header.style.background = 'linear-gradient(to bottom, rgba(60, 31, 13, 0.95), rgba(38, 20, 7, 0.9))';
  }
});