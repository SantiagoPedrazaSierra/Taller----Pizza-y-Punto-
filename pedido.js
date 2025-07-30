const { MongoClient, ObjectId } = require("mongodb");
const fs = require("fs/promises");
const path = require("path");

const url = "mongodb+srv://Juancho123:1096065716@juancho.asxw736.mongodb.net/?retryWrites=true&w=majority&appName=Juancho";
const databaseName = "pizzeria";
const cliente = new MongoClient(url);

async function realizarPedido(clienteId, pizzaIds) {
    await cliente.connect();
    const db = cliente.db(databaseName);
    const session = cliente.startSession();

    try {
        await session.withTransaction(async () => {
            const pizzasCol = db.collection("pizzas");
            const ingredientesCol = db.collection("ingredientes");
            const pedidosCol = db.collection("pedidos");
            const repartidoresCol = db.collection("repartidores");

            // 1. Obtener las pizzas solicitadas
            const pizzas = await pizzasCol.find(
                { _id: { $in: pizzaIds.map(id => new ObjectId(id)) } },
                { session }
            ).toArray();

            if (pizzas.length !== pizzaIds.length) {
                throw new Error("❌ Algunas pizzas no fueron encontradas.");
            }

            // 2. Verificar y descontar ingredientes
            for (const pizza of pizzas) {
                for (const ingrediente of pizza.ingredientes) {
                    const result = await ingredientesCol.findOne(
                        { nombre: ingrediente.nombre },
                        { session }
                    );

                    if (!result || result.stock < ingrediente.cantidad) {
                        throw new Error(`❌ Stock insuficiente de ${ingrediente.nombre}`);
                    }

                    await ingredientesCol.updateOne(
                        { nombre: ingrediente.nombre },
                        { $inc: { stock: -ingrediente.cantidad } },
                        { session }
                    );
                }
            }

            // 3. Buscar un repartidor disponible
            const repartidor = await repartidoresCol.findOne(
                { estado: true },
                { session }
            );

            if (!repartidor) {
                throw new Error("❌ No hay repartidores disponibles.");
            }

            // 4. Marcar repartidor como ocupado
            await repartidoresCol.updateOne(
                { _id: repartidor._id },
                { $set: { estado: false } },
                { session }
            );

            // 5. Calcular total
            const total = pizzas.reduce((sum, p) => sum + p.precio, 0);

            // 6. Crear pedido
            const pedido = {
                clienteId,
                pizzas: pizzas.map(p => ({
                    nombre: p.nombre,
                    precio: p.precio,
                    categoria: p.categoria,
                    ingredientes: p.ingredientes
                })),
                total,
                fecha: new Date(),
                repartidorAsignado: repartidor._id
            };

            // Guardar en MongoDB
            await pedidosCol.insertOne(pedido, { session });

            // Guardar también en archivo JSON local
            const carpeta = path.join(__dirname, "data");
            const archivo = path.join(carpeta, "data.json");

            // Crear carpeta si no existe
            await fs.mkdir(carpeta, { recursive: true });

            let pedidosPrevios = [];
            try {
                const contenido = await fs.readFile(archivo, "utf-8");
                pedidosPrevios = JSON.parse(contenido);
            } catch (error) {
                // Si el archivo no existe, se sigue con array vacío
            }

            pedidosPrevios.push(pedido);
            await fs.writeFile(archivo, JSON.stringify(pedidosPrevios, null, 4));

            console.log("✅ Pedido registrado con éxito y guardado en data.json.");
        });

    } catch (error) {
        console.error("❌ Transacción fallida:", error.message);
    } finally {
        await session.endSession();
        await cliente.close();
    }
}

// Ejecutar
realizarPedido("c3", [
    "688990783d6ce5b993a370b4",
    "688990813d6ce5b993a370b6",
    "688990923d6ce5b993a370ba"
]);
