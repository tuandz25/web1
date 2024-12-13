var modalBody = document.querySelector(".modal-body");
var signUp = document.getElementById("sign-up-btn");
var signIn = document.getElementById("sign-in-btn");

modalBody.addEventListener("click", function (event) {
  event.stopPropagation(); // ấn vô khung modal body sẽ kh bị tắt
});

function showSignIn() {
  document.getElementById("sign-in").style.display = "block";
  document.getElementById("sign-up").style.display = "none";
}

function showSignUp() {
  document.getElementById("sign-up").style.display = "block";
  document.getElementById("sign-in").style.display = "none";
}

function showPassword() {
  var icon = document.querySelector(".sign-up-showpass .show-hide");
  passwords.forEach(function (password) {
    if (password.type == "password") {
      icon.classList.replace("uil-eye", "uil-eye-slash");
      password.type = "text";
    } else {
      icon.classList.replace("uil-eye-slash", "uil-eye");
      password.type = "password";
    }
  });
}

function showSignInPassword() {
  var icon = document.querySelector(".sign-in-showpass .show-hide");
  if (signInPassword.type == "password") {
    icon.classList.replace("uil-eye-slash", "uil-eye");
    signInPassword.type = "text";
  } else {
    icon.classList.replace("uil-eye", "uil-eye-slash");
    signInPassword.type = "password";
  }
}

var userAccount = JSON.parse(localStorage.getItem("userAccount"));
var email = document.getElementById("email");
var passwords = document.querySelectorAll(".password");
var myName = document.getElementById("user-name");

if (!userAccount) {
  userAccount = [
    {
      cartList: [],
      userName: "Admin",
      userEmail: "admin@gmail.com",
      userPassword: "admin",
      userFullName: "Admin",
      userPhone: "0123456789",
      userAddress: "Admin",
      userDate: "20/10/2024",
      type: "admin",
      stt: 1,
    },
    {
      cartList: [],
      userName: "Random",
      userEmail: "random@gmail.com",
      userPassword: "random",
      userFullName: "Random",
      userPhone: "0123456789",
      userAddress: "Random",
      userDate: "20/11/2024",
      type: "user",
      stt: 1,
    },
  ];
  localStorage.setItem("userAccount", JSON.stringify(userAccount));
}

function checkSameAccount(email) {
  for (var i = 0; i < userAccount.length; i++) {
    if (email == userAccount[i].userEmail) {
      return true;
    }
  }
  return false;
}

function createAccount() {
  var rePassword = document.getElementById("re-password");
  var password = document.getElementById("true-password");
  var today = new Date().toLocaleDateString(); // Định nghĩa biến today

  if (checkSameAccount(email.value)) {
    document.querySelector(".error.email").innerHTML = "Email đã tồn tại!";
    return false;
  } else {
    document.querySelector(".error.email").innerHTML = "";
  }

  if (rePassword.value != password.value) {
    document.querySelector(".error.password").innerHTML =
      "Mật khẩu không trùng khớp!";
    return false;
  } else {
    document.querySelector(".error.password").innerHTML = "";
    userAccount.push({
      cartList: [],
      userName: myName.value,
      userEmail: email.value,
      userPassword: password.value,
      userFullName: "",
      userPhone: "",
      userAddress: "",
      userDate: today,
      type: "user",
      stt: 1,
    });
    localStorage.setItem("userAccount", JSON.stringify(userAccount));
  }

  // Reset form và thông báo
  alert("Đăng ký thành công! Vui lòng đăng nhập để sử dụng tài khoản.");
  document.getElementById("sign-up").reset(); // Reset form

  // Điều hướng về trang chủ
  window.location.href = "index.html";
  return true;
}


// Check và Login
var signInEmail = document.getElementById("sign-in-email");
var signInPassword = document.getElementById("sign-in-password");

function checkLogIn() {
  if (userAccount != null) {
    for (var i = 0; i < userAccount.length; i++) {
      if (
        signInEmail.value == userAccount[i].userEmail &&
        signInPassword.value != userAccount[i].userPassword
      ) {
        return 4;
      } else if (
        signInEmail.value == userAccount[i].userEmail &&
        signInPassword.value == userAccount[i].userPassword &&
        userAccount[i].type === "user"
      ) {
        if (userAccount[i].stt == 0) {
          localStorage.setItem("userAccountIndex", i);
          return 0;
        }
        localStorage.setItem("userAccountIndex", i);
        return 1;
      } else if (
        signInEmail.value == userAccount[i].userEmail &&
        signInPassword.value == userAccount[i].userPassword &&
        userAccount[i].type === "admin"
      ) {
        localStorage.setItem("userAccountIndex", i);
        return 2;
      }
    }
  }
}

function LogIn() {
  const loginResult = checkLogIn(); // Gọi checkLogIn một lần duy nhất
  const userIndex = localStorage.getItem("userAccountIndex");

  switch (loginResult) {
    case 1:
      const loggedInUser = userAccount[userIndex].userEmail;
      localStorage.setItem("loggedInUser", loggedInUser);
      localStorage.setItem("isLogIn", 1);
      alert("Đăng nhập thành công!");
      location.reload();
      break;
    case 2:
      localStorage.setItem("isLogIn", 2);
      location.reload();
      break;
    case 0:
      alert('Tài khoản "' + userAccount[userIndex].userName + '" đã bị khóa!');
      localStorage.setItem("isLogIn", 0);
      location.reload();
      break;
    case 4:
      alert("Sai mật khẩu!");
      localStorage.setItem("isLogIn", 0);
    
      break;
    default:
      alert("Tài khoản không tồn tại vui lòng đăng ký");
      break;
  }
}

function LogOut() {
  localStorage.removeItem("loggedInUser"); // Xóa người dùng đang đăng nhập
  localStorage.setItem("isLogIn", 0);
  localStorage.setItem("userAccountIndex", "");

  // Điều hướng về trang chủ (hoặc trang đăng nhập)
  window.location.href = "index.html";
}

// show user
var noneUser = document.querySelector(".header__none-user");
var user = document.querySelector(".header__user");
var admin = document.querySelector(".header__admin");
var index;

function showUserGroup(name, name1, name2) {
  if (name) name.style.display = "block";
  if (name1) name1.style.display = "none";
  if (name2) name2.style.display = "none";
}

var isLogIn = localStorage.getItem("isLogIn");
if (isLogIn === "1") {
  // Giá trị của localStorage là chuỗi
  const index = JSON.parse(localStorage.getItem("userAccountIndex"));

  if (userAccount && userAccount[index]?.type === "admin") {
    showUserGroup(admin, noneUser, user);
  } else if (userAccount && userAccount[index]) {
    var changeUserName = document.querySelector(
      ".header__user .header__user-name"
    );
    if (changeUserName) {
      changeUserName.innerHTML = userAccount[index].userName;
    }
    showUserGroup(user, noneUser, admin);
  }
} else if (isLogIn === "2") {
  window.location.href = "admin.html";
} else {
  showUserGroup(noneUser, user, admin);
}
