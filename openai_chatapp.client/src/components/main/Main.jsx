import * as React from "react";
import "./Main.css";
import { assets } from "../../assets/assets";


function Main() {
  return (
      <div className="main">
          <div className="nav">
              <p>Gemini</p>
              <img src={assets.user_icon} alt="" />
          </div>
          <div className="main-container">
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
              <div className="main-bottom">
                <div className="search-box">
                    <input type="text" placeholder="Ask me Anything..." />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.send_icon} alt="" />
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