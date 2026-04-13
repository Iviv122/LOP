import { RouterProvider } from '@tanstack/react-router'
import { AuthProvider, useAuth } from './auth'
import { getRouter } from './router'

function InnerApp() {
    const auth = useAuth()
    return <RouterProvider router={getRouter()} context={{ auth }} />
}

function App() {
    return (
        <AuthProvider>
            <InnerApp />
        </AuthProvider>
    )
}

export default App