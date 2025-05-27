import { useEffect, useState } from "react"
import DeleteProjectModal from "@/layouts/_components/delete-project-modal"
import CreateProjectModal from "@/layouts/_components/create-project-modal"

export default function HomeModalProvider() {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <CreateProjectModal />
            <DeleteProjectModal />
        </>
    )
}
