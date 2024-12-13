// anotherFile.js

document.addEventListener("DOMContentLoaded", function () {
    // Lấy dữ liệu giỏ hàng từ localStorage
    const cartData = localStorage.getItem("cart");

    // Kiểm tra xem có dữ liệu giỏ hàng hay không
    if (cartData) {
        // Phân tích cú pháp dữ liệu JSON thành đối tượng JavaScript
        const cartItems = JSON.parse(cartData);
        console.log("Dữ liệu giỏ hàng:", cartItems);

        // Hiển thị giỏ hàng trên trang
        const cartContainer = document.getElementById("cart-container");
        cartItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.textContent = `${item.name} - Số lượng: ${item.quantity}`;
            cartContainer.appendChild(itemDiv);
        });
    } else {
        console.log("Giỏ hàng trống.");
    }
});