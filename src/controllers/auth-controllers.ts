import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { browserClient } from "@configs/supabase/browser-client"
import { signInWithEmailSchema, signInWithOauthSchema } from "@utils/schemas"
import { serverClient } from "@configs/supabase/server-client"


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


export const signInWithOauth = asyncHandler(async (req: Request, res: Response) => {

    const result = signInWithOauthSchema.safeParse(req.body)

    if (!result.success) throw new Error(result.error.message)

    const supabase = serverClient(req, res)

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: result.data.provider,
        options: {
            redirectTo: `${process.env.NODE_PUBLIC_DEV_BASE_URL}/auth/callback`,
        }
    })

    if (error) throw new Error(error.message)

    res.status(200).json(data)

})
