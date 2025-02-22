import { useState, useContext, } from "react";
import { Link, Outlet, useFetcher} from "react-router-dom";
import { BlogContext } from "../Context/context";
export default  function Root(){
    const [isOpen, setIsOpen] = useState(false);
    const fetcher = useFetcher();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };


 const {dispatch}= useContext(BlogContext);

  const createNewMK = async (event)=>{
      event.preventDefault();
     
    const newBlog = {
      idBlog: Math.random().toString(36).substring(2, 9), 
      nameBlog: "Nuevo Blog", 
      contentBlog: "", 
    };
    
    const formdata = new FormData();
    
    formdata.append("idBlog", newBlog.idBlog);
    formdata.append("nameBlog", "Nuevo Blog");
    formdata.append("contentBlog","");

    fetcher.submit(formdata,{method:"POST"}) ;
    
    dispatch({ type: "UPDATE_BLOG", payload: newBlog });
    

  }
    return(
        <>
        <nav className="navbar bg-primary navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">MyBlogs</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={"/"}>Inicio</Link>
            </li>
          </ul>
          <fetcher.Form className="d-flex" role="search">
            <button className="btn btn-outline-success" type="button" onClick={createNewMK}>Nuevo</button>
          </fetcher.Form>
        </div>
      </div>
    </nav>

      <div>
        <Outlet/>
      </div>
    </>
    )

}