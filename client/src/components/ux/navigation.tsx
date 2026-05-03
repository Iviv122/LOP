import { Link } from '@tanstack/react-router'
import { RemoveAuthToken } from '../../atoms/token'
import { useEffect } from 'react';
import { apiClient } from '../../lib/api/client';
import { IsAdmin, SetAdmin } from '../../atoms/isadmin';

export default function Navigation() {

    function logOut() {
        RemoveAuthToken();
    }

    const { mutate, isPending} = apiClient.useMutation("get", "/api/user/", {
        onSuccess: (data) => {
            if (data.roles?.includes('ROLE_ADMIN')) {
                SetAdmin(true);
            }
            else{
                SetAdmin(false);
            }
        }
    });

    useEffect(() => {
        mutate({});
    }, [])

    return (
        <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/">Home</Link>
            <Link to="/collection">Collection</Link>
            <Link to="/settings">Settings</Link>
            {
                IsAdmin()
                ?
                <><Link to="/users">Users</Link></>
                :
                <></>
            }
            <Link to='/login' onClick={logOut}>Log out</Link>
        </nav>
    )
}