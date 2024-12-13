function f1() {
  hienttad();
  const d = document.getElementById("dropdownmenu");
  d.classList.toggle("hidden"); //------------------
  document.addEventListener("click", function (event) {
    if (
      !menuAdmin.contains(event.target) &&
      !dropdownmenu.contains(event.target)
    ) {
      dropdownmenu.classList.add("hidden");
    }
  });
}

function hienttad() {
  document.getElementById("name1").innerText = "";

  document.getElementById("fullname").innerText = "";

  for (let i = 0; i < userAccount.length; i++) {
    if (userAccount[i].type == "admin") {
      let a = "Tên tài khoản:" + " " + userAccount[i].userName;
      document.getElementById("name1").innerText = a;

      document.getElementById("fullname").innerText =
        "Tên đầy đủ:" + " " + userAccount[i].userFullName;
    }
  }
}
function linkProductManager() {
  const a = document.getElementById("myself");
  const b = document.getElementById("m1");
  const showOrders = document.getElementById("quan_ly_don_hang");
  const showStatistics = document.getElementById("thong_ke");

  const showProductManager = document.getElementById("toggleProductManager");

  b.classList.add("hidden");
  a.classList.add("hidden");

  const c = document.getElementById("qlnd");
  c.classList.add("hidden");
  c.classList.remove("fontdiv");
  showProductManager.classList.remove("hidden");
  showOrders.classList.add("hidden");
  showStatistics.classList.add("hidden");
}
function linkOrder() {
  const Show_Order_Management = document.getElementById("quan_ly_don_hang");
  Show_Order_Management.classList.remove("hidden");
  const a = document.getElementById("myself");
  const b = document.getElementById("m1");

  const showStatistics = document.getElementById("thong_ke");

  const showProductManager = document.getElementById("toggleProductManager");

  b.classList.add("hidden");
  a.classList.add("hidden");

  const c = document.getElementById("qlnd");
  c.classList.add("hidden");
  c.classList.remove("fontdiv");
  showProductManager.classList.add("hidden");

  showStatistics.classList.add("hidden");
}
function linkStatistics() {
  const Show_Order_Management = document.getElementById("quan_ly_don_hang");
  Show_Order_Management.classList.add("hidden");
  const a = document.getElementById("myself");
  const b = document.getElementById("m1");
  const showOrders = document.getElementById("quan_ly_don_hang");
  const showStatistics = document.getElementById("thong_ke");

  const showProductManager = document.getElementById("toggleProductManager");

  b.classList.add("hidden");
  a.classList.add("hidden");

  const c = document.getElementById("qlnd");
  c.classList.add("hidden");
  c.classList.remove("fontdiv");
  showProductManager.classList.add("hidden");
  showOrders.classList.add("hidden");
  showStatistics.classList.remove("hidden");
}
function f2() {
  const Show_Order_Management = document.getElementById("quan_ly_don_hang");
  Show_Order_Management.classList.add("hidden");
  const a = document.getElementById("myself");
  const b = document.getElementById("m1");
  const showOrders = document.getElementById("quan_ly_don_hang");
  const showStatistics = document.getElementById("thong_ke");

  const showProductManager = document.getElementById("toggleProductManager");

  b.classList.add("hidden");
  a.classList.add("hidden");

  const c = document.getElementById("qlnd");
  c.classList.remove("hidden");
  c.classList.add("fontdiv");
  showProductManager.classList.add("hidden");
  showOrders.classList.add("hidden");
  showStatistics.classList.add("hidden");
  hienthids();
}

function delete_account(i) {
  if (confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
    userAccount.splice(i, 1);
    localStorage.setItem("userAccount", JSON.stringify(userAccount));
    alert("Tài khoản đã bị xóa!");
    hienthids();
  }
}
function lock_account(i) {
  if (userAccount[i].stt == 1) userAccount[i].stt = 0;
  else userAccount[i].stt = 1;
  localStorage.setItem("userAccount", JSON.stringify(userAccount));
  hienthids();
}
let currentUser = null;
function editlist(i) {
  const a = document.getElementById("stta");
  a.style.display = "flex";
  document.body.classList.add("no-scroll");
  currentUser = userAccount[i];
  chinhtt(currentUser);
}
function chinhtt(userAccount) {
  const input1 = document.getElementById("emailin");
  const input2 = document.getElementById("fullnamein");
  const input3 = document.getElementById("phonein");
  const input4 = document.getElementById("addressin");
  const input5 = document.getElementById("datein");
  const input6 = document.getElementById("namein");
  input6.value = userAccount.userName;
  input1.value = userAccount.userEmail;
  input2.value = userAccount.userFullName;
  input3.value = userAccount.userPhone;
  input4.value = userAccount.userAddress;
  input5.value = userAccount.userDate;
}

function f4() {
  const a = document.getElementById("stta");
  a.style.display = "none";
  document.body.classList.remove("no-scroll");
}

var userAccount = JSON.parse(localStorage.getItem("userAccount"));

function f5() {
  let input1 = document.getElementById("emailin");
  currentUser.userEmail = input1.value || "chưa cập nhật";
  let input6 = document.getElementById("namein");
  currentUser.userName = input6.value || "chưa cập nhật";
  let input2 = document.getElementById("fullnamein");
  currentUser.userFullName = input2.value || "chưa cập nhật";
  let input3 = document.getElementById("phonein");
  currentUser.userPhone = input3.value || "chưa cập nhật";
  let input4 = document.getElementById("addressin");
  currentUser.userAddress = input4.value || "chưa cập nhật";
  localStorage.setItem("userAccount", JSON.stringify(userAccount));
  hienthids();
  const a = document.getElementById("stta");
  a.style.display = "none";
  document.body.classList.remove("no-scroll");
}
function logout() {
  localStorage.setItem("isLogIn", 0);
  localStorage.setItem("userAccountIndex", "");

  window.location.reload();
}
const isLogIn = localStorage.getItem("isLogIn");
if (isLogIn == 0) {
  window.location.replace("index.html");
}
function sortlist() {
  const criteria = document.getElementById("sorta").value;

  userAccount.sort((b, c) => {
    if (criteria === "date") {
      return new Date(b.userDate) - new Date(c.userDate);
    } else if (criteria === "string") {
      return b.userName.localeCompare(c.userName);
    }
    return 0;
  });

  hienthids();
}
function delete_arr(a) {
  for (let i = a; i < userAccount.length; i++) {
    userAccount[i] = userAccount[i + 1];
  }
}
function addaccount() {
  const a = document.getElementById("sttb");
  a.style.display = "flex";
  document.getElementById("add_email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("re-password").value = "";
  document.getElementById("add_name").value = "";
  document.getElementById("add_fullname").value = "";
  document.getElementById("add_phone").value = "";
  document.getElementById("add_address").value = "";
  document.getElementById("feedback1").innerText = "";
  document.getElementById("feedbacke").innerText = "";
  document.getElementById("feedbacktt").innerText = "";
  document.getElementById("feedbackttk").innerText = "";
}
function f6() {
  const a = document.getElementById("sttb");
  a.style.display = "none";
  document.body.classList.remove("no-scroll");
}
function add_account() {
  const mail = document.getElementById("add_email").value.trim();
  const pass = document.getElementById("password").value.trim();
  const repass = document.getElementById("re-password").value.trim();
  const name = document.getElementById("add_name").value.trim();
  const fullname = document.getElementById("add_fullname").value.trim();
  const phone = document.getElementById("add_phone").value.trim();
  const address = document.getElementById("add_address").value.trim();
  const today = new Date().toISOString().split("T")[0];
  let hasErrol = false;
  if (!pass || !repass) {
    document.getElementById("feedback1").innerText =
      "*Không được bỏ trống phần mật khẩu!";
    hasErrol = true;
  } else if (pass != repass) {
    document.getElementById("feedback1").innerText =
      "*Mật khẩu không trùng khớp!";
    hasErrol = true;
  } else {
    document.getElementById("feedback1").innerText = "";
  }
  if (!name) {
    document.getElementById("feedbackttk").innerText =
      "*Không được bỏ trống tên tài khoản!";
    hasErrol = true;
  } else {
    document.getElementById("feedbackttk").innerText = "";
  }
  if (!mail) {
    document.getElementById("feedbacke").innerText =
      "*Không được bỏ trống phần email!";
    hasErrol = true;
  } else {
    document.getElementById("feedbacke").innerText = "";
  }
  if (!fullname || !phone || !address) {
    document.getElementById("feedbacktt").innerText =
      "*Không được bỏ trống phần thông tin!";
    hasErrol = true;
  } else {
    document.getElementById("feedbacktt").innerText = "";
  }
  for (let a = 0; a < userAccount.length; a++) {
    if (mail == userAccount[a].userEmail) {
      document.getElementById("feedbacke").innerText = "*Tài khoản đã tồn tại!";
      hasErrol = true;
    }
  }
  if (hasErrol) {
    return;
  }
  userAccount.push({
    userName: name,
    userEmail: mail,
    userPassword: pass,
    userFullName: fullname,
    userPhone: phone,
    userAddress: address,
    userDate: today,
    type: "user",
    stt: 1,
  });
  localStorage.setItem("userAccount", JSON.stringify(userAccount));
  localStorage.setItem("userAccountIndex", userAccount.length - 1);
  hienthids();
  const a = document.getElementById("sttb");
  a.style.display = "none";
  document.body.classList.remove("no-scroll");
  alert("Thêm tài khoản thành công!");
}
function hienthids() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  let count = 0;
  for (let i = 0; i < userAccount.length; i++) {
    if (userAccount[i].type !== "user") continue;
    const a = document.createElement("tr");
    let b = "khóa";
    if (userAccount[i].stt == 0) {
      b = "mở khóa";
    } else {
      b = "khóa";
    }

    a.innerHTML = `
    <td>${count++}</td>
    <td>${userAccount[i].userName}</td>
    <td>${userAccount[i].userEmail}</td>
    <td>${userAccount[i].userFullName}</td>
    <td>${userAccount[i].userDate}</td>
    <td>${userAccount[i].userPhone}</td>
    <td style="text-align:center;">${userAccount[i].stt}</td>
    <td><button onclick="editlist(${i})" class="edit">Sửa</button></td>
   <td ><button onclick="lock_account(${i})" class="lock"  >${b}</button></td>
  <td><button onclick="delete_account(${i})" class="delete" >xóa</button></td>
  `;

    lista.appendChild(a);
  }
}

function enter_search() {
  const name_search = document.getElementById("search").value;
  let count = 0;
  for (let i = 0; i < userAccount.length; i++) {
    if (
      userAccount[i].type == "user" &&
      name_search == userAccount[i].userName
    ) {
      alert("Số thứ tự tài khoản cần tìm:" + count);
      return;
    } else {
      count++;
    }
  }
  alert("không tìm thấy tài khoản!");
  return;
}
function change_pass() {
  const a = document.getElementById("change_pass");
  a.style.display = "flex";
  document.body.classList.add("no-scroll");
  const current_pass = document.getElementById("current_pass");
  const new_pass = document.getElementById("new_pass");
  const re_new_pass = document.getElementById("re_new_pass");
  function reset() {
    current_pass.value = "";
    new_pass.value = "";
    re_new_pass.value = "";
  }
  reset();
}
function closed_change() {
  const a = document.getElementById("change_pass");
  a.style.display = "none";
  document.body.classList.remove("no-scroll");
}
function enter_change() {
  let index = JSON.parse(localStorage.getItem("userAccountIndex"));
  const current_pass = document.getElementById("current_pass").value.trim();
  const new_pass = document.getElementById("new_pass").value.trim();
  const re_new_pass = document.getElementById("re_new_pass").value.trim();

  const feedback = {
    current: document.getElementById("feedback_current_pass"),
    new: document.getElementById("feedback_new_pass"),
    re_new: document.getElementById("feedback_re_new_pass"),
  };

  function resetFeedback() {
    feedback.current.innerText = "";
    feedback.new.innerText = "";
    feedback.re_new.innerText = "";
  }

  function showError(element, message) {
    element.innerText = message;
    hasError = true;
  }

  resetFeedback();

  let hasError = false;

  if (!current_pass) {
    showError(feedback.current, "*Không được để trống phần mật khẩu");
  } else if (current_pass !== userAccount[index].userPassword) {
    showError(feedback.current, "*Sai mật khẩu");
  }

  if (!new_pass) {
    showError(feedback.new, "*Không được để trống mật khẩu mới");
  } else if (new_pass.length < 6) {
    showError(feedback.new, "*Mật khẩu mới phải có ít nhất 6 ký tự");
  }

  if (!re_new_pass) {
    showError(feedback.re_new, "*Không được để trống xác nhận mật khẩu");
  } else if (new_pass !== re_new_pass) {
    showError(feedback.re_new, "*Mật khẩu không trùng khớp");
  }

  if (hasError) return;

  userAccount[index].userPassword = new_pass;
  localStorage.setItem("userAccount", JSON.stringify(userAccount));

  const a = document.getElementById("change_pass");
  a.style.display = "none";
  document.body.classList.remove("no-scroll");
  alert("Đổi mật khẩu thành công!");
}
