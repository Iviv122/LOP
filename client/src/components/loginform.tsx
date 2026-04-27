import { useAtom } from "jotai"
import { tokenAtom } from "../atoms/token"

export default function LoginForm() {
    
    return(
        <>
            <form>
                <input type="text"></input>
                <input type="password"></input>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}