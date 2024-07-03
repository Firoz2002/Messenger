import React from "react";
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";

import useOutsideClick from '../helper/useOutsideClick';

const MessengerHeader = () => {

    const [userToFind, setUserToFind] = useState('');
    const [foundUser, setFoundUser] = useState([]);

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        setUserToFind(e.target.value);
        document.querySelector('.contacts').style.opacity="0.3";
    }

    const friendRequestHandler = () => {
        fetch('http://localhost:4000/api/send-friend-request', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: foundUser[0].username
            })
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
    }

    const ref = useOutsideClick(() => {
        setFoundUser([]);

        if(document.querySelector('.contacts')) {
            document.querySelector('.contacts').style.opacity="1";
        }
    });

    const searchHandler = (e) => {
        setFoundUser('');
        e.preventDefault(); 
        if(userToFind && userToFind != sessionStorage.getItem('username')) {
            fetch(`http://localhost:4000/api/search/?username=${userToFind}`, {
                method: "GET",
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify()
            })
            .then(res => res.json())
            .then((data) => {
                if(data.userExist) {
                    setFoundUser([data]);
                } else {
                    setFoundUser(['No such user exist']);
                }

                setUserToFind('');
                document.querySelector('.search-bar input').value = '';
            })
        }
    }
    
    return (
        <div className="wrapper">
            <div className="messenger-header box-header">

                <div className="friend-requests" onClick={() => {return navigate('/messenger/friend-requests')}}>
                    <button>
                        <i className="fa-solid fa-user-plus fa-lg"></i>
                    </button>
                </div>

                <div className="search-bar">
                    <form>
                        <input type="text" placeholder="Find friend" name="search"  onChange={(e) => handleSearch(e)}/>
                        <button onClick={(e) => searchHandler(e)}>
                            <i className="fa fa-search"></i>
                        </button>
                    </form>
                </div>

                <div className="profile" onClick={() => {return navigate('/messenger/user-profile')}}>
                    <img className="direct-chat-img" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="user-profile-pic"/>
                </div>
            </div>

            <div className="new-user" ref={ref}>
                {foundUser && foundUser.length
                    ? foundUser.map((data, index) => (
                        (data.userExist) ? 
                            <div className="user-found" key={index}>
                                <div className="user-profile" style={{display:"flex", alignItems:"center"}} key={index}>
                                    <img className="direct-chat-img" src="https://img.icons8.com/office/36/000000/person-female.png" alt="user-profile-pic"/>
                                    <span> <a href={(data.isFriend) ? `messenger/${data.username}` : '#'}><b>{data.username}</b></a> </span>
                                </div>
                                <div className="friend-request"> 
                                    {(!data.isFriend) ? 
                                        <button onClick={friendRequestHandler}>
                                            <i className="fa-solid fa-user-plus"></i>
                                        </button> 
                                    : null   
                                    }
                                </div>
                            </div>
                        : <div className="wrapper" key={index}><p> {data} </p></div>
                    ))
                : null}
            </div>
        </div>
    )
}

export default MessengerHeader;