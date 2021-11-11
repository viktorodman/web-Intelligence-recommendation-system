import { IRouter } from '../interfaces/IRouter';
import express from 'express';
import TestController from '../controllers/testController';

export default class TestRouter implements IRouter {
    private controller: TestController = new TestController()
    public router: express.Router = express.Router()

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get('/', 
            (req, res, next) => this.controller.test(req, res, next),
        );
    }
}
