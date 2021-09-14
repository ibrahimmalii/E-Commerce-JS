// Target inputs and errors 
let email = document.getElementsByName('email')[0];
let password = document.getElementsByName('password')[0];


//============================= Handle alert success for register ==========================//
var alertSuccess = document.getElementsByClassName('alert')[0];
var closeAlertSuccess = document.getElementsByClassName('closeSuccess')[0];
if(closeAlertSuccess){
    closeAlertSuccess.addEventListener('click', () => {
        alertSuccess.style.display = 'none';
    });
}

//============================= Handle alert field for register ==========================//
var alertError = document.getElementsByClassName('alert')[1];
var closeAlertError = document.getElementsByClassName('closeError')[0];
if(closeAlertError){
    closeAlertError.addEventListener('click', () => {
        alertError.style.display = 'none';
    });
}

//============================= Function for validation =================================//
const validation = (type , pattern , errMessage)=>
{
    if(!type.value.match(pattern)){
        errMessage.style.display = 'block';
        return false;
    }else{
        type.classList.add('success');
        errMessage.style.display = 'none';
        return true;
    }
}



const accessUser = (url)=>{
    $.ajax({
        url: `${url}`,
        type: 'POST',
        data: $('#form').serialize(),
        dataType: 'json',
        success: function (response) {
            console.log(response);
            if (response.data != null) {
                let user_role = response.data.user.role;
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('user_role', user_role);
                alertError.style.display = 'none';
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
            emailErr.innerText = 'Please try another email';
            emailErr.style.display = 'block';
            // password.value = '';
        }

    });

    // End Of Ajax Call
}

export {validation , accessUser};