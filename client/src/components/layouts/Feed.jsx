import React, {useContext, useEffect, useState} from "react";
import "../css/style.css";
import TweetBox from "./TweetBox";
import TimelineData from "./TimelineData";
import Pagination from "./pagination";
import axios from "axios";
import {AuthContext} from "../../contexts/AuthContext";


function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const {userData, updateMurmurData} = useContext(AuthContext)

    useEffect(() => {
        if (loading) {
            const fetchPosts = async () => {
                const res = await axios.post('http://localhost:3000/api/murmurs/', {
                    'user_id': 1
                });
                setPosts(res.data);
                updateMurmurData(res.data);
                setLoading(false);
            };

            fetchPosts();
        }

    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber)
    };

    return (


        <div>
            <hr></hr>
            <h3 className="text-primary">Timeline</h3>
            <br></br>
            <TimelineData posts={currentPosts} loading={loading}/>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />
        </div>
    );
}

export default Feed;
