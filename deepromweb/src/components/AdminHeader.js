import React from "react";
import { useNavigate as useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { authenticationService } from 'services/authentication.service.js';
import 'assets/styles/admin.css';
const swal = withReactContent(Swal)

export default function AdminHeader(props) {
  const history = useHistory();
  //const language = localStorage.getItem("language");
  const handleLogout = () => {
    let timerInterval;
    swal.fire({
      title: "ท่านต้องการออกจากระบบหรือไม่?",
      showDenyButton: true,
      /*showCancelButton: true,*/
      confirmButtonText: "ยืนยัน",
      denyButtonText: "ยกเลิก",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        swal.fire({
          title: "ท่านออกจากระบบเรียบร้อยแล้ว", showConfirmButton: false,
          timer: 2000, timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              const content = Swal.getHtmlContainer()
              if (content) {
                const b = content.querySelector('b')
                if (b) {
                  b.textContent = Swal.getTimerLeft()
                }
              }
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          //localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          authenticationService.logout();
          window.location.href = "/";
        })

      } else if (result.isDenied) {
        //swal.fire('Changes are not saved', '', 'info')
      }
    })
  };
  return (
    <div id="admin-header" className="navbar navbar-inverse navbar-fixed-top">
      <div className="navbar-header nhrc-brand">
          <img src="/images/logo/nhrclogo.png" alt="LOGO" />
        <span style={{ fontSize: 2 + 'rem', display: 'flex', alignItems: 'center' }}>ดีพร้อม</span>
      </div>
      <ul className="nav navbar-right top-nav">
        <li className="dropdown">
          <a href="/" onClick={(e) => { e.preventDefault(); }} className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-fw fa-cog"></i></a>
          <ul id="user-popup-menu" className="dropdown-menu">
            <li><a href="/" onClick={(e) => {
              e.preventDefault();
              history.push({ pathname: "/admin/Profile" });
            }}><i className="fas fa-user"></i> <span className="admin-popup-menu">โปรไฟล์</span></a></li>
            <li className="nav-item">
              <div style={{
                display: 'inline-flex',
                textAlign: 'center',
                marginLeft: 15,
                marginRight: 15,
                position: 'relative',
                fontSize: 29
              }}>
              </div>
            </li>
            <li className="divider"></li>

            <li><a href="/" onClick={(e) => { e.preventDefault(); handleLogout(); }}><i className="fa fa-fw fa-power-off"></i> <span className="admin-popup-menu">ออกจากระบบ</span></a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}