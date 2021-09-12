let cartData = localStorage.getItem("carts");
cartData = JSON.parse(cartData);
let table = document.getElementById("table");
var value = 1;

window.addEventListener("load", function () {
  cartData.forEach((item, index) => {
    let creattr = document.createElement("tr");
    creattr.classList.add("tr");

    let creatimg = document.createElement("img");
    creatimg.src = `/public/cat-images/images/${cartData[index].image}`;
    let creattdone = document.createElement("td");
    creattdone.appendChild(creatimg);

    let creattdtwo = document.createElement("td");
    creattdtwo.innerHTML = cartData[index].title;

    let creattdthree = document.createElement("td");
    creattdthree.innerHTML = "white";

    let creattdfour = document.createElement("td");
    creattdfour.innerHTML = (cartData[index].price) ;
    creattdfour.classList.add('four')
    let creattdfive = document.createElement("td");
    
    creatspan = document.createElement("span");
    creatspan.classList.add("span");
    creatspan.innerText = value + " ";
    creattdfive.appendChild(creatspan);
    
    let creatbtn = document.createElement("button");
    creatbtn.style.width = "25px";
    creatbtn.innerText = "+";
    creatbtn.classList.add("one");
    
    creattdfive.appendChild(creatbtn);
    
    let creatbtntwo = document.createElement("button");
    creatbtntwo.style.width = "25px";
    creatbtntwo.innerText = "-";
    creatbtntwo.classList.add("two");
    creattdfive.appendChild(creatbtntwo);
    
    let creattdsix = document.createElement("td");
    creattdsix.innerHTML = `<button>save</button>`;
    creattdsix.classList.add("save");
    
    let creattdseven = document.createElement("td");
    creattdseven.innerHTML = `<button>X</button>`;
    creattdseven.classList.add("exit");
    
    creattr.appendChild(creattdone);
    creattr.appendChild(creattdtwo);
    creattr.appendChild(creattdthree);
    creattr.appendChild(creattdfour);
    creattr.appendChild(creattdfive);
    creattr.appendChild(creattdsix);
    creattr.appendChild(creattdseven);
    table.appendChild(creattr);
  });

  var creatspans = document.getElementsByClassName("span");
  var creatbuttons = document.getElementsByClassName("one");
  var createxit = document.getElementsByClassName("exit");
  var creattrows = document.getElementsByClassName("tr");
  var creatsave = document.getElementsByClassName("save");
  var creatbtntwo = document.getElementsByClassName("two");
  var creatfour = document.getElementsByClassName('four');
  
  
  for (let i = 0; i < creatbuttons.length; i++) {
    creatbuttons[i].addEventListener("click", () => {
      ++creatspans[i].innerHTML;
      creatfour[i].innerHTML = Number((creatfour[i].innerHTML) * (creatspans[i].innerHTML))
    });
    
    createxit[i].addEventListener("click", (e) => {
      if (this.confirm("are you sure from delet")) {
        creattrows[i].style.display = "none";
        var cartData = JSON.parse(localStorage.getItjem("carts"));
        cartData.splice(i, 1);
        localStorage.setItem("carts", JSON.stringify(cartData));
      } else {
        e.preventDefault();
      }
    });
    
    creatsave[i].addEventListener("click", function () {
      var num = Number(creatspans[i].innerHTML);
      console.log(num)
      creatbuttons[i].style.display = "none";
      creatbtntwo[i].innerHTML = "Done...";
      creatbtntwo[i].style.width = "70px";
      creatbtntwo[i].disabled = true;
      $.ajax({
        url: `http://localhost:8000/api/products/sell/${cartData[i].id}`,
        type: "post",
        dataType: "json",
        data: { amount: num },
        success: function (response) {
          console.log({ amount: num });
          console.log(response);
        },
        error: function (error) {
          console.log(error);
        },
      });
    });
  }
  for (let i = 0; i < creatbtntwo.length; i++) {
    creatbtntwo[i].addEventListener("click", () => {
      if (creatspans[i].innerHTML > 1) {
        creatfour[i].innerHTML = Number( (creatfour[i].innerHTML) /  (creatspans[i].innerHTML) )
        --creatspans[i].innerHTML;
      }
    });
  }
});
