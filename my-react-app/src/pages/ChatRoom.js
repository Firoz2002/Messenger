import React, { useState } from "react";
import socketIO from 'socket.io-client';
import { useEffect } from "react";

import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import ChatBody from "../components/ChatBody";
import ChatHeader from "../components/ChatHeader";
import ChatFooter from "../components/ChatFooter";

const ChatRoom = () => {

  const [messages, setMessages] = useState([]);
  const socket = socketIO('http://localhost:4000');

  useEffect(() => {
    socket.emit('joined-user', {
      username: window.sessionStorage.getItem('username'),
      roomname: (document.URL).replace("http://localhost:3000/messenger/", "")
    })
  }, [])

  useEffect(() => {
    socket.on('joined-user', (data) => {
      console.log(data);
      sessionStorage.setItem('roomId', data.roomId)
      console.log("User:- " + data.username + " joined room: "  + data.roomId);
    })
  })

  useEffect(() => {
    fetch(`http://localhost:4000/api/get-messages/messages?to=${(document.URL).replace("http://localhost:3000/messenger/", "")}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify()
    })
    .then(res => res.json())
    .then((data) => {
        data.forEach(function(err, index) {
          socket.emit('load-chat', {
            sendBy: data[index].sendBy,
            message: data[index].message,
            sendTo: data[index].sendTo,
            timestamp: data[index].timestamp
          })
        })
      })
  },[])

  useEffect(() => { 
    socket.on('chat', (message) => {
      setMessages((prevState) => [...prevState, message]);
    });
  }, []);

    return (
        <>
            <div className="page-content page-container" id="page-content">
              <div>
                <div className="wrapper">

                    <div className="box box-warning direct-chat direct-chat-warning">
                
                    <ChatHeader/>

                    <ChatBody messages={messages}/>

                    <ChatFooter socket={socket}/>

                    </div>
                </div>
              </div>
            </div>
        </>
    )    
}

export default ChatRoom;
