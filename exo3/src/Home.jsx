import {getQuote} from "./service/fetchQuote.js";
import {useEffect, useState} from "react";
import {Quote} from "./components/quote/Quote.jsx";
import {RandomButton} from "./components/randomButton/RandomButton.jsx";

export const Home = () => {

    const [quote, setQuote] = useState({});

    useEffect(() => {
        getQuote().then(data => setQuote(data))
    },[])

    const handleNewQuote = () => {
            getQuote().then(data => setQuote(data))
    }

    return (
        <>
            <Quote quote={quote} />
            <RandomButton onClick={() =>{handleNewQuote()}} />
        </>
    )
}
