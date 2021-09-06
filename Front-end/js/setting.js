// if(localStorage.getItem('id')){
//   const userId = localStorage.getItem('id');
// }
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

// });j
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
      url: `http://localhost:8000/api/user/updateemail/8`,
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
  btnsendtwo.addEventListener('click',()=>{
    // console.log($('#formTwo').serialize())
    $.ajax({
      url:`http://localhost:8000/api/user/updatepassword/2`,
      type:"post",
      typeof:"json",
      data:$('#formTwo').serialize(),
      success: function (response) {
        console.log("from ajax call");
        console.log(response);
        // location.replace('http://127.0.0.1:5502/index.html');
      },
      error: function (error) {
        console.log(error);
      },
    })
  })
  btnsendthree.addEventListener('click',()=>{
    // console.log($('#formThree').serialize())
    $.ajax({
      url:`http://localhost:8000/api/user/updatecontact/2`,
      type:'post',
      typeof:'json',
      data:$('#formThree').serialize(),
      success: function (response) {
        console.log("from ajax call");
        console.log(response);
        // location.replace('http://127.0.0.1:5502/index.html');
      },
      error: function (error) {
        console.log(error);
      },

    })
  })
});
