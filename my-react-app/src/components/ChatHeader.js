import React from "react";
import { useNavigate } from 'react-router-dom';

const ChatHeader = () => {

    const navigate = useNavigate();

    return (
        <div className="box-header with-border">
            <h3 className="box-title">Chat Messages</h3>

            <div className="box-tools pull-right">
                <span data-toggle="tooltip" title="" className="badge bg-yellow" data-original-title="3 New Messages">20</span>
                <button type="button" className="btn btn-box-tool" data-widget="collapse">
                    <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-toggle="tooltip" title="" data-widget="chat-pane-toggle" data-original-title="Contacts">
                      <i className="fa fa-comments"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove" onClick={() => {return navigate('/messenger')}}>
                    <i className="fa fa-times"></i>
                </button>
            </div>
        </div>
    )
}

export default ChatHeader;