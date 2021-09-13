// Get user role from local_storage
const user_role = localStorage.user_role;
const token = localStorage.token;

var cartData = localStorage.getItem("carts");
cartData = JSON.parse(cartData);
let table = document.getElementById("table");
var value = 1;

//====================================== Check authorization and authentication ===========================//

if (user_role != 1 || !token) {
  window.open('/html/login.html', "_self");
};

const boughtProducts = localStorage.sellProducts;
// window.addEventListener("load", function () {
  cartData.forEach((item, index) => {


    if (boughtProducts && boughtProducts[index] == item.id) {

      

    } else {
      let creattr = document.createElement("tr");
      creattr.classList.add("tr");

      let creatimg = document.createElement("img");
      creatimg.src = `/public/cat-images/images/${item.image}`;
      let creattdone = document.createElement("td");
      creattdone.appendChild(creatimg);

      let creattdtwo = document.createElement("td");
      creattdtwo.innerHTML = item.title;

      let creattdthree = document.createElement("td");
      creattdthree.innerHTML = "white";

      let creattdfour = document.createElement("td");
      creattdfour.innerHTML = item.price;
      creattdfour.classList.add("four");
      let creattdfive = document.createElement("td");

      creatspan = document.createElement("span");
      creatspan.classList.add("span");
      creatspan.innerText = value + " ";
      creattdfive.appendChild(creatspan);

      let creatbtn = document.createElement("button");
      creatbtn.style.width = "25px";
      creatbtn.innerHTML = "+";
      creatbtn.style.display = "inline-block";
      creatbtn.classList.add("one");

      creattdfive.appendChild(creatbtn);

      let creatbtntwo = document.createElement("button");
      creatbtntwo.style.width = "25px";
      creatbtntwo.style.display = "inline-block";
      creatbtntwo.innerText = "-";
      creatbtntwo.classList.add("two");
      creattdfive.appendChild(creatbtntwo);

      let creattdsix = document.createElement("td");
      creattdsix.innerHTML = `<button class='savebtn'>save</button>`;
      creattdsix.classList.add("save");

      let creattdseven = document.createElement("td");
      creattdseven.innerHTML = `<button class='exitbtn'>X</button>`;
      creattdseven.classList.add("exit");

      creattr.appendChild(creattdone);
      creattr.appendChild(creattdtwo);
      creattr.appendChild(creattdthree);
      creattr.appendChild(creattdfour);
      creattr.appendChild(creattdfive);
      creattr.appendChild(creattdsix);
      creattr.appendChild(creattdseven);
      table.appendChild(creattr);
    }


  });

  // =================================== get item from loop =================================//


  var creatspans = document.getElementsByClassName("span");
  var creatbuttons = document.getElementsByClassName("one");
  var createxit = document.getElementsByClassName("exit");
  var creattrows = document.getElementsByClassName("tr");
  var creatsave = document.getElementsByClassName("save");
  var creatbtntwo = document.getElementsByClassName("two");
  var creatfour = document.getElementsByClassName("four");
  var save = document.getElementsByClassName('savebtn');
  var exit = document.getElementsByClassName('exitbtn');



  //event increament
  for (let i = 0; i < creatbuttons.length; i++) {
    creatbuttons[i].addEventListener("click", () => {
      ++creatspans[i].innerHTML;
      let amount = cartData[i].price;
      let result = Number(amount * creatspans[i].innerHTML);
      creatfour[i].innerHTML = result;
    });


    //event in exit button
    exit[i].addEventListener("click", (e) => {
      if (this.confirm("Are you sure from delete?")) {
        creattrows[i].style.display = "none";
        var cartData = JSON.parse(localStorage.getItjem("carts"));
        cartData.splice(i, 1);
        localStorage.setItem("carts", JSON.stringify(cartData));
      } else {
        e.preventDefault();
      }
    });

    //event in save button
    save[i].addEventListener("click", function (e) {
      // let amount = cartData[i].price;
      if (confirm('The purchase will be made')) {
        var num = Number(creatspans[i].innerHTML);
        creatbtntwo[i].disabled = true
        creatbuttons[i].disabled = true;
        creatbuttons[i].style.display = 'none';
        creatbtntwo[i].innerHTML = `<i class='fa fa-check-circle text-dark' style='font-size:25px'></i>`;
        creatbtntwo[i].style.width = "40px";
        creatbtntwo[i].style.backgroundColor = "white";
        exit[i].disabled = true;
        save[i].disabled = true;
        // creattrows[i].style.display = "none";
        let sellProducts = [];
        var cartData = JSON.parse(localStorage.getItem("carts"));
        cartData.splice(i, 1);
        localStorage.setItem("carts", JSON.stringify(cartData));

        //get data by ajax call
        $.ajax({
          url: `http://localhost:8000/api/products/sell/${cartData[i].id}`,
          type: "post",
          headers: { "Authorization": `Bearer ${token}` },
          dataType: "json",
          data: { amount: num },
          success: function (response) {
            console.log(response);
          },
          error: function (error) {
            console.log(error);
          },
        });
      } else {
        e.preventDefault()
      }

    });
  }

  //event in decreament button
  for (let i = 0; i < creatbtntwo.length; i++) {
    creatbtntwo[i].addEventListener("click", () => {
      if (creatspans[i].innerHTML > 1) {
        --creatspans[i].innerHTML;
        let amount = cartData[i].price;
        let result = Number(amount * creatspans[i].innerHTML);
        creatfour[i].innerHTML = result;
      }
    });
  }
// });

