import { Request, Response } from "express"
import { browserClient } from "@configs/supabase/browser-client"
import { signInWithEmailSchema } from "@utils/schemas"


const errorHandler = (err: any, req: Request, res: Response) => {
    if (err instanceof Error) {
        return res.status(400).json({ error: err.message })
    }
    return res.status(500).json({ error: 'Internal server error' })

}

export const signInWithEmail = async (req: Request, res: Response) => {

    try {
        const result = signInWithEmailSchema.safeParse(req.body)

        if (!result.success) {
            throw new Error(result.error.message)
        }

        const supabase = browserClient()

        const { data, error } = await supabase.auth.signInWithOtp({
            email: result.data.email,
        })

        return res.status(200).json(data)

    } catch (error) {
        errorHandler(error, req, res)
    }
}