const inquirer = require('inquirer');

async function menuTomarPedido() {
    console.log("\n********** TOMAR PEDIDO **********\n");

    const respuestas = await inquirer.prompt([
        {
            type: 'input',
            name: 'cliente',
            message: '👤 Nombre del cliente:'
        },
        {
            type: 'checkbox',
            name: 'pizzas',
            message: '🍕 Selecciona las pizzas del pedido:',
            choices: ['Margarita', 'Hawaiana', 'Pepperoni'] // Puedes llenar esto dinámicamente
        },
        {
            type: 'confirm',
            name: 'asignarRepartidor',
            message: '¿Deseas asignar un repartidor ahora?'
        }
    ]);

    const pedido = {
        Cliente: respuestas.cliente,
        Total: `$${(respuestas.pizzas.length * 25000).toFixed(2)}`, // Suponiendo que cada pizza cuesta 25.000
        Fecha: new Date().toLocaleString(),
        Repartidor: respuestas.asignarRepartidor ? "Asignado" : "No asignado",
        CantidadPizzas: respuestas.pizzas.length
    };

    console.log("\n********** DETALLES DEL PEDIDO **********\n");
    console.table(pedido);
    console.log("\n***************************************\n");
}

menuTomarPedido();
