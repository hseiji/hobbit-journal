import './newpost.css';
import { useContext, useState, useEffect } from "react";
import { Context } from '../context/Context';
import { axiosInstance } from '../../config';
import Multiselect from 'multiselect-react-dropdown';


export default function NewPost() {
    const { user } = useContext(Context);
    const [desc, setDesc] = useState("");
    const [cats, setCats] = useState([]);
    const [catsPost, setCatsPost] = useState([]);
    const [newCat, setNewCat] = useState("");
    const [updated, setUpdated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            profilePhoto: user.profilePhoto,
            desc: desc,
            categories: catsPost
        };
        try {
            const res = await axiosInstance.post('/posts', newPost);
            window.location.replace("/#/posts/" + res.data._id);
        } catch (err) {
            
        }
    }

    // handle Add category to Categories
    const handleAddCat = async (e) => {
        e.preventDefault();
        setUpdated(!updated);
        try {
            await axiosInstance.post("/categories/", {
                name: newCat
            });               
        } catch (error) {

        }
        setNewCat("");
    }

    // Delete category from Categories
    const handleDelCat = async (e) => {
        e.preventDefault();
        setUpdated(!updated);
        try {
            await axiosInstance.post("/categories/delete", {
                name: newCat
            });               
        } catch (error) {

        }
        setNewCat("");
    }

    // Request all Categories for the Multiselect
    useEffect(() => {
        const getCats = async () => {
            const res = await axiosInstance.get("/categories/");
            setCats(res.data);
        }    
        getCats();
    }, [updated]);

    return (
        <div className="npost">
            <form className="npostForm" onSubmit={handleSubmit}>
                <div className="npostTitle">
                    Please tell us your story:
                    <button className="npostSubmit" type="submit">Publish</button>
                </div>
                <div className="npostFormGroup">
                    <textarea 
                            placeholder="Please start typing here..." 
                            type="text" 
                            className="npostFormText"
                            onChange={e => setDesc(e.target.value)}>
                    </textarea>
                </div>
                {/* Categories */}
                <div className="npostFormGroup">  
                    <div className="npostCat">
                        <label>Categories:</label>
                    </div>
                    <Multiselect
                        isObject={false}
                        onRemove={function noRefCheck(){}}
                        onSearch={function noRefCheck(){}}
                        onSelect={e => (setCatsPost(e))}
                        options={cats.map(c => c.name)}
                        className="multiselect-container"
                    />                  

                </div>
                {/* Add or delete categories */}
                <div className="npostFormGroup">
                    <input 
                        type="text" 
                        placeholder="Add or delete Category" className="npostInput" 
                        onChange={(e) => setNewCat(e.target.value)}
                        value={newCat}
                    />
                    <button className="npostSubmit2" type="submit" onClick={handleAddCat}>Add</button>
                    <button className="npostSubmit2" type="submit" onClick={handleDelCat}>Del</button>
                </div>
            </form>        

        </div>
    )
}
