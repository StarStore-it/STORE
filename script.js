let products=[]
let cart=[]

async function loadProducts(){

const res=await fetch("/api/products")
products=await res.json()

renderProducts(products)

}

function renderProducts(list){

const container=document.getElementById("products")

container.innerHTML=""

list.forEach(p=>{

const card=document.createElement("div")
card.className="card"

card.innerHTML=`

<img src="${p.image}">
<h3>${p.name}</h3>
<p>R$ ${p.price}</p>

<button onclick="addCart('${p.name}')">
Adicionar ao carrinho
</button>

`

container.appendChild(card)

})

}

/* busca */

function searchProducts(){

const value=document
.getElementById("search")
.value
.toLowerCase()

const filtered=products.filter(p=>
p.name.toLowerCase().includes(value)
)

renderProducts(filtered)

}

/* carrinho */

function addCart(name){

let item=cart.find(i=>i.name===name)

if(item){
item.qty++
}else{

const product=products.find(p=>p.name===name)

cart.push({
...product,
qty:1
})

}

renderCart()

}

function changeQty(i,val){

cart[i].qty+=val

if(cart[i].qty<=0){
cart.splice(i,1)
}

renderCart()

}

function removeItem(i){

cart.splice(i,1)

renderCart()

}

function renderCart(){

const container=document.getElementById("cart")

container.innerHTML=""

let total=0
let count=0

cart.forEach((item,i)=>{

const price=item.price*item.qty

total+=price
count+=item.qty

const div=document.createElement("div")
div.className="cartItem"

div.innerHTML=`

<b>${item.name}</b>

<div>

<button onclick="changeQty(${i},-1)">-</button>

${item.qty}

<button onclick="changeQty(${i},1)">+</button>

</div>

R$ ${price}

<button onclick="removeItem(${i})">x</button>

`

container.appendChild(div)

})

document.getElementById("total").innerText="Total: R$ "+total
document.getElementById("cartCount").innerText=count

}

function openCart(){
document.getElementById("cartPanel").classList.add("open")
}

function closeCart(){
document.getElementById("cartPanel").classList.remove("open")
}

/* checkout */

async function checkout(){

const nick=document.getElementById("nick").value

if(!nick){
alert("Digite seu nick")
return
}

const res=await fetch("/api/pay",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

nick,
items:cart

})

})

const data=await res.json()

window.location=data.url

}

loadProducts()