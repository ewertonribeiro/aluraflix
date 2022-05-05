import express from 'express';
import videosRouter from './Routes/videos.routes';
import categoriesRouter from './Routes/categories.routes';
import { AuthMiddleware } from './Middlewares';


const app = express();

// app.use(express.static("piblic")); Caso implementemos o front , devera ficar na parta chamada public
app.use(express.json());
app.get('/teste',AuthMiddleware.token,(req,res)=>res.json({teste:'passou'}))
//Rotas para os videos
app.use('/videos', videosRouter);

//Rotas para categorias
app.use('/categorias', categoriesRouter);

export default app;
