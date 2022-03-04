import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Route, Routes} from "react-router-dom";
import Home from 'view/user/Home';
import About from 'view/user/About';
import Page404 from "view/user/Page404";
import ProjectGroupp from "view/admin/ProjectGroupF/ProjectGroup";
import NewProjectGroup from "view/admin/ProjectGroupF/NewProject";
import EditProject from "view/admin/ProjectGroupF/EditProject";
import ProjectType from "view/admin/ProjectType/ProjectTypeList";
import NewProjectType from "view/admin/ProjectType/NewProjectType";
import EditProjectType from "view/admin/ProjectType/EditProjectType";
import Admin from "layouts/Admin";
import { Helmet } from 'react-helmet'
import 'index.css'

//import { PrivateRoute } from 'components/PrivateRoute.js';
//import Login from "views/authen/Login.js";
//import Register from "views/authen/Register.js";
//<Route path="/authen/Register" exact component={Register} />
//<Route path="/authen/Login" exact component={Login} />

//<PrivateRoute path="/admin/Profile" exact component={Profile} />

const TITLE = 'ดีพร้อม'

ReactDOM.render(
      <Router>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>

        <Routes>
          <Route path= "*" element={<Page404/>}/>
          <Route path= "/" element={<Home/>}/>
          <Route path= "/about" element={<About/>}/>
          <Route path= "/admin/*" element={<Admin/>}>
            <Route path= "projectGroup" element={<ProjectGroupp/>}/>
            <Route path= "projectGroup/new" element={<NewProjectGroup/>}/>
            <Route path= "projectGroup/edit" element={<EditProject/>}/>
            <Route path= "projectType" element={<ProjectType/>}/>
            <Route path= "projectType/new" element={<NewProjectType/>}/>
            <Route path= "projectType/edit" element={<EditProjectType/>}/>
          </Route>
        </Routes>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
