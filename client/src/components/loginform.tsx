import { useState } from "react"
import { apiClient } from "../lib/api/client"
import { SetAuthToken } from "../atoms/token";
import { useNavigate, useSearch } from "@tanstack/react-router";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const search = useSearch({ from: '/login' });


    const { mutate, error, isPending, isError } = apiClient.useMutation(
        "post", 
        "/api/login_check",
        {
            onSuccess(data) {
                if(data.token){
                    SetAuthToken(data.token);
                    navigate({to: search.redirect});
                }
            },
        }
    );

    function handleSubmit(e?: React.FormEvent) {
        e?.preventDefault();
        
        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }

        mutate({
            body: {
                username,
                password
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            {isPending ? (
                <p>Loading...</p>
            ) : (
                <>
                    {isError && (
                        <div style={{ color: 'red', marginBottom: '10px' }}>
                            {error?.message || 'Login failed. Please try again.'}
                        </div>
                    )}
                    
                    <input 
                        type="text" 
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isPending}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isPending}
                        required
                    />
                    <button type="submit" disabled={isPending}>
                        {isPending ? 'Logging in...' : 'Submit'}
                    </button>
                </>
            )}
        </form>
    );
}