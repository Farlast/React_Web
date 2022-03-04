import React from "react";
//import { Link } from "react-router-dom";
import "../assets/styles/footer.css";
//import NHRCLogo from "../assets/images/icon/NHRCLogo.svg";
import facebookicon from "../assets/images/icon/facebook.svg";
import lineicon from "../assets/images/icon/line.svg";
import youtubeicon from "../assets/images/icon/youtube.svg";

export default function Footer(props) {
  return (
    <footer id="merights-footer" className="footer2f">
      <div className="container zIndexFooter">
        <div className="footer-content">
          <div className="footer-content-b1">
            <div id="Logo">
              <div className="logoBg">
                
              </div>
            </div>

              <div className="row">
                    <p className="textAddress">
                      For natively created Azure widgets,
                      you do not have to look any further.
                    </p>
              </div>
          </div>

          <div className="recent-post">  
                    <h1>RECENT POST</h1>
                    <li>Hugging pugs is super trendy Feburary 14, 2017</li>
                    <li>Hugging pugs is super trendy Feburary 14, 2017</li>
                    <li>Hugging pugs is super trendy Feburary 14, 2017</li>      
          </div>
          
          <div className="followUs">
              <div className="footerHeader">
                  <h1>FOLLOW US</h1>
              </div>
              <div id="footer-social">
                <a href="https://www.facebook.com/nhrct">
                  <img
                    src={facebookicon}
                    className="socialicon"
                    alt="Facebook"
                  />
                </a>
                  <img src={lineicon} className="socialicon" alt="LineID" />
                <a href="https://www.youtube.com/user/LibraryNhrct">
                  <img
                    src={youtubeicon}
                    className="socialicon"
                    alt="Youtube Chanel"
                  />
                </a>
              </div>
          </div>
        </div>
      </div>
      <div className="controlBg">
        <div className="row">
            <div className="bgFooter"></div>
        </div>
      </div>
      
    </footer>
  );
}
