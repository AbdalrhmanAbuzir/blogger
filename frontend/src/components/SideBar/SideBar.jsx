import { Link } from "react-router-dom"
import "./sideBar.css"
import { categories } from "../../dummyData"
export default function SideBar(){

    return(

        <div className="sidebar">
            <h5 className="sidebar-title">CATEGORIES</h5>
            <ul className="sidebar-links">
            {categories.map((category) => (
                <Link
                    to={`/posts/categories/${category.title}`}
                    key={category._id}
                    className="sidebar-link"
                >
                    {category.title}
                </Link>
            ))}
            </ul>
        </div>
    )
}