import { useEffect, useState } from "react"

export default function LoadingLabel() {

    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + "." : ""));
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <p>
            Loading{dots}
        </p>
    )
}