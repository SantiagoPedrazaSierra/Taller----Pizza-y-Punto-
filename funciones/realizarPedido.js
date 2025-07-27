const { realpath } = require("fs");
const inquirer = require("inquirer");
const { MongoClient,OnjectId } = require("mongodb");

const uri = "mongodb+srv://pdzsanty777:perroloco12@santiagopedraza.uaohxsi.mongodb.net/"
const clienteMongo = new MongoClient(uri);

async function realizarPedido() {
    try {
        await clienteMongo.connect();
        const db = clienteMongo.db("pizza_punto");

        const clientes = await db.collection("clientes").find().toArray();
        const pizzas = await db.collection("pizzas").find().toArray();
        const repartidor = await db.collection("repartidores").findOne({estado:"disponible"});

        if (!cliente.length || !pizzas.length || !repartidor){
            console.log("❌ Faltan datos: asegurate de tener clientes, pizzas y un repartidor disponible.");
            return;
        }
    } 
}