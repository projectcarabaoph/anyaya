import { useEffect, useState } from "react"

export default function ModalProviderHome() {
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
