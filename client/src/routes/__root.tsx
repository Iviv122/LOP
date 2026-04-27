import * as React from 'react'
import { Outlet, createRootRoute, redirect } from '@tanstack/react-router'
import Navigation from '../components/navigation'
import { getDefaultStore} from 'jotai'
import { tokenAtom } from '../atoms/token'

const store = getDefaultStore();

export const Route = createRootRoute({
  beforeLoad: () => {
    const token = store.get(tokenAtom);
    if (!token) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Navigation />
      <Outlet />
    </React.Fragment>
  )
}
