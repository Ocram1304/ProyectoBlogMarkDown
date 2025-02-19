import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, 
  RouterProvider} from "react-router-dom"
import Root from "./Routes/root";
import { rootaction } from './actions';
import { BlogContextProvider } from './Context/context';
import UpdateBlog from './Routes/UpdateBlog';
import { updateBlogAction } from './actions';
import Errorelement from './Routes/ErrorElement';
const routes = createBrowserRouter([

  {
    path: "/",
    element: <Root/>,
    action: rootaction,
    children: [
      {
        element: <UpdateBlog/>,
        path:'/updateBlog/:idBlog',
        errorElement: <Errorelement/>,
        action: updateBlogAction,
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BlogContextProvider>
      <RouterProvider router={routes}/>
    </BlogContextProvider>
  </StrictMode>,
)
