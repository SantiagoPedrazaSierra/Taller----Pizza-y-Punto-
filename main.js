const inquirer = require("inquirer");
const { realizarPedido } = require("./pedido");
const {
  ingredientesMasUsados,
  promedioPreciosPorCategoria,
  categoriaMasVendida,
} = require("./consultas");

async function mostrarMenu() {
  let salir = false;

  while (!salir) {
    const { opcion } = await inquirer.prompt([
      {
        type: "list",
        name: "opcion",
        message: "🍕 MENÚ PRINCIPAL",
        choices: [
          "📦 Realizar Pedido",
          "🍕 Ingredientes más usados en el último mes",
          "📊 Promedio de precios por categoría",
          "🔥 Categoría más vendida históricamente",
          "❌ Salir",
        ],
      },
    ]);

    switch (opcion) {
      case "📦 Realizar Pedido":
        const { clienteId, pizzaIds } = await inquirer.prompt([
          {
            name: "clienteId",
            message: "🧑‍💼 Ingrese el ID del cliente:",
          },
          {
            name: "pizzaIds",
            message: "🍕 Ingrese los IDs de las pizzas (separados por coma):",
          },
        ]);
        const ids = pizzaIds.split(",").map((id) => id.trim());
        await realizarPedido(clienteId, ids);
        break;

      case "🍕 Ingredientes más usados en el último mes":
        await ingredientesMasUsados();
        break;

      case "📊 Promedio de precios por categoría":
        await promedioPreciosPorCategoria();
        break;

      case "🔥 Categoría más vendida históricamente":
        await categoriaMasVendida();
        break;

      case "❌ Salir":
        salir = true;
        break;
    }

    if (!salir) {
      console.log("\nPresiona Enter para continuar...");
      await inquirer.prompt([{ name: "continuar", message: "", type: "input" }]);
    }
  }
}

mostrarMenu();
