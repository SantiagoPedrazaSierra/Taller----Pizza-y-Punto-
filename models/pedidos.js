// Clase Pedidos

class Pedidos {
    constructor(clienteId, pizzas, total, fecha= Date.now(), repartidorAsignado = null) {
        try {
            if (!clienteId) {
                throw new Error("El clienteId es obligatorio!.")
            }
            if (!Array.isArray(pizzas) || pizzas.length === 0) {
                throw new Error("La lista de pizzas debe ser un  arreglo no vacio.")
            }
            if (typeof total !== "number" || total <= 0) {
                throw new Error("El total debe ser un numero positivo.")
            }

            this.clienteId = clienteId;
            this.pizzas = pizzas;
            this.total = total;
            this.fecha = fecha;
            this.repartidorAsignado = repartidorAsignado;

        } catch (error) {
            console.error('❌ Error al crear el pedido', error.message)
        }
    }

    mostrar(){
        console.table({
            Cliente: this.clienteId,
            Total: `$${this.total.toFixed(2)}`,
            Fecha: new Date(this.fecha).toLocaleString(),
            Repartidor: this.repartidorAsignado || "No asignado",
            CantidadPizzas: this.pizzas.length
        });
    }
}