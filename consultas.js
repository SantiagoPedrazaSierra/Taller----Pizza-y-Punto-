const fs = require("fs/promises");
const path = require("path");

const rutaData = path.join(__dirname, "data/data.json");

// 🍕 Ingredientes más usados en el último mes
async function ingredientesMasUsados() {
  const data = JSON.parse(await fs.readFile(rutaData, "utf-8"));
  const hace30Dias = new Date();
  hace30Dias.setDate(hace30Dias.getDate() - 30);

  const ingredientes = {};

  for (const pedido of data) {
    const fechaPedido = new Date(pedido.fecha);
    if (fechaPedido >= hace30Dias) {
      for (const pizza of pedido.pizzas) {
        for (const ing of pizza.ingredientes) {
          const nombre = ing.nombre.trim();
          ingredientes[nombre] = (ingredientes[nombre] || 0) + ing.cantidad;
        }
      }
    }
  }

  const resultado = Object.entries(ingredientes)
    .map(([nombre, total]) => ({ nombre, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  console.log("\n🍕 Ingredientes más usados en pedidos del último mes:");
  if (resultado.length === 0) {
    console.log("No hay datos disponibles.");
  } else {
    resultado.forEach(i => {
      console.log(`${i.nombre}: ${i.total} unidades`);
    });
  }
}

// 📊 Promedio de precios por categoría
async function promedioPreciosPorCategoria() {
  const data = JSON.parse(await fs.readFile(rutaData, "utf-8"));
  const categorias = {};

  for (const pedido of data) {
    for (const pizza of pedido.pizzas) {
      const cat = pizza.categoria.trim();
      if (!categorias[cat]) {
        categorias[cat] = { total: 0, count: 0 };
      }
      categorias[cat].total += pizza.precio;
      categorias[cat].count++;
    }
  }

  const resultado = Object.entries(categorias).map(([categoria, stats]) => ({
    categoria,
    promedio: stats.total / stats.count
  }));

  console.log("\n📊 Promedio de precios por categoría:");
  if (resultado.length === 0) {
    console.log("No hay datos disponibles.");
  } else {
    resultado.forEach(c => {
      console.log(`${c.categoria}: $${c.promedio.toFixed(2)}`);
    });
  }
}

// 🔥 Categoría más vendida históricamente
async function categoriaMasVendida() {
  const data = JSON.parse(await fs.readFile(rutaData, "utf-8"));
  const conteo = {};

  for (const pedido of data) {
    for (const pizza of pedido.pizzas) {
      const cat = pizza.categoria.trim();
      conteo[cat] = (conteo[cat] || 0) + 1;
    }
  }

  const [categoria, total] = Object.entries(conteo).sort((a, b) => b[1] - a[1])[0] || [];

  console.log("\n🔥 Categoría de pizzas más vendida históricamente:");
  if (!categoria) {
    console.log("No hay datos disponibles.");
  } else {
    console.log(`${categoria}: ${total} unidades`);
  }
}

// 🚀 Ejecutar todo
async function main() {
  try {
    await ingredientesMasUsados();
    await promedioPreciosPorCategoria();
    await categoriaMasVendida();
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

main();

