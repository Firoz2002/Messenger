import React from "react";
import { useEffect, useState } from "react";

const FriendRequestMenu = () => {

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/get-friend-requests',{
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify()
        })
        .then(res => res.json())
        .then((data) => {
            setRequests(data);
        })
    }, [])

    const requestHandler = (event) => {
        fetch('http://localhost:4000/api/update-friend-request',{
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                requestId: event.target.value,
                updateStatusTo: event.target.name
            })
        })
        .then(res => res.json())
        .then((data) => {
            event.target.innerHtml = event.target.name;
        })
    }

    return (
        <div className="page-content page-container" id="page-content">
            <div>
                <div className="wrapper">
                    <div className="box box-warning direct-chat direct-chat-warning">
                        
                        <div className="request-menu">
                            <h3>Friend-Requests</h3>
                            <hr/>

                            <div className="request-received">
                                <h5>Received: </h5>
                                
                                {requests && requests.length
                                    ? requests.map((data, index) => (
                                        ((data.sentTo.username === sessionStorage.getItem('username') && data.status === 'pending') ? 
                                            <div className="user-contact" key={index}>
                                                <div>
                                                    <img className="direct-chat-img" src="https://img.icons8.com/office/36/000000/person-female.png" alt="user-profile-pic"/>
                                                    <span> {data.sentBy.username} </span>
                                                </div>
                                                <div className="request-options">
                                                    <button className="btn btn-success" value={ data._id } name="accepted" onClick={event => requestHandler(event)}> Accept </button>
                                                    <button className="btn btn-danger"  value={ data._id } name="declined" onClick={event => requestHandler(event)}> Decline </button>
                                                </div>
                                            </div>
                                        : null)
                                    ))
                                : null}
                            </div>
        

                            <div className="request-sent">
                                <h5>Sent: </h5>
                                {requests && requests.length
                                    ? requests.map((data, index) => (
                                        (data.sentBy.username === sessionStorage.getItem('username') ? 
                                            <div className="user-contact" key={index}>
                                                <div>
                                                    <img className="direct-chat-img" src="https://img.icons8.com/office/36/000000/person-female.png" alt="user-profile-pic"/>
                                                    <span> {data.sentTo.username} </span>
                                                </div>
                                                <div className="request-status">
                                                    <h4> {data.status} </h4>
                                                </div>
                                            </div>
                                        : null )
                                    ))
                                : null}
                               
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendRequestMenu;