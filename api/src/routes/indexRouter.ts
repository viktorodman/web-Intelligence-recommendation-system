import express from 'express';
import TestRouter from './testRouter';
import {IRouter} from '../interfaces/IRouter';


export default class IndexRouter implements IRouter {
    private testRouter: TestRouter = new TestRouter()
    
    
    public router: express.Router = express.Router()

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.use('/test', this.testRouter.router);
    }
}
