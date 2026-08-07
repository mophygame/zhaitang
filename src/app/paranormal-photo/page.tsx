import type {Metadata} from "next";import {PhotoLab} from "@/components/paranormal/PhotoLab";
export const metadata:Metadata={title:"靈異影像檢測"};
export default function ParanormalPage(){return <><section className="page-hero paranormal-hero"><p className="kicker">PUBLIC EXPERIMENT / LOCAL PROCESSING ONLY</p><h1>靈異影像檢測</h1><h2>你確定照片裡只有你嗎？</h2><p>上傳一張照片。齋堂將分析影像中的異常視線、殘留墨跡、未登記存在與空間污染。</p></section><section className="section"><PhotoLab/></section></>}
