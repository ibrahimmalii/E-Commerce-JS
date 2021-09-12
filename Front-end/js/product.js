
        // opendata = JSON.parse(opendata);

        let opendata = JSON.parse(localStorage.getItem('opencard'))


let mycardDetails=` <div class="col-md-12">
<div class="card mt-4 align-center" style="max-width: 300rem;
max-height: 30rem;">
  <div class="col-md-12 ceneter ">
  <img src="../public/cat-images/images/${opendata[0]['image']}" style="max-width: 20rem;max-height: 15rem;" alt="...">
  </div>

  <div class="card-body ceneter">
    <h5 class="card-title">${opendata[0]['title']}</h5>
    <h5 class="card-title">${opendata[0]['price']} $</h5>
    <h5 class="card-title">${opendata[0]['description']}</h5>

    <div class="ml-1 mt-2">
      <i class="fas fa-star text-primary "></i>
        <i class="fas fa-star text-primary "></i>
        <i class="fas fa-star text-primary "></i>
        <i class="fas fa-star text-primary "></i>
        <i class="fas fa-star text-primary "></i>
    </div>
       <i class="fas fa-shopping-cart gr"></i>
       
</div>`


        $("#grid2").append(mycardDetails);


