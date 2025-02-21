import { useLoaderData, Link } from "react-router-dom";
import { BlogContext } from "../Context/context";
import { useContext } from "react";
import { useEffect } from "react";
export default function Index (){
    const  blogsBucket = useLoaderData();
    const {dispatch} = useContext(BlogContext);

    useEffect(()=>{
        dispatch({type:"LOAD_BLOGS", payload:blogsBucket});
    },[blogsBucket,dispatch])

    return(
        
        <div className="list-group">
            {blogsBucket.map((item)=>(
                <Link key={item.idBlog} to={`/updateBlog/${item.idBlog}`} className="list-group-item list-group-item-action">{item.nameBlog}</Link>
            ))
            }
        </div>
    );
}