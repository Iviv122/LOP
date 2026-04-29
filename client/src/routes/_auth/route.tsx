import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { GetAuthToken, RemoveAuthToken } from '../../atoms/token'
import Navigation from '../../components/navigation';


export const Route = createFileRoute('/_auth')({
    beforeLoad: () => {
        const token = GetAuthToken();
        if (!token) {
            RemoveAuthToken();
            const url = new URL(location.href);
            throw redirect({
                to: '/login',
                search: {
                    redirect: url.pathname,
                },
            })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )

}
