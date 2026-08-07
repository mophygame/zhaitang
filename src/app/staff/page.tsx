import type {Metadata} from "next";import {staff} from "@/data/staff";import {StaffDirectory} from "@/components/staff/StaffComponents";import "./staff.css";import "../creators/creators.css";
export const metadata:Metadata={title:"員工名錄"};
export default function StaffPage(){return <><section className="page-hero staff-page-hero"><p className="kicker">INTERNAL DIRECTORY / ACCESS LEVEL 02</p><h1>員工名錄</h1><p>以下人員具備特殊物件現場權限。若照片與本人不符，以現場人員為準。</p></section><section className="section"><div className="directory-head"><span>在職人數 11</span></div><StaffDirectory staff={staff}/></section></>}
