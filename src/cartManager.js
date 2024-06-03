import { v4 as uuidv4 } from 'uuid';
import fs from "fs";

let carts = [];

const pathFile = "./src/data/carts.json";

// Obtiene los carritos
const getCarts = async () => {
    const cartsJson = await fs.promises.readFile(pathFile, "utf-8");
    try {
        carts = JSON.parse(cartsJson);
    } catch (error) {
        console.error('Error parsing :', error);
        carts = [];
    }

};
 // Crea un carrito
const createCart = async () => {

    await getCarts();

    const newCart = {
        id: uuidv4(),
        products: [],
    };
    carts.push(newCart);
    await fs.promises.writeFile(pathFile, JSON.stringify(carts));
    return newCart;

};

// Obtiene un carrito por su id
const getCartById = async (cid) => {

    await getCarts();
    const cart = carts.find((c) => c.id === cid);
    return cart;
};

// Añade un producto a un carrito

const addProductToCart = async (cid, pid) => {
    await getCarts();
    const product = {
        product: pid,
        quantity: 1,
    };
    const index = carts.findIndex((cart) => cart.id === cid);

    if (index === -1) {
        throw new Error('Cart not found');
    }
    // Verifica si el producto ya existe en el carrito
    const productIndex = carts[index].products.findIndex((p) => p.product === pid);

    // Si el producto ya existe en el carrito, se incrementa la cantidad
    if (productIndex !== -1) {
        carts[index].products[productIndex].quantity += 1;
    } else {
        carts[index].products.push(product);
    }

    // Guarda el carrito en el archivo
    await fs.promises.writeFile(pathFile, JSON.stringify(carts));

    return carts[index];
};

const removeProductFromCart = async (cid, pid) =>{
    // Obtiene los carritos
    await getCarts();
    // Busca el carrito por su id
    const index = carts.findIndex((cart) => cart.id === cid);
    // Si no se encuentra el carrito, se lanza un error
    if (index === -1) {
        throw new Error('Cart not found');
    }
    // Busca el producto en el carrito
    const productIndex = carts[index].products.findIndex((p) => p.product === pid);
    // Si no se encuentra el producto, se lanza un error
    if (productIndex === -1) {
        throw new Error('Product not found');
    }
    // Elimina el producto del carrito
    carts[index].products.splice(productIndex, 1);

        await fs.promises.writeFile(pathFile, JSON.stringify(carts));
        // Retorna el carrito actualizado
    return carts[index];
};



export default {
    getCarts,
    getCartById,
    addProductToCart,
    createCart,
    removeProductFromCart
};


