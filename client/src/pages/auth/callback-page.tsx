
import useValidateCode from "@/hooks/auth/use-validate-code"


const CallbackPage = () => {
    useValidateCode()

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <p>Signing in...</p>
        </div>
    )
}

export default CallbackPage