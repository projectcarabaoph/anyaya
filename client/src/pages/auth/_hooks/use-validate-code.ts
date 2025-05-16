import { useEffect, useRef } from "react"
import { codeSchema } from "@/pages/auth/_libs/schemas"
import useAuth from "@/hooks/auth/use-auth"
import { useNavigate } from "react-router-dom"
import { callbackToken } from "@/api/auth"

const useValidateCode = () => {
    const hasRun = useRef(false)
    const navigate = useNavigate()
    const { setAccessToken } = useAuth()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const query = Object.fromEntries(params.entries())

        const result = codeSchema.safeParse(query)
        if (!result.success) {
            navigate("*")
            return
        }

        if (hasRun.current) return
        hasRun.current = true

        const postSignInWithOauth = async () => {
            try {
                const response = await callbackToken(result.data.code)
                const { accessToken } = response
                setAccessToken(accessToken)

            } catch (error) {
                if (error instanceof Error) navigate("*")
            }
        }

        postSignInWithOauth()
    }, [navigate, setAccessToken])
}


export default useValidateCode