import { Request, Response } from "express"

import { browserClient } from "@configs/supabase/browser-client"
import { serverClient } from "@configs/supabase/server-client"

import {
    callbackTokenSchema,
    signInWithEmailSchema,
    signInWithOauthSchema,
    verifyOtpTokenSchema
} from "@utils/schemas"

import errorHandler from "@utils/misc/error-handler"
import ApiError from "@utils/misc/api-error"


export const signInWithEmail = async (req: Request, res: Response) => {

    try {
        const result = signInWithEmailSchema.safeParse(req.body)

        if (!result.success) throw new ApiError(result.error.errors[0].message, 400);
        const supabase = browserClient()

        const { data, error } = await supabase.auth.signInWithOtp({
            email: result.data.email,
        })

        if (error) throw new ApiError(error.message, error.status)

        res.status(200).json({ data })

    } catch (error) {

        errorHandler(error, req, res)
        return
    }

}


export const signInWithOauth = async (req: Request, res: Response) => {

    try {

        const result = signInWithOauthSchema.safeParse(req.body)

        if (!result.success) throw new ApiError(result.error.errors[0].message, 400);
        const supabase = serverClient(req, res)

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: result.data.provider,
            options: {
                redirectTo: `${process.env.NODE_PUBLIC_DEV_BASE_URL}/auth/callback`,
            }
        })

        if (error) throw new ApiError(error.message, error.status)

        res.status(200).json({ data })

    } catch (error) {

        errorHandler(error, req, res)
        return
        return
    }

}

export const verifyOtpToken = async (req: Request, res: Response) => {

    try {

        const result = verifyOtpTokenSchema.safeParse(req.body)

        if (!result.success) throw new ApiError(result.error.errors[0].message, 400);
        const { email, token } = result.data

        const supabase = serverClient(req, res)

        const { data, error } = await supabase.auth
            .verifyOtp({ email, token, type: 'email' })

        if (error) throw new ApiError(error.message, error.status)

        res.status(200).json({ accessToken: data.session?.access_token })

    } catch (error) {

        errorHandler(error, req, res)
        return
        return
    }
}

export const callbackToken = async (req: Request, res: Response) => {

    try {

        const result = callbackTokenSchema.safeParse(req.body)

        if (!result.success) throw new ApiError(result.error.errors[0].message, 400);
        const supabase = serverClient(req, res)

        const { code } = result.data

        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) throw new ApiError(error.message, error.status)

        res.status(200).json({ accessToken: data.session?.access_token })

    } catch (error) {

        errorHandler(error, req, res)
        return
    }

}

export const refreshToken = async (req: Request, res: Response) => {

    try {

        const supabase = serverClient(req, res)

        const { data, error } = await supabase.auth.getSession()

        if (error) throw new ApiError(error.message, error.status)

        res.status(200).json({ accessToken: data.session?.access_token })


    } catch (error) {

        errorHandler(error, req, res)
        return

    }
}


export const signOut = async (req: Request, res: Response) => {

    try {

        const supabase = serverClient(req, res)

        const { error } = await supabase.auth.signOut()

        if (error) throw new ApiError(error.message, error.status)

        res.status(200).json({ message: 'Signed out successfully' })

    } catch (error) {

        errorHandler(error, req, res)
        return
    }

}