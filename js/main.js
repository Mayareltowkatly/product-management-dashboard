var nameInput = document.getElementById("nameInput");
var priceInput = document.getElementById("priceInput");
var countInput = document.getElementById("countInput");
var typeInput = document.getElementById("typeInput");
var descInput = document.getElementById("descInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var deleteAll = document.getElementById("deleteAll");
var searchInput = document.getElementById("searchInput");
var tBody = document.getElementById("tBody");
var uploadImage = document.getElementById("uploadImage");
var inputFile = document.getElementById("inputFile");
var successN = document.getElementById("successN");
var unSuccessN = document.getElementById("unSuccessN");
var unSuccessP = document.getElementById("unSuccessP");
var unSuccessT = document.getElementById("unSuccessT");
var unSuccessD = document.getElementById("unSuccessD");

var productList = [];
var imageData;

var selectedIndex = null;


// validation 
function validateName(){
    var nameRegex = /^[A-Z][a-z]{2,14}$/;
    var text =  nameInput.value;
    if(nameRegex.test(text)){
        successN.classList.remove("d-none");
        unSuccessN.classList.add("d-none");
        return true;
    }else{
        successN.classList.add("d-none");
        unSuccessN.classList.remove("d-none");
        return false;

    }
}

function validatePrice(){
    var priceRegex = /^(1000|[1-9][0-9]{3}|10000)$/;
    var price =  priceInput.value;
    if(priceRegex.test(price)){
        // successP.classList.remove("d-none");
        unSuccessP.classList.add("d-none");
        return true;
    }else{
        // successP.classList.add("d-none");
        unSuccessP.classList.remove("d-none");
        return false;
    }
}

function validateType(){
    var typeRegex = /^(Mobile|Screen|Watch|Tablet)$/;
    var type = typeInput.value;
    if(typeRegex.test(type)){
        // successT.classList.remove("d-none");
        unSuccessT.classList.add("d-none");
        return true;
    }else{
        // successT.classList.add("d-none");
        unSuccessT.classList.remove("d-none");
        return false;
    }
}

function validateDesc(){
    var descRegex = /^.{3,300}$/;
    var desc = descInput.value;
    if(descRegex.test(desc)){
        // successD.classList.remove("d-none");
        unSuccessD.classList.add("d-none");
        return true;
    }else{
        // successD.classList.add("d-none");
        unSuccessD.classList.remove("d-none");
        return false;
    }
}


if (localStorage.getItem("product")) {
    productList = JSON.parse(localStorage.getItem("product"))
}
deleteAll.addEventListener("click", deleteProducts);
updateBtn.addEventListener("click", updateProduct);
display();
function addProduct() {
    if(!validateName() || !validatePrice() || !validateType() || !validateDesc()  ){
        return;
    }
    var product = {
        name: nameInput.value ,
        price: priceInput.value ,
        count: countInput.value ,
        type: typeInput.value ,
        desc: descInput.value,
        image: imageData

    };
    productList.push(product);
    localStorage.setItem("product", JSON.stringify(productList));
    display();
    console.log(productList);
    clearForm();
}
function clearForm() {
    nameInput.value = "";
    priceInput.value = "";
    countInput.value = "";
    typeInput.value = "";
    descInput.value = "";
    imageData = "";
}
function display(){
    var box = " ";
    for(var i= 0; i < productList.length; i++){
        box += `    <tr>
                <th scope="row">${i + 1}</th>
                <td><img src="${productList[i].image}" width="60"></td>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].count}</td>
                <td>${productList[i].type}</td>
                <td>${productList[i].desc}</td>

                <td>
                    <button class="btn btn-info  me-3" onclick="editProduct(${i})" >edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button>

                </td>
                </tr>`
    }
    tBody.innerHTML = box;
    
    if (productList.length > 0) {
      deleteAll.classList.remove("d-none"); 
    //   localStorage.clear  
    }else {
       deleteAll.classList.add("d-none"); 
    }
    
    
}

function deleteProduct(index) {
   productList.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(productList));

   display();
}

function editProduct(index){
    
    selectedIndex = index;
    imageData= productList[index].image;
    nameInput.value = productList[index].name;
    priceInput.value = productList[index].price;
    countInput.value = productList[index].count;
    typeInput.value = productList[index].type;
    descInput.value = productList[index].desc;

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}
function updateProduct(){
    if(!validateName() || !validatePrice() || !validateType() || !validateDesc()  ){
        return;
    }
    productList[selectedIndex].image = imageData;
    productList[selectedIndex].name = nameInput.value;
    productList[selectedIndex].price = priceInput.value;
    productList[selectedIndex].count = countInput.value;
    productList[selectedIndex].type = typeInput.value;
    productList[selectedIndex].desc = descInput.value;
    
    localStorage.setItem("product", JSON.stringify(productList));
    
    

    updateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
    clearForm();
    display();

}

function searchProduct() {
    console.log(searchInput.value);
       var box = " ";
    for(var i= 0; i < productList.length; i++){
        var text = productList[i].name;
        if(text.toLowerCase().includes(searchInput.value.toLowerCase())) {                   
            box += `<tr>
                <th scope="row">${i + 1}</th>
                <td><img src="${productList[i].image}" width="60"></td>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].count}</td>
                <td>${productList[i].type}</td>
                <td>${productList[i].desc}</td>

                <td>
                    <button class="btn btn-warning" onclick="editProduct(${i})" >edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button>

                </td>
                </tr>`
        }         
    }
    tBody.innerHTML = box;
}
function deleteProducts() {
   productList = [];
    localStorage.removeItem("product");
   display();
}
function uploadImg(){
    var file = inputFile.files[0];
    imageData = URL.createObjectURL(file);
    uploadImage.src = imageData;
}
inputFile.onchange = function(){
    uploadImg();
} 
