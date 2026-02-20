import { Request, Response } from "express";
import { OrderService } from "../services/order_service";

const service = new OrderService()

// O objeto de controle do pedidos que vai conter as interfaces das requisições HTTP e a lógica de negócio
export class OrderController {
  // Handler que vai chama o service que tenta criar um pedido referente a um cliente 
  async create(req: Request, res: Response) {

    const { client_id } = req.body

    if (!client_id) {
      return res.status(400).json({
        error: 'client id is required'
      })
    }

    const { data, error } =
      await service.create(client_id)

    if (error) {
      return res.status(500).json(error)
    }

    return res.json(data)
  }

  // Handler que vai chama o service que tenta adicionar um item em um pedido de um cliente
  async addItem(req: Request, res: Response) {

    const { order_id, product_id, quantity } = req.body

    if (!order_id || !product_id || !quantity) {
      return res.status(400).json({
        error: 'missing fields'
      })
    }

    const result =
      await service.addItem(order_id, product_id, quantity)

    if (result.error) {
      return res.status(400).json(result.error)
    }

    return res.json({ success: true })
  }

  // Handler que vai chama o service que tenta trazer todos os pedidos armazenados de um client específico
  async getByClient(req: Request, res: Response) {

    const { client_id } = req.params

    const { data, error } =
      await service.getByClient(client_id as string)

    if (error) {
      return res.status(500).json(error)
    }

    return res.json(data)
  }

  // Handler que vai chamar o service que tenta Confirma um pedido no banco que não estava confirmado pelo status dele
  async confirm(req: Request, res: Response) {

    const { order_id } = req.body

    const { error } =
      await service.updateStatus(order_id, 'confirmed')

    if (error) {
      return res.status(500).json(error)
    }

    return res.json({ success: true })
  }
}