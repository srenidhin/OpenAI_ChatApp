import React from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";


function Main() {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, chatHistory } = React.useContext(Context)

  return (
      <div className="main">
          <div className="nav">
              <p>Gemini</p>
              <img src={assets.user_icon} alt="" />
          </div>
          <div className="main-container">
              {
                  !showResult ? <div>
                      <div className="greet">
                          <p><span>Hello Friend.</span></p>
                          <p>How can I help you today?</p>
                      </div>
                      <div className="cards">
                          <div className="card">
                              <p>Show me the best treks in the world!</p>
                              <img src={assets.compass_icon} alt="" />
                          </div>
                          <div className="card">
                              <p>Suggest few business ideas</p>
                              <img src={assets.bulb_icon} alt="" />
                          </div>
                          <div className="card">
                              <p>Help me frame an professional email with a polite tone</p>
                              <img src={assets.message_icon} alt="" />
                          </div>
                          <div className="card">
                              <p>Create boiler plate code stateful widget in flutter</p>
                              <img src={assets.code_icon} alt="" />
                          </div>
                      </div>
                  </div> :
                      <div className="result">
                          {
                              chatHistory.slice(0, -2).map((item, index) => {
                                  return (
                                      <div className={(item.role == "user") ? "result-title" : "result-data"}>
                                          <img src={(item.role == "user") ? assets.user_icon : assets.gemini_icon} alt="" />
                                          <p>{ item.parts[0].text }</p>
                                      </div>
                                  )
                              })
                          }
                          <div className="result-title">
                              <img src={assets.user_icon} alt="" ></img>
                              <p>{recentPrompt}</p>
                          </div>
                          <div className="result-data">
                              <img src={assets.gemini_icon} alt=""></img>
                              {
                                  loading ? <div className="loader">
                                      <hr />
                                      <hr />
                                      <hr />
                                  </div> : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                              }
                          </div>
                  </div>
              }
            
              <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Ask me Anything..." />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                          {input ? <img onClick={(e) => onSent()} src={assets.send_icon} alt="" /> : null}
                    </div>
                </div>
                <div>
                    <p className="bottom-info">Disclaimer All information provided is not accurate.</p>
                </div>
              </div>
          </div>
      </div>
  );
}

export default Main;