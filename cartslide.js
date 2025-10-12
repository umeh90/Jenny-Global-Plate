const cartList = document.querySelector('#cart-count')
const cartOpen = document.querySelector('.cart-icon')
const cartSection = document.querySelector('.cart-slide')
const cartClose = document.querySelector('.cart-close')
const content = document.querySelector('.cart-items')
const totalAmount = document.querySelector('#cart-total')
const checkout = document.querySelector('.checkout')
const canvax = document.body
let cart = JSON.parse(localStorage.getItem('carts')) || []
function saveitems(){
	localStorage.setItem('carts', JSON.stringify(cart))
}
function toggleCart(){
	cartSection.classList.add('show')
	canvax.style.overflow = 'hidden'
}
function closing(){
	cartSection.classList.remove('show')
	canvax.style.overflow = 'auto'

}
function addToCart(image, product, price){
	const pricing = Number(price)
  const existing = cart.find(item => item.product === product)
	if(existing){
		existing.quantity++;
	}else {
		cart.push({image, product , price: pricing, quantity: 1})
	}
	saveitems()
	renderCart()
}
function renderCart(){
	content.innerHTML = ""
	let total = 0
	if(cart.length === 0){
		content.innerHTML = '<p style="text-align:center;margin-top:20px;">Your cart is empty </p>'
	}
	cart.forEach((item, index) =>{
		let subTotal = item.price * item.quantity;
		total += subTotal;
	const div = document.createElement('div')
	div.className = 'cart-orders'
	div.innerHTML = `
	<img src="${item.image}" alt="${item.product}">
	<span>${item.product}</span>
	<span>#${item.price.toLocaleString()}</span>
	<div class="controlqty">
	<button onclick="qtyChange(${index}, -1)">-</button>
	<span>${item.quantity}</span>
	<button onclick="qtyChange(${index}, 1)">+</button>
	 </div>
	 <span class="sub-total"> #${subTotal.toLocaleString()} </span>
	 <button onclick="deleteCart(${index})" class="deletebtn"><img src="images/cancel.png" alt="deleteicon"></button>
	`
	content.appendChild(div)
	})
	totalAmount.innerText = total.toLocaleString()
	cartList.innerText = cart.reduce((sum, item) =>
		sum + item.quantity, 0
	)
}
function qtyChange(index, change){
	cart[index].quantity += change
	if(cart[index].quantity <= 0){
		deleteCart(index)
	}else {
		saveitems()
		renderCart()
	}
}
function deleteCart(index){
	if(confirm('Are you sure you want to delete this cart?')){
		cart.splice(index, 1)
		saveitems()
		renderCart()
	}
}
document.addEventListener('DOMContentLoaded', renderCart);

function checkoutItem(){
	cart = []
	localStorage.removeItem('carts')
	renderCart()
	alert('Thank you for your order, Your cart has been cleared')
}

