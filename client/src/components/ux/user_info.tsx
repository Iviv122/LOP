import { apiClient } from "../../lib/api/client"
import LoadingLabel from "../ui/loading_label"

export default function UserInfo() {

    const { data, error, isPending } = apiClient.useQuery("get", "/api/user/", {}, {
        staleTime: Infinity,
    })


    if(isPending) return <LoadingLabel/>

    if(error) return <p>{error.message}</p>

    return (
        <>
            <h2>About Me</h2>
            <p>user id: {data?.id} username: {data?.username}</p>
            <p>roles</p>
            {data?.roles?.map((e,i) => <p key={i}>{e}</p>)}
        </>
    )
}