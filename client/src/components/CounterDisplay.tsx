import { useAtom } from "jotai"
import { counter } from "../atoms/clicker"

export default function CounterDisplay() {
    const [getCounter, setCounter] = useAtom(counter);
    return (
        <div>
            <p className="text-red-600">{getCounter}</p>
            <button onClick={() => setCounter(0)}>Reset</button>
        </div>
    )
}