import SignInForm from "@pages/auth/_components/sign-in-form"

const SignInPage = () => {
    return (

        <div className='flex w-full min-h-dvh h-auto justify-center items-center '>
            <div className="flex flex-col items-center justify-center gap-2">
                <SignInForm />
            </div>
        </div>

    )
}

export default SignInPage