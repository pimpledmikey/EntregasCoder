import { Router } from 'express';
import productManager from '../productManager.js';
import { io } from '../app.js';
const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("home", { products });

    }catch (error) {

        res.status(500).json({ error: error.message });
        console.log(error);
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        io.emit("products", products);
        res.render("realTimeProducts");
    }catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});

router.post('/realtimeproducts', async (req, res) => {
    try {
        const product = req.body;
        await productManager.addProduct(product);
        const products = await productManager.getProducts();
        io.emit("products", products);
        res.redirect('/realTimeProducts');
        console.log("Producto agregado", products);
    }catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});

// eliminar un producto
router.delete("/realtimeproducts", async (req, res) => {
    try {
        const { id } = req.body;
        await productManager.deleteProduct(id);
        const products = await productManager.getProducts();
        io.emit("products", products);

        res.render("realTimeProducts");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;