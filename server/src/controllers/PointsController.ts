/* Como está sendo usado typescrip aqui nos controllers é preciso importar 
Request e Response do Express e informa-los nas requisições para indicar o
tipo dos parâmetros de request e response. */
import { Request, Response } from "express";
import Knex from "../database/connection";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await Knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    return response.json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await Knex("points").where("id", id).first();

    if (!point) {
      return response.status(400).json({ message: "Point not found " });
    }

    const items = await Knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return response.json({ point, items });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items, //É um array contendo um ou mais ids de itens
    } = request.body;

    /* Transaction - como a segundo insert depende do 
    primeiro para poder executa, se o primeiro não funcionar
    o segundo não funciona. */
    const trx = await Knex.transaction();

    const point = {
      image:
        "https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    //A cada incert é gerado um id
    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    /* Pegando ids dos itens que o point coleta e
    id do insert do point. Depois inserindo na tabela point_items
    que faz relacionamento n:n das tabelas point e items */
    const pointItems = items.map((item_id: Number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx("point_items").insert(pointItems);

    //Ao final do uso de transactions, deve dar o commit para
    //o insert acontecer
    await trx.commit();

    return response.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;
