import { createFileRoute } from '@tanstack/react-router'
import { apiClient } from '../../lib/api/client'
import LoadingLabel from '../../components/ui/loading_label';

export const Route = createFileRoute('/_auth/users')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, error, isPending } = apiClient.useQuery(
    "get",
    "/api/admin/users",
    {},
    {
      staleTime: Infinity,
    }
  );

  if (isPending) return <LoadingLabel/> 
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