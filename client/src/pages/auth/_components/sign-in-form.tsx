import SignInOauthCard from "@pages/auth/_components/sign-in-oauth-card";

export default function SignInForm() {

    return (
        <form className="flex flex-col gap-2 p-2">
            <SignInOauthCard />
        </form>
    )
}
