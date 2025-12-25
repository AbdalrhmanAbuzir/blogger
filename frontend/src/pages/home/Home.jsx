import { Link } from "react-router-dom";
import PostList from "../../components/Post/PostList";
import SideBar from "../../components/SideBar/SideBar";
import "./home.css";
import { posts } from "../../dummyData";


export default function Home(){
    return (
    <div>    
            {/* <img src="../../../public/images/blog.jpg" alt="" srcset="" /> */}
        <div className="home-header">
            <div className=" home-header-layout">
                <div className="home-header-title">
                    run your wild imagination
                </div>
            </div>
        </div>

        <p className="latest-title"> latest posts</p>
        <div className="home-container">
        
            <PostList posts={posts}/>

            <SideBar />
        </div>

        <div className="home-see-posts-link">
            <Link className="home-link" to="/posts">
                See All Posts
            </Link>
        </div>
        
    </div>
        
    );
}