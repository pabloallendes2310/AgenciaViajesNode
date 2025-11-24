import express from "express"
import router from "./routes/index.js";
import db from "./config/db.js";


const app = express();

// Conectar la bd

db.authenticate()
    .then(()=> console.log("Bd conectada"))
    .catch( error => console.log(error));


//Definir puerto
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set("view engine", "pug");

//Middleware propio(Obtener el año actual)
app.use((req, res, next)=>{
    const year = new Date()
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de viajes"
    next();
})
//Agregar body parser para leer los datos del formulario

app.use(express.urlencoded({extended:true}))


// Definir la carpeta publica
app.use(express.static("public"));

//Agregar router
app.use("/",router);


app.listen(port,()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});