/* Usando typescript no import de uma dependência se entre as aspas
aparecer três pontos, é porque precisa de declaração de tipos e para
resolver basta usar npm install @types/nome_da_dependencia -D que o
problema será resolvido. */
import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//Acessar diretório das imagens dos items e servi-lo
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(3333);
