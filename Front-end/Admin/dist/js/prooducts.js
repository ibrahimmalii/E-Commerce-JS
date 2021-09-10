var back = document.getElementById('back');
var addProduct = document.getElementById('add');


back.addEventListener('click', () => {
  window.open("/Admin/index.html", "_self")
});


//========================== Get all products ===================================//

$.ajax({
  url: 'http://localhost:8000/api/products',
  type: 'GET',
  dataType: 'json',
  success: async function (response) {
    productsData = await response;
    console.log(productsData);

    productsData.data.forEach(item => {

      products.innerHTML += `<div class="row card-body">
            <div class="col"><span class="h3">${item.title}</span> <span>( Rate : ${item.rate} )</span><br><small>${item.description}</small></div>
              <div class="col text-end">
                <form class="form" id="${item.id}">
                  <input type="hidden" name="title" value="${item.title}">
                  <input type="hidden" name="description" value="${item.description}">
                  <input type="hidden" name="type" value="${item.type}">
                  <span class="fw-bold">Amount :
                    <input type="number" name="amount" value="${item.amount}" class="counter"></input>
                  </span>
                  <spnan class="fw-bold"> Price :
                    <input type="number" name="price" value="${item.price}" class="price"></input>
                  </spnan>
                  <input type="button" value="Save" class="btn btn-primary mx-3 save"></input>
                  <input type="button" value="remove" class="btn btn-danger mx-3 remove"></input>
                </form>
              </div>
            </div>
          </div>
          <hr>`;

    });

    var saveItem = document.getElementsByClassName('save');
    var removeItem = document.getElementsByClassName('remove');
    var allForms = document.getElementsByClassName('form');
    var alert = document.getElementsByClassName('alert')[0];
    var closeAlert = document.getElementsByClassName('close')[0];

    closeAlert.addEventListener('click', () => {
      alert.style.display = 'none';
    })

    for (let i = 0; i < removeItem.length; i++) {

      removeItem[i].addEventListener('click', () => {

        if (confirm('Are You Sure You Want To Delete It?')) {
          //================== Delete Current Item =============//
          $.ajax({
            url: `http://localhost:8000/api/products/delete/${allForms[i].id}`,
            type: 'Delete',
            dataType: 'json',
            success: function (response) {
              console.log(response);
              location.reload();
            },
            error: function (error) {
              console.log(error);
            }
          });
          //===================== End Of Delete Item ===============//
        };

      });


      saveItem[i].addEventListener('click', () => {

        //================== Save New Data =============//
        $.ajax({
          url: `http://localhost:8000/api/products/${allForms[i].id}`,
          type: 'POST',
          data: $(`#${allForms[i].id}`).serialize(),
          dataType: 'json',
          success: function (response) {
            console.log(response);
            alert.style.display = 'block';
          },
          error: function (error) {
            console.log(error);
          }
        });
        // End Of Save Data

      })

    }

  },
  error: function (error) {
    console.log(error);
  }
});
// End Of Ajax Call For Get All Products


//============================= Add New Product ====================================//

addProduct.addEventListener('click', () => {
  $.ajax({
    url: 'http://localhost:8000/api/products',
    type: 'POST',
    data: $('#addNewProduct').serialize(),
    dataType: 'json',
    success: function (response) {
      console.log('from ajax call');
      console.log(response);
      location.reload();
    },
    error: function (error) {
      console.log(error);
    }

  });
  // End Of Ajax Call
})

    //============================= End Of Add Product ====================================//

