
class CategoriesModel {
  id?: number;
  titulo: string;
  cor: string

  constructor({ cor, titulo }: CategoriesModel) {
    this.titulo = titulo;
    this.cor = cor;

  }
}


export default CategoriesModel;
