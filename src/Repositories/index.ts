import VideosRepository from "./videos-repositories";
import CategoriesRepositories from "./categories-repositories";

const videosRepositories = new VideosRepository()
const categoriesRepository = new CategoriesRepositories();


export { videosRepositories, categoriesRepository };
