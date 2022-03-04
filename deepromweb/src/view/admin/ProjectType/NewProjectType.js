import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { authenticationService } from 'services/authentication.service.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AdminBanner from 'components/Banner/AdminBanner';
import SError from 'components/SError';
import { useNavigate }  from 'react-router-dom'
import 'assets/styles/margin-box.css'
import { GrFormNext } from "react-icons/gr";

const swal = withReactContent(Swal)

export default function NewProjectType(props) {
    let navigate = useNavigate();
    const currentUser = authenticationService.currentUserValue;
    const [activeTab, setActiveTab] = useState(1);
    const [nameth, setNameTH] = useState('');
    const [nameen, setNameEN] = useState('');
    const [status, setStatus] = useState(1);
    const [errors, setError] = useState({});

    const handleValidation = () => {
        let serrors = {};
        let formIsValid = true;
        //Name
        if (nameth.trim().length === 0) {
            formIsValid = false;
            serrors["nameth"] = "กรุณากรอกข้อมูล";
        }
        /*if(nameen.trim().length===0){
            formIsValid = false;
            serrors["nameen"] = "กรุณากรอกข้อมูล";
         }*/

        if (Number(status) === -1) {
            formIsValid = false;
            serrors["published"] = "กรุณาเลือกสถานะ";
        }
        if (formIsValid === false) {
            Swal.fire({
                icon: 'error',
                title: 'ผิดพลาด',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            })
        }
        setError(serrors);
        return formIsValid;
    };
    const saveData = (open) => {
        if (handleValidation()) {
            console.log({params: { "titleth": nameth, "titleen": nameen, 'status': status, 'createby': currentUser.UserID }});
            axios.post(process.env.REACT_APP_APIURL + '/api-web/newProjectType', null, { params: { titleth: nameth, titleen: nameen, status: status, createby: currentUser.UserID } })
                .then((response) => {
                    let timerInterval;
                    swal.fire({
                        title: "บันทึกข้อมูลเรียบร้อย", showConfirmButton: false,
                        timer: 1000, timerProgressBar: true,
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
                            clearInterval(timerInterval);

                        }
                    }).then((result) => {
                        if (open) {
                            window.location.reload();
                        }
                        else {
                            navigate(-1);
                        }
                    })
                });

        } else {
            //alert("Form has errors.")
        }
    };
    const cancel = () => {
        navigate('/admin/projectType',{replace:true})
    };
    return (
        <section className="row custom-admin-input" >
            <AdminBanner title={"การจัดการโครงการ"} path={<>
                <span><i className="fas fa-angle-right"></i></span>
                <Link id="profile-btn" to={{ pathname: "/admin/list" }}>{"จัดการประเภท"}</Link>
                <span><i className="fas fa-angle-right"></i></span>
                <GrFormNext/>
                <Link id="profile-btn" className="active" to={{ pathname: "/admin/projectType/new" }}>{"สร้างประเภท"}</Link>
            </>}
            />
            <div className="margin-left">
                <form className="row">
                    <div className="col-12">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item tab" role="presentation">
                                <button className={activeTab === 1 ? "tab active" : "tab"} id="tab1-tab" onClick={(e) => {e.preventDefault(); setActiveTab(1)}} >TH</button>
                            </li>
                            <li className="nav-item tab" role="presentation">
                                <button className={activeTab === 2 ? "tab active" : "tab"} id="tab2-tab" onClick={(e) => {e.preventDefault(); setActiveTab(2)}} >EN</button>
                            </li>
                        </ul>
                        <div className="tab-content pl-4 pr-4" id="myTabContent">
                            {activeTab === 1 &&
                            <div className={activeTab === 1 ? "tab-pane fade show active" : "tab-pane"} id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                                <div className="form-group">
                                    <label htmlFor="thname" className="required">ชื่อประเภท (ภาษาไทย)</label>
                                    <input type="text" className="form-control" id="thname" name="thname" placeholder="กรุณากรอก" value={nameth} onChange={(e) => { setNameTH(e.currentTarget.value) }} />
                                    <SError error={errors["nameth"]} />
                                </div>
                            </div>
                            }
                            {activeTab === 2 &&
                            <div className="tab-pane fade show active" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                                <div className="form-group">
                                    <label htmlFor="enname">ชื่อประเภท (ภาษาอังกฤษ)</label>
                                    <input type="text" className="form-control" id="enname" name="enname" placeholder="กรุณากรอก" value={nameen} onChange={(e) => { setNameEN(e.currentTarget.value) }} />
                                    <SError error={errors["nameen"]} />
                                </div>
                            </div>
                            }
                        </div>


                    </div>
                    <div className="col-12 flex-center">
                        <div className="pl-4 pr-4" >
                            <label htmlFor="enname" className="required mr-2">สถานะ</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="published" id="published1" value="1" checked={status === 1} onChange={(e) => { setStatus(1); }} />
                                <label className="form-check-label" htmlFor="published1"> เผยแพร่</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="published" id="published2" value="0" checked={status === 0} onChange={(e) => { setStatus(0); }} />
                                <label className="form-check-label" htmlFor="published2"> ไม่เผยแพร่</label>
                            </div>
                            <SError error={errors["published"]} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="pl-4 pr-4 text-center" >
                            <button type="button" className="btn btn-success mr-2" onClick={e => { e.preventDefault(); saveData(false); }}><i className="fas fa-save"></i> บันทึก</button>
                            <button type="button" className="btn btn-secondary mr-2" onClick={e => { e.preventDefault(); saveData(true); }}><i className="fas fa-save"></i> บันทึกและเปิด</button>
                            <button type="button" className="btn btn-dark" onClick={e => { e.preventDefault(); cancel(); }}><i className="far fa-times-circle"></i> ยกเลิก</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}