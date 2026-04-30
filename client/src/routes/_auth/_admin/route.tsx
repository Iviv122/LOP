import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { IsAdmin } from '../../../atoms/isadmin';


export const Route = createFileRoute('/_auth/_admin')({
    beforeLoad: () => {
        if (IsAdmin()) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <Outlet />
        </>
    )

}
