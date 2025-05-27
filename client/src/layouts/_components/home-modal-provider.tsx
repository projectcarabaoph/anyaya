import { useEffect, useState } from "react"
import DeleteProjectModal from "@/layouts/_components/delete-project-modal"

export default function HomeModalProvider() {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <DeleteProjectModal />
        </>
    )
}
