import express, { response } from "express";

import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

//Rotas dos Points
routes.post("/points", pointsController.create);
routes.get("/points/:id", pointsController.show);
routes.get("/points", pointsController.index);

//Rotas dos Items
routes.get("/items", itemsController.index);

export default routes;

//index - listagem de todos os registros
//show - listagem de um dados específicos
//create - criar
//update - editar
//delete - deletar
