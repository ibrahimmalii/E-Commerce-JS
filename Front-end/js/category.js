//======================================  Check if products sailed ===========================//

let sells = localStorage.sells;
if (sells) {
  localStorage.sells = JSON.stringify([]);
}

//====================================== ajax call for my product ===========================//
let mydata = [];
fetch("http://localhost:8000/api/products")
  .then((res) => res.json())
  .then((data) => {
    mydata = data;

    //====================================== loop for display data in div ===========================//
    for (i = 0; i < mydata.data.length; i++) {
      myDiv = ` <div class="col-md-4">
                <div class="card mt-4" style="max-width: 16rem;
                max-height: 25rem;">
                  <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${mydata.data[i]["title"]}</h5>
                    <a href="#" class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
                    ,'${mydata.data[i].description}','${i}.jpg','${mydata.data[i].amount}','${mydata.data[i].created_at}'
                    ,'${mydata.data[i].number_of_sales}','${mydata.data[i].rate}','${mydata.data[i].type}','${mydata.data[i].updated_at}')">Show details</a>
                    <div  id="star-container" class="ml-1 mt-2">
                    <i class="fas fa-star text-primary "></i>
                    <i class="fas fa-star text-primary "></i>
                    <i class="fas fa-star text-primary "></i>
                    <i class="fas fa-star text-primary "></i>
                    <i class="fas fa-star text-primary "></i>
                    </div>
    <div class="mt-2">   
    <a href="#" style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
     onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
     '${mydata.data[i].description}','${i}.jpg')"></i>
   
    </a> 
    </div>`;

      $("#grid").append(myDiv);
    }
  });

//======================================  add content of any cart click to localstroge ===========================//

function showProduct(myId, myTitle, myPrice, myDecraption, myImage) {
  let cart = [];
  if (localStorage.carts) {
    cart = JSON.parse(localStorage.carts);
    let found = false;
    for (item in cart) {
      if (cart[item].id == myId) {
        found = true;
        alert("you add it ");
        break;
      }
    }
    if (!found) {
      cart.push({
        id: myId,
        price: myPrice,
        title: myTitle,
        description: myDecraption,
        image: myImage,
        count: 1,
      });
    }
  } else {
    cart.push({
      id: myId,
      price: myPrice,
      title: myTitle,
      description: myDecraption,
      image: myImage,
      count: 1,
    });
  }
  localStorage.setItem("carts", JSON.stringify(cart));

  // counter in mu=y cart
  if (localStorage.carts) {
    cart = JSON.parse(localStorage.carts);
    document.getElementById("count").innerHTML = cart.length;
    $("#count").append(count++);
    count++;
    localStorage.setItem("carts", JSON.stringify(cart));
  }
}

// open page display my card on click

function showCard(
  Id,
  Title,
  Price,
  Decraption,
  Image,
  myAmount,
  myCreated,
  myNumb,
  myRate,
  myType,
  myUpda
) {
  // will work in three step
  //step one catch data and store it in localstorage

  let products = [];
  let cartDetails = {
    id: Id,
    title: Title,
    price: Price,
    description: Decraption,
    image: Image,
    amount: myAmount,
    creat: myCreated,
    numb: myNumb,
    rate: myRate,
    type: myType,
    update: myUpda,
  };
  products.push(cartDetails);
  // 2 set data and open window

  localStorage.setItem("opencard", JSON.stringify(products));
  let newWin = open("../html/product.html", "_self");
  console.log(opendata);
  //3 disply in card
  //  $("#grid2").append(opendata); in   second page
}

//====================================== search operator in navbar===========================//

function searchNav() {
  let searchInp = document.getElementById("searchVal");
  document.getElementById("grid").innerHTML = " ";

  for (var i = 0; i < mydata.data.length; i++) {
    if (
      mydata.data[i].title.toLowerCase().includes(searchInp.value.toLowerCase())
    ) {
      console.log("if");
      myDiv = `<div class="col-md-4">
      <div class="card mt-4" style="max-width: 16rem;
      max-height: 25rem;">
        <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
        <div class="card-body">
          <h5 class="card-title">${mydata.data[i]["title"]}</h5>
          <a href="#" class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
          ,'${mydata.data[i].description}','${i}.jpg')">Show details</a>
          <div class="ml-1 mt-2">
            <i class="fas fa-star text-primary "></i>
              <i class="fas fa-star text-primary "></i>
              <i class="fas fa-star text-primary "></i>
              <i class="fas fa-star text-primary "></i>
              <i class="fas fa-star text-primary "></i>
          </div>
          <div class="mt-2">   
          <a href="" style="text-decoration: none ;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr" onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}','${mydata.data[i].description}',
          '${i}.jpg')"></i>
          </div>`;
      $("#grid").append(myDiv);
    } else {
      console.log("from else");
      myDiv = `<p class="h5 text-light py-4 text-center">No product found with title ""</p>`;
    }
  }
}

//=====================================range price slider===========================//

//=====================================first funcation for set range slider===========================//

var rangeslider = document.getElementById("sliderRange");
var output = document.getElementById("demo");
output.innerHTML = rangeslider.value;
rangeslider.oninput = function () {
  output.innerHTML = this.value;
  document.getElementById("grid").innerHTML = " ";

  for (i = 0; i < mydata.data.length; i++) {
    if (mydata.data[i].price <= this.value) {
      myDiv = `<div class="col-md-4">
        <div class="card mt-4" style="max-width: 16rem;
        max-height: 25rem;">
          <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
          <div class="card-body">
            <h5 class="card-title">${mydata.data[i]["title"]}</h5>
            <a href="#" class="btn btn-danger" onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
            ,'${mydata.data[i].description}','${i}.jpg')">Show details</a>
            <div class="ml-1 mt-2">
              <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
            </div>
<div class="mt-2">   
<a href="#" style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
'${mydata.data[i].description}','${i}.jpg')"></i>
</a> 
</div>   
</div>`;
      $("#grid").append(myDiv);
    }
  }
};

//====================================== type by laptoop===========================//

function displayLap() {
  document.getElementById("grid").innerHTML = " ";

  for (i = 0; i < mydata.data.length; i++) {
    if (mydata.data[i].type == "laptop") {
      myDiv = `<div class="col-md-4">
      <div class="card mt-4" style="max-width: 16rem;
      max-height: 25rem;">
        <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
        <div class="card-body">
          <h5 class="card-title">${mydata.data[i]["title"]}</h5>
          <a href="#" class="btn btn-danger" onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
          ,'${mydata.data[i].description}','${i}.jpg')">Show details</a>
          <div class="ml-1 mt-2">
            <i class="fas fa-star text-primary "></i>
              <i class="fas fa-star text-primary "></i>
              <i class="fas fa-star text-primary "></i>
              <i class="fas fa-star text-primary "></i>
              <i class="fas fa-star text-primary "></i>
          </div>
<div class="mt-2">   
<a href="#" style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
'${mydata.data[i].description}','${i}.jpg')"></i>
</a> 
</div>   
</div>`;
      $("#grid").append(myDiv);
    }
  }
}
//=====================================type by mobile ===========================//
function displayMob() {
  document.getElementById("grid").innerHTML = " ";

  for (i = 0; i < mydata.data.length; i++) {
    if (mydata.data[i].type == "mobile") {
      myDiv = `<div class="col-md-4">
        <div class="card mt-4" style="max-width: 16rem;
        max-height: 25rem;">
          <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
          <div class="card-body">
            <h5 class="card-title">${mydata.data[i]["title"]}</h5>
            <a href="#" class="btn btn-danger" onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
            ,'${mydata.data[i].description}','${i}.jpg')">Show details</a>
            <div class="ml-1 mt-2">
              <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
            </div>
  <div class="mt-2">   
  <a href="#" style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
  onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
  '${mydata.data[i].description}','${i}.jpg')"></i>
  </a> 
  </div>   
  </div>`;
      $("#grid").append(myDiv);
    }
  }
}

//=====================================type by all ===========================//
function  allOf(){
  document.getElementById("grid").innerHTML = " ";

  for (i = 0; i < mydata.data.length; i++) {
    if (mydata.data[i].type === "mobile" ||	 mydata.data[i].type === "laptop") {
      myDiv = `<div class="col-md-4">
        <div class="card mt-4" style="max-width: 16rem;
        max-height: 25rem;">
          <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
          <div class="card-body">
            <h5 class="card-title">${mydata.data[i]["title"]}</h5>
            <a href="#" class="btn btn-danger" onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
            ,'${mydata.data[i].description}','${i}.jpg')">Show details</a>
            <div class="ml-1 mt-2">
              <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
            </div>
  <div class="mt-2">   
  <a href="#" style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
  onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
  '${mydata.data[i].description}','${i}.jpg')"></i>
  </a> 
  </div>   
  </div>`;
      $("#grid").append(myDiv);
    }
  }
}

//====================================== low to heigh price ===========================//

function lowPrice() {
  mydata.data.sort(function (a, b) {
    return parseFloat(a.price) - parseFloat(b.price);
  });
  document.getElementById("grid").innerHTML = " ";

  for (i = 0; i < mydata.data.length; i++) {
    myDiv = `<div class="col-md-4">
          <div class="card mt-4" style="max-width: 16rem;
          max-height: 25rem;">
            <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
            <div class="card-body">
              <h5 class="card-title">${mydata.data[i]["title"]}</h5>
              <a href="#" class="btn btn-danger" onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
              ,'${mydata.data[i].description}','${i}.jpg')">Show details</a>
              <div class="ml-1 mt-2">
                <i class="fas fa-star text-primary "></i>
                  <i class="fas fa-star text-primary "></i>
                  <i class="fas fa-star text-primary "></i>
                  <i class="fas fa-star text-primary "></i>
                  <i class="fas fa-star text-primary "></i>
              </div>
    <div class="mt-2">   
    <a href="#" style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
    onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
    '${mydata.data[i].description}','${i}.jpg')"></i>
    </a> 
    </div>   
    </div>`;
    $("#grid").append(myDiv);
  }
}
//======================================heigh to low price===========================//

function heighPrice() {
  mydata.data.sort(function (a, b) {
    return parseFloat(b.price) - parseFloat(a.price);
  });
  document.getElementById("grid").innerHTML = " ";

  for (i = 0; i < mydata.data.length; i++) {
    myDiv = `<div class="col-md-4">
        <div class="card mt-4" style="max-width: 16rem;
        max-height: 25rem;">
          <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
          <div class="card-body">
            <h5 class="card-title">${mydata.data[i]["title"]}</h5>
            <a href="#" class="btn btn-danger" onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
            ,'${mydata.data[i].description}','${i}.jpg')">Show details</a>
            <div class="ml-1 mt-2">
              <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
            </div>
  <div class="mt-2">   
  <a href="#" style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
  onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
  '${mydata.data[i].description}','${i}.jpg')"></i>
  </a> 
  </div>   
  </div>`;
    $("#grid").append(myDiv);
  }
}
