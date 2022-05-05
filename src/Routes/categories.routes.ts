import { Router } from "express";
import { categoryController } from "../Controllers"
import { categoryMiddleware } from '../Middlewares'
const categoriesRouter = Router();

categoriesRouter.get("/", categoryController.getAllCategories);
categoriesRouter.get("/:id", categoryController.getCategoryById);
categoriesRouter.post("/", categoryMiddleware.verifyCategoryToCreate, categoryController.createNewCategory);
categoriesRouter.put("/:id", categoryMiddleware.verifyCategoryToUpdate, categoryController.updateCategory);
categoriesRouter.delete("/:id", categoryController.deleteCategory);
categoriesRouter.get("/:id/videos", categoryController.getVideosByCategory);


export default categoriesRouter;
