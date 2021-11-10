import { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router";
import { axiosInstance } from '../../config';
import './viewpost.css';
import { Context } from '../../components/context/Context';


export default function ViewPost() {

    const location = useLocation();
    const pathId = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const [update, setUpdate] = useState(false);
    const [desc, setDesc] = useState("");
    const PF = "https://hobbit-journal.herokuapp.com/images/";
    const { user } = useContext(Context);

    useEffect(() => {
        const getPost = async () => {
            const res = await axiosInstance.get("/posts/" + pathId);
            setPost(res.data);
            setDesc(res.data.desc);
        }
        getPost();
    }, [pathId])

    const handleUpdate = async () => {
        try {
            await axiosInstance.put("/posts/" + pathId, {
                desc
            });
            setUpdate(false);
        } catch (error) {
            
        }
    }

    const handleDelete = async () => {
        try {
            await axiosInstance.delete("/posts/" + pathId);
            window.location.replace("/");
        } catch (error) {
            
        }
    }

    return (
        <div className="vPost">
            <div className="vPostWrapper">
                {/* Title */}
                <div className="vTitle">
                    Edited by:
                    <span className="vUser">{post.username}</span>
                    <img src={PF + post.profilePhoto} alt="" className="vPostImg"/>
                </div>
                {/* Description */}
                {update? (
                        <textarea 
                            className="viewPostDesc" 
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                        >
                        </textarea>
                    ) : (
                        <p className="viewPostDesc">
                            {desc}
                        </p>
                    )
                }

                {/* Edit and Delete options */}
                <div>
                    {post.username === user?.username && (
                        <div>
                            <i className="vIcon far fa-edit" onClick={() => setUpdate(true)}></i>
                            <i class="vIcon viewPostIcon far fa-trash-alt" onClick={handleDelete}></i>                    
                        </div>
                    )}
                </div>
                {/* Button Submit */}
                {update && (
                    <button className="viewPostBtn" onClick={handleUpdate}>Update</button>
                )}
            </div>
        </div>
    )
}
