import React, { useEffect, useState } from "react";

import '../App.css'

const MessengerBody = (props) => {

    const socket = props.socket;
    
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        socket.on('online-users', (users) => {
            setOnlineUsers(users);
        })
    })

    return (
        <div className="box-body">
            <div className="contacts">
                <h4> Friends </h4>
                
                {props.friends && props.friends.length
                ? props.friends[0].map((data, index) => (
                    <div className="user-contact" key={index}>
                        <img className="direct-chat-img" src="https://img.icons8.com/office/36/000000/person-female.png" alt="user-profile-pic"/>
                        <span className={ (onlineUsers.some(user => user.userId === data)) ? "status active": null }></span>
                        <span> <a href={`messenger/${data}`}> { data } </a> </span>
                    </div>
                ))
            : null}
            </div>
        </div>
    )
}

export default MessengerBody;