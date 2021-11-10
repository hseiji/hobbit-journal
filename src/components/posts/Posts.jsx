import './posts.css';
import SinglePost from '../singlePost/SinglePost';

export default function Posts({posts}) {

    

    return (
        <div className="p">
            {posts.map((p) => (
                <SinglePost post={p} key={p._id}/>
            ))}
        </div>
    )
}
