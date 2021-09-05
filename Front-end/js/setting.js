// app.post('/setting',(request , response) => {
//     console.log(request)
// })

$.ajax({
    url: 'http://localhost:8000/api/products',
    type: 'Get',
    // data: $('#form').serialize(),
    dataType: 'json',
    success: function (response) {
        console.log('from ajax call');
        console.log(response);
        // location.replace('http://127.0.0.1:5502/index.html');
    },
    error: function (error) {
        console.log(error);
    }

});
// End Of Ajax Call