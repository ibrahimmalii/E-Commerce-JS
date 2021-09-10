


//search operator
 
 
// function search(){
//   let searchInp= document.getElementById('searchVal');
//   let myDiv='';
//   for (i=0;i<= mydata.data.length ;i++) {
//     if(searchInp.value === mydata.data[i]['title'] ){
//       myDiv+=` <div class="col-md-4">
//       <div class="card mt-4" style="max-width: 16rem;
//       max-height: 25rem;">
//         <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
//         <div class="card-body">
//           <h5 class="card-title">${mydata.data[i]['title']}</h5>
//           <a href="#" class="btn btn-danger ">Bestseller</a>
//           <div class="ml-1 mt-2">
//             <i class="fas fa-star text-primary "></i>
//               <i class="fas fa-star text-primary "></i>
//               <i class="fas fa-star text-primary "></i>
//               <i class="fas fa-star text-primary "></i>
//               <i class="fas fa-star text-primary "></i>
//           </div>
//    <div class="mt-2">   
//    <a  href="" style="text-decoration: none ;" class="card-text gr">${mydata.data[i]['price']}<i class="fas fa-shopping-cart gr"></i></a> </div>`
//    $( "#grid" ).append(myDiv);
//      console.log(myDiv)
//    }
//     }
  
// }




//ajax call
let mydata=[]
fetch('http://localhost:8000/api/products')
.then(res => res.json()).then((data) => {
    console.log(data);
    mydata=data;

// disply data in div
    for (i=0;i< mydata.data.length ;i++) {

                 myDiv=` <div class="col-md-4">
                <div class="card mt-4" style="max-width: 16rem;
                max-height: 25rem;">
                  <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${mydata.data[i]['title']}</h5>
                    <a href="#" class="btn btn-danger ">Bestseller</a>
                    <div class="ml-1 mt-2">
                      <i class="fas fa-star text-primary "></i>
                        <i class="fas fa-star text-primary "></i>
                        <i class="fas fa-star text-primary "></i>
                        <i class="fas fa-star text-primary "></i>
                        <i class="fas fa-star text-primary "></i>
                    </div>
    <div class="mt-2">   
    <a href="#" style="text-decoration: none ;"> ${mydata.data[i].price}<i class="fas fa-shopping-cart gr" onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]['title']}','${mydata.data[i].price}','${mydata.data[i].description}',
    ' ${i}.jpg')"></i>
   
    </a> 
    </div>`
    
    $( "#grid" ).append(myDiv);
  

    }
});    


var productList=[]
function showProduct(myId,myTitle,myPrice,myDecraption,myImage){
  let cart = {
    id:myId,
    title:myTitle,
    price:    myPrice,

    description:myDecraption,
    image:myImage
  }   
  productList.push(cart);

  console.log( productList)
  localStorage.setItem('carts',JSON.stringify(productList))
}


