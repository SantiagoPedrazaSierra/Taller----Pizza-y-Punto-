const inquirer = require('inquirer');

async function mainMenu() {
    let salir = false;

    while (!salir) {
        console.clear();
        console.log('********** MENÚ PRINCIPAL **********')
        const {opcion} = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: 'Seleccione una opcion:',
                choices:[
                    '1️⃣ Tomar pedido',
                    '2️⃣ Agregar ingrediente',
                    '3️⃣ Agregar pizza',
                    '🚪 Salir'
                ]
            }
        ])
        
        switch (opcion) {
            case '1️⃣ Tomar pedido':
                await menuTomarPedido();
                break;
            case '2️⃣ Agregar ingrediente':
                await menuAgregarIngrediente();
                break;
            case '3️⃣ Agregar pizza':
                await menuAgregarPizza();
                break;
            case '🚪 Salir':
                salir = true;
                console.log('👋 ¡Hasta luego!');
                break;
        }
    }
}