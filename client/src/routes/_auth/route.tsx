import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { tokenAtom } from '../../atoms/token'
import Navigation from '../../components/navigation';
import { store } from '../../lib/store';


export const Route = createFileRoute('/_auth')({
    beforeLoad: () => {
        const token = store.get(tokenAtom);
        if (!token) {
            throw redirect({
                to: '/login',
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
