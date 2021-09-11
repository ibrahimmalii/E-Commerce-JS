import { validate } from "./validate.js";

//=================================== Check If User Logged ===============//
if (localStorage.getItem('user')) {
    localStorage.clear();
}

//============================= Handle alert success for register ==========================//
var alert = document.getElementsByClassName('alert')[0];
var closeAlert = document.getElementsByClassName('close')[0];
closeAlert.addEventListener('click', () => {
    alert.style.display = 'none';
});


//=================================== Target Inputs ===============================================//
var allInputs = document.getElementsByTagName('input');
let firstName = document.getElementsByName('first_name')[0];
let lastName = document.getElementsByName('last_name')[0];
let username = document.getElementsByName('username')[0];
let email = document.getElementsByName('email')[0];
let gender = document.getElementsByName('gender');
let phone_number = document.getElementsByName('phone_number')[0];
let city = document.getElementsByName('city')[0];
let password = document.getElementsByName('password')[0];
let password_confirmation = document.getElementsByName('password_confirmation')[0];



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


// firstName.focus();

firstName.addEventListener('blur', function () {
    validate(firstName, /^[a-zA-Z]{2,20}$/, firstNameErr);
});

lastName.addEventListener('blur', function () {
    validate(lastName, /^[a-zA-Z]{2,20}$/, lastNameErr);
});

username.addEventListener('blur', function () {
    validate(username, /^[a-zA-Z\s]{3,20}(?:[a-zA-z]{3})$/gmi, usernameErr);
});

email.addEventListener('blur', function () {
    validate(email, /^[a-zA-Z0-9\.]{1,}\@[a-zA-Z0-9]{2,}\.[a-zA-Z]{2,}$/gmi, emailErr);
});

phone_number.addEventListener('blur', function () {
    validate(phone_number, /^(010|011|012|015)[0-9]{8}$/, phoneNumberErr);
});

city.addEventListener('blur', function () {
    validate(city, /^[a-zA-Z]{4,20}$/, cityErr);
});

password.addEventListener('blur', function () {
    validate(password, /^[a-zA-Z0-9]{8,}$/, passwordErr);
});

password_confirmation.addEventListener('blur', function () {
    if (password_confirmation.value != password.value) {
        passwordConfirmationErr.style.display = 'block';
    } else {
        passwordConfirmationErr.style.display = 'none';
    }
});

//====================================== Data We Will Send To Store User =====================================//


document.getElementById('submit').addEventListener('click', (e) => {
    // debugger;
    for (var i = 0; i < allErr.length && allInputs.length; i++) {
        if (allErr[i].style.display == 'block' || allInputs[i].value.length == 0 || (password_confirmation.value != password.value)) {
            console.log('block');
            allErr[i].style.display = 'block';
            e.preventDefault();
            return false;
        }
    }

    // ========================================= Send Request To Store User ===================================//


    $.ajax({
        url: 'http://localhost:8000/api/register',
        type: 'POST',
        data: $('#form').serialize(),
        dataType: 'json',
        success: function (response) {
            console.log('from ajax call');
            console.log(response);
            console.log(response.data.access_token);
            console.log(response.data.user);

            if (response.data != null) {
                let user_role = response.data.user.role;
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('user_role', user_role);
                alert.style.display = 'block';


                //redirect user as admin or visitor depend in his role 
                setTimeout(() => {
                    (user_role == 1) ? window.open("/index.html", "_self") : window.open("/Admin/index.html", "_self");
                }, 3000);
            } else {
                alert('data field')
            }
        },
        error: function (error) {
            console.log(error);
        }

    });

    // End Of Ajax Call
});
//=========================================== End Of Submit Form =============================================//

