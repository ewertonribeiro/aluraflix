import { client } from "../DB/db";
import VideosModel from "../Model/videos-model";

export default class VideosRepository {

  async queryAllVideos(): Promise<VideosModel[]> {

      const videos = await client.query<VideosModel>(`SELECT * FROM videos;`)
      const videosArray = videos.rows;
      return videosArray;



  }

  async queryVideoByTitulo(titulo: string, id?: number) {


    if (id) {
      const query = await client.query<VideosModel>(`SELECT * FROM videos where titulo ILIKE '${titulo}' AND id != ${id}`);

      if (query.rowCount > 0) {
        return query.rows;
      }

      return undefined;
    }
    const query = await client.query<VideosModel>(`SELECT * FROM videos WHERE titulo ='${titulo}' `)


    if (query.rowCount === 0) {
      return undefined;
    }

    return query.rows[0];

  }

  async queryVideoById(id: number) {

    const query = await client.query<VideosModel>(`SELECT * FROM videos WHERE id=${id}`);

    if (query.rowCount === 0) throw new Error("Video nao encontrado");

    return query.rows[0];

  }

  async queryCreateNewVideos({ titulo, descricao, url, categoryId }: VideosModel) {


    const newVideo = new VideosModel({ titulo, descricao, url, categoryId });

    await client.query<VideosModel>(`INSERT INTO videos (titulo , descricao , url,categoryid) 
                VALUES(
                '${newVideo.titulo}',
                '${newVideo.descricao}',
                '${newVideo.url}',
                '${newVideo.categoryId}'
              )`)

    const video = await client.query<VideosModel>(`SELECT * FROM videos WHERE titulo = '${newVideo.titulo}'`);


    return video.rows[0];

  }


  async queryUpdateVideo(id: number, { titulo, descricao, url }: VideosModel) {

    //Seleciona o video existente
    const { rows } = await client.query<VideosModel>(`SELECT * FROM videos WHERE id=${id}`);
    const video = rows[0];

    //Seta o novo video com os novos valores se existem ou com os valores ja existentes

    if (!video) {
      throw new Error("o id fornecido e invalido!");
    }
    const newVideo = {
      descricao: descricao ? descricao : video.descricao,
      titulo: titulo ? titulo : video.titulo,
      url: url ? url : video.url

    }

    await client.query<VideosModel>(`UPDATE videos SET titulo = '${newVideo.titulo}',
    descricao = '${newVideo.descricao}',
    url = '${newVideo.url}'
    WHERE id=${id}`
    );

    const query = await client.query<VideosModel>(`SELECT * FROM videos WHERE id=${id}`);
    return query.rows[0];

  }

  async queryDeleteVideoById(id: number) {


    try {

      const query = await client.query(`DELETE FROM videos WHERE id = ${id};`);

      if (query.rowCount === 0) {
        return { error: "Nao foi possivel deletar o video, verifique o id fornecido!" };
      }

      return { succes: "Registro deletado com sucesso" };

    } catch (err) {

      return { error: err }
    }



  }

  async queryVideoByQueryParam(param: string) {

    try {
      const query = await client.query<VideosModel>(`SELECT * FROM videos WHERE titulo ILIKE '${param}%'`);

      return query.rows;

    } catch (error) {
      return error;
    }

  }


}
