import React, {useContext, useEffect, useState} from "react";
import "../css/style.css";
import {Button} from "@material-ui/core";
import axios from "axios";
import {AuthContext} from "../../contexts/AuthContext";

function Feed() {
    const {userData, updateMurmurData, murmurData} = useContext(AuthContext)
    const [isLoading, setLoading] = useState(false);
    const [post, setPost] = useState()

    function simulateNetworkRequest() {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }


    useEffect(() => {
        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleOnChange = (e) => {
        setPost({post_data: e.target.value});
    }
    const handleClick = async () => {
        setLoading(true)
        await axios.post('http://localhost:3000/api/murmur/create/', {
            'user_id': userData.id,
            'post_data': post,
        }).then(function (res) {
            let data = res.data[0];
            let res_data = {...data, 'wonlikes': null, 'name': userData.name }
            let murmur = [res_data, ...murmurData]
            updateMurmurData(murmur)
        });
    };

    console.log(userData)
    return (
        <div>

            <h3 className="mt-2 mb-3">{userData.name}</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">
                        Post
                    </label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="5" onChange={(e) => handleOnChange(e)}
                        name="post_data"
                    />
                    <Button className="float-right"
                            disabled={isLoading}
                            onClick={!isLoading ? handleClick : null}
                    >
                        {isLoading ? 'Loading…' : 'Click to post'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Feed;
