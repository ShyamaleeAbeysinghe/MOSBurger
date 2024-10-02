let customerTable = document.getElementById("CustomerTable");
loadCustomer()
function loadCustomer(){
    let customerTableBody = ` <tr>
                            <th class="th001">Customer Name</th>
                            <th>Contact Number</th>
                            <th colspan="2">Action</th>
                            
                        </tr>`;
let customers
let customerList = JSON.parse(localStorage.getItem("customerList"));
if (customerList == undefined) {
    customerList = [];
}


customerList.forEach(function (customer, i) {
    customerTableBody += ` <tr>
                            <td class="td001">${customer.customerName}</td>
                            <td>${customer.contactNuber}</td>
                            <td><button class="btn " onclick=edit(${i})><img src="image/edit.png" class="imgEdit"></button></td>
                            <td><button class="btn"><img src="image/delete.png"></button></td>
                            

                            
                        </tr>`
});
customerTable.innerHTML = customerTableBody;
}



function loadTable() {
    let customerTable = document.getElementById("CustomerTable");
    customerTable.innerHTML = "";
    let customerTableBody = ` <tr>
                                <th class="th001">Customer Name</th>
                                <th>Contact Number</th>
                                <th colspan="2">Action</th>
                                
                            </tr>`;
    customers.forEach(function (customer, i) {
        customerTableBody += ` <tr>
                                    <td class="td001">${customer.customerName}</td>
                                    <td>${customer.contactNuber}</td>
                                    <td><button class="btn " onclick=edit(${i})><img src="image/edit.png" class="imgEdit"></button></td>
                                    <td><button class="btn"><img src="image/delete.png"></button></td>
                                    
        
                                    
                                </tr>`
    });
    customerTable.innerHTML = customerTableBody;
}
// <td><button class="btn " data-bs-toggle="modal" data-bs-target="#customerEdit"><img src="image/edit.png" class="imgEdit"></button></td>
//                         <td><button class="btn"><img src="image/delete.png"></button></td>

function edit(index) {
    let cname = document.getElementById("cname");
    let ccontact = document.getElementById("ccontact");

    cname.value = customers[index].customerName;
    ccontact.value = customers[index].contactNuber;

    $('#customerEdit').modal('show')
}

function saveCustomer() {
    let cname = document.getElementById("cname").value;
    let ccontact = document.getElementById("ccontact").value;
    customers.push(
        {
            "customerName": cname,
            "contactNuber": ccontact
        }
    );
    console.log(customers)
    $('#customerEdit').modal('hide');
    loadTable();
}


$(document).ready(function () {
    $('#customerEdit').on('hidden.bs.modal', function () {
        $(':input', this).val('');
    });
});


function searchCustomer() {
    let cName = document.getElementById("cName").value;

    let customerList = JSON.parse(localStorage.getItem("customerList"));
    var isCustomerExist = false;

    customerList.forEach(function (customer, i) {
        if (customer.customerName == cName) {
            isCustomerExist = true;

            customerTable.innerHTML = "";

            let customerTableBody = ` <tr>
                            <th class="th001">Customer Name</th>
                            <th>Contact Number</th>
                            <th colspan="2">Action</th>
                            
                        </tr>`;

            customerTableBody += ` <tr>
                        <td class="td001">${customer.customerName}</td>
                        <td>${customer.contactNuber}</td>
                        <td><button class="btn " onclick=edit(${i})><img src="image/edit.png" class="imgEdit"></button></td>
                        <td><button class="btn"><img src="image/delete.png"></button></td>
                        

                        
                    </tr>`

                    customerTable.innerHTML = customerTableBody;

        }
    });

    if(isCustomerExist==false){
        alert("Item Not Found");
      }

}