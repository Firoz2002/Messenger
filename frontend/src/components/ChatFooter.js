import React from "react";
import { useState } from "react";

const ChatFooter = ({socket}) => {

    const [message, setMessage] = useState("Type Message ...");

    const handleSendMessage = (event) => {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/api/messages/save-message`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                sendTo: (document.URL).replace(`${process.env.REACT_APP_URL}/messenger/`, ""),
                message: message
            })
        })
        .then((res) => {
            if(res.status === 200) {
                socket.emit('chat', {
                    sendBy: window.sessionStorage.getItem('username'),
                    sendTo: (document.URL).replace(`${process.env.REACT_APP_URL}/messenger/`, ""),
                    message: message,
                    roomId: sessionStorage.getItem('roomId')
                })
                setMessage('');
                document.querySelector('.form-control').value = '';
            } else {
                console.log("Error");
            }
        })
    }

    return (
        <div className="box-footer">
            <form>
                <div className="input-group">
                    <input type="text" name="message" placeholder="Type Message ..." className="form-control" onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => (e.keyCode === 13 ? handleSendMessage(e) : null)} />
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-warning btn-flat" onClick={handleSendMessage}>Send</button>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default ChatFooter;