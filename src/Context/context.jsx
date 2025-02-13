import {  useReducer, createContext } from "react";
export const BlogContext = createContext();

const blogReducer =  (state, action)=>{
    const actions = {
        UPDATE_BLOG: ()=> updateBlog(state,action.payload),
        DELETE_BLOG: ()=> deleteBlog(action.payload,state)
    }
    
    return actions[action.type] ? actions[action.type]() : state;
}

const updateBlog = (state,blog)=>{
    const blogExists = state.find((item) => item.idBlog === blog.idBlog);

    if (blogExists) {
        
        return state.map((item) =>
            item.idBlog === blog.idBlog ? { ...item, ...blog } : item
        );
    } else {
        
        return [ blog, ...state];
    }
}

const deleteBlog = (blog,state)=>{
    return state.filter(item=>item.idBlog !== blog.idBlog);
}
export const BlogContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(blogReducer,[])
    return(
        <BlogContext.Provider value={{state,dispatch}}>
            {children}
        </BlogContext.Provider>
    )
}