import { Router } from "express";
import { ClientController } from "../controllers/client_controllers";


// Router de clientes com 2 endpoints onde um cadastra o cliente e o outro atualiza recebendo um id como parâmetro
// Instânciando o controle de cliente para utiizar os handlers contido
const controller = new ClientController()
export const clientRouter = Router()

clientRouter.post("/", controller.findOrCreate)
clientRouter.put("/:id", controller.update)
