import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import utils from 'utils/utils';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AdminBanner from 'components/Banner/AdminBanner';
import 'assets/styles/admin-setting.css';
import 'assets/styles/merights.css';
import { useNavigate }  from 'react-router-dom'
import { GrFormNext } from "react-icons/gr";

const swal = withReactContent(Swal)

export default function ProjectTypelist(props) {
    const [gridApi, setGridApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    let navigate = useNavigate();
    useEffect(() => {}, []); /* <-- add this for run once*/

    const handleDelete = (params) => {
        
        swal.fire({
            title: "ยืนยันการลบข้อมูล",
            showDenyButton: true,
            /*showCancelButton: true,*/
            confirmButtonText: "ยืนยัน",
            denyButtonText: "ยกเลิก",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                if(params.data.is_active){
                    swal.fire('ไม่สามารถลบได้ เนื่องจากข้อมูลถูกใช้งาน', '', 'info')
                }else{
                    deleteSingleRow(params);
                }

            } else if (result.isDenied) {
                //swal.fire('Changes are not saved', '', 'info')
                console.log("params:"+params.data.is_active)
            }
        })
    };

    const handleDeleteAll = (params) => {
        let selectedNodes = gridApi.getSelectedNodes();
        if (selectedNodes.length > 0) {
            //let timerInterval;
            swal.fire({
                title: "ยืนยันการลบข้อมูลทั้งหมดที่เลือก",
                showDenyButton: true,
                /*showCancelButton: true,*/
                confirmButtonText: "ยืนยัน",
                denyButtonText: "ยกเลิก",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    deleteRowData();

                } else if (result.isDenied) {
                    //swal.fire('Changes are not saved', '', 'info')
                }
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'ผิดพลาด',
                text: 'กรุณาเลือกข้อมูลอย่างน้อยหนึ่งชุด',
            })
        }
    };

    const onGridReady = (params) => {
        setGridApi(params.api);
        params.api.sizeColumnsToFit();
        const updateData = (data) => {
            setRowData(data);
        };

        axios.get(process.env.REACT_APP_APIURL + '/api-web/searchProjectType').then((response) => {
            updateData(response.data);
            console.log(response.data);
        })
        console.log(process.env.REACT_APP_APIURL);
    };

    var checkboxSelection = function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
    };

    var headerCheckboxSelection = function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
    };

    const getRowHeight = (params) => {
        //console.log(params.data.rowHeight);
        //return params.data.rowHeight;
        return 80;
    };

    const NameRenderer = params => {
        return params.value;
    };
    const statusRenderer = params => {
        if (params.value === 1)
            return 'เผยแพร่';
        return 'ไม่เผยแพร่';
    };
    const createYearCellRenderer = params => {
        if (params.data.created_by_name == null)
            return '<span style="line-height:0.75rem;"><p style="margin-top:16px;">' + utils.MariatoThaiDateString(params.data.created_at) + '</p></span>';
        return '<span style="line-height:0.75rem;"><p style="margin-top:16px;margin-bottom:4px;">' + utils.MariatoThaiDateString(params.data.created_at) + '</p><p style="line-height:20px;margin-bottom: -4px;">' + params.data.created_by_name + '<p></span>';
    };
    const updateYearCellRenderer = params => {
        if (params.data.updated_by_name == null)
            return '<span style="line-height:0.75rem;"><p style="margin-top:16px;margin-bottom:4px;">' + utils.MariatoThaiDateString(params.data.updated_at)+ '</p>';
        return '<span style="line-height:0.75rem;"><p style="margin-top:16px;margin-bottom:4px;">' + utils.MariatoThaiDateString(params.data.updated_at) + '</p><p style="line-height:20px;margin-bottom: -4px;">' + params.data.updated_by_name + '<p></span>';
    };
    const RowTool = params => {
        let tool = null;
        tool = (<span className="row-tool"><button type="button" className="btn btn-primary btn-sm wd-40" onClick={() => { handleEdit(params); }}>แก้ไข</button> <button type="button" className="btn btn-danger btn-sm wd-40" onClick={() => { handleDelete(params); }} >ลบ</button></span>);
        return tool;
    };
    var hashValueGetter = function (params) {
        return params.node.rowIndex + 1;
    };
    const onPageSizeChanged = (newPageSize) => {
        var value = document.getElementById('page-size').value;
        gridApi.paginationSetPageSize(Number(value));
    };
    const searchRef = React.createRef();
    const statusRef = React.createRef();

    const searchData = () => {
        axios.get(process.env.REACT_APP_APIURL + '/api-web/searchProjectType', { params: { search: searchRef.current.value,status: statusRef.current.value } }).then((response) => {
            setRowData(response.data);
        })
    };
    const resetsearch = () => {
        searchRef.current.value = "";
        statusRef.current.value = "-1";
        axios.get(process.env.REACT_APP_APIURL + '/api-web/searchProjectType')
            .then((response) => {
                setRowData(response.data);
            })
    };
    const deleteSingleRow = params => {
        axios.post(process.env.REACT_APP_APIURL + '/api-web/deleteProjectType', null, { params: { id: params.data.project_type_id } })
            .then((response) => {
                if (response.data.success === false) {
                    Swal.fire({
                        icon: 'error',
                        title: 'ผิดพลาด',
                        text: response.data.text,
                    })
                }
                else {
                    let timerInterval;
                    swal.fire({
                        title: "ลบข้อมูลเรียบร้อย", showConfirmButton: false,
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
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        axios.get(process.env.REACT_APP_APIURL + '/api-web/searchProjectType')
                            .then((response) => {
                                setRowData(response.data);
                            })
                    })
                }

            })
    };
    const deleteRowData = () => {
        let selectedNodes = gridApi.getSelectedNodes();
        let is_HaveActive = false;
        
        selectedNodes.map((row, i) => {
            if(row.data.is_active){
                is_HaveActive = true          
            }
            return row;
        });
        if(is_HaveActive){ 
            swal.fire('ไม่สามารถลบได้ เนื่องจากข้อมูลถูกใช้งาน', '', 'info')
            return;
        }

        selectedNodes.map((row, i) => {
            console.log(row.data)
            axios.post(process.env.REACT_APP_APIURL + '/api-web/deleteProjectType', null, { params: { id: row.data.project_type_id } })
                .then((response) => {
                    if (response.data.success === false) {
                        Swal.fire({
                            icon: 'error',
                            title: 'ผิดพลาด',
                            text: response.data.text,
                        }).then((result) => {
                            axios.get(process.env.REACT_APP_APIURL + '/api-web/searchProjectType')
                                .then((response) => {
                                    setRowData(response.data);
                                })
                        })
                    }
                })
            return row;
        });
        let timerInterval;
        swal.fire({
            title: "ลบข้อมูลเรียบร้อย", showConfirmButton: false,
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
                clearInterval(timerInterval)
            }
        }).then((result) => {
            axios.get(process.env.REACT_APP_APIURL + '/api-web/searchProjectType')
                .then((response) => {
                    setRowData(response.data);
                })
        })
    };
   
    const handleCreate = () => {
        navigate('new', {replace:false})
    };
    const handleEdit = params => {
        navigate(`edit`, {state:{id:params.data.project_type_id}})
        console.log(params.data.project_type_id);
    };

    return (
        <section className="row custom-admin-input" >
            <AdminBanner title={"การจัดการโครงการ"} path={<>
                <span><i className="fas fa-angle-right"></i></span>
                <Link id="profile-btn" to={{ pathname: "/admin/list" }}>{"จัดการประเภท"}</Link>
                <span><i className="fas fa-angle-right"></i></span>
                <GrFormNext/>
                <Link className="active" to={{ pathname: "/list" }}>{"รายการประเภท"}</Link></>}
            />
            <div className="col-12">
                <form className="form-inline form-border">
                    <div className="form-group mx-sm mb-2 col-5 col-lg-4 col-md-3 pr-0">
                        <input type="text" ref={searchRef} className="form-control " id="searchfield" name="searchfield" placeholder="ค้นหาที่นี่" />
                    </div>
                    <div className="form-group mx-sm mb-2 col-2 col-lg-2 pr-0">
                        <select className="form-control" ref={statusRef}>
                            <option value="-1">สถานะทั้งหมด</option>
                            <option value="1">เผยแพร่</option>
                            <option value="0">ไม่เผยแพร่</option>
                        </select>
                    </div>
                    <div className="button-group col-2">
                        <button type="button" className="btn btn-info mb-2 mr-2" onClick={e => { e.preventDefault(); searchData(); }}>ค้นหา</button>
                        <button type="submit" className="btn btn-light mb-2" onClick={e => { e.preventDefault(); resetsearch(); }}>ล้างคำค้นหา</button>
                    </div>
                </form>
            </div>
            <div className="col-12">
                <div className="form-border">
                    <div className="col-12">
                        <div className="form-inline button-group">
                            <button type="button" className="btn btn-success mb-2 mr-2 wd-80" onClick={e => { e.preventDefault(); handleCreate(); }}><i className="far fa-save"></i> สร้าง</button>
                            <button type="button" className="btn btn-secondary mb-2 wd-80" onClick={e => { e.preventDefault(); handleDeleteAll(); }}><i className="fas fa-trash-alt"></i> ลบ</button>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="ag-theme-alpine" style={{ height: 900 }}>
                            <AgGridReact
                                autoGroupColumnDef={{
                                    headerName: 'Group',
                                    minWidth: 30,
                                    field: 'CategoriesID',
                                    valueGetter: function (params) {
                                        if (params.node.group) {
                                            return params.node.key;
                                        } else {
                                            return params.data[params.colDef.field];
                                        }
                                    },
                                    headerCheckboxSelection: true,
                                    cellRenderer: 'agGroupCellRenderer',
                                    cellRendererParams: { checkbox: true },
                                }}

                                modules={AllCommunityModules}
                                frameworkComponents={{
                                    rowTool: RowTool,
                                }}
                                defaultColDef={{
                                    sortable: true,
                                    resizable: true,
                                    filter: false,
                                    //cellClass: "cell-border cell-vertical-align-text-left",
                                }}
                                getRowHeight={getRowHeight}
                                onGridReady={onGridReady}
                                rowData={rowData}
                                rowSelection={'multiple'}
                                rowDragManaged={true}
                                pagination={true}
                                paginationPageSize={10}
                                //paginationAutoPageSize={true}
                                //onRowDragEnd={onRowDragEnd}

                            >
                                <AgGridColumn
                                    field=""
                                    headerName=""
                                    width={50}
                                    checkboxSelection={checkboxSelection}
                                    headerCheckboxSelection={headerCheckboxSelection}
                                    sortable={true} resizable={false}
                                />
                                <AgGridColumn field="" valueGetter={hashValueGetter} headerName="ลำดับ" minWidth={100} cellClass="cell-border cell-vertical-align-text-left" />
                                <AgGridColumn field='project_type_name' headerName="ชื่อรายการ" cellRenderer={NameRenderer} minWidth={200} />
                                <AgGridColumn field="is_active" headerName="สถานะ" cellRenderer={statusRenderer} sortable={true} minWidth={100} />
                                <AgGridColumn field="created_at" headerName="วันที่สร้าง" cellRenderer={createYearCellRenderer} minWidth={210} wrapText={true} cellClass="cell-border cell-vertical-align-text-left" />
                                <AgGridColumn field="updated_at" headerName="วันที่แก้ไข" cellRenderer={updateYearCellRenderer} minWidth={210} wrapText={true} cellClass="cell-border cell-vertical-align-text-left" />
                                <AgGridColumn field="project_type_id" headerName="จัดการ" cellRenderer="rowTool" minWidth={130} sortable={false} filter={false} resizable={false} />
                            </AgGridReact>
                            <div className="page-size formContent">
                                <p>Page size:</p>
                                <select className="custom-select" defaultValue={10} onChange={() => onPageSizeChanged()} id="page-size">
                                    <option value="10" >10</option>
                                    <option value="100">25</option>
                                    <option value="500">50</option>
                                    <option value="1000">100</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}