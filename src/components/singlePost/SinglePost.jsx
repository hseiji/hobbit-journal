import { Link } from 'react-router-dom';
import './singlepost.css'

export default function SinglePost({post}) {

    const PF = "https://hobbit-journal.herokuapp.com/images/";

    const linkStyle = {
        textDecoration: "none",
        color: 'brown'
    };

    return (
        <div className="s">
            <img src={PF + post.profilePhoto} alt="" className="s-img" />
            <div className="s-desc">
                <Link to={`/?user=${post.username}`} className="link">
                    <span className="s-user">{post.username}</span>
                </Link>
                <span className="s-date">{new Date(post.createdAt).toDateString()}</span>
                <Link to={`/posts/${post._id}`} style={linkStyle}>
                    <p>{post.desc}</p>
                </Link>
            </div>
        </div>
    )
}
