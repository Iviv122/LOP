import { useAtom } from "jotai"
import { counter } from "./atoms/clicker";
import CounterDisplay from "./components/CounterDisplay";
import { token } from "./atoms/token";

function App() {
  const [getCount,setCounter] = useAtom(counter);
  const [getToken,setToken] = useAtom(token);
  return (
    <div>
      <p className="text-blue-600">{getCount}</p>
      <button onClick={() =>setCounter(getCount+1)}>Click</button>
      <CounterDisplay/>

      <p>{getToken}</p>
    </div>
  )
}

export default App
