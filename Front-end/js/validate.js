function validation(type , pattern , errMessage)
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


export {validation as validate};