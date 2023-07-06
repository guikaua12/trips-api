import 'express-async-errors';
import express, {NextFunction, Request, Response} from 'express';
// import {router} from '../routes';
// import {AppError} from '../errors/AppError';


const server = express();
server.use(express.json());
// server.use(router);

// error handling
server.use((err: any , req: Request, res: Response, next: NextFunction) => {
    // if(err instanceof AppError) {
    //     return res.status(err.status).json({message: err.message});
    // }

    console.log(err);
    res.status(500).json({message: 'Internal Server Error'});
});

export {server};