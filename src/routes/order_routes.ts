import { Router } from "express";
import { OrderController } from "../controllers/order_controller";

// Router de pedidos com 4 endpoints que cria um pedido, adiciona item no pedido, confirma o pedido e busca algum pedido
// Instânciando o controle de pedido para utiizar os handlers contido
const controller = new OrderController()
export const orderRoute = Router()

orderRoute.post('/process-confirm', controller.processConfirm.bind(controller))
orderRoute.get('/get-by-client/:client_id', controller.getByClient)