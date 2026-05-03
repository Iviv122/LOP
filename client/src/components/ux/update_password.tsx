import { useState } from "react";
import { apiClient } from "../../lib/api/client"
import LoadingLabel from "../ui/loading_label";

export default function UpdatePassword() {

    const [oldPassword,setOldPassword] = useState<string>("");
    const [newPassword,setNewPassword] = useState<string>("");
    const [repeatNewPassword,setRepeatNewPassword] = useState<string>("");

    const { mutate, error, isPending, isError } = apiClient.useMutation(
        "post",
        "/api/user/new_password",
        {
            onSuccess(){
                //add toast
            },
            onError(){
                // add toast
            }
        }
    );

    function handleSubmit(e?: React.FormEvent) {
        e?.preventDefault();
        
        if (!newPassword || !oldPassword || !repeatNewPassword) {
            alert('Please fill in all fields');
            return;
        }
        if(newPassword !== repeatNewPassword){
            alert("passwords doesn't match")
            return;
        }

        mutate({
            body:{
                current_password: oldPassword,
                password: newPassword   
            }
        });
    }


    return (
        <form onSubmit={handleSubmit}>
            {isPending ? (
                <LoadingLabel/>
            ) : (
                <>
                    {isError && (
                        <div style={{ color: 'red', marginBottom: '10px' }}>
                            {error?.error || 'Login failed. Please try again.'}
                        </div>
                    )}

                    <input
                        type="password"
                        placeholder="Current password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        disabled={isPending}
                        required
                    />
                    <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={isPending}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Repeat new password"
                        value={repeatNewPassword}
                        onChange={(e) => setRepeatNewPassword(e.target.value)}
                        disabled={isPending}
                        required
                    />
                    <button type="submit" disabled={isPending}>
                        {isPending ? 'Logging in...' : 'Submit'}
                    </button>
                </>
            )}
        </form>
    )
}