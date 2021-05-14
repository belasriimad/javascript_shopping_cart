const products = document.querySelectorAll('#add-to-list');
const shoppingList = document.querySelector('#sopping-list');
const table = shoppingList.querySelector('table');
const tbody = table.querySelector('tbody');
const clearBtn = document.querySelector('#clear');
const totalM = document.getElementById('total');
let total = 0;

for(var i = 0;i < products.length;i++){
    products[i].addEventListener('click',BuyProducts);
}
//show cart
document.addEventListener('DOMContentLoaded',showCart);

function showCart(){
    let products = getProducts();
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th><img style="height: 50px; width: 100%; display: block;" src="${product.img}"></th>
            <th>${product.title}</th>
            <th>${product.price}</th>
            <th><a href="#" class="badge badge-danger delete" data-id="${product.id}">X</a></th>
        `;
        tbody.appendChild(row);
        total = total + parseInt(product.price);
        totalM.innerHTML = `${total} $`;
    });
}
function BuyProducts(e){
    e.preventDefault();
    const product = e.target.parentElement;
    getProductInfo(product);
}
function getProductInfo(product){
    const productInfo = {
        img : product.querySelector('img').src,
        title : product.querySelector('h3').textContent,
        price : product.querySelector('#price').textContent,
        id : product.querySelector('a').getAttribute('data-id')
    };
    addToCart(productInfo);
}
function addToCart(productInfo){
    const row = document.createElement('tr');
    row.innerHTML = `
        <th><img style="height: 50px; width: 100%; display: block;" src="${productInfo.img}"></th>
        <th>${productInfo.title}</th>
        <th>${productInfo.price}</th>
        <th><a href="#" class="badge badge-danger delete" data-id="${productInfo.id}">X</a></th>
        `;
    tbody.appendChild(row);
    total = total + parseInt(productInfo.price);
    totalM.innerHTML = `${total} $`;
    //save to local storage
    saveProduct(productInfo);
}
//add product
function saveProduct(productInfo){
    let products = getProducts();
    products.push(productInfo);
    localStorage.setItem('products',JSON.stringify(products));
}
//get all products from local storage
function getProducts(){
    let products;
    if(localStorage.getItem('products') === null){
        products = [];
    }else{
        products = JSON.parse(localStorage.getItem('products'));
    }
    return products;
}
//remove from cart
tbody.addEventListener('click',removeProduct);

function removeProduct(e){
    let prodcutsList,product,productId;
    if(e.target.classList.contains('delete')){
        e.target.parentElement.parentElement.remove();
        product =  e.target.parentElement.parentElement;
        productId = product.querySelector('a').getAttribute('data-id');
    }
    //remove product from local storage
    prodcutsList = getProducts();
    prodcutsList.forEach((product,index)=>{
        if(product.id === productId){
            prodcutsList.splice(index,1);
            total = total - parseInt(product.price);
            totalM.innerHTML = `${total} $`;
        }
    });
    localStorage.setItem('products',JSON.stringify(prodcutsList));
}
//clean cart
clearBtn.addEventListener('click',clearCart);

function clearCart(){
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }
    localStorage.clear();
    totalM.innerHTML = '';
}