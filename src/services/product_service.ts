import { supabase } from "../db/clientDB"

// classe que contém a lógica diretamente sobre os produtos contendo a regra de negócio separado do handler
export class ProductService {


  // Método que busca produtos que estejam com estoque disponível
  async getAvailable() {
    // ele procura na entidade de "products" aonde ficam armazenados todos os produtos
    // nesta query ele vai procurar todos os produtos que condicionalmente esteja disponível
    return await supabase
      .from("products")
      .select("*")
      .gt("stock", 0)
  } 

  // este método procura um produto pelo id que foi escolhido pelo usuário
  async getById(id: string) {
    // Query que procura na entidade que armazena os produtos
    // ele vai procurar o produto pelo id registrado no cordo da requisição armazenado neste parâmetro do método
    return await supabase
      .from("products")
      .select("*")
      .eq("id", id) // significa um registro que tenha o id igual ao id selecionado 
      .single() // esta query vai retornar um resultado só
  }

  // Buscar um produto que tenha uma classificação como camiseta, televisão, celulares e etc...
  async search(name: string) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${name}%`) // filtando o produto que contenha o texto da categoria de produto que esteja contido no produto

    return { data, error }
  }

}