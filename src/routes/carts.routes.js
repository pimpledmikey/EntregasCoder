import { Router } from 'express';
import cartManager from '../cartManager.js';
import productManager from '../productManager.js';
import { validateCartExists } from '../middlewares/validateCart.middleware.js';



const router = Router();

router.post('/', async (req, res) => {
  try {

    const cart = await cartManager.createCart();


    res.status(201).json({status: "success", cart});
  }catch(error){
    console.log(error);

    res.status(500).json({status: "Error", msg: "Error interno del servidor"});
  }

});


router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    //const cart = await cartManager.getCartById(Number(cid));
    const cart = await cartManager.getCartById(cid);

    if (!cart) return res.status(404).json({status: "Error", msg: "Carrito no encontrado"});


    res.status(201).json({status: "success", cart});

  }catch(error){
    console.log(error);

    res.status(500).json({status: "Error", msg: "Error interno del servidor"});
  }

});

//  agregr producto al carrito
router.post('/:cid/products/:pid',validateCartExists ,async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const product = await productManager.getProductById(pid);

    if (!product) return res.status(404).json({status: "Error", msg: "Producto no Encontrado"});

    const cart = await cartManager.addProductToCart(cid, pid);
    if (!cart) return res.status(404).json({status: "Error", msg: "Carrito noEncontrado"});

    res.status(201).json({status: "success", cart});

  }catch(error){
    console.log(error);

    res.status(500).json({status: "Error", msg: "Error interno del servidor"});
  }

});

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const {cid, pid} = req.params;

    const cart = await cartManager.getCartById(cid);

    if (!cart) return res.status(404).json({status: "Error", msg: "Carrito no encontrado"});

    const updatedCart = await cartManager.removeProductFromCart(cid, pid);

    res.status(200).json({status: "success", msg: "Producto eliminado del carrito", cart: updatedCart});
  } catch (error) {
    console.log(error);
    res.status(500).json({status: "Error", msg: "Error interno del servidor"});
  }
});

export default router;

