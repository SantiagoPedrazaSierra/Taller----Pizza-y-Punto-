// Coleccion ingredientes 

db.createCollection("ingredientes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "tipo", "stock"],
            properties: {
                nombre: {
                    bsonType: "string",
                    description: "debe ser un string y es obligatorio"
                },
                tipo: {
                    bsonType: "string",
                    description: " debe ser un string y es obligatorio"
                },
                stock: {
                    bsonType: "int",
                    minimum: 0,
                    description: "debe ser un numero entero >= 0  y es obligatorio"
                }
            }
        }
    }
})

//Coleccion pedidos

db.createCollection("pizzas", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "categoria", "precio", "ingredientes"],
            properties: {
                nombre: {
                    bsonType: "string",
                    description: "obligatorio"
                },
                categoria: {
                    bsonType: "string",
                    description: "obligatorio"
                },
                precio: {
                    bsonType: "double",
                    minimum: 0,
                    description: "precio debe ser número positivo"
                },
                ingredientes: {
                    bsonType: "array",
                    description: "lista de ingredientes",
                    items: {
                        bsonType: "object",
                        required: ["nombre"],
                        properties: {
                            nombre: { bsonType: "string" },
                            cantidad: { bsonType: "int", minimum: 1 }
                        }
                    }
                }
            }
        }
    }
})

// Coleccion repartidores

db.createCollection("repartidores", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "zona", "estado"],
            properties: {
                nombre: {
                    bsonType: "string"
                },
                zona: {
                    bsonType: "string"
                },
                estado: {
                    enum: ["disponible", "ocupado"],
                    description: "solo puede ser 'disponible' o 'ocupado'"
                }
            }
        }
    }
})

// Coleccion clientes 

db.createCollection("clientes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "telefono", "direccion"],
            properties: {
                nombre: {
                    bsonType: "string"
                },
                telefono: {
                    bsonType: "string",
                    pattern: "^[0-9]{7,15}$", // opcional: valida que sea solo números entre 7 y 15 dígitos
                    description: "teléfono debe contener solo números"
                },
                direccion: {
                    bsonType: "string"
                }
            }
        }
    }
})

