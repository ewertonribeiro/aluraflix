import { Request, Response, NextFunction } from "express";

import { videosRepositories } from "../Repositories"

import videosmodel from "../Model/videos-model";
import { videosMiddleware } from ".";


class VideosMiddleware {


  private isValidHttpUrl(string: string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";

  }

  verifyTitulo(titulo: string) {

    // const tituloExists = await videosRepositories.queryVideoByTitulo(titulo);

    if (!titulo || titulo.length > 30 || typeof titulo != 'string') {
      return true;
    }


  }

  verifyDescricao(descricao: string) {
    if (!descricao) {
      return false;
    } else if (descricao.length > 40) {
      return false;
    } else if (typeof descricao != "string") {
      return false;
    };

    return true;
  }

  verifyId(id: number) {

    if (typeof id != "number") return false


    return true;

  }

  async createNewVideo(req: Request, res: Response, next: NextFunction) {

    const { titulo, url, descricao, categoryId } = req.body as videosmodel;

    const tituloExists = await videosRepositories.queryVideoByTitulo(titulo);

    //Verifica os dados do campo titulo
    const titulo_isString_isGreater_isNull = videosMiddleware.verifyTitulo(titulo)
    if (titulo_isString_isGreater_isNull) {
      return res.status(400).json({ error: "Por favor preencha o campo titulo corretamente" });
    } else if (tituloExists) {
      return res.status(400).json({ error: `O titulo={'${titulo}'} ja existe no banco de dados , por favor escolha outro` });
    };

    //Verifica os dados da descricao
    if (!videosMiddleware.verifyDescricao(descricao)) {
      return res.status(400).json({ error: "Por favor preencha o campo descricao corretamente!" });
    }

    //Verifica se a url e valida e se esta online

    if (!videosMiddleware.isValidHttpUrl(url)) {
      return res.status(400).json({ error: `A url={'${url}'} nao e valida` });
    }

    if (categoryId) {

      if (!videosMiddleware.verifyId(categoryId)) return res.status(400).json({ error: "Por favor preencha o campo de categoryId corretamente!" })
    }

    next();

  }


  async verifyToUpdate(req: Request, res: Response, next: NextFunction) {

    const { titulo, url, descricao } = req.body as videosmodel;
    const id = Number(req.params.id);

    if (url) {
      if (!videosMiddleware.isValidHttpUrl(url)) {
        return res.status(400).json({ error: `A url={${url}} nao e valida` });
      }
    }

    //Verifica se o o titulo esta corretamente preenchido e se o novo titulo ja existe em outro registro no banco
    if (titulo) {
      if (videosMiddleware.verifyTitulo(titulo)) {
        return res.status(400).json({ error: "Por favor preencha o campo titulo corretamente!" });
      } else {
        const tituloExists = await videosRepositories.queryVideoByTitulo(titulo, id);
        if (tituloExists) {
          return res.status(400).json({ error: `O titulo={'${titulo}'} ja existe no banco de dados , por favor escolha outro` });
        }
      }

    }

    //Valida o campo da descricao
    if (descricao) {
      if (!videosMiddleware.verifyDescricao(descricao)) {
        return res.status(400).json({ error: "Por favor preencha o campo descricao corretamente" });
      }
    }



    next();


  }

}

export { VideosMiddleware };
