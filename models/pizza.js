// Clase de Pizza 

class Pizza {

    constructor(nombre, categoria, precio, ingredientes) {
        try {
            if (!nombre || typeof nombre !== "string") {
                throw new Error("El nombre de la pizza debe ser una cadena de texto válida.")
            }
            if (!categoria || typeof categoria !== "string") {
                throw new Error("La categoria de la pizza debe ser una cadena de texto válida.")
            }
            if (typeof precio !== "number" || precio <= 0) {
                throw new Error("El precio debe ser un numero positivo.")
            }
            if (!Array.isArray(ingredientes)) {
                throw new Error("Los ingredientes deben ser un arreglo.")
            }

            this.nombre = nombre;
            this.categoria = categoria;
            this.precio = precio;
            this.ingredientes = ingredientes;
        } catch (error) {
            console.error('❌ Error al crear la pizza:', error.message);
        }
    }

    agregarIngrediente(ingrediente){
        if (ingrediente && typeof ingrediente === "string" && !this.ingredientes.includes(ingrediente)){
            this.ingredientes.push(ingrediente);
        }
    }

    eliminarIngrediente(ingrediente){
        this.ingredientes = this.ingredientes.filter(i => i !== ingrediente);
    }

    actualizarPrecio(nuevoPrecio){
        if (typeof nuevoPrecio ===  "number" && nuevoPrecio > 0){
            this.precio = nuevoPrecio;
        }
    }

    mostrarInfo(){
        console.log(`🍕 Pizza: ${this.nombre}`);
        console.log(`📦 Categoria: ${this.categoria}`);
        console.log(`💵 Precio: ${this.precio}`);
        console.log(`🧂 Ingredientes: ${this.ingredientes}`);
    }
}


