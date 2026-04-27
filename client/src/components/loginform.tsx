import { apiClient } from "../lib/client"

export default function LoginForm() {

    const {data,error,isLoading} = apiClient.useQuery("post","/api/login_check",{
        body:{
            "username" : "admin",
            "password" : "change_me",
        }
    })

    return (
        <form>
            <div>{data?.token}</div>
            <div>{error}</div>
            <div>{isLoading}</div>
            <input type="text" />
            <input type="password" />
            <button type="submit">Submit</button>
        </form>
    )
}