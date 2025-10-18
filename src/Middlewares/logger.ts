import { Request,Response,NextFunction } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
};

module.exports = loggerMiddleware;
