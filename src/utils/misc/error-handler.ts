import { Request, Response } from "express"

const errorHandler = (err: any, req: Request, res: Response) => {

    if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
    }
    return res.status(500).json({ message: 'Internal server error' })

}

export default errorHandler