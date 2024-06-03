import { request, response } from "express";
import productManager from "../productManager.js";


export const validateProduct = async (req = request, res = response, next) => {
    /*
/*    // Validamos si envían el nombre
    if (!name) return res.status(400).json({ status: "Error", msg: "El nombre es requerido" });
    if (!description) return res.status(400).json({ status: "Error", msg: "La descripción es requerida" });
    if (!code) return res.status(400).json({ status: "Error", msg: "El código es requerido" });
    if (!price) return res.status(400).json({ status: "Error", msg: "El precio es requerido" });
    if (!thumbnail) return res.status(400).json({ status: "Error", msg: "La imagen es requerida" });
    if (!stock) return res.status(400).json({ status: "Error", msg: "El stock es requerido" });
*/
    // Validamos si todos los campos requeridos están presentes
    try {

        const { title, description, code, price, stock, category } = req.body;
        const newProduct = {
            title,
            description,
            code,
            price,
            stock,
            category,
        };
        const products = await productManager.getProducts();


        const productExists = products.find((p) => p.code === code);
        if (productExists) return res.status(400).json({ status: "Error", msg: `El producto con el código ${code} ya existe` });

        // Validamos que los campos sean obligatorios

        const checkData = Object.values(newProduct).includes(undefined);
        if (checkData) return res.status(400).json({ status: "Error", msg: "Todos los datos son obligatorios" });

     next();
        /*
                if (!title || !description || !code || !price || !stock || !category) {
                    return res.status(400).json({status: "Error", msg: "Todos los campos son obligatorios, a excepción de thumbnails"});
                }

                // Validamos si los campos tienen los tipos correctos
                if (typeof title !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof category !== 'string') {
                    return res.status(400).json({status: "Error", msg: "Los campos title, description, code y category deben ser de tipo string"});
                }

                if (typeof price !== 'number' || typeof stock !== 'number') {
                    return res.status(400).json({status: "Error", msg: "Los campos price y stock deben ser de tipo number"});
                }
                next();

                 */

    }catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: error.message});
    }
}