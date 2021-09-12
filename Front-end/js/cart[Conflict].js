let cartData = localStorage.getItem("carts");
cartData = JSON.parse(cartData);
console.log(cartData[0]);
let table = document.getElementById("table");
window.addEventListener('load',function(){ 
    cartData.forEach((item, index) => {
        let creattr = document.createElement("tr");
      
        let creatimg = document.createElement("img");
        creatimg.src = `/public/cat-images/images/${cartData[index].image}`;
        let creattdone = document.createElement("td");
        creattdone.appendChild(creatimg);
      
        let creattdtwo = document.createElement("td");
        creattdtwo.innerHTML = cartData[index].title;
      
        let creattdthree = document.createElement("td");
        creattdthree.innerHTML = "white";
      
        let creattdfour = document.createElement("td");
        creattdfour.innerHTML = cartData[index].price + "$";
          
        let value = 1;
        let creattdfive = document.createElement("td");
        // creattdfive.innerHTML = `${i} <button style='width: 25px' onclick='add(i++)' >+</button><button style='width: 25px'>-</button>`;
        
        // creatbtn.innerHTML = '+'
        // creatbtn.onclick = function(){i++}
        // creattdfive.appendChild(value)
        let creatbtn = document.createElement('button')
        creatbtn.style.width='25px'
        creatbtn.style.color='white'
        creatbtn.classList.add('one');
        creatbtn.addEventListener('click',()=>{this.alert('alaa')})
        creattdfive.appendChild(creatbtn)


        let creattdsix = document.createElement("td");
        creattdsix.innerHTML = `<button>save</button>`;
      
        let creattdseven = document.createElement("td");
        creattdseven.innerHTML = `<button>X</button>`;
      
        creattr.appendChild(creattdone);
        creattr.appendChild(creattdtwo);
        creattr.appendChild(creattdthree);
        creattr.appendChild(creattdfour);
        creattr.appendChild(creattdfive);
        creattr.appendChild(creattdsix);
        creattr.appendChild(creattdseven);
        table.appendChild(creattr);
      });
    
})

