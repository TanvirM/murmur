import React, {useContext} from "react"
import Feed from "../layouts/Feed";
import Sidebar from "../layouts/Sidebar";
import TweetBox from "../layouts/TweetBox";
import {AuthContext} from "../../contexts/AuthContext";

function Dashboard() {
    const {userData} = useContext(AuthContext)

    return (
        <div className="row">
            <div className="col-md-3 dashboard-sidebar"><Sidebar/></div>
            <div className="col-md-9 dashboard-feed">
                <TweetBox/>
                <br></br>
                <Feed/>
            </div>
        </div>
    )
}

export default Dashboard;