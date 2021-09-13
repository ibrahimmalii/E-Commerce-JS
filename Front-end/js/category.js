//ajax call
let mydata = []
fetch('http://localhost:8000/api/products')
    .then(res => res.json()).then((data) => {
        console.log(data);
        mydata = data;

        // disply data in div
        for (i = 0; i < mydata.data.length; i++) {

            myDiv = ` <div class="col-md-4">
                <div class="card mt-4" style="max-width: 16rem;
                max-height: 25rem;">
                  <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${mydata.data[i]['title']}</h5>
                    <a href="#" class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]['title']}','${mydata.data[i].price}'
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
     onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]['title']}','${mydata.data[i].price}',
     '${mydata.data[i].description}','${i}.jpg')"></i>
   
    </a> 
    </div>`

            $("#grid").append(myDiv);


        }
    });

// add content of any cart click to localstroge
    var productList = []

  function showProduct(myId,myTitle,myPrice,myDecraption,myImage){

    // debugger;
    let cart = {};
  if(localStorage.carts){
      cart=JSON.parse(localStorage.carts);
      let found = false;
      for(item in cart){
          if(cart[item].id == myId){
              found = true;
              cart[item].count++;
              break;
          }  
      }
      if(!found){
          cart={id:myId,price:myPrice,title:myTitle,description:myDecraption,image:myImage,count:1};
      }
  }
  else{
    cart={id:myId,price:myPrice,title:myTitle,description:myDecraption,image:myImage,count:1};
    // document.getElementById('myDiv').style.backgroundColor='red';

}
    productList.push(cart);

  localStorage.setItem("carts",JSON.stringify(productList));
}

// open page display my card on click

function showCard(Id, Title, Price, Decraption, Image) {

    // will work in three step
    //step one catch data and store it in localstorage 

    let products = []
    let cartDetails = {
        id: Id,
        title: Title,
        price: Price,
        description: Decraption,
        image: Image
    }
    products.push(cartDetails);
    // 2 set data and open window

    localStorage.setItem('opencard', JSON.stringify(products))
    let newWin = open('../html/product.html', "_self");
    console.log(opendata)
        //3 disply in card
        //  $("#grid2").append(opendata); in   second page 
}


//search operator

function searchNav(){

    let searchInp = document.getElementById('searchVal');

    let myDiv ='';
    debugger;
    for (var i = 0; i < mydata.data.length; i++) {

        if (mydata.data[i].title.toLowerCase().includes(searchInp.value.toLowerCase())){

            myDiv = `<div class="col-md-4">
      <div class="card mt-4" style="max-width: 16rem;
      max-height: 25rem;">
        <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
        <div class="card-body">
          <h5 class="card-title">${mydata.data[i]['title']}</h5>
          <a href="#" class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]['title']}','${mydata.data[i].price}'
          ,'${mydata.data[i].description}','${i}.jpg')">Show details</a>
          <div class="ml-1 mt-2">
            <i class="fas fa-star text-primary "></i>
              <i class="fas fa-star text-primary "></i>
              <i class="fas fa-star text-primary "></i>
              <i class="fas fa-star text-primary "></i>
              <i class="fas fa-star text-primary "></i>
          </div>
<div class="mt-2">   
<a href="" style="text-decoration: none ;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr" onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]['title']}','${mydata.data[i].price}','${mydata.data[i].description}',
'${i}.jpg')"></i>
</div>`
      
        }
        
        let myGrid = document.getElementById('grid');
        myGrid.innerHTML = myDiv;
        console.log(myDiv)
     
}
}


    //range price
    var rangeslider = document.getElementById("sliderRange");
     var output = document.getElementById("demo");
output.innerHTML = rangeslider.value;
rangeslider.oninput=function(){
output.innerHTML = this.value;
for(i=0; i< mydata.data.length;i++) {
  // debugger;
  myDiv='';

  if (mydata.data[i].price==output.innerHTML){
    myDiv =`<div class="col-md-4">
        <div class="card mt-4" style="max-width: 16rem;
        max-height: 25rem;">
          <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
          <div class="card-body">
            <h5 class="card-title">${mydata.data[i]['title']}</h5>
            <a href="#" class="btn btn-danger" onclick="showCard('${mydata.data[i].id}','${mydata.data[i]['title']}','${mydata.data[i].price}'
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
onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]['title']}','${mydata.data[i].price}',
'${mydata.data[i].description}','${i}.jpg')"></i>
</a> 
</div>   
</div>`
} 
let myGrid = document.getElementById('grid');
    myGrid.innerHTML=myDiv;
    console.log(myDiv)
}
}







