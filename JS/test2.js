// Hàm để hiển thị đơn hàng từ local storage
function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || []; // Lấy dữ liệu đơn hàng từ local storage
    const tbody = document.getElementById('ordersTableBody'); // Lấy tbody của bảng

    tbody.innerHTML = ''; // Xóa nội dung hiện tại của tbody

    orders.forEach(order => {
        const row = document.createElement('tr'); // Tạo một hàng mới

        // Tạo các ô cho từng thuộc tính của đơn hàng
        const statusCell = document.createElement('td');
        statusCell.textContent = order.status; // Trạng thái đơn hàng

        const orderCell = document.createElement('td');
        orderCell.textContent = order.order; // Thông tin đơn hàng

        const timeCell = document.createElement('td');
        timeCell.textContent = order.time; // Thời gian

        const addressCell = document.createElement('td');
        addressCell.textContent = order.address; // Địa chỉ

        const actionCell = document.createElement('td');
        const actionButton = document.createElement('button');
        actionButton.textContent = 'Xem thông tin'; // Đổi tên nút
        actionButton.style.backgroundColor = '#4CAF50'; // Màu nền
        actionButton.style.color = 'white'; // Màu chữ
        actionButton.style.border = 'none'; // Không viền
        actionButton.style.borderRadius = '5px'; // Bo góc 
        actionButton.style.padding = '10px 20px'; // Padding
        actionButton.style.cursor = 'pointer'; // Con trỏ chuột
        actionButton.onclick = () => showOrderDetail(order); // Gọi hàm hiển thị chi tiết đơn hàng
        actionCell.appendChild(actionButton);

        // Thêm các ô vào hàng
        row.appendChild(statusCell);
        row.appendChild(orderCell);
        row.appendChild(timeCell);
        row.appendChild(addressCell);
        row.appendChild(actionCell);

        // Thêm hàng vào tbody
        tbody.appendChild(row);
    });
}

// Hàm hiển thị chi tiết đơn hàng trong modal
function showOrderDetail(order) {
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
      <p><strong>Trạng thái:</strong> ${order.status}</p>
      <p><strong>Thông tin đơn hàng:</strong> ${order.order}</p>
      <p><strong>Thời gian:</strong> ${order.time}</p>
      <p><strong>Địa chỉ:</strong> ${order.address}</p>
    `;

    const modal = document.getElementById('orderModal');
    modal.style.display = 'block'; // Hiển thị modal
}

// Đóng modal khi nhấn vào nút đóng
document.getElementById('closeModal').onclick = function () {
    const modal = document.getElementById('orderModal');
    modal.style.display = 'none'; // Ẩn modal
}

// Đóng modal khi nhấn ra ngoài modal
window.onclick = function (event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        modal.style.display = 'none'; // Ẩn modal
    }
}
//---------------------------------------------------------------------------------------
// Hàm để lọc đơn hàng
function filterOrders() {
    // Lấy giá trị từ các trường lọc
    

    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const orderStatus = document.getElementById('orderStatus').value;
    //const orderAddress = document.getElementById('address');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Lọc đơn hàng dựa trên các tiêu chí
    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.time); // Giả sử mỗi đơn hàng có thuộc tính 'date'
        const isWithinDateRange = (!startDate || orderDate >= new Date(startDate)) &&
                                  (!endDate || orderDate <= new Date(endDate));
        const isStatusMatch = !orderStatus || order.status === orderStatus;

        return isWithinDateRange && isStatusMatch;
    });

    // Cập nhật bảng hiển thị đơn hàng
    updateOrdersTable(filteredOrders);
}

// Hàm để cập nhật bảng đơn hàng
function updateOrdersTable(orders) {
    const ordersTableBody = document.getElementById('ordersTableBody');

    ordersTableBody.innerHTML = ''; // Xóa nội dung cũ

    // Thêm từng đơn hàng vào bảng
    orders.forEach(order => {
        const row = document.createElement('tr');

        const actionCell = document.createElement('td');
        const actionButton = document.createElement('button');
        actionButton.textContent = 'Xem thông tin'; // Đổi tên nút
        actionButton.style.backgroundColor = '#4CAF50'; // Màu nền
        actionButton.style.color = 'white'; // Màu chữ
        actionButton.style.border = 'none'; // Không viền
        actionButton.style.borderRadius = '5px'; // Bo góc 
        actionButton.style.padding = '10px 20px'; // Padding
        actionButton.style.cursor = 'pointer'; // Con trỏ chuột
        actionButton.onclick = () => showOrderDetail(order); // Gọi hàm hiển thị chi tiết đơn hàng
        actionCell.appendChild(actionButton);

        row.innerHTML = `
            <td>${order.status}</td>
            <td>${order.order}</td>
            <td>${order.time}</td>
            <td>${order.address}</td>
        `;
        row.appendChild(actionCell);
        ordersTableBody.appendChild(row);
    });
}

// Gán sự kiện cho nút lọc
document.getElementById('filterButton').addEventListener('click', filterOrders);

//---------------------------------------------------------------------------------------



// Gọi hàm để hiển thị đơn hàng khi trang được tải
document.addEventListener('DOMContentLoaded', displayOrders);