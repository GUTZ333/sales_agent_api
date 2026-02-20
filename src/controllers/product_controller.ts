import { Request, Response } from "express";
import { ProductService } from "../services/product_service";

const service = new ProductService()

// O objeto de controle do pedidos que vai conter as interfaces das requisições HTTP e a lógica de negócio
export class ProductController {

  // Handler que vai chama o service que tenta trazer todos os produtos avaliados
  async getAvailable(_: Request, res: Response) {
    const { data, error } = await service.getAvailable()
    if (error) return res.status(500).json(error)

    return res.json(data)
  }

  // Handler que vai chama o service que tenta trazer um produto referenciado por um id
  async getById(req: Request, res: Response) {
    const { id } = req.params
    const { data, error } = await service.getById(id as string)

    if (error) {
      return res.status(500).json(error)
    }

    return res.json(data)
  }

   // Handler que vai chama o service que tenta trazer um produto referenciado pela categoria
  async search(req: Request, res: Response) {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Name is required." })
    }

    const { data, error } = await service.search(name as string)

    if (error) {
      return res.status(500).json(error)
    }

    return res.json(data)
  }
}