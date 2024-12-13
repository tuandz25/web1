
const firstProducts = [
    { id: 1, name: "Tủ sách XƯƠNG RỒNG", price: 110000, category: "MINI",width: 17, length: 40, height: 41, quantity: 1,image: "images/KeSach1.png" },
    { id: 3, name: "Tủ sách Barrett", price: 3330000, category: "ĐỨNG", width: 28, length: 90, height: 170, quantity: 2,image:"images/KeSach3.png" },
    { id: 4, name: "Tủ sách BURRA", price: 2688000, category: "ĐỨNG", width: 30, length: 100, height: 130, quantity: 3, image:"images/KeSach4.png" },
    { id: 5, name: "Tủ sách CL180-06", price: 1310000, category: "ĐỨNG", width: 30, length: 60, height: 180, quantity: 1, image:"images/KeSach5.png" },
    { id: 6, name: "Tủ sách KT07", price: 2200000, category: "ĐỨNG", width: 35, length: 100, height: 200, quantity: 2, image:"images/KeSach6.png" },
    { id: 7, name: "Tủ sách KIYOSAKI", price: 1353000, category: "TREO TƯỜNG", width: 20, length: 97, height: 97, quantity: 3, image:"images/KeSach7.png" },
    { id: 8, name: "Tủ sách KT335", price: 973500, category: "TREO TƯỜNG", width: 20, length: 80, height: 20, quantity: 1, image:"images/KeSach8.png" },
    { id: 9, name: "Tủ sách GHS-2641", price: 2900000, category: "ĐỨNG", width: 26, length: 80, height: 120, quantity: 2, image:"images/KeSach9.jpg"},
    { id: 10, name: "Tủ sách Combo 2 mẫu", price: 7200000, category: "ĐỨNG", width: 10, length: 60, height: 140, quantity: 3, image:"images/KeSach10.jpg" },
    { id: 11, name: "Tủ sách GHS-2565", price: 5200000, category: "ĐỨNG",width: 30, length: 150, height: 220, quantity: 1, image:"images/KeSach11.jpg" },
    { id: 13, name: "Tủ sách AP281", price: 1218000, category: "ĐỨNG",width: 25, length: 111, height: 170, quantity: 2, image:"images/KeSach13.png" },
    { id: 14, name: "Tủ sách AP280", price: 1120000, category: "ĐỨNG",width: 31, length: 222, height: 210, quantity: 3, image:"images/KeSach14.png" },
];

function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}
function saveProducts(products) { 
    localStorage.setItem('products', JSON.stringify(products)); 
}

saveProducts(firstProducts);


let filteredProducts = getProducts(); 
let currentPage = 1;
const itemsPerPage = 3;

function displayProducts(page = currentPage, products = filteredProducts) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageProducts = products.slice(start, end);

    const productList = document.getElementById('product-list');
    productList.innerHTML = pageProducts.map(product => `
        <div class="product-item">
            <img src="${product.image}" alt="${product.name}" class="product-image" onclick="viewProductDetails(${product.id})">
            <h3 class="name">${product.name}</h3>
            <div class="info">
               <p>Loại: ${product.category}</p>
               <p class="Price">Giá: ${product.price.toLocaleString()} VND</p>
               <button class="buy-button" onclick="buyProduct(${product.id})">Mua</button>
            </div>
        </div>
    `).join('');
    updatePagination(products.length);
}

// Tìm kiếm sản phẩm
function searchProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    filteredProducts = getProducts().filter(product => 
        product.name.toLowerCase().includes(query)
    );

    // Đặt lại `currentPage` về 1 sau khi tìm kiếm
    currentPage = 1;
    // Hiển thị sản phẩm đã lọc và cập nhật phân trang
    displayProducts(currentPage, filteredProducts);
}

// Tìm kiếm nâng cao
function advancedSearch() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const minPrice = parseInt(document.getElementById('min-price').value, 10) || 0;
    const maxPrice = parseInt(document.getElementById('max-price').value, 10) || Infinity;
    const category = document.getElementById('category').value;

    filteredProducts = getProducts().filter(product => 
        product.name.toLowerCase().includes(query) &&
        product.price >= minPrice && product.price <= maxPrice &&
        (!category || product.category === category)
    );

    // Đặt lại `currentPage` về 1 sau khi tìm kiếm
    currentPage = 1;
    // Hiển thị sản phẩm đã lọc và cập nhật phân trang
    displayProducts(currentPage, filteredProducts);
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById('pagination');
    const maxVisiblePages = 3;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    }

    let pageButtons = '';

    if (totalPages <= maxVisiblePages) {
        pageButtons += Array.from({ length: totalPages }, (_, i) => `
            <button onclick="changePage(${i + 1})" ${currentPage === i + 1 ? 'style="background-color:black;color:white;border-radius:5px"class="active"' : ''}>
                ${i + 1}
            </button>
        `).join('');
    } else {
        pageButtons += `
            <button onclick="changePage(1)" ${currentPage === 1 ? 'style="background-color:black;color:white;border-radius:5px"' : ''}>1</button>
            ${startPage > 2 ? '<span>...</span>' : ''}
            ${Array.from({ length: endPage - startPage + 1 }, (_, i) => `
                ${startPage + i === 1 || startPage + i === totalPages ? '' : `
                    <button onclick="changePage(${startPage + i})" ${currentPage === startPage + i ? 'style="background-color:black;color:white;border-radius:5px"' : ''}>
                        ${startPage + i}
                    </button>
                `}
            `).join('')}
            ${endPage < totalPages - 1 ? '<span>...</span>' : ''}
            <button onclick="changePage(${totalPages})" ${currentPage === totalPages ? 'style="background-color:black;color:white;border-radius:5px"' : ''}>
                ${totalPages}
            </button>
        `;
    }

    pagination.innerHTML = `
        <button onclick="prevPage()" ${currentPage === 1 ? 'disabled' : ''}>
            <
        </button>
        ${pageButtons}
        <button onclick="nextPage()" ${currentPage === totalPages ? 'disabled' : ''}>
            >
        </button>
    `;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(currentPage, filteredProducts);
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts(currentPage, filteredProducts);
    }
}

function changePage(pageNumber) {
    currentPage = pageNumber;
    displayProducts(currentPage, filteredProducts);
}


document.getElementById('search-bar').addEventListener('input', searchProducts);
displayProducts(currentPage);


//Thông tin chi tiết sản phẩm
function viewProductDetails(productId) {
    const updateProducts = getProducts();
    const product = updateProducts.find(p => p.id === productId);
    if (!product) return;

    const productList = document.getElementById('product-list'); 
    productList.style.display = 'none';

    const relatedProducts = document.getElementById('related-products');
    relatedProducts.style.display = 'block';
    
    const page = document.getElementById('pagination'); 
    page.style.display = 'none';

    const productDetails = document.getElementById('product-details'); 
    productDetails.innerHTML =  ` 
        <div class="product-detail" style="display:flex;"> 
           <img src="${product.image}" alt="${product.name}" class="product-image-detail">
           <div class="info-detail" style="justify-content: left;text-align:left">
                <h1 class="name-detail">${product.name}</h1> 
                <p>Loại: ${product.category}</p> 
                <p>Giá: ${product.price.toLocaleString()} VND</p>
                <button class="buy-button" onclick="buyProduct(${product.id})">Mua</button> 
                <button class="back-button" onclick="closeProductDetails()">Quay lại</button>
                <h3>Thông tin chi tiết:</h3> 
                <div class="detail-info">
                    <p>Số Lượng(giới hạn):${product.quantity}</p> 
                    <p>Chiều rộng: ${product.width} ,chiều cao: ${product.length}, chiều dài: ${product.height}</p> 
                </div>
           <div> 
        </div>
         `; 
    productDetails.style.display = 'block';
    displayRelatedProducts(productId);
}

//sản phẩm có liên quan (cùng loại)
function displayRelatedProducts(currentProductId) { 
    const updateProducts = getProducts();
    const product = updateProducts.find(p => p.id === currentProductId);
    if (!product) return; 
 
    const relatedProducts = updateProducts.filter(p => p.id !== currentProductId 
        && p.category === product.category).slice(0); 
    
    const relatedProductsContainer = document.getElementById('related-products'); 
    relatedProductsContainer.innerHTML = ` 
        <h3>Sản phẩm có liên quan</h3> 
        ${relatedProducts.map(product => ` 
            <div class="related-product-item"> 
            <img src="${product.image}" alt="${product.name}" class="related-product-image" onclick="viewProductDetails(${product.id})">  
            </div> `).join('')
        } `;
    relatedProductsContainer.style.display = 'block'; // Hiển thị sản phẩm liên quan 
}

function closeProductDetails() { 
    const productDetails = document.getElementById('product-details'); 
    productDetails.style.display = 'none'; 

    const relatedProductsContainer = document.getElementById('related-products'); 
    relatedProductsContainer.style.display = 'none'; 

    const productList = document.getElementById('product-list'); 
    productList.style.display = 'flex';

    const page = document.getElementById('pagination'); 
    page.style.display = 'flex';
}

//ẩn header khi cuộn lên
let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageXOffset || document.documentElement.scrollTop;
  
  if (scrollTop < lastScrollTop) {
    header.classList.add("header-hidden");
  } else {
    header.classList.remove("header-hidden");
  }

  lastScrollTop = scrollTop;
});

const searchbar = document.getElementById('search-bar');
const advanced = document.getElementById('advanced-Search');
const aIcon= document.getElementById('a_icon');
const searchfilter= document.getElementById('search-filter');
const user_name = document.getElementById('user-name');

aIcon.addEventListener("click",(event)=>{
    searchfilter.classList.toggle('show');
    event.stopPropagation();
})

searchbar.addEventListener("click", (event) => {
    advanced.classList.toggle("hidden");
    event.stopPropagation(); 
});

document.addEventListener("click",(event) => {
    if(!advanced.contains(event.target) && !searchbar.contains(event.target))
    {
        advanced.classList.add("hidden");
    }
})

//Menu
const contentMenu = document.getElementById("header__group-menu");
const iconMenu = document.getElementById("icon-menu");
const overlay=document.getElementById("overlay");

iconMenu.addEventListener("click", (event) => {
    contentMenu.style.display = "block";
    overlay.style.display = "block";
    event.stopPropagation();
});

document.addEventListener("click", (event) => {
    if (window.innerWidth <= 739 && !contentMenu.contains(event.target) && event.target !== iconMenu) 
        { 
            contentMenu.style.display = "none";
            overlay.style.display="none"
        }
});

contentMenu.addEventListener("click", (event) => {
    event.stopPropagation();
});

// ẩn menu mỗi khi load lại trang
if(window.innerWidth <= 739) {
    window.onload = function() { 
        const contentMenu = document.getElementById("header__group-menu"); 
        contentMenu.style.opacity = '0'; 
        contentMenu.style.transform = 'translateX(100%)'; 
        contentMenu.style.display = 'none'; 
    };    
}

window.addEventListener('storage', function(e) {
    if (e.key === 'products') {
        const updatedProducts = getProducts();
        displayProducts(1, updatedProducts);
    }
});

function buyProduct(id) {
    const product = products.find(p => p.id === id);
    alert(`Bạn đã chọn mua: ${product.name} với giá ${product.price.toLocaleString()} VND`);
    // khi bấm mua...
}


