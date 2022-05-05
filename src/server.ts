import { createServer } from "http";

import DB from "./DB/db";

import expressServer from "./app";

const PORT = process.env.PORT;

//Connect to db
DB();

const server = createServer(expressServer);

server.listen(PORT, () => console.log(`Server Running on port : ${PORT}`));
