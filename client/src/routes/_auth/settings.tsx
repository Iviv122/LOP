import { createFileRoute } from '@tanstack/react-router'
import { apiClient } from '../../lib/api/client';
import { useEffect } from 'react';
import Settings from '../../pages/settings';

export const Route = createFileRoute('/_auth/settings')({
  component: RouteComponent,
})

function RouteComponent() {

  const { mutate, data, error, isPending } = apiClient.useMutation(
    "get",
    "/api/user/"
  )

  useEffect(() => {
    mutate({})
  }, [])

  if (isPending) return <p>Loading...</p>

  return <Settings/>
}
