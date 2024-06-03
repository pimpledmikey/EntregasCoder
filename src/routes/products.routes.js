import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import productManager from '../productManager.js';
const router = Router();
import { validateProduct } from '../middlewares/validateProduct.middleware.js';

// Lista de productos
//const products = [];

// obtenemos todos los productos
router.get('/',async (req, res) => {
    try {
        //const limit = req.query.limit;
        const { limit } = req.query;

        //const products = producManager.getProducts(limit);
        const products = await productManager.getProducts(limit);

        res.status(200).send({status: "success", payload: products});

        //const limit = req.params.limit;
        /*
        if (limit) {
            res.status(200).send({status: "success", payload: products.slice(0, limit)});
        } else {
            res.status(200).send({status: "success", payload: products});
        }
        if (products.length == 0) {
            throw new Error('No hay productos cargados');
        }


         */
    }catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: error.message});

    }

});


// obtenemos produt especifico
router.get('/:pid',async (req, res) => {

    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid);
        if (!product) return res.status(404).send({status: "error", message: 'Producto no encontrado' });

        res.status(200).send({status: "success", payload: [product]});
    }catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: error.message});
    }

    /*
    const id = req.params.pid;
    const product = products.find(product => product.id == Number(id));

    if (product) {
        res.status(200).send({status: "success", payload: [product]});
    } else {
        res.status(404).send({status: "error", message: 'Productyo noe cnontrado' });
    }
    */

});

// eliminamos un producto
router.delete('/:pid',async (req, res) => {
    try {
        const { pid } = req.params;
        //const product = await productManager.deleteProduct(Number,pid);
        const product = await productManager.deleteProduct(pid);

        if (!product) return res.status(404).send({status: "error", message: 'Producto no encontrado' });

        res.status(200).send({status: "success", message: `El producto con el id ${pid} fue eliminado`});
    }catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: error.message});
    }

});

// actualizamos un producto
router.put('/:pid',async (req, res) => {
    try {
        const { pid } = req.params;
        const body = req.body;
        //const product = await productManager.updateProduct(Number,pid,body);
        const product = await productManager.updateProduct(pid,body);

        if (!product) return res.status(404).send({status: "error", message: 'Producto no encontrado' });

        res.status(200).send({status: "success", payload: [product]});
    }catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: error.message});
    }

});

// realizamos la creacion de un producto
router.post('/',validateProduct,async (req, res) => {
    try {
        const body = req.body;
        const product = await productManager.addProduct(body);

        res.status(201).send({status: "success", message: "Producto creado", payload: product});
    }catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: error.message});
    }
});

/*
router.post('/',validateProduct,async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        const newProduct = await producManager.addProduct({title, description, code, price, stock, category, thumbnails});

        res.status(201).send({status: "success", message: "Producto creado", payload: newProduct});
    }catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: error.message});
    }
    /*
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    const newProduct = {
        id: uuidv4(),
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails: thumbnails || [],
        status: true
    };
    products.push(newProduct);
    res.status(201).send({status: "success", message: "Producto creado", payload: newProduct})


});
*/



export default router;