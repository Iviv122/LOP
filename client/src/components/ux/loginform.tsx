import { useState } from "react"
import { apiClient } from "../../lib/api/client"
import { SetAuthToken } from "../../atoms/token";
import { useNavigate, useSearch } from "@tanstack/react-router";
import LoadingLabel from "../ui/loading_label";
import {
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Stack,
    CircularProgress,
} from "@mui/material";


export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const search = useSearch({ from: '/login' });


    const { mutate, isPending, isError } = apiClient.useMutation(
        "post",
        "/api/login_check",
        {
            onSuccess(data) {
                if (data.token) {
                    SetAuthToken(data.token);
                    navigate({ to: search.redirect });
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

    if (isPending) return <LoadingLabel />

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                bgcolor: "grey.100",
            }}
        >
            <Paper elevation={3} sx={{ p: 4, width: 360 }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <Typography
                            sx={{
                                textAlign: "center"
                            }}
                            variant="h5">
                            Login
                        </Typography>

                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isPending}
                            required
                        />

                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isPending}
                            required
                        />

                        {isError && (
                            <Typography color="error" variant="body2">
                                Login failed. Please try again.
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={isPending}
                        >
                            {isPending ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}