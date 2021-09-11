
        let opendata = JSON.parse(localStorage.getItem('opencard'))
        // opendata = JSON.parse(opendata);
        console.log(opendata[0]['image'])

        let mycardDetails = `<div class="col-md-12 text-center">
 <div class="row " id="grid2">
   <div class="col-md-4">
    <img src="/public/cat-images/images/${opendata[0]['image']}">
   </div>
   <div class="col-md-8">
     <h5 class="card-title">tilte:${opendata[0]['title']}</h5>
     <h5 class="card-price"> price:${opendata[0]['price']}</h5>
     <h5 class="card-decraption">decraption:${opendata[0]['description']}</h5>
     <div class="ml-1 mt-2">
         <i class="fas fa-star text-primary "></i>
           <i class="fas fa-star text-primary "></i>
           <i class="fas fa-star text-primary "></i>
           <i class="fas fa-star text-primary "></i>
           <i class="fas fa-star text-primary "></i>
       </div>
       <i class="fas fa-shopping-cart gr"></i>
 </div> `

        $("#grid2").append(mycardDetails);


        $("#grid2").append(opendata);
        console.log(opendata);
