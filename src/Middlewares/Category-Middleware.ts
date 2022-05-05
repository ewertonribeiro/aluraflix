import { Request, Response, NextFunction } from "express";

// import { categoriesRepository } from '../Repositories'

import CategoriesModel from "../Model/categories-model";

import { categoryMiddleware } from "."

export default class CategoryMiddleware {


  private checkCampo(campo: string, tipoCampo: string, rota?: string) {

    let response = {
      ok: true,
    }

    if (rota === "create" || rota === undefined) {
      if (!campo) {
        response.ok = false;
        Object.assign(response, { error: `O campo ${tipoCampo} e obrigatorio` });
        return response;
      }
    }

    if (typeof campo != "string") {

      response.ok = false;
      Object.assign(response, { error: `O campo ${tipoCampo} precisa ser um texto/string` });

      return response;
    } else if (campo.length > 20) {
      response.ok = false;
      Object.assign(response, { error: `O campo ${tipoCampo} precisa ser Menor que 30 characteres` });
      return response;
    }

    return response;

  }




  async verifyCategoryToCreate(req: Request, res: Response, next: NextFunction) {

    const { titulo, cor } = req.body as CategoriesModel;

    //Validacao do campo titulo
    const verifyTitulo = categoryMiddleware.checkCampo(titulo, "titulo");

    if (!verifyTitulo.ok) {
      return res.status(400).json(verifyTitulo);
    }

    //Validacao do campo cor
    const verifyCor = categoryMiddleware.checkCampo(cor, "cor");

    if (!verifyCor.ok) {

      return res.status(400).json(verifyCor);
    }


    return next();

  }


  async verifyCategoryToUpdate(req: Request, res: Response, next: NextFunction) {

    const { cor, titulo } = req.body as CategoriesModel;



    if (titulo) {
      const verifyTitulo = categoryMiddleware.checkCampo(titulo, "titulo", "update");

      if (!verifyTitulo.ok) {
        return res.status(400).json(verifyTitulo);
      }



    }

    if (cor) {
      const verifyCor = categoryMiddleware.checkCampo(cor, "cor", "update");

      if (!verifyCor.ok) {
        return res.status(400).json(verifyCor);
      }
    }



    return next();

  }
}

