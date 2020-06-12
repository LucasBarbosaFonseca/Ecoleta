/* Como está sendo usado typescrip aqui nos controllers é preciso importar 
Request e Response do Express e informa-los nas requisições para indicar o
tipo dos parâmetros de request e response. */
import { Request, Response } from "express";
import Knex from "../database/connection";

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await Knex("items").select("*");

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    });

    return response.json(serializedItems);
  }
}

export default ItemsController;
