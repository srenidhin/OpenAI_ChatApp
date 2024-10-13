import React from "react";
//import runChat from "../config/apiCalls";
import runChat from "../config/gemini";

export const Context = React.createContext();

const ContextProvider = (props) => {

    const [input, setInput] = React.useState("");
    const [recentPrompt, setRecentPrompt] = React.useState("");
    const [prevPrompt, setPrevPrompts] = React.useState([]);
    const [showResult, setShowResult] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [resultData, setResultData] = React.useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        },75 * index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {

        setLoading(true)
        setShowResult(true)
        let response = "";
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input);
        }
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 == 0) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        newResponse = newResponse.split("*").join("<br />");
        let newResponseArray = newResponse.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false)
        setInput("")

    }

    const contextValue = {
        prevPrompt,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider