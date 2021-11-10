import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'
import {axiosInstance} from '../../config';

export default function Home() {

    const [posts, setPosts] = useState([]);
    const {search} = useLocation();
    console.log(search);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axiosInstance.get("/posts" + search);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        }   
        fetchPost();
    }, [search])

    return (
        <div className="home">
            <Sidebar/>
            <Posts posts={posts}/>
        </div>
    )
}
