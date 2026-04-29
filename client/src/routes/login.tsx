import { createFileRoute, redirect } from '@tanstack/react-router'
import LoginForm from '../components/loginform'
import { z } from 'zod'
import { GetAuthToken } from '../atoms/token';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: () => {
    const token = GetAuthToken();
    if (token) {
      throw redirect({ to: "/"})
    }
  },
})

function RouteComponent() {
  return <LoginForm />
}
