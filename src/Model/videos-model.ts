 
class VideosModel{
  id?: number;
  titulo: string;
  descricao: string;
  url: string;
  categoryId?: number

  constructor({ titulo, descricao, url, categoryId }: VideosModel) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.url = url;

    if (!categoryId) this.categoryId = 1;
    else this.categoryId = categoryId;

  }

}

export default VideosModel;
