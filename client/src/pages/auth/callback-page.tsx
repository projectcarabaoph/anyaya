import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import useValidateCode from "@pages/auth/_hooks/use-validate-code"
import useRefreshToken from "@hooks/auth/use-refresh-token"

import { callbackToken } from "@api/auth"

const CallbackPage = () => {

    const { data, error } = useValidateCode()
    const { setAccessToken } = useRefreshToken()
    const navigate = useNavigate()

    if (error) navigate("*")


    const postSignInWithOauth = useCallback(async () => {
        try {
            const response = await callbackToken(data?.code as string)

            const { accessToken } = response
            setAccessToken(accessToken)

        } catch (error) {
            if (error instanceof Error) navigate('*')
        }
    }, [data?.code, setAccessToken, navigate])


    useEffect(() => {
        postSignInWithOauth()
    }, [postSignInWithOauth])

    return (
        <div>

        </div>
    )
}

export default CallbackPage