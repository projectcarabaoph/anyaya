import { Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler