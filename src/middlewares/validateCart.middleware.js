import { request, response } from "express";
import cartManager from "../cartManager.js";

export const validateCartExists = async (req = request, res = response, next) => {
    try {
        const { cid, pid } = req.params;

        const cart = await cartManager.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
        }

        req.cart = cart;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: error.message});
    }
};