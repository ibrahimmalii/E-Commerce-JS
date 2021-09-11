//====================================== Check authorization and authentication ===========================//
// Get user role and token from local_storage
const user_role = localStorage.user_role;
const token = localStorage.token;

if (user_role != 2 || !token) {
  window.open('/html/login.html' , "_self");
};


var back = document.getElementById('back');
var users = document.getElementById('users');
var usersData = [];




back.addEventListener('click', () => {
  window.open("/Admin/index.html", "_self")
});



//========================== Get all users ===================================//
$.ajax({
  url: 'http://localhost:8000/api/users',
  type: 'GET',
  headers: { "Authorization": `Bearer ${token}` },
  dataType: 'json',
  success: async function (response) {
    console.log('from ajax call');
    usersData = await response;
    console.log(usersData);

    // Loop for all users
    usersData.data.forEach(item => {
      //create div container all users
      var user = document.createElement('div');
      user.classList.add('card-header');
      user.classList.add('p-4');

      // create span for user email
      var email = document.createElement('span');
      email.classList.add('fw-bold');
      email.classList.add('h4');
      email.innerHTML = item.email;
      user.appendChild(email);

      // Create btn to delete any user
      if (item.role == 1) {
        var deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn');
        deleteBtn.classList.add('btn-danger');
        deleteBtn.classList.add('pull-right');
        deleteBtn.innerHTML = 'Delete';
        user.appendChild(deleteBtn);

        // How To Delete User
        deleteBtn.addEventListener('click', (e) => {
          var usersRows = document.getElementsByClassName('card-header');
          console.log(usersRows);

          if (confirm('Are You Sure You Want Do This?')) {
            $.ajax({
              url: `http://localhost:8000/api/user/delete/${item.id}`,
              type: 'Delete',
              headers: { "Authorization": `Bearer ${token}` },
              dataType: 'json',
              success: function (response) {
                console.log('from delete user');
                usersRows.forEach((index, value) => {
                  value.display = 'none';
                })
                // if (response.data == true) location.reload();
              },
              error: function (error) {
                console.log(error);
              }

            });
            //================ End Of Delete User ==================//
          }
        })
      };

      // Add all elements into container
      users.appendChild(user);


    })

  },
  error: function (error) {
    console.log(error);
  }
});
    // End Of Ajax Call
