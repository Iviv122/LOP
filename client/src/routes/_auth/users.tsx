import { createFileRoute } from '@tanstack/react-router'
import { apiClient } from '../../lib/api/client'
import { useEffect } from 'react'

export const Route = createFileRoute('/_auth/users')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate, data, error, isPending } =
    apiClient.useMutation("get", "/api/admin/users")

  useEffect(() => {
    const fetchUsers = async () => {
      await mutate({})
    }

    fetchUsers()
  }, [mutate])

  if (isPending) return <p>Loading...</p>
  if (error) return <p>Error loading users</p>

  return (
    <>
      {data?.member?.map((e) => (
        <p key={e.id}>
          {e.id} {e.username} {e.password}
        </p>
      ))}
    </>
  )
}