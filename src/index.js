import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import About from './pages/about';
import Acessories from './pages/acessories';
import New from './pages/home/new';
import Contact from './pages/contact';
import Jewelry from './pages/jewelry';
import Women from './pages/women';
import Men from './pages/men';
import { Provider } from 'react-redux';
import { Store } from './store';
import Checkout from './pages/checkout/checkout';
import AdminPage from './pages/adminPage/adminPage';
import ErrorPage from './pages/errorPage';

const router=createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/accesories",
        element:<Acessories/>
      },
      {
        path:"/",
        element:<New/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"/jewelry",
        element:<Jewelry/>
      },
      {
        path:"/women",
        element:<Women/>
      },  
      {
        path:"/men",
        element:<Men/>
      },
      {
        path: "/checkout",
        element: <Checkout />,
    },
    {
      path:"/admin",
      element:<AdminPage/>
    },
    {
      path:"*",
      element:<ErrorPage/>
    }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
     <RouterProvider router={router}/>
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

