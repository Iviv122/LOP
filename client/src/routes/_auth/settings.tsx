import { createFileRoute } from '@tanstack/react-router'
import { apiClient } from '../../lib/api/client';
import { useEffect } from 'react';

export const Route = createFileRoute('/_auth/settings')({
  component: RouteComponent,
})

function RouteComponent() {

  const {mutate, data, error, isLoading} = apiClient.useMutation(
    "get",
    "/api/user/"
  )

  useEffect(() =>{
    mutate()
  },[])

  return (
    <>
      {data?.roles?.map((e,i) => <p key={i}>{e}</p>)}
    </>
  )
}
