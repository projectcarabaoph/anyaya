import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { browserClient } from "@configs/supabase/browser-client"
import { signInWithEmailSchema } from "@utils/schemas"


export const signInWithEmail = asyncHandler(async (req: Request, res: Response) => {

    const result = signInWithEmailSchema.safeParse(req.body)

    if (!result.success) throw new Error(result.error.message)

    const supabase = browserClient()

    const { data, error } = await supabase.auth.signInWithOtp({
        email: result.data.email,
    })

    if (error) throw new Error(error.message)

    res.status(200).json(data)

})