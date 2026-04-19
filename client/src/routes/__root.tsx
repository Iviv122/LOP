import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { AuthProvider, useAuth } from '#/lib/providers/auth';
import LoginForm from '#/components/login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Query from '#/lib/providers/querry';

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface MyRouterContext {
  auth: AuthContextValue
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

const queryClient = new QueryClient();

function RootComponent() {
  return (

    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Query>
          <AuthGate />
        </Query>

      </QueryClientProvider>
    </AuthProvider>
  )
}
function AuthGate() {
  const { isAuthenticated } = useAuth()
  return (
    <>
      {
        isAuthenticated
          ?
          < Outlet />
          :
          <LoginForm />
      }
    </>
  )
}