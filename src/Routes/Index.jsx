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

    if(!blogsBucket ||blogsBucket.lengnth===0){
        return(
            <div className="welcome-banner">
            <p className="h1">¡Crea tu blog ahora!</p>
        </div> 
        )

    }
    return(
        
        <>
            <div className="welcome-banner">
                <p className="h1">¡Crea tu blog ahora!</p>
            </div> 

            <div className="list-containar">
                <div className="list-group">
                {blogsBucket.map((item,_idx)=>(
                    <Link
                    key={item.idBlog}
                    to={`/updateBlog/${item.idBlog}`}
                    className={`list-group-item list-group-item-action ${
                        _idx % 2 === 0 
                            ? "list-group-item-primary" 
                            : "list-group-item-secondary"
                    }`}
                >
                    {item.nameBlog}
                </Link>
                    
                ))
                }
                </div>
            </div>

             
        </>

       
    );
}