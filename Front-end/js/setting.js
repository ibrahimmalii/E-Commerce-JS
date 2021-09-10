import { validate } from "./validate.js";
window.addEventListener("load", function() {

if (!localStorage.getItem("user")) {
  window.open("/html/login.html", "_self");
} else {
  var userData = localStorage.getItem("user");
  userData = JSON.parse(userData);
  document.getElementsByClassName("userName")[0].innerHTML = userData.name;
  document.getElementsByClassName("email")[0].innerHTML = userData.email;
  document.getElementsByClassName("phone")[0].innerHTML = userData.phone_number;
  document.getElementsByClassName("city")[0].innerHTML = userData.city;
}

  let btnsendone = document.getElementById("one");
  let btnsendtwo = document.getElementById("two");
  let btnsendthree = document.getElementById("three");

  btnsendone.addEventListener("click", () => {
    console.log($("#form").serialize());
    $.ajax({
      url: `http://localhost:8000/api/user/updateemail/2`,
      type: "post",
      dataType: "json",
      data: $("#form").serialize(),
      success: function (response) {
        console.log("from ajax call");
        console.log(response);
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
  btnsendtwo.addEventListener("click", () => {
    $.ajax({
      url: `http://localhost:8000/api/user/updatepassword/2`,
      type: "post",
      typeof: "json",
      data: $("#formTwo").serialize(),
      success: function (response) {
        console.log("from ajax call");
        console.log(response);
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
  btnsendthree.addEventListener("click", () => {
    $.ajax({
      url: `http://localhost:8000/api/user/updatecontact/2`,
      type: "post",
      typeof: "json",
      data: $("#formThree").serialize(),
      success: function (response) {
        console.log("from ajax call");
        console.log(response);
      },
      error: function (error) {
        console.log(error);
      },
    });
  });

  var allInputs = document.getElementsByTagName("input");
  let getUserName = document.getElementById("username");
  let getemail = document.getElementById("email");
  let getpassword = document.getElementById("password");

  var allErr = document.getElementsByTagName("small");
  let getUserErr = document.getElementById("userNameErr");
  let getEmailErr = document.getElementById("emailErr");
  let getPasswordErr = document.getElementById("passwordErr");

  getUserName.addEventListener("blur", function () {
    validate(getUserName, /^[a-zA-Z]{6,30}$/, getUserErr);
  });

  getemail.addEventListener("blur", function () {
    validate(
      getemail,
      /^[a-zA-Z0-9]{2,20}@[a-zA-Z]{2,20}.(es|com|org)$/,
      getEmailErr
    );
  });

  getpassword.addEventListener("blur", function () {
    validate(getpassword, /^[a-zA-Z0-9]{8,}$/, getPasswordErr);
  });

  document.getElementById("one").addEventListener("click", (e) => {
    // debugger;
    for (var i = 0; i < allErr.length && allInputs.length; i++) {
      if (
        allErr[i].style.display == "block" ||
        allInputs[i].value.length == 0 
        // password_confirmation.value != password.value
      ) {
        console.log("block");
        allErr[i].style.display = "block";
        e.preventDefault();
        return false;
      }
    }
  });

  let password = document.getElementById("inputpassword");
  let newpassword = document.getElementById("inputNewPassword");
  let password_confirmation = document.getElementById("inputConfirmPassword");

  let passworderr = document.getElementById("passwordTwo");
  let newpassworderr = document.getElementById("newpasswordErr");
  let passwordconfirmerr = document.getElementById("confirmpasswordErr");

  password.addEventListener("blur", function () {
    if (!(password.value == getpassword.value)) {
      password.select();
      passworderr.style.display = "block";
    }
  });

  newpassword.addEventListener("blur", function () {
    validate(newpassword, /^[a-zA-Z0-9]{8,}$/, newpassworderr);
  });

  password_confirmation.addEventListener("blur", function () {
    if (password_confirmation.value != getpassword.value) {
      passwordconfirmerr.style.display = "block";
      password_confirmation.select();
    } else {
      passwordconfirmerr.style.display = "none";
    }
  });

  document.getElementById("two").addEventListener("click", (e) => {
    // debugger;
    for (var i = 0; i < allErr.length && allInputs.length; i++) {
      if (
        allErr[i].style.display == "block" ||
        allInputs[i].value.length == 0 ||
        password_confirmation.value != password.value
      ) {
        console.log("block");
        allErr[i].style.display = "block";
        e.preventDefault();
        return false;
      }
    }
  });

  let phone_number = document.getElementById("phone_number");
  let city = document.getElementById("city");
  let passconfirm = document.getElementById("confirmPass");

  let phoneNumberErr = document.getElementById("phoneNumberErr");
  let cityErr = document.getElementById("cityErr");
  let confirm = document.getElementById("passwordErrTwo");

  city.addEventListener("blur", function () {
    validate(city, /^[a-zA-Z]{4,20}$/, cityErr);
  });

  phone_number.addEventListener("blur", function () {
    validate(phone_number, /^(010|011|012|015)[0-9]{8}$/, phoneNumberErr);
  });

  passconfirm.addEventListener("blur", function () {
    if (!(passconfirm.value == getpassword.value)) {
      passconfirm.select();
      confirm.style.display = "block";
    }
  });

  document.getElementById("three").addEventListener("click", (e) => {
    // debugger;
    for (var i = 0; i < allErr.length && allInputs.length; i++) {
      if (
        allErr[i].style.display == "block" ||
        allInputs[i].value.length == 0 ||
        password_confirmation.value != password.value
      ) {
        console.log("block");
        allErr[i].style.display = "block";
        e.preventDefault();
        return false;
      }
    }
  });
});
