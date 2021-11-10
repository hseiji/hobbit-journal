import './sidebar.css';
import { axiosInstance } from '../../config';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axiosInstance.get("/categories/");
            setCats(res.data);
            
        }
        getCats();
    }, [])
    return (
        <div className="sbar">
            <div className="sbarItem">
                <span className="sbarTitle">About</span>
                <img src="https://hgtvhome.sndimg.com/content/dam/images/door/fullset/2013/12/5/0/ci-hobbiton-movie-set-tours-1.jpg.rend.hgtvcom.966.644.suffix/1427747168179.jpeg" alt="" />
                <p>"Sejam bem vindos ao dia a dia do Condado, a maior vila dos Hobbits. Mostrarei as maravilhas da nossa terra e seus habitantes, desvendaremos juntos este o pequeno pedaço de paraíso."</p>
            </div>
            <div className="sbarItem">
                <span className="sbarTitle">Topics</span>
                <ul className="sbarList">
                    {cats.map(c => (
                        <Link to={`/?cat=${c.name}`} className="link" key={c._id}>
                            <li className="sbarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}
