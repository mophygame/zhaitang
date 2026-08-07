import type { Creator } from "@/types"
import { images } from "@/lib/images"

const records = [
  {name:"凌辰",character:"午未｜老闆",description:"男性，負責偶爾視察齋堂房屋不動產的營運狀況，並對重大案件進行最終簽核。",styles:["經營者氣場","高級商務","冷調敘事"],works:["老闆視察日","最終簽核"],photo:"/images/employees/wu-wei.webp"},
  {name:"音🔕｜𝕄𝕚𝕒𝕟",character:"裘笈｜業務行銷經理",description:"男性，負責追蹤管理每位員工的 KPI 進度、解決員工「雜症」，並精通各類行銷話術。",companion:"喬治｜金色的小蟾蜍，裘笈的寵物，會被他隨身攜帶。",styles:["行銷職人","金色調","商務角色"],works:["KPI 追蹤表","成交話術","喬治出勤中"],photo:"/images/employees/ju-qi.webp"},
  {name:"貓堆中的雙💚",character:"渚瀾｜店長",description:"男性，負責擔任齋堂門市的吉祥物店長，同時統籌店務與重要案件覆核。",styles:["店長日常","沉穩角色","反差幽默"],works:["今日店長值班","吉祥物的覆核章"],photo:"/images/employees/zhu-lan.webp"},
  {name:"夜欞",character:"鶕綾｜副店長",description:"男性，負責管理店內事務、規劃業務流程，並在店長不在時代理重大決策。",styles:["暗夜美學","管理者角色","神祕敘事"],works:["副店長代理中","封鎖計畫"],photo:"/images/employees/ling-luan.webp"},
  {name:"墨非 Mophy",character:"賀止損｜會計",description:"男性，負責管理齋堂房屋的收支、金錢流向紀錄與採購，並清算每起異常案件造成的損耗。",companion:"車車｜灰白色公天竺鼠，賀止損的寵物，時常黏在他的胸前口袋。",styles:["冷色精品","會計職人","精緻男角"],works:["封印損耗表","零點結算","車車與發票"],photo:"/images/employees/he-zhishun.webp"},
  {name:"🌙沐月｜𝓜𝓾𝓜𝓾",character:"花楀｜櫃檯行政秘書",description:"男性，負責勞健保處理、案件建檔，以及記錄所有員工 KPI 的行政相關作業。",companion:"肥料｜純白布偶母貓，花楀的寵物，也是齋堂的店貓。",styles:["月色柔光","行政日常","白色系角色"],works:["櫃檯機密名冊","KPI 歸檔日","肥料巡店"],photo:"/images/employees/hua-yu.webp"},
  {name:"期待戳戳",character:"松聽簷｜業務銷冠",description:"男性，負責處理難搞型業務，專攻極凶屋、因果糾紛物件與土地煞氣淨化。",styles:["極凶屋敘事","暖金光影","和風角色"],works:["極凶屋成交紀錄","雨傘下的帶看","土地煞氣淨化"],photo:"/images/employees/song-tingyan.webp"},
  {name:"比比",character:"婪煙｜業務",description:"男性，負責處理靈體超渡，並協助處理無法自行離開現場的地縛靈。",styles:["靈體敘事","黑白氛圍","都市怪談"],works:["地縛靈帶看中","超渡完成之前"],photo:"/images/employees/lan-yan.webp"},
  {name:"蛋塔今天也想談戀愛",character:"褚日央｜業務",description:"男性，負責管理影印機，以及對已完成淨化處理的房產提供售後風水服務。",styles:["職場日常","風水題材","柔光人像"],works:["影印機又卡紙了","交屋後風水服務"],photo:"/images/employees/chu-riyang.webp"},
  {name:"なな｜菜菜",character:"冥濠｜保全",description:"男性，負責齋堂房屋不動產周圍安全，以及最高風險案件的現場封鎖與人員撤離。",styles:["保全制服","高危現場","電影光影"],works:["夜間巡邏名單","最高風險封鎖線"],photo:"/images/employees/ming-hao.webp"},
  {name:"墨非 Mophy、蛋塔今天也想談戀愛",character:"玳敕青｜業務",description:"由墨非 Mophy 與蛋塔今天也想談戀愛兩位創作者共同製作角色合輯。玳敕青為男性，負責物件開發，以及凶宅與異常物件的前期勘查；進入現場後，請勿移動任何未登記物品。",styles:["雙人共同創作","墨蝶意象","異常勘查"],works:["文字化蝶","請不要碰現場","未完成交屋"],photo:"/images/employees/dai-chiqing.webp"},
] as const

const workImages=[images.hero,"/images/E99E22B7-706E-4578-BD5D-371FC4059937.webp","/images/98441CCC-B076-4253-B64E-E0B19495FC16.webp","/images/D98D5FBD-00B2-48F7-8552-CF14B207D551.webp"]

export const creators:Creator[]=records.map((record,index)=>({
  id:`creator-${String(index+1).padStart(2,"0")}`,name:record.name,photo:record.photo,
  zhaitangCharacter:record.character,characterDescription:record.description,
  companion:"companion" in record?record.companion:undefined,styles:[...record.styles],
  recommendedWorks:record.works.map((title,workIndex)=>({title,hashtags:["齋堂房屋",record.character.split("｜")[0],record.styles[workIndex%record.styles.length].replaceAll(" ","")],url:`https://example.com/zhaitang/${index+1}/${workIndex+1}`,image:workImages[(index+workIndex)%workImages.length]})),
  discordUrl:"https://discord.com/",profileUrl:`https://example.com/creator/${index+1}`,
}))
