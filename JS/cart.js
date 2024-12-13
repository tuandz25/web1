function isUserLoggedIn() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  console.log("Trạng thái người dùng đăng nhập:", loggedInUser);
  return !!loggedInUser; // Trả về true nếu loggedInUser tồn tại
}

function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = getProducts().find((p) => p.id === productId);

  if (product) {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1; // Tăng số lượng nếu sản phẩm đã có trong giỏ
    } else {
      cart.push({ ...product, quantity: 1 }); // Thêm sản phẩm mới vào giỏ
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
    console.log("Giỏ hàng hiện tại:", cart);
  } else {
    console.error("Không tìm thấy sản phẩm!");
  }
}

function buyProduct(productId) {
  const isLogIn = localStorage.getItem("isLogIn");
  if (isLogIn !== "1") {
    const modal = document.getElementById("account__modal");
    if (modal) {
      modal.style.display = "flex"; // Hiển thị form ở giữa
    } else {
      alert("Lỗi: Không tìm thấy form đăng nhập!");
    }
    return;
  }
  // Nếu đã đăng nhập, thêm sản phẩm vào giỏ hàng
  const product = getProducts().find((item) => item.id === productId);
  if (!product) {
    alert("Sản phẩm không tồn tại!");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1; // Tăng số lượng nếu đã có
  } else {
    cart.push({ ...product, quantity: 1 }); // Thêm sản phẩm mới
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Cập nhật giỏ hàng
  alert("Thêm vào giỏ hàng thành công!");
  viewCart();
}

function viewCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-container");
  const emptyCartImage = document.getElementById("emptyCartImage");

  if (!cartContainer) {
    console.error("Không tìm thấy container giỏ hàng.");
    return;
  }

  cartContainer.innerHTML = ""; // Xóa nội dung cũ

  // Thêm tiêu đề "Giỏ hàng"
  const title = document.createElement("h1");
  title.textContent = "Giỏ hàng";
  title.style.textAlign = "center";
  title.style.marginBottom = "20px";
  title.style.padding = "5px";
  title.style.paddingBottom = "30px";
  title.style.borderBottom = "1px solid #847b20";

  title.style.marginTop = "20px";
  cartContainer.appendChild(title); // Thêm tiêu đề vào container giỏ hàng

  if (cartItems.length === 0) {
    if (emptyCartImage) emptyCartImage.style.display = "block";

    const emptyMessage = document.createElement("p");
    emptyMessage.style.textAlign = "center";
    emptyCartImage.style.display = "padding-left:200px";
    cartContainer.appendChild(emptyMessage);
  } else {
    if (emptyCartImage) emptyCartImage.style.display = "none";

    const contentWrapper = document.createElement("div");
    contentWrapper.style.display = "flex";
    contentWrapper.style.justifyContent = "space-between";
    contentWrapper.style.gap = "20px";

    const productContainer = document.createElement("div");
    productContainer.style.flex = "1";

    let totalPrice = 0;

    cartItems.forEach((item, index) => {
      const productDiv = document.createElement("div");
      productDiv.className = "cart-item";
      productDiv.style.display = "flex";
      productDiv.style.marginBottom = "20px";
      productDiv.style.gap = "10px";
      productDiv.style.alignItems = "center";

      productDiv.innerHTML = `
                    <img src="${item.image}" alt="${
        item.name
      }" style="height: 100px; width: 100px; padding-left: 0;" />
                    <div>
                        <h3>${item.name}</h3>
                        <p>Giá: ${item.price.toLocaleString()}₫</p>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <button class="decrease-quantity" style="padding: 5px;">-</button>
                            <span>Số lượng: ${item.quantity || 1}</span>
                            <button class="increase-quantity" style="padding: 5px;">+</button>
                        </div>
                    </div>
                `;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Xóa";
      deleteButton.style.padding = "5px 10px";
      deleteButton.style.backgroundColor = "#FF5733";
      deleteButton.style.color = "white";
      deleteButton.style.border = "none";
      deleteButton.style.borderRadius = "5px";
      deleteButton.style.cursor = "pointer";
      deleteButton.addEventListener("click", () => {
        cartItems.splice(index, 1); // Xóa sản phẩm khỏi mảng
        localStorage.setItem("cart", JSON.stringify(cartItems)); // Cập nhật giỏ hàng
        viewCart(); // Làm mới giao diện
      });

      productDiv.appendChild(deleteButton);

      totalPrice += item.price * (item.quantity || 1);
      productContainer.appendChild(productDiv);

      const decreaseButton = productDiv.querySelector(".decrease-quantity");
      const increaseButton = productDiv.querySelector(".increase-quantity");
      const quantityDisplay = productDiv.querySelector("span");

      // Nút giảm số lượng
      decreaseButton.addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
          localStorage.setItem("cart", JSON.stringify(cartItems));
          viewCart(); // Làm mới giao diện
        }
      });

      // Nút tăng số lượng
      increaseButton.addEventListener("click", () => {
        item.quantity++;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        viewCart(); // Làm mới giao diện
      });
    });

    const formContainer = document.createElement("div");
    formContainer.style.flex = "1";
    formContainer.innerHTML = `
                <h3 style="margin: 20px; padding-left:20px">Thông tin giao hàng:</h3>
                <form id="checkout-form">
                    <div style="margin-bottom: 20px;">
                        <label for="name">Họ và tên:</label><br>
                        <input type="text" id="name" name="name" required style="width: 50%; min-height:30px; border-radius:4%;" />
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label for="address">Địa chỉ:</label><br>
                        <input type="text" id="address" name="address" required style="width: 50%; min-height:30px; border-radius:4%;" />
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label for="phone">Số điện thoại:</label><br>
                        <input type="tel" id="phone" name="phone" required style="width: 50%; min-height:30px; border-radius:4%;" />
                    </div>
                    <div style="margin-bottom: 10px; display: flex; gap: 10px; align-items: center;">
                        <h4>Phương thức thanh toán:</h4>
                        <label>
                            <input type="radio" name="payment-method" value="cash" required /> Tiền mặt
                        </label>
                        <label>
                            <input type="radio" name="payment-method" value="bank-transfer" required /> Chuyển khoản
                        </label>
                    </div>
                </form>
            `;

    contentWrapper.appendChild(productContainer);
    contentWrapper.appendChild(formContainer);
    cartContainer.appendChild(contentWrapper);

    const footerContainer = document.createElement("div");
    footerContainer.style.display = "flex";
    footerContainer.style.justifyContent = "space-between";
    footerContainer.style.alignItems = "center";
    footerContainer.style.marginTop = "20px";
    footerContainer.style.padding = "10px";
    footerContainer.style.borderTop = "1px solid #ccc";

    const totalContainer = document.createElement("div");
    totalContainer.style.fontWeight = "bold";
    totalContainer.style.fontSize = "18px";
    totalContainer.id = "total-price";
    totalContainer.textContent = `Tổng tiền: ${totalPrice.toLocaleString()}₫`;

    const orderButton = document.createElement("button");
    orderButton.textContent = "Đặt hàng";
    orderButton.style.padding = "10px 20px";
    orderButton.style.backgroundColor = "#4CAF50";
    orderButton.style.color = "white";
    orderButton.style.border = "none";
    orderButton.style.borderRadius = "5px";
    orderButton.style.cursor = "pointer";

    orderButton.addEventListener("click", () => {
      const name = document.getElementById("name").value.trim();
      const address = document.getElementById("address").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const paymentMethod = document.querySelector(
        'input[name="payment-method"]:checked'
      )?.value;

      if (!name) {
        alert("Vui lòng nhập tên.");
        return;
      }

      if (!address) {
        alert("Vui lòng nhập địa chỉ.");
        return;
      }

      if (!phone) {
        alert("Vui lòng nhập số điện thoại.");
        return;
      }

      if (!paymentMethod) {
        alert("Vui lòng chọn phương thức thanh toán.");
        return;
      }

      // Kiểm tra số điện thoại với biểu thức chính quy
      const phoneRegex = /^0[1-9]\d{8}$/;
      if (!phoneRegex.test(phone)) {
        alert(
          "Số điện thoại không hợp lệ. Đảm bảo số điện thoại bắt đầu bằng '0' và chữ số thứ hai không phải '0'."
        );
        return;
      }

      // Tạo đơn hàng mới
      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        name,
        address,
        phone,
        paymentMethod,
        items: cartItems,
        totalPrice: cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      };

      // Lưu đơn hàng vào localStorage
      saveOrder(newOrder);

      // Xóa giỏ hàng
      localStorage.removeItem("cart");

      // Thông báo và làm mới giao diện
      alert("Đặt hàng thành công!");
      viewCart();
    });

    footerContainer.appendChild(totalContainer);
    footerContainer.appendChild(orderButton);
    cartContainer.appendChild(footerContainer);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Khởi tạo `orders` nếu chưa tồn tại
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify([])); // Mảng rỗng cho đơn hàng
  }

  console.log("Orders khởi tạo:", JSON.parse(localStorage.getItem("orders")));

  // Gắn sự kiện cho biểu tượng giỏ hàng
  const cartIcon = document.getElementById("cartIcon");
  if (cartIcon) {
    cartIcon.addEventListener("click", viewCart);
  }

  // Gắn sự kiện cho nút "Đặt hàng"
  const orderButton = document.getElementById("orderButton");
  if (orderButton) {
    orderButton.addEventListener("click", placeOrder);
  }
});

function saveOrder(order) {
  const loggedInUser = localStorage.getItem("loggedInUser"); // Lấy email của người dùng đang đăng nhập
  if (!loggedInUser) {
    alert(
      "Không có người dùng nào đang đăng nhập! Vui lòng đăng nhập để đặt hàng."
    );
    return;
  }

  // Tìm tài khoản của người dùng dựa trên email
  const userAccountIndex = userAccount.findIndex(
    (user) => user.userEmail === loggedInUser
  );
  if (userAccountIndex === -1) {
    alert("Tài khoản không tồn tại!");
    return;
  }

  // Lấy danh sách [ĐƠN HÀNG] hiện tại hoặc tạo mới nếu chưa có 
  const userOrders = userAccount[userAccountIndex].orders || [];
  userOrders.push(order);

  // Cập nhật lại đơn hàng và lưu vào localStorage
  userAccount[userAccountIndex].orders = userOrders;
  localStorage.setItem("userAccount", JSON.stringify(userAccount));

  console.log(`Đơn hàng của ${loggedInUser}:`, userOrders);
}
