import React, {useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import '../css/style.css'
import axios from "axios";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";

const Posts = ({posts, loading}) => {
    const [like, setLike] = useState(false);
    const [canDelete, setDelete] = useState(true);
    const history = useHistory();
    const {updateFollowerData} = useContext(AuthContext)

    if (loading) {
        return <h2>Loading...</h2>;
    }

    const handleLike = async (e, user_id, murmur_id) => {
        e.preventDefault();
        setLike(true);
        const res = await axios.post('http://localhost:3000/api/murmur/like/', {
            "user_id": user_id,
            "murmur_id": murmur_id
        }).then(function (res) {
            console.log(res);
        });

    }

    const handleDelete = async (e, user_id, murmur_id) => {
        e.preventDefault();
        setLike(true);
        await axios.post('http://localhost:3000/api/murmur/delete/', {
            "user_id": user_id,
            "murmur_id": murmur_id
        }).then(function (res) {
            console.log(res);
        });
    }

    const handleProfile = (user_id) => {
        updateFollowerData({"follower_id" : user_id})
        history.push(`/user/profile/${user_id}/`)
    }

    return (
        <div>{posts.map(post => (
            <div key={"post-" + post.id}>
                <div className="row">
                    <div className="col-md-11">
                        <h6 onClick={() => handleProfile(post.user_id)} className="font-weight-bold"><p
                            onClick={() => handleProfile}>{post.name}</p> <p
                            className="font-italic font-weight-normal">{post.created_at}</p></h6>
                        <p>{post.post_text}</p>
                    </div>
                    <div className="col-md-1">
                        {post.wonlikes ?
                            <a onClick={(e) => handleDelete(e, post.user_id, post.id)} href="#">Delete</a> : ""}
                    </div>
                </div>
                <a href="#" onClick={(e) => handleLike(e, post.user_id, post.id)}>
                    {post.wonlikes ? <FontAwesomeIcon className="text-primary"
                                                      icon={faThumbsUp}></FontAwesomeIcon> :
                        <FontAwesomeIcon className="text-black-50"
                                         icon={faThumbsUp}></FontAwesomeIcon>}</a>
                <br></br>
                <hr></hr>
            </div>

        ))}
        </div>

    );
};

export default Posts;