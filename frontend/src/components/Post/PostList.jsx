import { Link } from "react-router-dom"
import"./PostList.css"
export default  function PostList({posts})  {
    
    
    return(
        <div className="posts-list">

        {posts.map((post)=>{
            return(

                <div className="posts"> 
            <div className="post-container">

                <div className="user">
                    <div className="user-icon"></div>
                    <div className="user-name"> {post.user.username}</div>
                </div>
                <div className="post-details">
                    <div className="title">{post.title}</div>
                    <div className="post-date">{post.createdAt}</div>
                    <div className="post-category">{post.category}</div>
                </div>

                <div className="post-description">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, pariatur sapiente. Nesciunt omnis unde corporis voluptatem fuga, vel consectetur veritatis a quos hic cupiditate aperiam pariatur voluptates sunt iure non!
                </div>
            </div>
            <div className="post-image-container">

            <img src={`../../${post.image}`} alt="" srcset=""  className="post-image"/>
            {/* <div className="post-image"></div> */}
            <Link to={`/posts/details/${post._id}`} className="see-more">
                see more .... 
            </Link>

            </div>
        </div>
        )})}

        </div>
    )


}