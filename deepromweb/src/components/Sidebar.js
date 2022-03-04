/*eslint-disable*/
import React from "react";
import { authenticationService } from 'services/authentication.service.js';
import avatar from '../assets/images/icon/user.svg';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useNavigate }  from 'react-router-dom'
import 'assets/styles/navbar.css'

export default function Sidebar() {
  let navigate = useNavigate();
  const language = localStorage.getItem("language");
  const currentUser = authenticationService.currentUserValue;

  const MenuList = () => {
    let menu = <>
    
    <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/admin/projectGroup"
            onSelect={({itemId}) => {
              // push to the route
                if(itemId)
                  navigate(itemId)
            }}
            items={[
              {
                key:'0',
                title: 'หน้าหลัก',
                itemId: '/',
              },
              {
                key:'1',
                title: 'ข้อมูลส่วนตัว',
                itemId: '/admin',
              },
              {
                key:'2',
                title: 'การจัดการเว็บไซต์',
                itemId: '/admin/profile',
              },
              {
                key:'3',
                title: 'การจัดการหลักสูตร',
                subNav: [
                  {
                    key:'3.1',
                    title: 'จัดการหมวดหมู่',
                    itemId: 'projectGroup',
                  },
                  {
                    key:'3.2',
                    title: 'จัดการปรเะภท',
                    itemId: 'projectType',
                  },
                  {
                    key:'3.3',
                    title: 'จัดการหลักสูตร',
                    itemId: 'projectCourse',
                  },
                  {
                    key:'3.4',
                    title: 'จัดการผู้เชี่ยวชาญ/วิทยากร',
                    itemId: 'projectPros',
                  },
                ],
              },
            ]}
          />
    </>;
    return menu;
  }
 
  return (
    <>
      <div className="collapse navbar-collapse navbar-ex1-collapse show">
        <ul className="nav navbar-nav side-nav">
          <li className="sidebar-avatar">
            <div className="avtar-content">
              <div className="avatar-circle"><img src={currentUser.Avatar!==null?currentUser.Avatar:avatar} alt="Avatar" /></div>
              <h3 style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}} title={currentUser.FirstnameTH+" "+currentUser.LastnameTH}>{currentUser.FirstnameTH+" "+currentUser.LastnameTH}</h3>
            </div>
          </li>
          <MenuList/>          
        </ul>
      </div>
    </>
  );
}
