import Express, { Router } from "express";
import { clientRouter } from "./routes/client_routes";
import { productRouter } from "./routes/product_routes";
import { orderRoute } from "./routes/order_routes";

// criando o servidor do Express para api 
export const app = Express()

// Middlewares para leitura de corpo de requisição no formato JSON e por padrão já existe um prefix /api nas rotas da api
app.use(Express.json())
app.use("/client", clientRouter)
app.use("/product", productRouter)
app.use("/order", orderRoute)

app.get("/", (req, res) => {
  res.send("API funcionando")
})

// definindo que o servidor da API vai rodar na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})