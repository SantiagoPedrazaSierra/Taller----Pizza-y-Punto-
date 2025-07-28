// Clase de Ingredientes

class Ingredientes {
    constructor(nombre, tipo, stock) {
        try {
            if (!nombre || typeof nombre !== "string") {
                throw new Error("El nombre de el ingrediente debe ser una cadena de texto válida.")
            }
            if (!tipo || typeof tipo !== "string") {
                throw new Error("El tipo debe ser una cadena de texto válida.")
            }
            if (typeof stock !== "number" || stock < 0) {
                throw new Error("El stock debe ser un numero positivo o cero.")
            }

            this.nombre = nombre;
            this.tipo = tipo;
            this.stock = stock;
        } catch (error) {
            console.error('❌ Error al crear el ingrediente', error.message)
        }
    }

    agregarStock(cantidad){
        try {
            if (typeof cantidad !== "number" || cantidad <= 0) {
                throw new Error("La cantidad debe ser un numero positivo");
                
            }
            this.stock += cantidad;
            console.log(`Se agrego ${cantidad} unidades de "${this.nombre}".Nuevo stock ${this.stock}`);
        } catch (error) {
            console.error('❌ Error al agregar stock', error.message)
        }
    }

    mostar(){
        console.tab({
            Nombre: this.nombre,
            Tipo: this.tipo,
            Stock: this.stock
        })
    }

}