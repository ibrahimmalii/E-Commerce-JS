import { validate } from "./validate.js";

let register = document.getElementById('register');
register.addEventListener('click', () => {
    window.open("/html/register.html" , "_self");
})

if (localStorage.getItem('user')) {
    let user_role = localStorage.getItem('user_role');
    (user_role == 1) ? window.open("/index.html", "_self") : window.open("/Admin/index.html", "_self");
};

//============================= Handle alert success for login ==========================//
var alertSuccess = document.getElementsByClassName('alert')[0];
var closeAlertSuccess = document.getElementsByClassName('closeSuccess')[0];
closeAlertSuccess.addEventListener('click', () => {
    alertSuccess.style.display = 'none';
});

//============================= Handle alert field for login ==========================//
var alertError = document.getElementsByClassName('alert')[1];
var closeAlertError = document.getElementsByClassName('closeError')[0];
closeAlertError.addEventListener('click', () => {
    alertError.style.display = 'none';
});



//=================================== Target Inputs ===============================================//
var allInputs = document.getElementsByTagName('input');
let email = document.getElementsByName('email')[0];
let password = document.getElementsByName('password')[0];
// email.select();

//=================================== Target Err Messages ===============================================//
var allErr = document.getElementsByTagName('span');
let emailErr = document.getElementById('emailErr');
let passwordErr = document.getElementById('passwordErr');


email.addEventListener('blur', function () {
    validate(email, /^[a-zA-Z0-9\.]{1,}\@[a-zA-Z0-9]{2,}\.[a-zA-Z]{2,}$/gmi, emailErr);
});

password.addEventListener('blur', function () {
    validate(password, /^[a-zA-Z0-9]{8,}$/, passwordErr);
});


document.getElementById('login').addEventListener('click', (e) => {
    for (var i = 0; i < allErr.length && allInputs.length; i++) {
        if (allErr[i].style.display == 'block' || allInputs[i].value.length == 0) {
            console.log('block');
            allErr[i].style.display = 'block';
            e.preventDefault();
            return false;
        }
    }

    //========================================= Send Request To Store User ===================================//


    $.ajax({
        url: 'http://localhost:8000/api/login',
        type: 'POST',
        data: $('#loginForm').serialize(),
        dataType: 'json',
        success: function (response) {

            if (response.data != null) {
                let user_role = response.data.user.role;
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('user_role', user_role);
                alertSuccess.style.display = 'block';

                //redirect user as admin or visitor depend in his role 
                setTimeout(() => {
                    (user_role == 1) ? window.open("/index.html", "_self") : window.open("/Admin/index.html", "_self");
                }, 3000);
            };

        },
        error: function (error) {
            console.log(error);
            alertError.style.display = 'block';
            email.classList.remove('success');
            email.classList.add('error');
            password.classList.remove('success');
            password.classList.add('error');
            emailErr.style.display = 'block';
            passwordErr.style.display = 'block';
        }

    });
    // End Of Ajax Call
});
    //=========================================== End Of Submit Form =============================================//


