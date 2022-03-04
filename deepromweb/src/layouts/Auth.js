import React from "react";
//import ReactDOM from "react-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "components/Navbar/Navbar.js";
import Footer from "components/Footer.js";

import Profile from "views/authen/Profile.js";
import { PrivateRoute } from 'components/PrivateRoute.js';
//import { Switch, Route, Redirect } from "react-router-dom";

// components

//import Navbar from "components/Navbars/AuthNavbar.js";
//import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "views/authen/Login.js";
import Register from "views/authen/Register.js";
import ForgotPassword from "views/authen/ForgotPassword.js";
import SearchResult from "views/authen/SearchResult.js";
import NetworkList from "views/authen/network/NetworkList.js";
import CoorperationRegister from "views/authen/network/CoorperationRegister.js";
import NetworkAppeal from "views/authen/network/NetworkAppeal.js";
import SearchNetwork from "views/authen/network/SearchNetwork.js";
import ViewNetwork from "views/authen/network/ViewNetwork.js";
import EducationCoordinate from "views/authen/network/EducationCoordinate.js";
import ViewEducationCord from "views/authen/network/ViewEducationCord.js";
import EducationsMap from "views/authen/network/EducationsMap.js";
import SearchMOU from "views/authen/network/SearchMOU.js";
import ViewMOU from "views/authen/network/ViewMOU.js";
import MOUMap from "views/authen/network/MOUMap.js";
import SearchBestPersonAward from "views/authen/network/SearchBestPersonAward.js";
import ViewBestPerson from "views/authen/network/ViewBestPerson.js";
import PersonNetwork from "views/authen/network/PersonNetwork.js";
import Complain from "views/authen/complain/Complain.js";
import FollowComplain from "views/authen/complain/FollowComplain.js";

import ELibrary from "views/authen/elibrary/ELibrary.js";
import Read from "views/authen/elibrary/Read.js";
import ViewELibContent  from "views/authen/elibrary/ViewELibContent.js";

import ELearning  from "views/authen/elearning/ELearning.js";
import ViewElearning  from "views/authen/elearning/ViewElearning.js";
import ElearningTest from "views/authen/elearning/ElearningTest.js";
import ElearningTestResult from "views/authen/elearning/ElearningTestResult.js";

export default function Auth() {
  //console.log('Member template')
  return (
    <div className="fecontent">
      {/*<Navbar />*/}
      <Switch>
        <Route path="/authen/Register" exact component={Register} />
        <Route path="/authen/Login" exact component={Login} />
        <PrivateRoute path="/authen/Profile" exact component={Profile} />
        <Route path="/authen/ForgotPassword" exact component={ForgotPassword} />
        <Route path="/authen/SearchResult/:search" exact component={SearchResult} />
        <Route path="/authen/SearchResult" exact component={SearchResult} />        

        <Route path="/authen/network/NetworkList" exact component={NetworkList} />
        <PrivateRoute path="/authen/network/CoorperationRegister" exact component={CoorperationRegister} />
        <PrivateRoute path="/authen/network/NetworkAppeal" exact component={NetworkAppeal} />
        <Route path="/authen/network/SearchNetwork" exact component={SearchNetwork} />
        <Route path="/authen/network/ViewNetwork" exact component={ViewNetwork} />
        <Route path="/authen/network/EducationCoordinate" exact component={EducationCoordinate} />
        <Route path="/authen/network/ViewEducationCord" exact component={ViewEducationCord} />
        <Route path="/authen/network/EducationsMap" exact component={EducationsMap} />
        <Route path="/authen/network/SearchMOU" exact component={SearchMOU} />
        <Route path="/authen/network/ViewMOU" exact component={ViewMOU} />
        <Route path="/authen/network/MOUMap" exact component={MOUMap} />
        <Route path="/authen/network/SearchBestPersonAward" exact component={SearchBestPersonAward} />
        <Route path="/authen/network/ViewBestPerson" exact component={ViewBestPerson} />
        <Route path="/authen/network/PersonNetwork" exact component={PersonNetwork} />

        <PrivateRoute path="/authen/complain/Complain" exact component={Complain} />
        <PrivateRoute path="/authen/complain/FollowComplain" exact component={FollowComplain} />

        <Route path="/authen/elibrary/ELibrary" exact component={ELibrary} />
        <Route path="/authen/elibrary/Read/:id" exact component={Read} />
        <Route path="/authen/elibrary/Read" exact component={Read} />
        <Route path="/authen/elibrary/ViewELibContent" exact component={ViewELibContent} />

        <Route path="/authen/elearning/ELearning" exact component={ELearning} />
        <Route path="/authen/elearning/ViewElearning/:id" exact component={ViewElearning} />
        <Route path="/authen/elearning/ViewElearning" exact component={ViewElearning} />
        <PrivateRoute path="/authen/elearning/ElearningTest" exact component={ElearningTest} />
        <PrivateRoute path="/authen/elearning/ElearningTestResult" exact component={ElearningTestResult} />

        <Redirect from="/authen" to="/" />
      </Switch>
      <Footer />
    </div>
  );
}