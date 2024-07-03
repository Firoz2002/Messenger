import React from "react";
import { Link, Outlet } from "react-router-dom";

import '../App.css';

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <ul className="navbar-menu">
                    <li>
                        <Link to="/"> Home </Link>
                    </li>
                    <li>
                        <ul>
                            <li>
                                <Link to="/signin"> SignIn </Link>
                            </li>
                            <li> | </li>
                            <li>
                                <Link to="/signup"> SignUp </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>

            <Outlet/>
        </>
    )
};

export default Navbar;