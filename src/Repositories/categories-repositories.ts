import { client } from "../DB/db";
import CategoriesModel from "../Model/categories-model";
import VideosModel from "../Model/videos-model";

export default class CategoriesRepositories {


  async queryGetAllCategories(): Promise<CategoriesModel[] | []> {



    const categories = await client.query<CategoriesModel>(`SELECT * FROM categoria`);


    const categoriesArray = categories.rows;

    if (categoriesArray.length === 0) {
      return [];
    }

    return categoriesArray;

  }

  async queryCategoryById(id: number): Promise<CategoriesModel | undefined> {

    try {

      const category = await client.query<CategoriesModel>(`SELECT * FROM categoria WHERE id = ${id}`);

      if (category.rowCount === 0) {

        throw new Error();

      }

      return category.rows[0];



    } catch (err: any) {

      return;

    }

  }

  async queryCreateNewCategory({ cor, titulo }: CategoriesModel): Promise<CategoriesModel | Error> {

    try {
      const Category = new CategoriesModel({ cor, titulo });

      await client.query<CategoriesModel>(`INSERT INTO categoria (cor,titulo) VALUES ('${Category.cor}' , '${Category.titulo}')`);

      const newCategory = await client.query(`SELECT * FROM categoria WHERE titulo = '${Category.titulo}'`);

      return newCategory.rows[0]


    } catch (err: any) {

      throw new Error(err);

    }
  }



  async queryUpdateCategory({ cor, titulo }: CategoriesModel, id: number) {

    try {

      const querySelect = await client.query<CategoriesModel>(`SELECT * FROM categoria WHERE id = ${id}`);

      if (querySelect.rowCount === 0) {
        throw new Error("Categoria nao encontrada");
      }

      const newCategorie = {
        titulo: titulo ? titulo : querySelect.rows[0].titulo,
        cor: cor ? cor : querySelect.rows[0].cor
      } as CategoriesModel;

      await client.query(`UPDATE categoria SET titulo = '${newCategorie.titulo}' , cor = '${newCategorie.cor}' WHERE id = ${id}`);


      const updateVideo = await client.query<CategoriesModel>(`SELECT * FROM categoria WHERE id = ${id}`);

      return updateVideo.rows[0]

    } catch (error: any) {

      throw new Error(error);

    }
  }


  async queryDeleteCategory(id: number) {


    try {
      const query = await client.query<CategoriesModel>(`DELETE FROM categoria WHERE id = ${id}`);

      if (query.rowCount === 0) {
        throw new Error("Categoria nao encontrada");
      }
      return { succes: "Categoria deletada com sucesso!" };

    } catch (error: any) {

      throw new Error(error)

    }

  }

  async queryVideosByCategory(categoryId: number) {

    try {

      const query = await client.query<VideosModel>(`SELECT * FROM videos WHERE categoryid = ${categoryId}`);

      return query.rows;

    } catch (error) {
      return error;
    }


  }

}


