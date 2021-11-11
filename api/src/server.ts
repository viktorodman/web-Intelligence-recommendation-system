import express, { Request, Response, NextFunction } from 'express';
import IndexRouter from './routes/indexRouter';
import cors from 'cors';
import { HttpError } from 'http-errors';

export default class Server {
    private app: express.Application = express()
    private indexRouter: IndexRouter = new IndexRouter()
    constructor(private port: number | string) {}

    public run(): void {
        this.app.use(express.json());
        this.app.use(cors({
            origin: '*'
        }));
        this.app.use('/api', this.indexRouter.router);
        this.errorHandler();
        this.listen();
    }

    private errorHandler(): void {
        this.app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
            res
                .status(err.status)
                .json({
                    name: err.name,
                    status: err.status,
                    message: err.message
                });
            return;
        });
    }

    private listen(): void {
        this.app.listen(this.port, () => console.log(`App listening on http://localhost:${this.port}`));
    }
}
