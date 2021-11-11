import { NextFunction, Request, Response } from 'express';

export default class TestController {
    public async test(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.send({test: "test"});
        } catch (error) {
            next(error);
        }
    }
}
