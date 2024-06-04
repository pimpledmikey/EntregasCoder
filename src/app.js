import express from "express";
import apiRoutes from "./routes/index.routes.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";
import productManager from './productManager.js';

const PORT = 8082;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("views",__dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));


app.use("/api", apiRoutes);
// Rutas
app.use("/",viewsRoutes);

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor en el puerto: ${PORT}`);
});


//configurar socket
export const io = new Server(httpServer);
io.on('connection', (socket) => {
    console.log('a Usuario conectado');

    socket.on('getProducts', async () => {
        const products = await productManager.getProducts();
        io.emit("products", products);
    });


});

