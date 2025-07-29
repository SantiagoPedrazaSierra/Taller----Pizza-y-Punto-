const {MongoClient} = require ("mongodb");

const url ="mongodb+srv://Juancho123:1096065716@juancho.asxw736.mongodb.net/?retryWrites=true&w=majority&appName=Juancho";
const client = new MongoClient(url);
const dbName = "pizzeria";


async function traer() {
    
    await client.connect();
    console.log("conectaod exitosamente")
    //
    const db = client.db(dbName);// 📦 Accede a la base "pizzeria"
    const collection = db.collection("test"); // 📄 Accede a la colección "documents"

    const datos = await collection.find().toArray();

    console.log(datos);
    return datos;// esto retorna los datos para que el console.log fuera de la funcion lo pueda usar pero esto hace que los 
    //se repitan ya que ya hay un console.log dentro del metodo que se esta ejecutando

}

traer()
.then (console.log)//aqui se repite los datos que trae return despues de llamar a la funcion 
.catch(console.error)
.finally(()=> client.close());