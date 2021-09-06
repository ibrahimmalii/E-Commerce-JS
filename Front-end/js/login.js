import { validate } from "./validate.js";

if(localStorage.getItem('user')){
    let user_role = localStorage.getItem('user_role');
    (user_role == 1) ? window.open("/index.html" , "_self") : window.open("/html/admin.html" , "_self");
}


//=================================== Target Inputs ===============================================//
var allInputs = document.getElementsByTagName('input');
let email = document.getElementsByName('email')[0];
let password = document.getElementsByName('password')[0];
email.select();

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
                console.log('from ajax call');
                console.log($('#loginForm').serialize())
                console.log(response);
                console.log(response.data.user.role);
                
                if(response.data != null){
                    let user_role = response.data.user.role;
                    localStorage.setItem('token' , response.data.access_token);
                    localStorage.setItem('user' ,JSON.stringify( response.data.user));
                    localStorage.setItem('user_role' , user_role);

                    //redirect user as admin or visitor depend in his role 
                    (user_role == 1) ? window.open("/index.html" , "_self") : window.open("/html/admin.html" , "_self");
                }else{
                    alert ('data field')
                } 
            },
            error: function (error) {
                console.log(error);
            }
    
        });
        // End Of Ajax Call
    });
    //=========================================== End Of Submit Form =============================================//

