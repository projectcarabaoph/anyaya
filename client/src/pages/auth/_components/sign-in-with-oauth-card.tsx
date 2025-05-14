import { toast } from "sonner";

import { Button } from "@components/ui/button";

import { signInWithOauth } from "@api/auth";

export default function SignInWithOauthCard() {


    const handleSingInWithOauth = async (provider: string) => {
        try {
            const response = await signInWithOauth(provider)
            window.location.replace(response.data.url)

        } catch (error) {
            if (error instanceof Error) toast.error(error.message)

        }
    }

    return (
        <div>
            <Button
                variant='default'
                type="button"
                onClick={() => handleSingInWithOauth('google')}
                className="bg-black"
            >
                Continue with Google
            </Button>
        </div>
    )
}
