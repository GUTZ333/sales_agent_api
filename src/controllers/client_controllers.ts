import { Request, Response } from "express";
import { ClientService } from "../services/client_service";

const service = new ClientService()

// O objeto de controle do cliente que vai conter as interfaces das requisições HTTP e a lógica de negócio
export class ClientController {
  // Handler que vai chama o service que tenta cadastra um cliente novo no sistema
  async findOrCreate(req: Request, res: Response) {
    const { identifier, name } = req.body

    if (!identifier) {
      return res.status(400).json({
        error: "Identifier is required"
      })
    }

    const { data, error } = await service.findOrCreate(identifier, name)

    if (error) {
      return res.status(500).json(error)
    }

    res.json(data)
  }

  // Handler que vai chama o service que tenta procura um cliente cadastrado para atualizar informações que foi solicitado
  async update(req: Request, res: Response) {
    const { id } = req.params;

    const { data, error } = await service.update(id as string, req.body)

    if (error) {
      return res.status(500).json(error)
    }

    res.json(data)
  }

}