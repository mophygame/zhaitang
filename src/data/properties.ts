import type { Property } from "@/types"
import { images } from "@/lib/images"

const records = [
  {title:"翠湖路十七號",region:"新北市霧津區",type:"獨棟別墅",layout:"4 房 2 廳 3 衛浴",area:42.8,age:41,floor:"共 3 樓",direction:"坐北朝南",facilities:null,parking:"有，庭院平面車位 2 席"},
  {title:"長寧紅磚寓所",region:"台北市長寧區",type:"紅磚老宅",layout:"5 房 2 廳 3 衛浴",area:37.5,age:68,floor:"共 2 樓",direction:"坐東朝西",facilities:null,parking:"無；鄰近巷口設有月租停車場"},
  {title:"北岸無名旅店",region:"基隆市北岸區",type:"廢棄旅館",layout:"18 房 1 廳 20 衛浴",area:86.4,age:47,floor:"共 5 樓（另有地下 1 層）",direction:"坐南朝北",facilities:null,parking:"有，戶外平面車位 8 席；目前封鎖"},
  {title:"復興地下二層",region:"台中市中區",type:"地下室",layout:"開放空間、2 間獨立衛浴",area:46.9,age:27,floor:"地下 2 樓／地上 12 樓",direction:"無對外採光面",facilities:"一樓門廳、貨梯、消防梯、公共廁所",parking:"無；原汽車位已改作封存區"},
  {title:"青石山居",region:"南投縣青石鄉",type:"山區民宿",layout:"6 房 2 廳 7 衛浴",area:51.6,age:32,floor:"共 3 樓",direction:"坐西朝東",facilities:null,parking:"有，戶外平面車位 6 席"},
  {title:"環河未完工大樓",region:"桃園市環河區",type:"未完工建案",layout:"原核定每戶 3 房 2 廳 2 衛浴",area:56.3,age:18,floor:"11／15 樓",direction:"坐北朝南",facilities:"未啟用門廳、雙電梯間、安全梯、機房；公設尚未驗收",parking:"有，地下機械車位 1 席；尚未驗收"},
  {title:"舊港商務中心",region:"高雄市舊港區",type:"商辦",layout:"開放辦公區、3 會議室、2 衛浴",area:61.0,age:25,floor:"8／16 樓",direction:"坐東朝西",facilities:"挑高門廳、雙電梯、茶水間、卸貨區、24H 管理室",parking:"有，地下平面車位 2 席"},
  {title:"白榕巷三號",region:"台南市白榕區",type:"老公寓",layout:"3 房 2 廳 2 衛浴",area:65.7,age:49,floor:"4／5 樓",direction:"坐南朝北",facilities:"公共梯間、頂樓曬衣區；無電梯與管理室",parking:"無；巷內僅可停放機車"},
] as const
const anomalies=["高度殘留","低度殘留","高危封鎖","持續異常","資料不公開","持續異常","低度殘留","高度殘留"]
const statuses=["已完成淨化","已封存","目前不開放看房","處理中","觀察中","高危封鎖","已完成淨化","已完成淨化"]
const consultationTeams=[["ju-qi"],["zhu-lan","hua-yu"],["ling-luan","chu-riyang"],["lan-yan","song-tingyan"],["ju-qi","zhu-lan"],["hua-yu","ling-luan"],["chu-riyang","lan-yan"],["song-tingyan","ju-qi","hua-yu"]]
const surveyTeams=[["dai-chiqing"],["dai-chiqing","lan-yan"],["dai-chiqing","ming-hao"],["dai-chiqing","song-tingyan"],["dai-chiqing"],["dai-chiqing","ming-hao","chu-riyang"],["dai-chiqing","lan-yan"],["dai-chiqing","song-tingyan"]]
const responseTeams=[["ju-qi","lan-yan"],["zhu-lan","hua-yu"],["ling-luan","song-tingyan","ming-hao"],["chu-riyang","lan-yan","ming-hao"],["song-tingyan"],["zhu-lan","ling-luan","ming-hao"],["ju-qi","hua-yu"],["chu-riyang","lan-yan"]]
const highestRiskCases=new Set([2,3,5])

export const properties:Property[]=records.map((r,i)=>({
  id:`zt-${49+i}`,caseNumber:`ZT-${String(49+i).padStart(4,"0")}`,title:r.title,address:`${r.region}${i+3}號`,region:r.region,propertyType:r.type,price:i===2||i===5?null:13800000+i*1750000,layout:r.layout,area:r.area,age:r.age,floor:r.floor,direction:r.direction,publicFacilities:r.facilities,parking:r.parking,
  neighborHandling:i===2?"周邊 6 戶與夜間管理員均已訪談；2 戶完成短期安置，旅店後巷仍維持封鎖。":i===5?"已通知管委會籌備處與相鄰工區，完成 12 戶說明；北側兩戶拒絕入內檢測，列為持續觀察。":`已完成相鄰 ${3+i%4} 戶訪談與公共區域檢測；目前未發現向外擴散，住戶已取得夜間應變指引。`,
  anomalyLevel:anomalies[i],status:statuses[i],handlerId:i%2?"song-tingyan":"dai-chiqing",coverImage:images.properties[i%3],beforeImage:images.properties[(i+1)%3],afterImage:images.properties[i%3],shortDescription:"表面條件良好，產權紀錄中存在數段無法對應的居住時間。",incidentSummary:"原屋主於未完成交屋前死亡，執念與房屋產權契約產生重疊。",pollutionBefore:96-i*4,pollutionAfter:3+i,stabilityBefore:12+i*3,stabilityAfter:98-i,availableForSale:![2,5].includes(i),tags:[r.type,anomalies[i],i%2?"夜間限制":"已勘查"],completedAt:`2026.07.${String(21-i).padStart(2,"0")}`,
  timeline:[{date:"1998.04.17",event:"原屋主入住"},{date:"2004.09.03",event:"首次報告夜間腳步聲"},{date:"2011.12.21",event:"發生第一起失蹤事件"},{date:"2026.07.16",event:"花楀建立案件並完成文書歸檔"},{date:"2026.07.18",event:"玳敕青主導完成現場與鄰里勘查"},{date:"2026.07.19",event:"賀止損完成損耗估價與契約清算"},{date:"2026.07.20",event:"渚瀾完成風險覆核，午未核准最終處置"},{date:"2026.07.21",event:i===2||i===5?"維持封鎖並轉入長期監測":"物件重新開放"}],
  handlingStages:[{stage:"案件洽談",staffIds:consultationTeams[i],detail:"確認委託需求、案件風險、住戶狀況與可接受的處置範圍。"},{stage:"案件建檔",staffIds:["hua-yu"],detail:"核對委託資料、目擊紀錄與產權附件，建立機密卷宗。"},{stage:"現場前期勘查",staffIds:surveyTeams[i],detail:"由玳敕青主導屋況測繪、歷史溯源與異常定位；視案件需要由業務專員或保全協同。"},{stage:"現場異常處置",staffIds:responseTeams[i],detail:"依勘查結果執行封緘、隔離、住戶撤離與現場異常排除。"},{stage:"資產清點與損耗清算",staffIds:["he-zhishun"],detail:"清點建物與物品損害，核對封印耗材、安置費用及契約責任。"},...(highestRiskCases.has(i)?[{stage:"最高風險現場安全",staffIds:["ming-hao"],detail:"由冥濠單獨統籌封鎖線、出入管制、撤離動線與人員存活確認。"}]:[]),{stage:"處置覆核",staffIds:["zhu-lan"],detail:"覆核污染下降幅度、鄰里風險與重新開放條件。"},{stage:"最終簽核",staffIds:["wu-wei"],detail:i===2||i===5?"核准維持封鎖、暫停出售並列入長期資產監測。":"核准結案、解除封鎖並同意重新進入銷售程序。"}],
}))
export const getProperty=(id:string)=>properties.find(p=>p.id===id)
