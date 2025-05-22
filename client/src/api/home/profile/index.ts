


/*
  ____  ____   ___  _____ ___ _     _____      _    ____ ___ 
 |  _ \|  _ \ / _ \|  ___|_ _| |   | ____|    / \  |  _ \_ _|
 | |_) | |_) | | | | |_   | || |   |  _|     / _ \ | |_) | | 
 |  __/|  _ <| |_| |  _|  | || |___| |___   / ___ \|  __/| | 
 |_|   |_| \_\\___/|_|   |___|_____|_____| /_/   \_\_|  |___|
                                                             
*/

import serverPaths from "@/configs/paths/server.paths.config"

export const getProfile = async (accessToken: string) => {

    try {
        const response = await fetch(serverPaths.home.profile.main, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
        const data = await response.json()

        if (!response.ok) {
            const { message } = data
            throw new Error(message)
        }

        return data.data

    } catch (error) {
        if (error instanceof Error) throw new Error(error.message)
    }
} 