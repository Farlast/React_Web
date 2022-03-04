import React from "react";
//import { Link } from "react-router-dom";
import "assets/styles/banner.css";
import "assets/styles/admin.css";
import "assets/styles/merights.css";

export default function AdminBanner(props) {
  console.log(props);
  return (
    <div id="admin-content-title" className="banner-admin">
      <div id="banner-title">
        <h1 className="title-header">{props.title}</h1>
      </div>
      <div id="sitemap" className="sitemap">
        {props.path}
      </div>
    </div>
  );
}
