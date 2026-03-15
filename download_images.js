const https = require("https")
const fs = require("fs")

const items = {
rocket:"https://static.wikia.nocookie.net/roblox-blox-piece/images/c/cb/Rocket_Fruit.png/revision/latest?cb=20231027120039",
spin:"https://static.wikia.nocookie.net/roblox-blox-piece/images/8/88/Spin_Fruit.png/revision/latest?cb=20231027120258",
chop:"https://static.wikia.nocookie.net/roblox-blox-piece/images/0/0e/Chop_Fruit.png/revision/latest?cb=20231027115331",
spring:"https://static.wikia.nocookie.net/roblox-blox-piece/images/8/8a/Spring_Fruit.png/revision/latest?cb=20231027120418",
bomb:"https://static.wikia.nocookie.net/roblox-blox-piece/images/4/43/Bomb_Fruit.png/revision/latest?cb=20240304195914",
smoke:"https://static.wikia.nocookie.net/roblox-blox-piece/images/7/7e/Smoke_Fruit.png/revision/latest?cb=20231027120224",
spike:"https://static.wikia.nocookie.net/roblox-blox-piece/images/c/ce/Spike_Fruit.png/revision/latest?cb=20231027120251",
flame:"https://static.wikia.nocookie.net/roblox-blox-piece/images/c/c4/Flame_Fruit.png/revision/latest?cb=20250421150742",
ice:"https://static.wikia.nocookie.net/roblox-blox-piece/images/c/c5/Ice_Fruit.png/revision/latest?cb=20231027115604",
sand:"https://static.wikia.nocookie.net/roblox-blox-piece/images/7/72/Sand_Fruit.png/revision/latest?cb=20231027120103",
dark:"https://static.wikia.nocookie.net/roblox-blox-piece/images/5/5c/Dark_Fruit.png/revision/latest?cb=20231027115358",
eagle:"https://static.wikia.nocookie.net/roblox-blox-piece/images/5/53/Eagle_Fruit.png/revision/latest?cb=20250418030931",
diamond:"https://static.wikia.nocookie.net/roblox-blox-piece/images/8/88/Diamond_Fruit.png/revision/latest?cb=20231027115405",
light:"https://static.wikia.nocookie.net/roblox-blox-piece/images/8/83/Light_Fruit.png/revision/latest?cb=20231027115623",
rubber:"https://static.wikia.nocookie.net/roblox-blox-piece/images/5/5c/Rubber_Fruit.png/revision/latest?cb=20231027120046",
ghost:"https://static.wikia.nocookie.net/roblox-blox-piece/images/8/8c/Ghost_Fruit.png/revision/latest?cb=20231027115804",

creation:"https://static.wikia.nocookie.net/roblox-blox-piece/images/4/44/Creation_Fruit.png/revision/latest?cb=20250913215446",

magma:"https://static.wikia.nocookie.net/roblox-blox-piece/images/2/27/Magma_Fruit.png/revision/latest?cb=20231027115640",
quake:"https://static.wikia.nocookie.net/roblox-blox-piece/images/4/42/Quake_Fruit.png/revision/latest?cb=20231027115754",
buddha:"https://static.wikia.nocookie.net/roblox-blox-piece/images/d/df/Buddha_Fruit.png/revision/latest?cb=20231027115325",
love:"https://static.wikia.nocookie.net/roblox-blox-piece/images/b/b3/Love_Fruit.png/revision/latest?cb=20231027115630",
spider:"https://static.wikia.nocookie.net/roblox-blox-piece/images/6/61/Spider_Fruit.png/revision/latest?cb=20231027120241",
phoenix:"https://static.wikia.nocookie.net/roblox-blox-piece/images/f/fc/Phoenix_Fruit.png/revision/latest?cb=20231027115733",
sound:"https://static.wikia.nocookie.net/roblox-blox-piece/images/b/ba/Sound_Fruit.png/revision/latest?cb=20231027120231",
portal:"https://static.wikia.nocookie.net/roblox-blox-piece/images/8/8a/Portal_Fruit.png/revision/latest?cb=20231027115746",

rumble_lightning:"https://static.wikia.nocookie.net/roblox-blox-piece/images/7/78/Lightning_Fruit.png/revision/latest?cb=20231027120057",

pain:"https://static.wikia.nocookie.net/roblox-blox-piece/images/4/40/Pain_Fruit.png/revision/latest?cb=20231027115724",
blizzard:"https://static.wikia.nocookie.net/roblox-blox-piece/images/c/c9/Blizzard_Fruit.png/revision/latest?cb=20231027115313",
gravity:"https://static.wikia.nocookie.net/roblox-blox-piece/images/5/5f/Gravity_Fruit.png/revision/latest?cb=20250418030958",
dough:"https://static.wikia.nocookie.net/roblox-blox-piece/images/0/02/Dough_Fruit.png/revision/latest?cb=20231210155057",
shadow:"https://static.wikia.nocookie.net/roblox-blox-piece/images/5/58/Shadow_Fruit.png/revision/latest?cb=20241229033053",
venom:"https://static.wikia.nocookie.net/roblox-blox-piece/images/d/d2/Venom_Fruit.png/revision/latest?cb=20231027120425",
control:"https://static.wikia.nocookie.net/roblox-blox-piece/images/1/19/Control_Fruit.png/revision/latest?cb=20251223165924",
spirit:"https://static.wikia.nocookie.net/roblox-blox-piece/images/6/66/Spirit_Fruit.png/revision/latest?cb=20240304190559",
dragon:"https://static.wikia.nocookie.net/roblox-blox-piece/images/2/29/Dragon_Fruit.png/revision/latest?cb=20241218114129",
leopard:"https://static.wikia.nocookie.net/roblox-blox-piece/images/1/14/Tiger_Fruit.png/revision/latest?cb=20251101005924",
kitsune:"https://static.wikia.nocookie.net/roblox-blox-piece/images/6/65/Kitsune_Fruit.png/revision/latest?cb=20241223162956",
trex:"https://static.wikia.nocookie.net/roblox-blox-piece/images/d/d9/T-Rex_Fruit.png/revision/latest?cb=20231226191220",
mammoth:"https://static.wikia.nocookie.net/roblox-blox-piece/images/9/95/Mammoth_Fruit.png/revision/latest?cb=20231027115702",
gas:"https://static.wikia.nocookie.net/roblox-blox-piece/images/e/ed/Gas_Fruit.png/revision/latest?cb=20241223162315",

darkblade:"https://static.wikia.nocookie.net/roblox-blox-piece/images/a/a0/Dark_Blade.png/revision/latest?cb=20241223051659",
fruitnotifier:"https://static.wikia.nocookie.net/roblox-blox-piece/images/9/98/BadgeFruitNotifier.png/revision/latest?cb=20241223150335",
fastboats:"https://static.wikia.nocookie.net/roblox-blox-piece/images/f/fa/BadgeBoats.png/revision/latest?cb=20241223150315",
twoxmoney:"https://static.wikia.nocookie.net/roblox-blox-piece/images/c/cf/BadgeMoneyx2.png/revision/latest?cb=20241223150409",
twoxmastery:"https://static.wikia.nocookie.net/roblox-blox-piece/images/1/16/BadgeMasteryx2.png/revision/latest?cb=20241223150402",
twoxbossdrops:"https://static.wikia.nocookie.net/roblox-blox-piece/images/3/3a/BadgeBossDrops.png/revision/latest?cb=20241223150323",
fruitstorage:"https://static.wikia.nocookie.net/roblox-blox-piece/images/6/6a/BadgeFruitStorage.png/revision/latest?cb=20241223150349"
}

if(!fs.existsSync("public/images")){
fs.mkdirSync("public/images",{recursive:true})
}

for(const name in items){

const file = fs.createWriteStream(`public/images/${name}.png`)

https.get(items[name],res=>{
res.pipe(file)
})

}

console.log("Download das imagens iniciado...")