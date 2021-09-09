var titleBest = document.getElementById("title-best");
var titleBetter = document.getElementById("title-better");
var titleGood = document.getElementById("title-good");
var priceBest = document.getElementById("sal-best");
var priceBetter = document.getElementById("sal-better");
var priceGood = document.getElementById("sal-good");
var bestList = [];
var topSaleList = [];
var newItemList = [];
var latestnewItemList = [];
for (let i = 1; i < 5; i++) {
    latestnewItemList.push({ title: document.getElementById(`title-new${i}`), sal: document.getElementById(`sal-new${i}`) });
}

for (let i = 4; i < 7; i++) {
    bestList.push({ title: document.getElementById(`title-best-${i}`), sal: document.getElementById(`sal-best-${i}`) });
    topSaleList.push({ title: document.getElementById(`title-better-${i}`), sal: document.getElementById(`sal-better-${i}`) });
    newItemList.push({ title: document.getElementById(`title-good-${i}`), sal: document.getElementById(`sal-good-${i}`) });
}
var returndeData;
async function fetchdata() {
    const data = await fetch('http://localhost:8000/api/products');
    const json = await data.json();
    console.log(json);
    return json;
}
fetchdata().then(data => {
    returndeData = data;
    for (let i = 0; i < 3; i++) {
        bestList[i].title.innerText = returndeData.data[i + 9].title;
        topSaleList[i].title.innerText = returndeData.data[i + 10].title;
        newItemList[i].title.innerText = returndeData.data[i + 11].title;
        bestList[i].sal.innerText = returndeData.data[i + 9].price;
        topSaleList[i].sal.innerText = returndeData.data[i + 10].price;
        newItemList[i].sal.innerText = returndeData.data[i + 11].price;
        latestnewItemList[i].title.innerText = returndeData.data[i + 12].title;
        latestnewItemList[i].sal.innerText = returndeData.data[i + 12].price;
    }
    latestnewItemList[3].title.innerText = returndeData.data[15].title;

    latestnewItemList[3].sal.innerText = returndeData.data[15].price;

})
async function getbest(src) {
    if (src.value == "1") {
        titleBest.innerText = returndeData.data[0].title;
        priceBest.innerText = returndeData.data[0].price;
        titleBetter.innerText = returndeData.data[1].title;
        priceBetter.innerText = returndeData.data[1].price;
        titleGood.innerText = returndeData.data[2].title;
        priceGood.innerText = returndeData.data[2].price;
    } else if (src.value == "2") {
        titleBest.innerText = returndeData.data[3].title;
        priceBest.innerText = returndeData.data[3].price;
        titleBetter.innerText = returndeData.data[4].title;
        priceBetter.innerText = returndeData.data[4].price;
        titleGood.innerText = returndeData.data[5].title;
        priceGood.innerText = returndeData.data[5].price;
    } else {
        titleBest.innerText = returndeData.data[6].title;
        priceBest.innerText = returndeData.data[6].price;
        titleBetter.innerText = returndeData.data[7].title;
        priceBetter.innerText = returndeData.data[7].price;
        titleGood.innerText = returndeData.data[8].title;
        priceGood.innerText = returndeData.data[8].price;
    }
}