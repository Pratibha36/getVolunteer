import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom"; 
import { StateProvider } from './components/StatePovider';
import reducer, { initialState } from './components/reducer';
import Introcontent from './components/Introcontent';
import AllJobs from './components/AllJobs';
import { Login, PostAdd } from '@mui/icons-material';
import Signup from './components/Signup';
import { AuthStateProvider, useAuthStateValue } from './context/AuthStateProvider';
import authReducer, { authInitialState } from './context/AuthReducer';
import ViewJob from './components/ViewJob';
import { PostJob } from './components/PostJob';
import { JobListing } from './components/JobListing';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"/",
        element:<div>
          <Introcontent/>
          <AllJobs/>
        </div>
      },{
          path:"/Signup",
          element:<Signup/>
      },{
        path:"/viewjob/:jobid",
        element:<ViewJob/>
    },{
      path:"/postjob",
      element:<PostJob/>
    },{path:"/appliedstudents",
       element:<JobListing/>
    },{path:"/appliedstudents/:jobid",
    element:<ViewJob/>
 }

    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthStateProvider initialState={authInitialState} reducer={authReducer}>
    <StateProvider initialState={initialState} reducer={reducer}>
    <RouterProvider router={router} />
    </StateProvider>
    </AuthStateProvider>
  </React.StrictMode>
);
