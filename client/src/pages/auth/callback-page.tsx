import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import useValidateCode from "@pages/auth/_hooks/use-validate-code"

import { callbackToken } from "@api/auth"

const CallbackPage = () => {

    const { data, error } = useValidateCode()
    const navigate = useNavigate()

    if (error) navigate("*")


    const postSignInWithOauth = useCallback(async () => {
        try {
            const response = callbackToken(data?.code as string)

            console.log(response)

        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }, [data?.code])


    useEffect(() => {
        postSignInWithOauth()
    }, [postSignInWithOauth])

    return (
        <div>

        </div>
    )
}

export default CallbackPage