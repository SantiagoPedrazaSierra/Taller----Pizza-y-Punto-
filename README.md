
# 🍕 Pizza y Punto – Sistema de Pedidos e Inventario

Este proyecto simula el sistema de gestión para la pizzería **"Pizza y Punto"**, permitiendo registrar pedidos, controlar inventario, asignar repartidores y generar reportes de ventas con MongoDB y Node.js.

---

## 📦 Tecnologías utilizadas

- Node.js (v22+)
- MongoDB (local o Atlas)
- Inquirer (menús interactivos en consola)
- MongoDB Driver para Node.js (`mongodb`)

---

## 📁 Estructura del proyecto

```
.
├── data/                      # Carpeta con documentos de ejemplo (JSON)
├── colecciones.js            # Validaciones $jsonSchema de las colecciones
├── pedido.js                 # Lógica para realizar pedidos con transacciones
├── consultas.js              # Reportes con Aggregation Framework
├── main.js                   # Menú principal interactivo
├── package.json              # Dependencias del proyecto
└── README.md                 # Este archivo
```

---

## ⚙️ Instalación y ejecución

1. Clona el repositorio o descarga los archivos:

```bash
git clone https://github.com/tu_usuario/pizza-y-punto.git
cd pizza-y-punto
```

2. Instala las dependencias:

```bash
npm install inquirer mongodb
```

3. Asegúrate de tener tu base de datos MongoDB lista (local o Atlas) y que el URI esté directamente en los archivos como se configuró.

4. Ejecuta el menú:

```bash
node main.js
```

---

## 🍕 Funcionalidades

### ✅ Módulo de pedidos

- Toma el ID del cliente y pizzas seleccionadas.
- Verifica disponibilidad de ingredientes.
- Descuenta ingredientes del inventario.
- Asigna automáticamente un repartidor disponible.
- Calcula el total y registra el pedido con fecha y estado.
- Todo en una **transacción MongoDB segura**.

### 📊 Reportes disponibles

Desde el menú interactivo, puedes consultar:

- **Ingredientes más usados** en el último mes.
- **Promedio de precios** por categoría de pizzas.
- **Categoría más vendida** históricamente.

---

## 📦 Colecciones utilizadas

```js
ingredientes
{
  nombre: String,
  tipo: String,
  stock: Number
}

pizzas
{
  nombre: String,
  categoria: String,
  precio: Number,
  ingredientes: [{ nombre: String, cantidad: Number }]
}

clientes
{
  nombre: String,
  telefono: String,
  direccion: String
}

repartidores
{
  nombre: String,
  zona: String,
  estado: String // "disponible" o "ocupado"
}

pedidos
{
  cliente_id: ObjectId,
  pizzas: [{ pizza_id: ObjectId, nombre: String }],
  total: Number,
  repartidor_id: ObjectId,
  fecha: Date,
  estado: String
}
```

---

## 👨‍💻 Autor

Desarrollado por **Jean Marlon Barajas,juandavid bermeo castro,santiago pedraza** como parte del taller de MongoDB y Node.js – Julio 2025.
