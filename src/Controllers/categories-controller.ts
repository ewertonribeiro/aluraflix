import { Request, Response } from "express";
import CategoriesModel from "../Model/categories-model";
// import { categoryController } from ".";
import { categoriesRepository } from "../Repositories"


export default class CategoryController {


  constructor() {

  }

  async getAllCategories(req: Request, res: Response): Promise<Response> {

    const page = Number(req.query.page);
    const limit = 5;

    const categorias = await categoriesRepository.queryGetAllCategories();

    if(!page){
      return res.status(200).json(categorias);
    }


    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const response = categorias.slice(startIndex,endIndex);

    return res.status(200).json(response);

  }

  async getCategoryById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);

    const category = await categoriesRepository.queryCategoryById(id);


    if (!category) {
      return res.status(404).json({ error: "Categia nao encontrada!" });
    }

    return res.status(200).json(category);

  }

  async createNewCategory(req: Request, res: Response) {

    const { titulo, cor } = req.body as CategoriesModel;

    try {
      const newCategory = await categoriesRepository.queryCreateNewCategory({ cor, titulo })

      return res.status(201).json(newCategory);


    } catch (err) {

      return res.status(400).json({ error: "Os campos cor ou titulo ja existem!" });
    }

  }


  async updateCategory(req: Request, res: Response) {

    const id = Number(req.params.id);
    const { titulo, cor } = req.body as CategoriesModel;


    try {
      const updateVideo = await categoriesRepository.queryUpdateCategory({ titulo, cor }, id);

      return res.status(201).json(updateVideo);

    } catch (error: any) {

      const message = String(error.message);

      const subMessage = message.substring(7, message.length);

      return res.status(404).json({ error: subMessage });

    }



  }


  async deleteCategory(req: Request, res: Response) {

    const id = Number(req.params.id);

    try {
      const deletedCategory = await categoriesRepository.queryDeleteCategory(id);


      return res.status(200).json(deletedCategory)


    } catch (error: any) {
      const message = String(error.message);

      const subMessage = message.substring(7, message.length);

      return res.status(404).json({ error: subMessage });

    }
  }


  async getVideosByCategory(req: Request, res: Response) {

    const id = Number(req.params.id);

    const response = await categoriesRepository.queryVideosByCategory(id);


    return res.status(200).json(response);

  }

}
