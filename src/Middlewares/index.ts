import { VideosMiddleware } from './Videos-Middlleware';
import CategoryMiddleware from './Category-Middleware';
import Auth from './Auth';

const videosMiddleware = new VideosMiddleware();
const categoryMiddleware = new CategoryMiddleware();
const AuthMiddleware = new Auth();

export { videosMiddleware, categoryMiddleware, AuthMiddleware };
