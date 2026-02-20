import { supabase } from "../db/clientDB";

// O Objeto que contém as regras de negócios relacionado diretamente com os pedidos
export class OrderService {
  // Ele cadastra um pedido realizado por um cliente
  async create(client_id: string) {
    return await supabase
      .from("orders")
      .insert([{ client_id: client_id }])
      .select()
      .single()
  }

  // Busca um produto específico pelo id dele
  async getProduct(product_id: string) {
    return await supabase
      .from("products")
      .select("*")
      .eq("id", product_id)
      .single()
  }

  // Adiciona um item/s dentro de um pedido já cadastrado que o usuário escolheu
  async addItem(order_id: string, product_id: string, quantity: number) {

    const { data, error } = await this.getProduct(product_id)

    if (error) return { error }

    if (!data) {
      return { error: { message: "Product not found" } }
    }

    if (data.stock < quantity) {
      return {
        error: { message: "insufficient stock" }
      }
    }

    const result = await supabase
      .from("orders")
      .insert([{
        id: order_id,
        product_id: product_id,
        quantity: quantity
      }])

    if (result.error) return result

    await supabase
      .from("products")
      .update({
        stock: data.stock - quantity
      })
      .eq("id", product_id)

    return { data: true, error: null }
  }

  // Ele busca todos os pedidos armazenados no cliente buscando ele pelo id dele
  async getByClient(client_id: string) {
    // Falando do que ele faz por baixo dos panos na formação do código sql ele cria um select com seleção e relação das entidades de pedidos e itens por pedido para pegar pedidos de tal cliente específico ordenado do mais novo para o mais velho
    return await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          products(*)
        )
      `)
      .eq('client_id', client_id)
      .order('created_at', { ascending: false })
  }

  // Atualizar status de um pedido específico
  async updateStatus(order_id: string, status: string) {
    return await supabase
      .from('orders')
      .update({ status })
      .eq('id', order_id)
  }
}