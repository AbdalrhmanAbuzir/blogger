import { useEffect } from "react";
import PostList from "../../components/Post/PostList";
import SideBar from "../../components/SideBar/SideBar";
import { posts } from "../../dummyData";
export default function Posts(){

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])

    return(
        <div>

            <PostList posts={posts} />
            <SideBar />
            <div>post</div>
            
        </div>

    );
}