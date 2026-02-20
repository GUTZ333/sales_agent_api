import { Router } from "express";
import { ProductController } from "../controllers/product_controller"

// Router de Produtos com 3 endpoints que faz busca de produtos avaliados, um por id e produtos que contém nomes do que o produto representa como camisetas, celulares, computadores e etc... 
// Instânciando o controle de produtos para utiizar os handlers contido
const controller = new ProductController()
export const productRouter = Router()

productRouter.get("/get-available", controller.getAvailable)
productRouter.get("/get-by-id/:id", controller.getById)
productRouter.get("/search", controller.search)