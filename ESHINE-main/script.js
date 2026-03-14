function addToCart(name, price, image){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let product = {
name: name,
price: price,
image: image
};

cart.push(product);

localStorage.setItem("cart", JSON.stringify(cart));

alert(name + " added to cart!");

}



function displayCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartItems = document.getElementById("cartItems");

if(!cartItems) return;

cartItems.innerHTML = "";

cart.forEach(function(item,index){

cartItems.innerHTML += `
<div class="cart-item">

<img src="${item.image}" width="120">

<h3>${item.name}</h3>

<p>$${item.price}</p>

<button onclick="removeItem(${index})">Remove</button>

</div>
`;

});

}



function removeItem(index){

let cart = JSON.parse(localStorage.getItem("cart"));

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

displayCart();

}


displayCart();