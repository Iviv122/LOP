import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import LoginForm from '../components/auth/LoginForm/LoginForm'
import { useAuth } from '../lib/providers/auth'

function RootLayout() {
  const auth = useAuth()

  return (
    auth.isAuthenticated ?
      <>
        <div className="p-2 flex gap-2 justify-around">
          <span className="flex-2">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>{' '}
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
          </span>

          <button
            className="flex-1 font-bold"
            onClick={() => auth.logout()}
          >
            Logout
          </button>
        </div>

        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </>
      :
      <LoginForm />
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})