if(localStorage.getItem('id')){
  const userId = localStorage.getItem('id');
}
// app.post('/setting',(request , response) => {
//     console.log(request)
// })

// $.ajax({
//     url: 'http://localhost:8000/api/products',
//     type: 'Get',
//     // data: $('#form').serialize(),
//     dataType: 'json',
//     success: function (response) {
//         console.log('from ajax call');
//         console.log(response);
//         // location.replace('http://127.0.0.1:5502/index.html');
//     },
//     error: function (error) {
//         console.log(error);
//     }

// });
// End Of Ajax Call
window.addEventListener("load", () => {
let btnsendone = document.getElementById("one");
let btnsendtwo = document.getElementById("two");
let btnsendthree = document.getElementById("three");


  btnsendone.addEventListener("click", () => {
      console.log($("#form").serialize())
    // var sendData = $("#data").val();
    $.ajax({
      // url: `http://localhost:8000/api/user/updateemail/${userId}`,
      url: `http://localhost:8000/api/user/updateemail/2`,
      type: "post",
      dataType : 'json',
      data: $("#form").serialize(),
      success: function (response) {
        console.log("from ajax call");
        console.log(response);
        // location.replace('http://127.0.0.1:5502/index.html');
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
});
