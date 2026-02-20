import { supabase } from "../db/clientDB"

// O objeto que define a regra de negócios em relação as operações diretamente do cliente
export class ClientService {
  // Cadastra o cliente no banco de dados
  async create(data: any) {
    return await supabase
      .from("clients")
      .insert([data])
      .select()
      .single()
  }

  // Procurando um cliente pelo identificador dele
  async findByIdentifier(identifier: string) {
    return await supabase
      .from("clients")
      .select("*")
      .eq("identifier", identifier)
      .single()
  }

  // ele vai utilizar os 2 métodos anteriores para aplicar no handler aonde está a regra de negócio, que seria não cadastrar clientes ja´existentes, mas se ele não existe aí que ele vai ser cadastrado
  async findOrCreate(identifier: string, name?: string) {
    let { data, error } = await this.findByIdentifier(identifier)

    if (!data) {
      const result = await this.create({
        identifier, name
      })

      if (result.error) return result

      data = result.data
    }

    return { data, error: null }
  }

  // Este método atualiza dados de um cliente específico pelo id e recebi um data que contém o nome ou identifier ou os 2 serem atualizados
  async update(id: string, data: any) {
    return await supabase
      .from("clients")
      .update(data)
      .eq("id", id)
      .select()
      .single()
  }
} 