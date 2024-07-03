import React from "react";

import '../App.css'
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <div className="container homepage">
                <div className="row">
                    <div className="col" style={{padding:"1rem"}}>
                        <div className="row">
                            <h1>Start a beautiful journey to <u>friendship</u></h1>
                        </div>
                        <div className="row" style={{paddingTop:"2rem"}}>
                            <div className="direct-chat-msg left" style={{maxWidth:"350px"}}>
                                <img className="direct-chat-img" src="https://img.icons8.com/color/36/000000/person-female.png" alt="user-profile-pic"/>
                                <div className="direct-chat-text">
                                    Hello! How are you?
                                </div>
                            </div>

                            <div className="direct-chat-msg right" style={{maxWidth:"350px"}}>
                                <img className="direct-chat-img" src="https://img.icons8.com/color/36/000000/person-female.png" alt="user-profile-pic"/>
                                <div className="direct-chat-text" style={{color:"white",  background:"#f39c12"}}>
                                    I am fine, What about you?
                                </div>
                            </div>

                            <div className="direct-chat-msg left" style={{maxWidth:"350px"}}>
                                <img className="direct-chat-img" src="https://img.icons8.com/color/36/000000/person-female.png" alt="user-profile-pic"/>
                                <div className="direct-chat-text">
                                    Good as always
                                </div>
                            </div>
                        </div>

                        <div className="group">
                            <button>
                                Let's Start
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row-lg">
                            <img src="img-1.png" alt="img-1" style={{width: "250px", float:"right"}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;