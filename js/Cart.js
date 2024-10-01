let cartList = JSON.parse(localStorage.getItem('cartList'));
let orderList = JSON.parse(localStorage.getItem('orderList'));
let cartTable = document.getElementById("cartTable");
let discount = document.getElementById("discount");
let total = document.getElementById("total");


loadTable();

function loadTable() {
    let cartTableBody = ` <tr>
    <th class="th001">Item Name</th>
    <th>Quantity</th>
    <th>Price</th>
    <th>Item Code</th>
    <th colspan="2">Action</th>

</tr>`

    if (cartList != undefined) {
        let totalDiscount = 0;
        let totalprice = 0;
        let netTotal = 0;
        cartList.forEach(function (cart, i) {
            cartTableBody += `<tr>
    <td class="td001">${cart.itemName}</td>
    <td>${cart.quantity}</td>
    <td>${cart.price}</td>
    <td>${cart.itemCode}</td>
    <td><button class="btn " onclick="edit(${i})"><img
                src="image/edit.png" class="imgEdit"></button></td>
    <td><button class="btn" onclick="deleteItem(${i})"><img src="image/delete.png"></button></td>

</tr>`
            let discountPerc = cart.discount.split("%")[0];
            if (discountPerc != 0) {
                let discount = (discountPerc / 100) * cart.price;
                totalDiscount += discount;

            }
            totalprice += Number(cart.price);

        });

        cartTable.innerHTML = cartTableBody;
        netTotal = totalprice - totalDiscount;

        discount.innerText = "Discount : " + totalDiscount.toFixed(2);
        total.innerText = "Total : " + netTotal.toFixed(2);
    }
}


function deleteItem(index) {
    cartList.splice(index, 1);
    localStorage.setItem("cartList", JSON.stringify(cartList));
    loadTable();
}

function edit(index) {
    let iname = document.getElementById("iname");
    let iqty = document.getElementById("iqty");
    let iprice = document.getElementById("iprice");
    let icode = document.getElementById("icode");
    let btnSave = document.getElementById("btnSave");

    iname.value = cartList[index].itemName;
    iqty.value = cartList[index].quantity;
    iprice.value = cartList[index].price;
    icode.value = cartList[index].itemCode;

    btnSave.onclick = function () { updateCart(index, iqty.value, cartList[index].quantity) };

    $('#cartEdit').modal('show');
}

function updateCart(index, newQuantity, oldQuantity) {
    cartList[index].quantity = newQuantity;
    let itemPrice = (cartList[index].price) / oldQuantity;
    cartList[index].price = itemPrice * newQuantity;
    localStorage.setItem("cartList", JSON.stringify(cartList));
    loadTable();
    $('#cartEdit').modal('hide');
}

function checkOut() {

    let discount = document.getElementById("discount");
    let total = document.getElementById("total");
    
    let cname = document.getElementById("cname");
    let cnumber = document.getElementById("cnumber");
    if (orderList == undefined) {
        orderList = [];
    }
    orderList.push(
        {
            "orderId": "Order001",
            "customer": cname.value,
            "date": new Date(),
            "total": total.innerText.split(": ")[1],
            "discount": discount.innerText.split(": ")[1],
        }
    );

    localStorage.setItem("orderList", JSON.stringify(orderList));
    cartList = [];
    localStorage.setItem("cartList", JSON.stringify(cartList));
    loadTable();
    let customerList=JSON.parse(localStorage.getItem("customerList"));
    if(customerList==undefined){
        customerList=[];

        customerList.push(
            {
                "customerName":cname.value,
                "contactNuber":cnumber.value
            },
        );

        
    }else{
        var isCustomerExist=false;
        customerList.forEach(customer => {
            if(customer.contactNuber==cnumber.value){
                isCustomerExist=true;
            }

        });

        if(isCustomerExist==false){
            
            customerList.push(
                {
                    "customerName":cname.value,
                    "contactNuber":cnumber.value
                },
            );
        }
        
    }
    localStorage.setItem("customerList",JSON.stringify(customerList));

    

    $('#customerDetails').modal('hide');
}


