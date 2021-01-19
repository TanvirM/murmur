import React, {useContext, useEffect, useState} from "react"
import Feed from "../layouts/Feed";
import Sidebar from "../layouts/Sidebar";
import {Button, colors} from "@material-ui/core";
import axios from "axios";
import {AuthContext} from "../../contexts/AuthContext";

function UserProfile() {
    const [post, setPost] = useState();
    const [getFollowing, setFollowing] = useState(0);
    const [loading, setLoading] = useState(true);
    const [follow, setFollow] = useState(false);
    const {userData, follower} = useContext(AuthContext)

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            // if (userData.id && ((follower.follower_id === null) ===  false)) {
            if ((typeof (follower.follower_id) === 'undefined')) {
                const res = await axios.post('http://localhost:3000/api/user/profile/', {
                    'user_id': userData.id
                });
                setPost(res.data[0]);
                setFollowing(res.data[0].follower)
            } else {
                const res = await axios.post('http://localhost:3000/api/user/profile/', {
                    'user_id': follower.follower_id
                });
                setPost(res.data[0]);
                setFollowing(res.data[0].follower)

                const getData = async () => {
                    const res = await axios.post('http://localhost:3000/api/user/isfollowing/', {
                        'user_id': userData.id,
                        'follower_id': follower.follower_id
                    });
                    console.log(res);
                    if (res.status === 200) {
                        setFollow(true);
                    } else if (res.status === 404) {
                        setFollow(false)
                    }
                };
                getData()
            }

            setLoading(false);

        };

        fetchPosts();

    }, []);


    if (loading) {
        return <h2>Loading...</h2>;
    }
    const handleFollower = async () => {
        await axios.post('http://localhost:3000/api/user/follower/', {
            'user_id': userData.id,
            'follower_id': follower.follower_id
        }).then(function (res) {
            console.log(res);
            if (res.status === 201) {
                setFollow(true);
                setFollowing(getFollowing + 1)
            } else if (res.status === 200) {
                setFollow(false)
                setFollowing(getFollowing - 1)
            }
        });

    }
    return (
        <div className="row">
            <div className="col-md-3 dashboard-sidebar"><Sidebar/></div>
            <div className="col-md-9 dashboard-feed mb-5">
                <div>
                    <h3 className="mt-2 mb-3">Name : {post.name}</h3>
                    <div className="row mt-2">
                        <div className="col-md-4">
                            <h5>Followers : {getFollowing}</h5>
                        </div>
                        <div className="col-md-4">
                            <h5>Following : {post.following}</h5>
                        </div>
                        <div className="col-md-4">
                            <Button onClick={() => handleFollower()}>{follow ? "Unfollow" : "Follow"}</Button>
                        </div>
                    </div>
                </div>

                <Feed/>
            </div>
        </div>
    )
}

export default UserProfile;