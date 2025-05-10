



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
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Accept: "application/json"
            },
            credentials: 'include',
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