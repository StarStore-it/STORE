const express = require("express")
const fs = require("fs")
const Stripe = require("stripe")

const stripe = new Stripe("sk_test_51TBLwgPLg8Fm2alorgLR7zPdL9WZjIFJOzT9vbqmkRjrtB2Cp6meCEWe0VxhaWYGF3rXGDl3EvbnedAY1yB8cNqs00EJH0IO6o")

const app = express()

app.use(express.json())
app.use(express.static("public"))

/* carregar produtos */

const products = JSON.parse(fs.readFileSync("products.json"))

app.get("/api/products",(req,res)=>{
res.json(products)
})

/* pagamento */

app.post("/api/pay", async (req,res)=>{

const {items,nick} = req.body

try{

const session = await stripe.checkout.sessions.create({

payment_method_types:["card"],

line_items: items.map(i=>({

price_data:{

currency:"brl",

product_data:{
name:i.name
},

unit_amount: Math.round(i.price*100)

},

quantity:i.qty

})),

mode:"payment",

success_url:"http://localhost:3000/success.html",

cancel_url:"http://localhost:3000"

})

/* salvar pedido */

const order={

nick,
items,
stripeId:session.id,
status:"pending",
date:Date.now()

}

let orders=[]

if(fs.existsSync("orders.json")){
orders=JSON.parse(fs.readFileSync("orders.json"))
}

orders.push(order)

fs.writeFileSync("orders.json",JSON.stringify(orders,null,2))

res.json({url:session.url})

}catch(err){

console.log(err)

res.status(500).send("Erro pagamento")

}

})

app.listen(3000,()=>{
console.log("Servidor rodando em http://localhost:3000")
})