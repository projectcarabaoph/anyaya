import { Request, Response } from "express";

import ApiError from "@/utils/misc/api-error";
import errorHandler from "@/utils/misc/error-handler";

export const getProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user) throw new ApiError('Unathorized.', 401)
        res.json({ data: req.user });
    } catch (error) {
        errorHandler(error, req, res)
        return
    }
}
