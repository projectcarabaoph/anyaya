import { serverClient } from '@configs/supabase/server-client'
import { Request, Response, NextFunction } from 'express'

const checkRequestHeader = (req: Request): string => {

    const requestHeader = req.headers.authorization || req.headers.Authorization as string

    if (!requestHeader || !requestHeader.startsWith('Bearer ')) {
        throw new Error('Unauthorized.')
    }

    const accessToken = requestHeader.split(' ')[1]

    if (!accessToken) {
        throw new Error('Unauthorized.')

    }

    return accessToken

}


export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const accessToken = checkRequestHeader(req)

        const supabase = serverClient(req, res)

        const { data: { user }, error } = await supabase.auth.getUser(accessToken)

        if (error) throw new Error('Unauthorized.')

        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user?.id)
            .single()

        if (profileError && profileError.code !== "PGRST116") throw new Error(profileError.message)

        req.user = profileData as TProfiles

        next()

    } catch (error) {
        if (error instanceof Error) res.status(400).json({ message: error.message })
    }
}