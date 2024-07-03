import React from "react";
import moment from "moment";

import { useRef, useEffect } from "react";

import '../App.css'

const ChatBody = ({messages}) => {

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <div className="box-body">
                  
            <div className="direct-chat-messages">

                {messages && messages.length
                    ? messages.map((data, index) => (
                        <div className={`direct-chat-msg ${(data.sendBy === sessionStorage.getItem('username')) ? 'right' : 'left'}`} key={index}>
                            <div className="direct-chat-info clearfix">
                                <span className="direct-chat-name pull-right">{data.sendBy}</span>
                                <span className="direct-chat-timestamp pull-right">{moment(data.timestamp).format("DD-MMMM hh:mm")}</span>
                            </div>
                                    
                            <img className="direct-chat-img" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="user-profile-pic"/>
                                
                            <div className="direct-chat-text">
                                {data.message}
                            </div>
                        </div>
                        ))
                    : null}
                <div ref={messagesEndRef}/>
                
            </div>
                 
        </div>
    )
}

export default ChatBody;