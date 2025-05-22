import { useEffect, useState } from "react"

export const HomeModalProvider = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
        </>
    )
}