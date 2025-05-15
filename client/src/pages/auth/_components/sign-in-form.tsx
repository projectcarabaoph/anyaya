import SignInWithOauthCard from "@/pages/auth/_components/sign-in-with-oauth-card";

export default function SignInForm() {

    return (
        <form className="flex flex-col gap-2 p-2">
            <SignInWithOauthCard />
        </form>
    )
}
