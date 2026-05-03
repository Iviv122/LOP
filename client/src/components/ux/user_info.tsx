import { apiClient } from "../../lib/api/client"

export default function UserInfo() {

    const { data, error, isPending } = apiClient.useQuery("get", "/api/user/", {}, {
        staleTime: Infinity,
    })


    return (
        <>
            <h2>About Me</h2>
            <>user id: {data?.id} username: {data?.username}</>
            <p>roles</p>
            {data?.roles?.map((e,i) => <p key={i}>{e}</p>)}
        </>
    )
}