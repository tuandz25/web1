// Hàm để lấy sản phẩm từ localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Hàm để lưu sản phẩm vào localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Hàm để thêm sản phẩm mới
// tư tưởng: lấy dữ liệu từ Storage, tạo 1 object mới(ở đây là phần tử mới) có id là id lớn nhất hiện tại + 1 
// xong thêm object mới vào mảng object và lưu vào Storage
function addProduct(name, price, category, width, length, height, quantity, image) {
    const products = getProducts();
    const newProduct = {
        // trả về id lớn nhất và + 1 để không bị trùng id
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1, 
        name,
        price: parseFloat(price),
        category,
        width: parseInt(width),
        length: parseInt(length),
        height: parseInt(height),
        quantity: parseInt(quantity),
        // Nếu có ảnh thì lấy ảnh đó còn nếu không có thì lấy ảnh theo link
        image: image || 'https://via.placeholder.com/50'
    };
    products.push(newProduct);
    saveProducts(products);
    return newProduct;
}

// Hàm để cập nhật sản phẩm
// Tư tưởng: tìm index của object thỏa mãn điều kiện là id, các tham số khác của hàm là dữ liệu muốn thay đổi
// sao đó giữ nguyên id và gán các tham số truyền vào => vào object thỏa điều kiện sao đó lưu vào Storage
function updateProduct(id, name, price, category, width, length, height, quantity, image) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        // Tìm kiểm sản phẩm cụ thể và update
        products[index] = { 
            // spread(...): giữ nguyên các key còn lại ở đây là giữ nguyên key id tại vì không thay đổi id
            ...products[index], 
            name, 
            price: parseFloat(price), 
            category,
            width: parseInt(width),
            length: parseInt(length),
            height: parseInt(height), 
            quantity: parseInt(quantity), 
            image 
        };
        saveProducts(products);
    }
}

// Hàm để xóa sản phẩm
// tư tưởng: lấy những id khác id truyền vào(ở đây là id cần xóa) thành 1 mảng mới sao đó lưu mảng mới vào localStorage
function deleteProduct(id) {
    const products = getProducts().filter(p => p.id !== id);
    saveProducts(products);
}

// Hàm để cập nhật bảng sản phẩm
function updateTable() {
    const products = getProducts();
    const productTableBody = document.getElementById('productTableBody');
    // xóa hết toàn bộ dữ liệu rồi mới cập nhật lại
    productTableBody.innerHTML = '';
    if (products.length === 0) {
        productTableBody.innerHTML = '<tr><td colspan="12" class="text-center">Không có sản phẩm nào.</td></tr>';
        return;
    }
    products.forEach(product => {
        const row = productTableBody.insertRow();
        row.className = 'text-center';
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
            <td>${product.name}</td>
            <td>${product.price.toLocaleString()} VNĐ</td>
            <td>${product.category}</td>
            <td>${product.width}</td>
            <td>${product.length}</td>
            <td>${product.height}</td>
            <td>${product.quantity}</td>
            <td>
                <button class="btn btn-sm btn-primary me-1 edit-btn" data-id="${product.id}">Sửa</button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${product.id}">Xóa</button>
            </td>
        `;
    });
}

// Khởi tạo các biến và sự kiện khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    const saveEditBtn = document.getElementById('saveEditBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    let productIdToDelete = null;

    // Sự kiện submit form thêm sản phẩm
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const category = document.getElementById('category').value;
        const width = document.getElementById('width').value;
        const length = document.getElementById('length').value;
        const height = document.getElementById('height').value;
        const quantity = document.getElementById('quantity').value;
        const imageFile = document.getElementById('image').files[0];

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                addProduct(name, price, category, width, length, height, quantity, e.target.result);
                updateTable();
                productForm.reset();
            }
            // readAsDataURL: không đồng bộ cho nên tới lượt nó chạy thì sự kiện onload chạy tiếp cho đến khi hoàn thành...
            reader.readAsDataURL(imageFile);
        } else {
            addProduct(name, price, category, width, length, height, quantity);
            updateTable();
            productForm.reset();
        }
    });

    // Sự kiện lưu chỉnh sửa sản phẩm
    saveEditBtn.addEventListener('click', function() {
        const id = parseInt(document.getElementById('editId').value);
        const name = document.getElementById('editName').value;
        const price = document.getElementById('editPrice').value;
        const category = document.getElementById('editCategory').value;
        const width = document.getElementById('editWidth').value;
        const length = document.getElementById('editLength').value;
        const height = document.getElementById('editHeight').value;
        const quantity = document.getElementById('editQuantity').value;
        const imageFile = document.getElementById('editImage').files[0];

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                updateProduct(id, name, price, category, width, length, height, quantity, e.target.result);
                updateTable();
                editModal.hide();
            }
            reader.readAsDataURL(imageFile);
        } else {
            const currentProduct = getProducts().find(p => p.id === id);
            updateProduct(id, name, price, category, width, length, height, quantity, currentProduct.image);
            updateTable();
            editModal.hide();
        }
    }); 
    
    // Hàm để chỉnh sửa sản phẩm(tìm kiếm sản phẩm theo id và hiện thông tin sản phẩm lên khi nhấn vào nút sửa)
    function editProduct(id) {
        const product = getProducts().find(p => p.id === id);
        if (product) {
            document.getElementById('editId').value = product.id;
            document.getElementById('editName').value = product.name;
            document.getElementById('editPrice').value = product.price;
            document.getElementById('editCategory').value = product.category;
            document.getElementById('editWidth').value = product.width;
            document.getElementById('editLength').value = product.length;
            document.getElementById('editHeight').value = product.height;
            document.getElementById('editQuantity').value = product.quantity;
            const currentImage = document.getElementById('currentImage');
            currentImage.src = product.image;
            currentImage.style.display = 'block';
            editModal.show();
        }
    }
    

    // Sự kiện click cho nút sửa và xóa
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-btn')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            editProduct(id);
        } else if (e.target.classList.contains('delete-btn')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            showDeleteConfirmation(id);
        }
    });

    // Hàm để hiển thị xác nhận xóa sản phẩm
    function showDeleteConfirmation(id) {
        productIdToDelete = id;
        deleteModal.show();
    }

    // Sự kiện xác nhận xóa sản phẩm
    confirmDeleteBtn.addEventListener('click', function() {
        if (productIdToDelete) {
            deleteProduct(productIdToDelete);
            updateTable();
            deleteModal.hide();
            productIdToDelete = null;
        }
    });

    // Cập nhật bảng khi trang được tải
    updateTable();

    // Cập nhật bảng khi có thay đổi trong localStorage từ trang khác
    window.addEventListener('storage', function(e) {
        if (e.key === 'products') {
            updateTable();
        }
    });

    document.addEventListener("click", function(e){
        if(e.target.id === ("linkManager")){
            const mainProductManager = document.querySelector(".mainProductManager");
            mainProductManager.style.display = "block";
        }
    })


    // Sự kiện ẩn hiện khi nhấn vào Quản lí sản phẩm
    document.addEventListener("click", function(e){
        if(e.target.id === 'linkProductManager'){
            const showProductManager = document.getElementById('toggleProductManager');
            const mainLogo = document.getElementById('m1');
            const infoAdmin = document.getElementById('myself');
            const userManager = document.getElementById('qlnd');

            mainLogo.classList.add("hidden");
            infoAdmin.classList.add("hidden");
            userManager.classList.add("hidden");
            userManager.classList.remove("fontdiv");
            showProductManager.classList.remove("hidden");
        }
    })

    // Bỏ hình ảnh khi edit sản phẩm
    document.querySelector('.removeImg').addEventListener('click', function(e) {
        e.preventDefault();
        const currentImage = document.getElementById('currentImage');
        currentImage.src = "https://via.placeholder.com/50";
        
        // Cập nhật sản phẩm trong localStorage
        const id = parseInt(document.getElementById('editId').value);
        const products = getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index].image = "https://via.placeholder.com/50";
            saveProducts(products);
            updateTable(); // Cập nhật bảng để phản ánh các thay đổi
        }
    });
});


