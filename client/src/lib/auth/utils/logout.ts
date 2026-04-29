import { RemoveAuthToken } from "../../../atoms/token";
import { router } from "../../../main";

export default function BadAuth(){
RemoveAuthToken();
            const url = new URL(location.href);
            throw router.navigate({
                to: '/login',
                search: {
                    redirect: url.pathname,
                },
            })
}