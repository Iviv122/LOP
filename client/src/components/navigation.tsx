import { Link } from '@tanstack/react-router'

export default function Navigation() {
    return (
        <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/">Home</Link>
            <Link to="/collection">Collection</Link>
            <Link to="/settings">Settings</Link>
        </nav>
    )
}