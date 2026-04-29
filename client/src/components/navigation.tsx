import { Link } from '@tanstack/react-router'
import { RemoveAuthToken } from '../atoms/token'

export default function Navigation() {
    
    function logOut(){
        RemoveAuthToken();
    }

    return (
        <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/">Home</Link>
            <Link to="/collection">Collection</Link>
            <Link to="/settings">Settings</Link>
            <Link to='/login' onClick={logOut}>Log out</Link>
        </nav>
    )
}