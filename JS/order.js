document.addEventListener("DOMContentLoaded", function () {
    const ordersContainer = document.getElementById("orders-container");

    if (!ordersContainer) {
        return;
    }

    // Lấy thông tin người dùng đang đăng nhập
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        ordersContainer.innerHTML = "<p style='text-align: center; font-size: 18px; color: #555;'>Bạn chưa đăng nhập. Vui lòng đăng nhập để xem đơn hàng.</p>";
        createExitButton(ordersContainer);
        return;
    }

    // Lấy danh sách tài khoản từ localStorage
    const userAccount = JSON.parse(localStorage.getItem("userAccount")) || [];
    const currentUser = userAccount.find(user => user.userEmail === loggedInUser);

    // Hiển thị tiêu đề
    const title = document.createElement("h1");
    title.textContent = "Danh sách đơn hàng đã đặt";
    title.style.textAlign = "center";
    title.style.marginBottom = "20px";
    title.style.backgroundColor = "#85ef8c";
    title.style.color = "#463c34";
    title.style.padding = "10px 0";

    ordersContainer.appendChild(title);

    if (!currentUser || !currentUser.orders || currentUser.orders.length === 0) {
        const noOrdersMessage = document.createElement("p");
        noOrdersMessage.textContent = "Chưa có đơn hàng nào được đặt.";
        noOrdersMessage.style.textAlign = "center";
        noOrdersMessage.style.fontSize = "18px";
        noOrdersMessage.style.color = "#555";
        ordersContainer.appendChild(noOrdersMessage);

        createExitButton(ordersContainer); // Hiển thị nút "Thoát" khi không có đơn hàng
        return;
    }

    const orders = currentUser.orders;

    // Duyệt qua từng đơn hàng và hiển thị
    orders.forEach((order, index) => {
        const orderDiv = document.createElement("div");
        orderDiv.className = "order-item";
        orderDiv.style.border = "1px solid #ccc";
        orderDiv.style.padding = "20px";
        orderDiv.style.marginBottom = "20px";
        orderDiv.style.borderRadius = "8px";
        orderDiv.style.display = "flex";
        orderDiv.style.justifyContent = "space-between";

        // Cột thông tin đơn hàng
        const orderInfoDiv = document.createElement("div");
        orderInfoDiv.style.flex = "1";
        orderInfoDiv.style.marginRight = "20px";

        orderInfoDiv.innerHTML = `
            <h3>Đơn hàng #${index + 1}</h3>
            <p><strong>Ngày đặt:</strong> ${order.date || "Không có thông tin"}</p>
            <p><strong>Người nhận:</strong> ${order.name || "Không có thông tin"}</p>
            <p><strong>Địa chỉ:</strong> ${order.address || "Không có thông tin"}</p>
            <p><strong>Phương thức thanh toán:</strong> ${order.paymentMethod === "cash"
                ? "Tiền mặt"
                : order.paymentMethod === "bank-transfer"
                    ? "Chuyển khoản"
                    : order.paymentMethod || "Không có thông tin"
            }</p>
        `;
        orderDiv.appendChild(orderInfoDiv);

        // Cột thông tin sản phẩm và tổng tiền
        const orderDetailsDiv = document.createElement("div");
        orderDetailsDiv.style.flex = "2";

        const productsDiv = document.createElement("div");
        productsDiv.style.marginBottom = "15px";

        if (order.items && order.items.length > 0) {
            order.items.forEach((item) => {
                const productDiv = document.createElement("div");
                productDiv.style.display = "flex";
                productDiv.style.alignItems = "center";
                productDiv.style.gap = "20px";
                productDiv.style.marginBottom = "10px";

                // Tìm sản phẩm trong danh sách products dựa trên id
                const product = getProducts().find(p => p.id === item.id);

                if (product) {
                    productDiv.innerHTML = `
                        <div>
                            <img src="/${product.image}" alt="${product.name}" style="width: 100px; height: 100px; object-fit: cover;" />
                        </div>
                        <div>
                            <h4>${product.name}</h4>
                            <p>Giá: ${product.price.toLocaleString()}₫</p>
                            <p>Số lượng: ${item.quantity}</p>
                        </div>
                    `;
                } else {
                    productDiv.innerHTML = `<p>Sản phẩm không tìm thấy</p>`;
                }

                productsDiv.appendChild(productDiv);
            });
        } else {
            productsDiv.innerHTML = "<p>Không có sản phẩm trong đơn hàng.</p>";
        }

        orderDetailsDiv.appendChild(productsDiv);

        // Tổng tiền đơn hàng
        const totalPrice = order.items
            ? order.items.reduce((total, item) => total + item.price * item.quantity, 0)
            : 0;
        const totalDiv = document.createElement("div");
        totalDiv.style.fontWeight = "bold";
        totalDiv.style.fontSize = "18px";
        totalDiv.textContent = `Tổng tiền: ${totalPrice.toLocaleString()}₫`;
        totalDiv.style.marginTop = "10px";
        orderDetailsDiv.appendChild(totalDiv);

        orderDiv.appendChild(orderDetailsDiv);

        // Thêm nút xóa đơn hàng
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Xóa";
        deleteButton.style.padding = "10px 20px";
        deleteButton.style.fontSize = "16px";
        deleteButton.style.cursor = "pointer";
        deleteButton.style.backgroundColor = "#e74c3c";
        deleteButton.style.color = "white";
        deleteButton.style.border = "none";
        deleteButton.style.borderRadius = "5px";
        deleteButton.style.alignSelf = "center";

        deleteButton.addEventListener("click", function () {
            orders.splice(index, 1); // Xóa đơn hàng khỏi mảng
            currentUser.orders = orders; // Cập nhật lại danh sách đơn hàng cho người dùng
            localStorage.setItem("userAccount", JSON.stringify(userAccount)); // Lưu lại vào localStorage
            location.reload(); // Tải lại trang để hiển thị danh sách mới
        });

        orderDiv.appendChild(deleteButton);

        // Thêm đơn hàng vào container
        ordersContainer.appendChild(orderDiv);
    });

    // Thêm nút thoát (quay lại trang trước)
    createExitButton(ordersContainer);
});

// Hàm tạo nút "Thoát"
function createExitButton(container) {
    const exitButton = document.createElement("button");
    exitButton.textContent = "Thoát";
    exitButton.style.padding = "10px 20px";
    exitButton.style.fontSize = "16px";
    exitButton.style.cursor = "pointer";
    exitButton.style.marginTop = "20px";
    exitButton.style.backgroundColor = "#008CBA";
    exitButton.style.color = "white";
    exitButton.style.border = "none";
    exitButton.style.borderRadius = "5px";
    exitButton.style.display = "block";
    exitButton.style.marginLeft = "auto";
    exitButton.style.marginRight = "auto";

    exitButton.addEventListener("click", function () {
        window.history.back();
    });

    container.appendChild(exitButton);
}
