import React from "react";
import {NavLink} from "react-router-dom";

//  Navigation
//  Nav bar component
const Navigation= () => {
    return (
        <div className="navigation">
            <nav className="navbar navbar-expand navbar-dark bg-danger">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        Blood Donation Candidates
                    </NavLink>
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Home
                                    <span className="sr-only">(current)</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Submit">
                                    Submit
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/View">
                                    View
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;