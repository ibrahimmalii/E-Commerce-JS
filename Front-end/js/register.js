import { validate } from "./validate.js";

//=================================== Target Inputs ===============================================//
var allInputs = document.getElementsByTagName('input');
let firstName = document.getElementsByName('first_name')[0];
let lastName = document.getElementsByName('last_name')[0];
let username = document.getElementsByName('username')[0];
let email = document.getElementsByName('email')[0];
let phone_number = document.getElementsByName('phone_number')[0];
let city = document.getElementsByName('city')[0];
let password = document.getElementsByName('password')[0];
let password_confrmation = document.getElementsByName('password_confrmation')[0];



//=================================== Target Err Messages ===============================================//
var allErr = document.getElementsByTagName('small');
let firstNameErr = document.getElementById('firstNameErr');
let lastNameErr = document.getElementById('lastNameErr');
let usernameErr = document.getElementById('usernameErr');
let emailErr = document.getElementById('emailErr');
let phoneNumberErr = document.getElementById('phoneNumberErr');
let cityErr = document.getElementById('cityErr');
let passwordErr = document.getElementById('passwordErr');
let passwordConfirmationErr = document.getElementById('passwordConfirmationErr');


firstName.focus();

firstName.addEventListener('blur', function () {
    validate(firstName, /^[a-zA-Z]{2,20}$/, firstNameErr);
});

lastName.addEventListener('blur', function () {
    validate(lastName, /^[a-zA-Z]{2,20}$/, lastNameErr);
});

username.addEventListener('blur', function () {
    validate(username, /^[a-zA-Z]{6,30}$/, usernameErr);
});

email.addEventListener('blur', function () {
    validate(email, /^[a-zA-Z0-9]{2,10}@[a-zA-Z]{2,10}.(es|com|org)$/, emailErr);
});

phone_number.addEventListener('blur', function () {
    validate(phone_number, /^[a-zA-Z]{6,20}$/, phoneNumberErr);
});

city.addEventListener('blur', function () {
    validate(city, /^[a-zA-Z]{4,20}$/, cityErr);
});

password.addEventListener('blur', function () {
    validate(password, /^[a-zA-Z0-9]{8,}$/, passwordErr);
});

password_confrmation.addEventListener('blur', function () {
    if (password_confrmation.value != password.value) {
        passwordConfirmationErr.style.display = 'block';
        password_confrmation.select();
    } else {
        passwordConfirmationErr.style.display = 'none';
    }
});

document.forms[0].addEventListener('submit', (e) => {
    // debugger;    
    for(var i = 0 ; i < allErr.length && allInputs.length ; i++){
        console.log(allInputs[i].value.length);
        if(allErr[i].style.display == 'block' || allInputs[i].value.length == 0 || (password_confrmation.value != password.value)){
            console.log('block');
            allErr[i].style.display = 'block';
            e.preventDefault();
            return false;
        }

    }
})