



/*
     _   _   _ _____ _   _      _    ____ ___ 
    / \ | | | |_   _| | | |    / \  |  _ \_ _|
   / _ \| | | | | | | |_| |   / _ \ | |_) | | 
  / ___ \ |_| | | | |  _  |  / ___ \|  __/| | 
 /_/   \_\___/  |_| |_| |_| /_/   \_\_|  |___|                                         
                                                                                                                                                                                                                                                                                                                                                                                                                                                    
*/

import serverPaths from "@configs/paths/server.paths.config"


export const signInWithEmail = async (email: string) => {
    try {
        const response = await fetch(serverPaths.auth.signin.email, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email })
        })

        const data = await response.json()

        if (!response.ok) {
            const { messsage } = data
            throw new Error(messsage)
        }

        const { accessToken } = data
        return { accessToken }
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
}


export const signInWithOauth = async (provider: string) => {
    try {
        const response = await fetch(serverPaths.auth.signin.oauth, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({ provider })
        })

        const data = await response.json()

        if (!response.ok) {
            const { message } = data
            throw new Error(message)
        }
        return data
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);

    }
}


export const verifyOtpToken = async (email: string, token: string) => {
    try {
        const response = await fetch(serverPaths.auth.signin.verify, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ email, token })
        })

        const data = await response.json()

        if (!response.ok) {
            const { message } = data
            throw new Error(message)
        }

        const { accessToken } = data
        return { accessToken }
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
}

export const callbackToken = async (code: string) => {
    try {
        const response = await fetch(serverPaths.auth.signin.callback, {

            body: JSON.stringify({ code })
        })

        const data = await response.json()

        if (!response.ok) {
            const { message } = data
            throw new Error(message)
        }

        return data
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
}


export const refreshToken = async () => {
    try {
        const response = await fetch(serverPaths.auth.signin.refresh, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            credentials: 'include'
        })

        const data = await response.json()

        if (!response.ok) {
            const { message } = data
            throw new Error(message)
        }

        const { accessToken } = data
        return { accessToken }
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
}