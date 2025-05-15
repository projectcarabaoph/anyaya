import { useMemo } from "react"
import { codeSchema } from "@/pages/auth/_libs/schemas";

const useValidateCode = () => {

    return useMemo(() => {
        const params = new URLSearchParams(window.location.search)
        const query = Object.fromEntries(params.entries());

        const result = codeSchema.safeParse(query);
        const { data, error } = result
        if (!result.success) return { error };
        return { data };
    }, []);
}

export default useValidateCode