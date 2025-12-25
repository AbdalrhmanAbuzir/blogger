import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/apiCalls/authApiCall";

export default function Header(){
    const dispatch= useDispatch();
    const {user} = useSelector(state => state.auth);

    const[open, setOpen]= useState(false);


    return(

        <div className="Header">   

            <div className="HeaderLeft">
                <div className="list" style={{transform: open? "rotate(90deg)":"rotate(0deg)"}} onClick={()=>setOpen(!open)}>
                    <i class="bi bi-list"></i> 
                </div>
                <div>

                    <p>Menu</p> 
                </div>

                <div className="navbar" style={{clipPath: open ?  "polygon(0 0, 100% 0, 100% 100%, 0 100%)": "polygon(0 0, 100% 0, 100% 0, 0 0)"}}>
                    <ul className="nav-links">
                        <Link to="/" className="nav-link" onClick={()=>setOpen(!open)}>
                        <i className="bi bi-house"></i>
                            Home
                        </Link>
                        <Link to="/posts" className="nav-link" onClick={()=>setOpen(!open)} >
                        <i className="bi bi-stickies"></i>
                            Posts
                        </Link>
                        {user && 
                            <Link to="/posts/create"className="nav-link" onClick={()=>setOpen(!open)}>
                            <i className="bi bi-journal-plus"></i>
                                Create
                            </Link>
                        }
                        {user?.isAdmin && 
                            <Link
                            to="/admin-dashboard"
                            className="nav-link"
                            onClick={()=>setOpen(!open)}
                            >
                            <i className="bi bi-person-check"></i>
                                Admin Dashboard
                            </Link>
                        }
                    </ul>
                </div>  
            </div>

            <Link to="/"className="HeaderMid">
            <strong style={{textDecoration:"underline"}}>Blogger</strong> 
            <i className="bi bi-pencil"></i>
            </Link>

            <div className="HeaderRight">
                {
                    user? 
                    // to do add log out button and link to profile 
                    <div style={{display:"flex" }}>
                        <span className="headerButton" onClick={()=> {dispatch(logoutUser()) }}>
                            <i class="bi bi-box-arrow-left"></i> logout 
                        </span>
                        <Link to={`/profile/${user._id}`} className="userDetails" >
                            <img src={user?.profilePhoto.url} alt="" srcset=""  className="userImage"/>
                            <span className="userName"> {user.username} </span>
                        </Link>

                    </div>
                    : 
                    <>
                    <Link to={"/login"} className="headerButton"> <i className="bi bi-box-arrow-in-right"></i> login</Link>
                    <Link to={"/register"} className="headerButton"><i className="bi bi-person-plus"></i> signin</Link>
                    </>
                }
            </div>   
        </div>
        
    );

}