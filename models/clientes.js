// Clase cliente

class Cliente {
    constructor(nombre, telefono, direccion) {
        if (!nombre || typeof nombre !== "string") {
            throw new Error("El nombre debe ser una cadena de texto válida.");
        }
        if (!telefono || typeof telefono !== "string") {
            throw new Error("El teléfono debe ser una cadena de texto válida.");
        }
        if (!direccion || typeof direccion !== "string") {
            throw new Error("La dirección debe ser una cadena de texto válida.");
        }

        this.nombre = nombre;
        this.telefono = telefono;
        this.direccion = direccion;
    }

    mostrar() {
        console.table({
            Nombre: this.nombre,
            Teléfono: this.telefono,
            Dirección: this.direccion
        });
    }
}
