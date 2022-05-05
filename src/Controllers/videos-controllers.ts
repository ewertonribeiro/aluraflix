import { Request, Response } from "express";
import VideosModel from "../Model/videos-model";

import { videosRepositories } from "../Repositories"

interface RequestID {
  id: number
}


export default class VideosController {


  async getAllVideos(req: Request, res: Response) {

    const page = Number(req.query.page);
    const limit = 5

    const videos = await videosRepositories.queryAllVideos();
    
    if (!page) {
      return res.status(200).json(videos)
    }
    //Paginacao
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const response = videos.slice(startIndex,endIndex);
   
    return res.status(200).json(response);

  }

  async getVideoById(req: Request<RequestID>, res: Response): Promise<Response> {

    const id = req.params.id;

    try {

      const response = await videosRepositories.queryVideoById(id)
      return res.status(200).json(response)

    } catch (error: any) {
      return res.status(404).json({ error: error.message })
    }



  }

  async createNewVideo(req: Request, res: Response) {
    const { url, descricao, titulo, categoryId } = req.body as VideosModel;

    try {

      const response = await videosRepositories.queryCreateNewVideos({ titulo, descricao, url, categoryId });

      return res.status(201).json(response)

    } catch (error: any) {
      return res.status(400).json({ error: error.detail })
    }

  }


  async updateAVideo(req: Request, res: Response) {

    const { titulo, descricao, url } = req.body as VideosModel;
    const id = Number(req.params.id);

   try {

      const response = await videosRepositories.queryUpdateVideo(id, { titulo, descricao, url })

      return res.status(201).json(response);

    } catch (error: any) {

      return res.status(404).json({ error: error.message })
    }


  }

  async deleteVideoById(req: Request, res: Response) {

    const id = Number(req.params.id);


    const deletedVideo = await videosRepositories.queryDeleteVideoById(id);

    if (deletedVideo.succes) {

      return res.status(204).json(deletedVideo);
    } else if (deletedVideo.error) {
      return res.status(400).json(deletedVideo)
    }



  }

  async searchVideos(req: Request, res: Response) {

    const search = req.query.search as string;


    if (!search) return res.status(400).json({ error: "Voce precisa enviar o parametro search!" });

    try {

      const response = await videosRepositories.queryVideoByQueryParam(search)

      return res.json(response);

    } catch (error) {
      return res.status(400).json(error)
    }

  }



}
