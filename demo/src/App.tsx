import './index.css'
import {useState} from "react";


export default function App() {
    const [count, setCount] = useState(0)
    const [titre, setTitre] = useState(`Mon super titre ${count}`)

    return (
        <>
            <p>Salut</p>
        </>
    );
};