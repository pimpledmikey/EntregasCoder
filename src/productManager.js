
// inicaliza la variable products
let products = [];
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';


const pathFile = "./src/data/products.json";

// Añade un producto al archivo products.json
const addProduct = async (product) => {
  await getProducts();
  const { title, description, price, thumbnail, code, stock, category } = product;
  const newProduct = {
    id:  uuidv4(),
    title,
    description,
    price,
    thumbnail: thumbnail || [],
    code,
    stock,
    category,
    status: true,
  };

  products.push(newProduct);

  await fs.promises.writeFile(pathFile, JSON.stringify(products));

  return product;
};

//  limita la cantidad de productos a mostrar
const getProducts = async (limit) => {
    /*
  const productsJson = await fs.promises.readFile(pathFile, "utf8");
    const productsParse = JSON.parse(productsJson);
    products = productsParse || [];

    if (!limit) return products;

    return products.slice(0, limit);

     */
    const productsJson = await fs.promises.readFile(pathFile, "utf8");
    if (!productsJson) {
        products = [];
    } else {
        products = JSON.parse(productsJson);
    }

    if (!limit) return products;

    return products.slice(0, limit);


};

// Obtiene un producto por su id
const getProductById = async (id) => {
    products = await getProducts();
    const product = products.find((p) => p.id === id);
    return product;
};

// Actualiza un producto
const updateProduct = async (id, productData) => {
    await getProducts();

    const index = products.findIndex((p) => p.id === id);
    products[index] = {
        ...products[index],
        ...productData,
    };

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
    const product = await getProductById(id);
    return product;
};

// Elimina un producto
const deleteProduct = async (id) => {
    await getProducts();

    const product = await getProductById(id);

    if (!product) return false;
    products = products.filter((p) => p.id !== id);
    await fs.promises.writeFile(pathFile, JSON.stringify(products));

    return true;

};
// Exporta las funciones
export default { addProduct, getProducts, getProductById, updateProduct, deleteProduct };
