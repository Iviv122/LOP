import { createFileRoute } from '@tanstack/react-router'
import LoginForm from '../components/loginform'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginForm/> 
}
