// thay dữ liệu người dùng vào mảng productData

//Danh sach don hang:
const orderList = localStorage.getItem("order");

// Giả lập dữ liệu cho mặt hàng và khách hàng
const productData = [
    { name: "Sản phẩm A", quantitySold: 150, totalRevenue: 3000000, date: "2023-10-01" },
    { name: "Sản phẩm B", quantitySold: 80, totalRevenue: 1600000, date: "2023-10-05" },
    { name: "Sản phẩm C", quantitySold: 200, totalRevenue: 4000000, date: "2023-10-10" },
    { name: "Sản phẩm D", quantitySold: 50, totalRevenue: 1000000, date: "2023-10-15" },
];

const customerData = [
    { name: "Khách Hàng 1", totalRevenue: 2000000, date: "2023-10-01" },
    { name: "Khách Hàng 2", totalRevenue: 5000000, date: "2023-10-05" },
    { name: "Khách Hàng 3", totalRevenue: 3000000, date: "2023-10-10" },
    { name: "Khách Hàng 4", totalRevenue: 1500000, date: "2023-10-15" },
    { name: "Khách Hàng 5", totalRevenue: 7000000, date: "2023-10-20" },
    { name: "Khách Hàng 6", totalRevenue: 1000000, date: "2023-10-25" },
];

// Hàm tạo báo cáo
function generateReport() {
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);
    
    // Hiển thị thống kê mặt hàng
    const productStats = document.getElementById("productStats");
    productStats.innerHTML = ""; // Xóa dữ liệu cũ

    let totalRevenue = 0;
    let bestSellingProduct = { name: "", quantitySold: 0 };
    let leastSellingProduct = { name: "", quantitySold: Infinity };

    productData.forEach(product => {
        const productDate = new Date(product.date);
        if (productDate >= startDate && productDate <= endDate) {
            totalRevenue += product.totalRevenue;

            // Cập nhật mặt hàng bán chạy nhất
            if (product.quantitySold > bestSellingProduct.quantitySold) {
                bestSellingProduct = product;
            }

            // Cập nhật mặt hàng bán ế nhất
            if (product.quantitySold < leastSellingProduct.quantitySold) {
                leastSellingProduct = product;
            }

            // Thêm hàng vào bảng
            const row = `<tr>
                <td>${product.name}</td>
                <td>${product.quantitySold}</td>
                <td>${product.totalRevenue.toLocaleString()} VNĐ</td>
                <td><button class="btn btn-primary" onclick="viewInvoice('${product.name}')">Xem Hóa Đơn</button></td>
            </tr>`;
            productStats.innerHTML += row;
        }
    });

    // Cập nhật tổng thu và mặt hàng bán chạy/ế
    document.getElementById("totalRevenue").innerText = totalRevenue.toLocaleString();
    document.getElementById("bestSellingProduct").innerText = bestSellingProduct.name || "Chưa có dữ liệu";
    document.getElementById("leastSellingProduct").innerText = leastSellingProduct.name || "Chưa có dữ liệu";

    // Hiển thị thống kê khách hàng
    const customerStats = document.getElementById("customerStats");
    customerStats.innerHTML = ""; // Xóa dữ liệu cũ

    customerData.forEach(customer => {
        const customerDate = new Date(customer.date);
        if (customerDate >= startDate && customerDate <= endDate) {
            const row = `<tr>
                <td>${customer.name}</td>
                <td>${customer.totalRevenue.toLocaleString()} VNĐ</td>
                <td>
                <button class="btn btn-info" onclick="viewInvoice('${customer.name}')">Xem Hóa Đơn</button>
                </td>
            </tr>`;
            customerStats.innerHTML += row;
        }
    });

    // Hiển thị 5 khách hàng phát sinh doanh thu nhiều nhất
    const topCustomers = document.getElementById("topCustomers");
    topCustomers.innerHTML = ""; // Xóa dữ liệu cũ

    // Lọc và sắp xếp khách hàng theo doanh thu
    const filteredCustomers = customerData.filter(customer => {
        const customerDate = new Date(customer.date);
        return customerDate >= startDate && customerDate <= endDate;
    });

    filteredCustomers.sort((a, b) => b.totalRevenue - a.totalRevenue); // Sắp xếp theo doanh thu

    // Hiển thị 5 khách hàng phát sinh doanh thu nhiều nhất
    filteredCustomers.slice(0, 5).forEach(customer => {
        const listItem = `<li class="list-group-item">${customer.name} - ${customer.totalRevenue.toLocaleString()} VNĐ</li>`;
        topCustomers.innerHTML += listItem;
    });
}

// Hàm xem hóa đơn
function viewInvoice(customerId) {
    // Logic để lấy dữ liệu hóa đơn cho khách hàng với customerId
    // Đây là một ví dụ đơn giản, bạn có thể thay thế bằng logic thực tế của bạn
    const invoiceData = `Hóa Đơn cho Khách Hàng: ${customerId}. Tổng tiền: 100000 VNĐ.`;

    // Cập nhật nội dung modal
    const invoiceContent = document.getElementById('invoiceContent');
    invoiceContent.innerHTML = `
        <p>${invoiceData}</p>
    `;

    // Hiển thị modal
    const invoiceModal = new bootstrap.Modal(document.getElementById('invoiceModal'));
    invoiceModal.show();
}

// Gọi hàm để cập nhật danh sách khách hàng
// updateTopCustomers();