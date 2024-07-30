

let productTag = document.getElementById("products");
productTag.innerHTML = "";

let productList = JSON.parse(localStorage.getItem('productList'));
if (productList == undefined) {
  fetch('./js/productList.json')
    .then((response) => response.json())
    .then((productListnew) => {
      productList = productListnew;
      localStorage.setItem("productList", JSON.stringify(productList));
      productList.forEach(function (product, i) {
        productTag.innerHTML += `<div class="col">
                <div class="card card001">
                  <img src="${product.image}" class="card-img-top imageafood002" alt="...">
                  <div class="card-body">
                    <h5 class="card-title title001"><b>${product.itemName}</b></h5>
                    <h6 class="priceAll"><b>Rs : ${product.price}</b></h6>
                    <h6 class="priceAll"><b>EXP in : ${product.expDate}</b></h6>
                    <button class=" btn btnAdd002" onclick="addToCart(${i})">Add To Cart</button>
                  </div>
                </div>
              </div>`;
      });
    });
}
productList.forEach(function (product, i) {
  productTag.innerHTML += `<div class="col">
          <div class="card card001">
            <img src="${product.image}" class="card-img-top imageafood002" alt="...">
            <div class="card-body">
              <h5 class="card-title title001"><b>${product.itemName}</b></h5>
              <h6 class="priceAll"><b>Rs : ${product.price}</b></h6>
              <h6 class="priceAll"><b>EXP in : ${product.expDate}</b></h6>
              <button class=" btn btnAdd002" onclick="addToCart(${i})">Add To Cart</button>
            </div>
          </div>
        </div>`;
});

function addToCart(index) {

  let cartList = JSON.parse(localStorage.getItem('cartList'));
  let qty = 1;
  let itemFound = false;
  if (cartList == undefined) {
    cartList = []
  }
  cartList.forEach(cart => {
    if (productList[index].itemCode == cart.itemCode) {
      qty = cart.quantity + 1;
      cart.quantity = qty;
      cart.price=productList[index].price*qty;
      itemFound = true;
    }
  });
  if (!itemFound) {
    cartList.push(
      {
        "itemName": productList[index].itemName,
        "quantity": qty,
        "price": productList[index].price,
        "itemCode": productList[index].itemCode,
        "discount": productList[index].discount,

      });
  }
  localStorage.setItem("cartList", JSON.stringify(cartList));
}




