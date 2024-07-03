import React from "react";
import { useState,useEffect } from "react";
import socketIO from 'socket.io-client';

import MessengerHeader from "../components/MessengerHeader";
import MessengerBody from "../components/MessengerBody";


const socket = socketIO(process.env.REACT_APP_API_URL);

const Messenger = () => {

    const [friends, setFriends] = useState([]);

    useEffect(() => {

        socket.emit('user-online', {
            username: sessionStorage.getItem('username')
        })

        fetch(`${process.env.REACT_APP_API_URL}/api/get-friends`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify()
        })
        .then(res => res.json())
        .then((data) => {
            setFriends((prevState) => [...prevState, data]);
        })
    }, [])

    return (
        <div className="page-content page-container" id="page-content">
            <div>
                <div className="wrapper">

                    <div className="box box-warning direct-chat direct-chat-warning">
          
                        <MessengerHeader />

                        <MessengerBody friends={friends} socket={socket}/>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger;