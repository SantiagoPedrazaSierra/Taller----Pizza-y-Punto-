# 🍕 Pizza y Punto – Sistema de Pedidos por Consola

> Aplicación de consola desarrollada en **Node.js** para gestionar pedidos, inventario y análisis de ventas en una pizzería, usando **MongoDB**, **inquirer** y transacciones seguras.

---

## 📦 Características principales

- ✅ Registro interactivo de pedidos por consola
- 📉 Control automático del inventario de ingredientes
- 🛵 Asignación automática de repartidores disponibles
- 📊 Reportes de ventas y tendencias con Aggregation Framework
- 🔐 Transacciones seguras que garantizan integridad entre múltiples colecciones

---

## 🚀 Tecnologías utilizadas

- Node.js
- MongoDB + Aggregation Framework
- Inquirer (CLI interactivo)
- MongoDB Transactions
- Estructura modular en JavaScript

---

## 📂 Estructura del sistema

### 🔸 Clientes (`clientes`)
```json
{
  "nombre": "Laura Pérez",
  "telefono": "3001234567",
  "direccion": "Cra 25 #12-34"
}
🔸 Pizzas (pizzas)
json
Copiar
Editar
{
  "nombre": "Hawaiana",
  "categoria": "tradicional",
  "precio": 28000,
  "ingredientes": [
    { "ingredienteId": ObjectId("..."), "cantidad": 2 },
    { "ingredienteId": ObjectId("..."), "cantidad": 1 }
  ]
}
🔸 Ingredientes (ingredientes)
json
Copiar
Editar
{
  "nombre": "Queso mozzarella",
  "tipo": "queso",
  "stock": 50
}
🔸 Repartidores (repartidores)
json
Copiar
Editar
{
  "nombre": "Andrés López",
  "zona": "Norte",
  "estado": "disponible"
}
🔸 Pedidos (pedidos)
json
Copiar
Editar
{
  "clienteId": ObjectId("..."),
  "pizzas": [ObjectId("..."), ObjectId("...")],
  "total": 56000,
  "fecha": ISODate("2025-07-28T10:00:00Z"),
  "repartidorAsignado": ObjectId("...")
}
🔄 Transacciones implementadas
La función realizarPedido(clienteId, pizzaIds[]) ejecuta una transacción atómica que:

✅ Verifica disponibilidad de ingredientes para todas las pizzas seleccionadas.

➖ Resta del inventario los ingredientes utilizados.

📝 Registra el pedido con cliente, pizzas, total y fecha.

🛵 Asigna un repartidor disponible y cambia su estado a ocupado.

❌ Si falla alguna validación, revierte toda la operación automáticamente.

Esto garantiza integridad y evita errores como repartidores duplicados o pedidos sin ingredientes disponibles.

📊 Consultas de análisis (Aggregation Framework)
Incluye funciones con aggregation que permiten visualizar datos clave en consola:

1. Ingredientes más usados en el último mes
js
Copiar
Editar
ingredientesMasUsadosUltimoMes();
📍 Resultado: Lista ordenada de ingredientes usados en pedidos recientes.

2. Promedio de precios por categoría de pizza
js
Copiar
Editar
promedioPreciosPorCategoria();
📍 Resultado: Promedios como:

bash
Copiar
Editar
- Tradicional: $24.000
- Vegana: $32.000
- Especial: $29.500
3. Categoría de pizzas más vendida históricamente
js
Copiar
Editar
categoriaMasVendida();
📍 Resultado: Categoría con más unidades vendidas desde el inicio del sistema.

💻 Comandos disponibles
👉 Ejecutar la aplicación principal
bash
Copiar
Editar
node index.js
Menú interactivo incluye:
Registrar un nuevo pedido

Ver reportes de ventas

Salir del sistema

Las operaciones se hacen a través de preguntas CLI con inquirer.

🧪 Requisitos previos
Node.js v18 o superior

MongoDB Atlas (o local) con base de datos pizza_punto

Las colecciones deben estar creadas: clientes, pizzas, ingredientes, repartidores

Agregar archivo .env con conexión:

ini

MONGODB_URI=mongodb+srv://usuario:clave@cluster.mongodb.net/
⚙️ Instalación y ejecución
Clona el repositorio:


git clone https://github.com/usuario/pizza-y-punto
cd pizza-y-punto
Instala dependencias:


npm install
Ejecuta la app:


node index.js
📁 Estructura del proyecto
pgsql

pizza-y-punto/
├── src/
│   ├── db.js
│   ├── pedidos.js
│   ├── transacciones.js
│   ├── consultas.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
🧹 .gitignore sugerido

node_modules/
.env
.DS_Store
👥 Integrantes del equipo
Jean Marlon Barajas
juandavid bermeo castro
santiago pedraza
 

📅 Fecha de entrega
🗓 Límite: 28 de julio de 2025 – 10:00 a.m.
📎 Entrega: Repositorio en GitHub con código, .gitignore y este README.