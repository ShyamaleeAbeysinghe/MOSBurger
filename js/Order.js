

let orderTable = document.getElementById("orderTable");
let orderList = JSON.parse(localStorage.getItem('orderList'));


loadTable();


function loadTable() {
    let orderTableBody = ` <tr>
                            <th class="th001">Order Id</th>
                            <th>Customer</th>
                            <th>Date & Time</th>
                            <th>Total</th>
                            <th>Discount</th>
                            <th colspan="2">Action</th>
                        </tr>`

    orderList.forEach(function (order, i) {
        orderTableBody += ` <tr>
                            <td class="td001">${order.orderId}</td>
                            <td>${order.customer}</td>
                            <td>${order.date}</td>
                            <td>${order.total}</td>
                            <td>${order.discount}</td>
                            <td><button class="btn " data-bs-toggle="modal" data-bs-target="#OrderEdit"><img src="image/edit.png" class="imgEdit"></button></td>
                            <td><button class="btn" onclick="deleteOrder(${i})"><img src="image/delete.png" class="imgDelete"></button></td>
                        </tr>`


    });

    orderTable.innerHTML = orderTableBody;
}

function deleteOrder(index) {
    orderList.splice(index, 1);
    localStorage.setItem("orderList", JSON.stringify(orderList));

    loadTable();
}