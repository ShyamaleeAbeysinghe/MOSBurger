
let productList = JSON.parse(localStorage.getItem('productList'));

loadTable();

// });
// <td><button class="btn  " data-bs-toggle="modal" data-bs-target="#stockAdd"><img src="image/edit.png" class="imgEdit"></button></td>
//                         <td><button class="btn"><img src="image/delete.png" class="imgDelete"></button></td>


function edit(index) {

    let iname = document.getElementById("uiname");
    let iqty = document.getElementById("uiqty");
    let iprice = document.getElementById("uiprice");
    let idate = document.getElementById("uidate");
    let icode = document.getElementById("uicode");
    let btnUpdate = document.getElementById("btnUpdate");

    iname.value = productList[index].itemName;
    iqty.value = productList[index].quantity;
    iprice.value = productList[index].price;
    idate.value = productList[index].expDate;
    icode.value = productList[index].itemCode;

    btnUpdate.onclick = function () { updateStock(index) };

    $('#stockUpdate').modal('show');
}

function loadTable() {
    let stockTable = document.getElementById("stockTable");
    let stockTableBody = `<tr>
                            <th class="th001">Item Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>EXP Date</th>
                            <th>Item Code</th>
                            <th colspan="2">Action</th>
                        </tr>`;

    productList.forEach(function (product, i) {
        stockTableBody += `<tr>
                                            <td class="td001">${product.itemName}</td>
                                            <td>${product.quantity}</td>
                                            <td>${product.price}</td>
                                            <td>${product.expDate}</td>
                                            <td>${product.itemCode}</td>
                
                                            <td><button class="btn  " onclick=edit(${i})><img src="image/edit.png" class="imgEdit"></button></td>
                                            <td><button class="btn" onclick="deleteStock(${i})"><img src="image/delete.png" class="imgDelete"></button></td>
                
                                        </tr>`;
    });
    stockTable.innerHTML = stockTableBody;

}

function deleteStock(index){
    productList.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    loadTable();
}

function saveProduct() {
    let iname = document.getElementById("iname").value;
    let iqty = document.getElementById("iqty").value;
    let iprice = document.getElementById("iprice").value;
    let idate = document.getElementById("idate").value;
    let icode = document.getElementById("icode").value;
    productList.push(
        {
            "itemName": iname,
            "quantity": iqty,
            "price": iprice,
            "expDate": idate,
            "itemCode": icode,
            "image": "image/submarine.jpg"
        }
    );
    localStorage.setItem("productList", JSON.stringify(productList));

    $('#stockAdd').modal('hide');
    loadTable();
}

function updateStock(index) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa"+index)
    let iname = document.getElementById("uiname").value;
    let iqty = document.getElementById("uiqty").value;
    let iprice = document.getElementById("uiprice").value;
    let idate = document.getElementById("uidate").value;
    let icode = document.getElementById("uicode").value;

    productList[index].itemName = iname;
    productList[index].quantity = iqty;
    productList[index].price = iprice;
    productList[index].expDate = idate;
    productList[index].itemCode = icode;
    productList[index].image = "image/submarine.jpg"
    console.log(productList)

    localStorage.setItem("productList", JSON.stringify(productList));

    $('#stockUpdate').modal('hide');
    loadTable();
}




$(document).ready(function () {
    $('#stockAdd').on('hidden.bs.modal', function () {
        $(':input', this).val('');
    });
    $('#stockUpdate').on('hidden.bs.modal', function () {
        $(':input', this).val('');
    });
});


