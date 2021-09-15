// opendata = JSON.parse(opendata);
var token_name;
if (localStorage.token) {
    token_name = localStorage.token;
}


let opendata = JSON.parse(localStorage.getItem('opencard'))
let mycardDetails = `<div class="col-md-12">
<div class="card mt-4 align-center" style="max-width: 300rem;
max-height: 60rem;">
 <a href="category.html" class="text-left mt-0"><i class=" fa fa-arrow-circle-left fa-3x m-5 exit text-dark "></i></a>

  <div class="col-md-12 ceneter ">
  <img src="../public/cat-images/images/${opendata[0]['image']}" style="max-width: 20rem;max-height: 15rem; " alt="...">
  </div>

  <div class="card-body ceneter">
    <h5 class="card-title">${opendata[0]['title']}</h5>
    <h5 class="card-title">${opendata[0]['price']} $</h5>
    <h5 class="card-title">${opendata[0]['description']}</h5>

    <div id="star-container" class="ml-1 mt-2">
      
    </div>
       <i class="fas fa-shopping-cart gr"></i>   
       </div> 
     </div>  
</div>`
$("#grid2").append(mycardDetails);

function drowStars(numOfstars = 0) {
    for (let i = 0; i < numOfstars; i++) {
        // debugger;
        let icon = `<i id="star-${i+1}" class="fas fa-star text-gray " style="cursor: pointer" onclick="makeRate('star-${i+1}')">
        </i>`

        $("#star-container").append(icon); //= "<i class='fas fa-star text-primary '></i>";
    }
    for (let i = 0; i < 5 - numOfstars; i++) {
        let icon = `<i id="star-${i+numOfstars}"  class="fas fa-star text-gray " style="cursor: pointer" onclick="makeRate('star-${i+1}')"></i>`
        $("#star-container").append(icon);
    }
}
drowStars(opendata[0]['rate']);

function makeRate(c) {
    var storedRate = [];
    var r = opendata[0]['rate'];
    var found = false;
    let num_stars = c;
    if (localStorage.rated) {
        storedRate = JSON.parse(localStorage.rated);
        for (item in storedRate) {
            if (storedRate[item].id ==
                opendata[0]['id'])
                found = true;
        }
        if (!found) {
            storedRate.push({ id: opendata[0]["id"] });
            document.getElementById('star-container').innerHTML = "";
            if (num_stars == 'star-1') {
                r = 1;
                drowStars(1);
            } else if (num_stars == "star-2") {
                r = 2;
                drowStars(2);
            } else if (num_stars == "star-3") {
                r = 3;
                drowStars(3);
            } else if (num_stars == "star-4") {
                r = 4;
                drowStars(4);
            } else {
                r = 5;
                drowStars(5);
            }
        }


    } else {
        storedRate.push({ id: opendata[0]['id'] });
        document.getElementById('star-container').innerHTML = "";
        if (num_stars == 'star-1') {
            r = 1;
            drowStars(1);
        } else if (num_stars == "star-2") {
            r = 2;
            drowStars(2);
        } else if (num_stars == "star-3") {
            r = 3;
            drowStars(3);
        } else if (num_stars == "star-4") {
            r = 4;
            drowStars(4);
        } else {
            r = 5;
            drowStars(5);
        }
    }
    localStorage.setItem("rated", JSON.stringify(storedRate));
    fetch('http://localhost:8000/api/products/rate/3', {

        method: 'POST',
        body: JSON.stringify({ rate: 5 }), // The data
        headers: {
            //'Authorization': "Bearer " + token_name, // The type of data you're sending
        }
    }).then(response => {
        console.log(response);
    });
    console.log("clicked");
}

// function send() {

// }

function drowStars(numOfstars = 0) {
    let c = 1
    for (let i = 0; i < numOfstars; i++) {
        let icon = `<i id="star-${i+1}" class="fas fa-star text-primary " style="cursor: pointer" onclick="makeRate('star-${c}')">
        </i>`
        c++;
        $("#star-container").append(icon); //= "<i class='fas fa-star text-primary '></i>";
    }
    for (let i = 0; i < 5 - numOfstars; i++) {
        let icon = `<i id="star-${i+numOfstars}"  class="fas fa-star text-gray " style="cursor: pointer" onclick="makeRate('star-${c}')"></i>`
        $("#star-container").append(icon);
        c++;
    }
}