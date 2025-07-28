// Clase Repartidor

class Repartidor {
    constructor(nombre, zona, estado = "disponible") {
        try {
            if (!nombre || typeof nombre !== "string") {
                throw new Error("El nombre debe ser una cadena de texto válida.");
            }
            if (!zona || typeof zona !== "string") {
                throw new Error("La zona debe ser una cadena de texto válida.");
            }
            if (!["disponible", "ocupado"].includes(estado)) {
                throw new Error("El estado debe ser 'disponible' u 'ocupado'.");
            }

            this.nombre = nombre;
            this.zona = zona;
            this.estado = estado;

        } catch (error) {
            console.error("❌ Error al crear el repartidor:", error.message);
        }
    }

    cambiarEstado(nuevoEstado) {
        if (["disponible", "ocupado"].includes(nuevoEstado)) {
            this.estado = nuevoEstado;
        } else {
            console.warn("⚠️ Estado inválido. Usa 'disponible' u 'ocupado'.");
        }
    }

    mostrar() {
        console.table({
            Nombre: this.nombre,
            Zona: this.zona,
            Estado: this.estado
        });
    }
}
