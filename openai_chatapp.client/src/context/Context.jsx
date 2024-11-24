import React from "react";
//import runChat from "../config/apiCalls";
import runChat from "../config/gemini";

export const Context = React.createContext();

const ContextProvider = (props) => {

    const [input, setInput] = React.useState("");
    const [recentPrompt, setRecentPrompt] = React.useState("");
    const [prevPrompts, setPrevPrompts] = React.useState([]);
    const [showResult, setShowResult] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [resultData, setResultData] = React.useState("");
    const [chatHistory, setChatHistory] = React.useState([]);


    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        },75 * index)
    }

    const newChat = () => {
        setChatHistory(prev => []);
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {

        setLoading(true)
        setShowResult(true)
        setResultData("")
        setChatHistory()
        let response = "";
        if (prompt !== undefined) {
            setChatHistory([]);
            response = await runChat(chatHistory,prompt);
            
        } else {
            if (chatHistory.length === 0) {
                setPrevPrompts(prev => [...prev, input]);
            }
            response = await runChat(chatHistory,input);
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
        (prompt !== undefined) ? setRecentPrompt(prompt) : setRecentPrompt(input);
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false)
        setInput("")

    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        chatHistory
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider