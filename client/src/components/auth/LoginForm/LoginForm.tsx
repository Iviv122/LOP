import { apiClient } from "../../../lib/providers/api"
import { useState } from "react"
import { useAuth } from "../../../lib/providers/auth"

export default function LoginForm() {
    const [credentials, setCredentials] = useState({ username: "", password: "" })
    const [loginError, setLoginError] = useState<string | null>(null)

    const { mutate, data, error, isPending } = apiClient.useMutation("post", "/api/login_check")

    const auth = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginError(null)

        mutate(
            { body: credentials },
            {
                onError: (err: any) => {
                    if (err?.status === 401) {
                        setLoginError("Invalid username or password")
                    } else {
                        setLoginError(err?.message || "Login failed")
                    }
                    auth.logout()
                },
                onSuccess: (data) => {
                    if (data?.token) {
                        localStorage.setItem("token", data.token)
                        auth.login(data.token);
                    }
                }
            }
        )
    }

    return (
        <>
            {
                !isPending ?
                    <div>
                        {loginError && <p style={{ color: "red" }}>Error: {loginError}</p>}
                        {error?.status === 401 && <p style={{ color: "red" }}>Unauthorized - Check credentials</p>}

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="username"
                                value={credentials.username}
                                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                            />
                            <input
                                type="password"
                                placeholder="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                            />
                            <button type="submit" disabled={isPending}>
                                {isPending ? "Signing in..." : "Sign In"}
                            </button>
                        </form>
                    </div>
                    :
                    <p>Loading</p>
            }

        </>
    )
}