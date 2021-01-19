import React, {useContext, useState} from "react";
import "../css/style.css";
import {Nav} from 'react-bootstrap'

import {AuthContext, useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";


function Sidebar() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    const {userData, updateFollowerData} = useContext(AuthContext)

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    const handleTimeline = () => {
        history.push("/")
    }

    const handleProfile = () => {
        updateFollowerData({})
        history.push(`/user/profile/${userData.id}/`)
    }

    return (
        <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
             activeKey="/home"
             onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        >
            <div className="w-100 text-center mt-2">
                <FontAwesomeIcon icon={faHome} fixedWidth/>
                <Button onClick={() => handleTimeline()}>
                    Timeline
                </Button>
            </div>
            <div className="w-100 text-center mt-2">
                <FontAwesomeIcon icon={faUser} fixedWidth/>
                <Button onClick={() => handleProfile()}>
                    Profile
                </Button>
            </div>
            <div className="w-100 text-center mt-2">
                <FontAwesomeIcon icon={faSignOutAlt} fixedWidth/>
                <Button onClick={() => handleLogout()}>
                    Log Out
                </Button>
            </div>
        </Nav>
    );
}

export default Sidebar;
