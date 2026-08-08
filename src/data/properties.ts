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
const consultationTeams=[["ju-qi"],["zhu-lan","hua-yu"],["ling-luan","chu-riyang"],["lan-yan","song-tingyan"],["ju-qi","zhu-lan"],["hua-yu","ling-luan"],["chu-riyang","lan-yan"],["song-tingyan","ju-qi","hua-yu"]]
const surveyTeams=[["dai-chiqing"],["dai-chiqing","lan-yan"],["dai-chiqing","ming-hao"],["dai-chiqing","song-tingyan"],["dai-chiqing"],["dai-chiqing","ming-hao","chu-riyang"],["dai-chiqing","lan-yan"],["dai-chiqing","song-tingyan"]]
const responseTeams=[["ju-qi","lan-yan"],["zhu-lan","hua-yu"],["ling-luan","song-tingyan","ming-hao"],["chu-riyang","lan-yan","ming-hao"],["song-tingyan"],["zhu-lan","ling-luan","ming-hao"],["ju-qi","hua-yu"],["chu-riyang","lan-yan"]]
const highestRiskCases=new Set([2,3,5])
const specialistStages:Property["handlingStages"][]=[
  [{stage:"契約因果裁定",staffIds:["ling-luan"],detail:"鶕綾以紅瞳辨識產權、死亡與衣櫃殘留間的因果線，剝離錯誤嫁接的所有權執念，避免異常隨下次移轉重新附著。"}],
  [{stage:"押金因果置換",staffIds:["ling-luan"],detail:"鶕綾逐筆核對未退租姓名的因果線，將牆內索償執念置換至象徵清償紀錄，使十六道敲牆回應依序停止。"}],
  [],
  [],
  [{stage:"霧天邊界警戒",staffIds:["ming-hao"],detail:"冥濠於夜間沿溪線與山徑巡查，以狼嚎確認霧中異常未越界，並封鎖十四個會自動回應房客姓名的危險點。"}],
  [],
  [],
  [],
]

const caseDetails = [
  {
    anomaly:"高度殘留",status:"已完成淨化",metrics:[96,3,12,98,91,2,28,100],completedAt:"2026.07.21",
    summary:"原屋主於未完成交屋前死亡，執念與房屋產權契約重疊，所有權移轉時便會重新顯現。",
    neighbor:"完成左右相鄰 4 戶訪談與共牆檢測；西側住戶的夜間敲擊聲已停止，無需安置。",
    method:"文字封緘、產權切離、二樓衣櫃定點封存",seal:"金箔線 18.4 m、黑墨 3 罐、白水晶 2 枚",
    final:"契約型殘留已完成剝離，污染降至可居住標準，同意重新進入銷售程序。",note:"二樓西側房間仍禁止於凌晨 03:17 開啟衣櫃。",
    timeline:[{date:"1985.02.11",event:"首任屋主完成建物保存登記"},{date:"1998.04.17",event:"第二任屋主入住並增建西側房間"},{date:"2004.09.03",event:"首次通報夜間衣櫃內有腳步聲"},{date:"2011.12.21",event:"交屋前一日發生屋主死亡事件"},{date:"2026.07.16",event:"花楀完成產權附件與目擊紀錄建檔"},{date:"2026.07.18",event:"玳敕青確認異常與未完成契約重疊"},{date:"2026.07.19",event:"鶕綾完成契約因果剝離，賀止損完成損耗清算"},{date:"2026.07.21",event:"午未核准解除封鎖並重新銷售"}],
    details:["確認繼承人出售需求，約定保留西側房間原狀。","比對三次移轉謄本，補登死亡前未完成附件。","測得二樓衣櫃內外空間差 17 公分，完成文字取樣。","切離產權執念並封存衣櫃內層，鄰戶同步觀測。","核銷衣櫃、牆紙與封緘材料損耗，完成繼承稅務註記。","覆核連續 48 小時污染曲線與西側共牆反應。","核准結案、解除封鎖並同意重新進入銷售程序。"],
  },
  {
    anomaly:"低度殘留",status:"已封存",metrics:[63,11,37,91,44,6,72,96],completedAt:"2026.06.14",
    summary:"日治時期留下的租賃名冊被砌入紅磚牆，未退租姓名持續以敲牆聲要求返還押金。",
    neighbor:"完成巷內 5 戶聲學比對；敲擊僅沿本棟磚牆傳遞，鄰宅未受附著。",
    method:"磚牆聲紋定位、名冊抄錄、押金象徵清償",seal:"宣紙 48 張、銅錢 16 枚、灰泥 22 kg",
    final:"殘留已由活動型轉為靜止封存；因原始名冊無法取出，暫不解除封存標記。",note:"雨天請勿敲擊東側第三排紅磚，以免重新觸發回應。",
    timeline:[{date:"1937.08.02",event:"建物作為六戶合租寓所啟用"},{date:"1945.10.19",event:"管理人失聯，押金名冊去向不明"},{date:"1972.03.06",event:"改建時以紅磚封閉原帳房"},{date:"2019.05.28",event:"住戶首次錄下牆內規律敲擊"},{date:"2026.06.08",event:"渚瀾與花楀受理家族封存委託"},{date:"2026.06.10",event:"玳敕青完成磚牆聲紋與姓名比對"},{date:"2026.06.12",event:"鶕綾置換押金因果，賀止損完成十六筆象徵清償"},{date:"2026.06.14",event:"午未核准保留封存、不開放拆牆"}],
    details:["釐清家族僅申請止聲封存，暫不出售或拆牆。","整理族譜、舊租約照片與十六筆未退押金紀錄。","沿東牆逐磚記錄回聲，定位名冊所在區域。","依姓名順序完成象徵清償，再以灰泥回封聲源。","估列磚牆修補、名冊債務與施工停用損失。","確認敲擊頻率歸零，但名冊能量仍留在牆體。","核准列為低度封存資產，禁止未授權拆除。"],
  },
  {
    anomaly:"高危封鎖",status:"目前不開放看房",metrics:[99,74,4,22,98,71,9,38],completedAt:"2026.05.30",
    summary:"旅店曾長期將不存在的 404 號房登記入住；失蹤房客資料與地下鍋爐間形成循環動線。",
    neighbor:"訪談周邊 6 戶與夜間管理員；2 戶完成短期安置，後巷及鍋爐排氣口持續封鎖。",
    method:"全棟撤離、虛構房號註銷、地下動線截斷",seal:"封鎖樁 24 支、鹽磚 160 kg、照明棒 37 支",
    final:"循環已被截斷但污染仍高於安全值；維持高危封鎖，禁止出售與任何形式帶看。",note:"若走廊出現 404 號門牌，不要刷卡、敲門或確認房內聲音。",
    timeline:[{date:"1979.11.03",event:"北岸旅店取得營業登記，共 18 間客房"},{date:"1988.07.14",event:"第一筆 404 號房住宿紀錄出現"},{date:"1996.02.29",event:"三名房客於退房前失蹤"},{date:"2014.09.18",event:"旅店停業，地下鍋爐仍自行運轉"},{date:"2026.05.20",event:"鶕綾與褚日央完成緊急委託洽談"},{date:"2026.05.23",event:"玳敕青與冥濠確認循環走廊"},{date:"2026.05.26",event:"松聽簷主導註銷房號並封閉鍋爐間"},{date:"2026.05.30",event:"午未核准無限期封鎖"}],
    details:["要求全棟淨空並取得失蹤者家屬代理同意。","重建房務系統備份，標記 404 號的 63 次入住紀錄。","由冥濠維持繩索動線，確認四樓走廊會重接地下室。","註銷虛構房號、切斷鍋爐回路並封死三處循環入口。","清點房卡、鍋爐損壞與周邊住戶安置費。","覆核後仍測得 74% 污染，不符合人員進入條件。","核准維持封鎖、暫停出售並列入長期監測。"],
  },
  {
    anomaly:"持續異常",status:"處理中",metrics:[88,42,9,56,83,34,61,79],completedAt:"2026.07.02",
    summary:"地下二層原停車格編號遭建商重排，被刪除的 B2-17 持續召回不存在的車輛與乘客。",
    neighbor:"已通知大樓管委會及 31 戶住戶；夜間貨梯停用，兩名保全改派地面層值勤。",
    method:"車格編號復原、貨梯樓層隔離、出入口單向管制",seal:"反光編號牌 12 面、警示燈 8 組、黑繩 46 m",
    final:"召回頻率已降低但尚未停止；維持處理中，地下二層不得單獨進入。",note:"貨梯顯示 B2-17 時請留在轎廂內，直到樓層顯示自行恢復。",
    timeline:[{date:"1999.01.22",event:"地下停車場完工，原設 B2-17 車格"},{date:"2007.04.01",event:"管委會重編車格並刪除 B2-17"},{date:"2016.08.09",event:"監視器首次拍到無牌車駛入牆面"},{date:"2024.12.31",event:"夜班保全於貨梯內失去 19 分鐘記憶"},{date:"2026.06.24",event:"婪煙與松聽簷受理管委會委託"},{date:"2026.06.27",event:"玳敕青、松聽簷完成動線勘查"},{date:"2026.06.29",event:"褚日央與冥濠建立單向隔離區"},{date:"2026.07.02",event:"午未核准延長處理與夜間封鎖"}],
    details:["與管委會確認不停業前提及夜間人員撤離方案。","彙整車格變更圖、貨梯紀錄與保全缺勤資料。","重走車輛與貨梯路徑，確認 B2-17 為共同終點。","復原編號後建立單向管制，暫時阻止乘客回流。","估算停車收益損失、保全加班與貨梯維修費。","污染下降不足，要求追加十四日夜間觀測。","核准延長處理，地下二層維持限制進入。"],
  },
  {
    anomaly:"資料不公開",status:"觀察中",metrics:[71,19,28,86,66,12,54,93],completedAt:"2026.04.18",
    summary:"民宿前經營者以房客姓名替山徑無主墓碑登記住宿，形成每逢霧天自動入住的名冊。",
    neighbor:"完成上游 3 戶、登山口商店與巡山員訪談；異常未越過溪線，提供霧天撤離指引。",
    method:"住宿名冊除名、山徑界線重畫、霧天預約凍結",seal:"竹界樁 36 支、朱砂繩 92 m、空白房卡 14 張",
    final:"自動入住已停止，山徑仍保留低度回應；轉入 90 日觀察，不公開詳細墓址。",note:"濃霧時若櫃檯電話響一聲即停，請勿回撥或登記來電姓名。",
    timeline:[{date:"1994.06.12",event:"青石山居民宿開始營業"},{date:"2001.03.27",event:"經營者首次將無主墓碑姓名抄入住客簿"},{date:"2010.10.10",event:"房客通報霧中有人索取房卡"},{date:"2023.02.05",event:"停止營業後住客簿仍自行增加姓名"},{date:"2026.04.09",event:"裘芨與渚瀾完成保密委託"},{date:"2026.04.12",event:"玳敕青確認名冊與山徑墓碑對應"},{date:"2026.04.15",event:"松聽簷完成除名與溪線界定，冥濠接管霧天警戒"},{date:"2026.04.18",event:"午未核准轉入保密觀察"}],
    details:["與地主約定墓址保密及觀察期間暫停營業。","封存住客簿影本，將新增姓名與地籍外墓碑交叉比對。","於霧天沿山徑定位十四個回應點，確認未越過溪線。","逐筆撤銷住宿關係，重畫山徑界線並凍結預約系統。","清算停業損失、房卡耗材與山徑修復支出。","連續七次霧天未再新增姓名，保留季度複查。","核准轉入 90 日觀察並封存墓址資料。"],
  },
  {
    anomaly:"持續異常",status:"高危封鎖",metrics:[97,68,6,31,94,59,18,47],completedAt:"2026.03.11",
    summary:"建案停工時有七名工人未完成離場簽退，十一樓未封頂區域每天重演最後一班灌漿作業。",
    neighbor:"通知相鄰工區與 12 戶預售買方；北側兩戶拒絕入內檢測，列為持續觀察。",
    method:"工地全面停工、簽退補完、十一樓結構封界",seal:"工業照明 18 組、鋼索 210 m、封界牌 42 面",
    final:"重演作業仍於凌晨發生；維持高危封鎖，所有權與預售契約暫停移轉。",note:"凌晨聽見灌漿機啟動時，不得呼喊工人姓名或進行點名。",
    timeline:[{date:"2008.05.19",event:"環河建案取得十五層建照"},{date:"2009.08.07",event:"十一樓灌漿事故後工程停擺"},{date:"2009.08.08",event:"七名工人的離場簽退紀錄缺失"},{date:"2017.11.15",event:"巡查者拍到十一樓夜間施工燈光"},{date:"2026.03.01",event:"花楀與鶕綾受理資產保全委託"},{date:"2026.03.04",event:"玳敕青、冥濠完成高空安全勘查"},{date:"2026.03.07",event:"渚瀾與鶕綾嘗試補完簽退程序"},{date:"2026.03.11",event:"午未核准維持高危封鎖"}],
    details:["釐清預售買方權益並要求所有施工單位停工。","重建出勤、工安與預售契約資料，確認七筆簽退缺口。","由冥濠架設雙重安全線，勘查重演路徑與結構風險。","補完離場程序並封界十一樓，重演僅部分減弱。","清點停工求償、機具損耗與預售解約準備金。","污染仍達 68%，不符合復工或進場鑑價條件。","核准維持高危封鎖並凍結所有權移轉。"],
  },
  {
    anomaly:"低度殘留",status:"已完成淨化",metrics:[58,5,41,96,37,1,83,100],completedAt:"2026.02.26",
    summary:"前公司以不存在的員工編號申報加班，累積的工時在會議室投影設備中形成每日重播。",
    neighbor:"完成同樓層 4 家公司與管理室檢測；異常僅存在原租戶網路及投影設備，已切離。",
    method:"幽靈工號註銷、設備資料清除、加班費象徵結算",seal:"資料封條 28 張、儲存碟 3 顆、金線 6.5 m",
    final:"虛構工號與設備殘留均已清除，商辦可正常使用及出售。",note:"不得將舊投影機備份檔重新接入公司內部網路。",
    timeline:[{date:"2002.09.01",event:"商務中心八樓首次出租"},{date:"2015.01.05",event:"前租戶建立員工編號 E-000"},{date:"2018.12.28",event:"E-000 累積加班超過一萬小時"},{date:"2025.07.03",event:"會議室每日凌晨自動播放工作簡報"},{date:"2026.02.19",event:"褚日央與婪煙完成企業委託洽談"},{date:"2026.02.21",event:"玳敕青與婪煙確認殘留附著於投影系統"},{date:"2026.02.24",event:"裘芨與花楀完成工號註銷及資料切離"},{date:"2026.02.26",event:"午未核准恢復使用"}],
    details:["確認企業要求不中斷白天營運，安排夜間處理窗口。","調閱人資、門禁與薪資檔案，定位虛構工號 E-000。","比對投影設備快取與門禁紀錄，排除其他空間污染。","註銷工號、結清累積工時並銷毀三顆污染儲存碟。","核算設備更換、象徵加班費與夜間施工成本。","確認七日內投影設備未再自行啟動。","核准結案並同意恢復出租與出售。"],
  },
  {
    anomaly:"高度殘留",status:"已完成淨化",metrics:[84,8,18,94,79,3,46,98],completedAt:"2026.01.17",
    summary:"前屋主將未寄出的家書藏在公共水塔夾層，文字殘留沿管線回到四樓室內。",
    neighbor:"完成全棟 5 戶用水點與頂樓檢測；更換共用濾芯後，其餘住戶夢境與水聲均恢復正常。",
    method:"水塔停用、家書取出、文字殘留逆向回收",seal:"濾芯 5 組、吸墨紙 120 張、銀線 14 m",
    final:"文字殘留已由管線完整回收，公共水塔恢復使用，物件可正常入住。",note:"取出的家書已交由委託人保管，不得再次浸水或帶回本棟。",
    timeline:[{date:"1977.04.30",event:"白榕巷公寓完工並啟用共用水塔"},{date:"1993.06.18",event:"前屋主將十二封家書藏入水塔夾層"},{date:"2009.09.09",event:"四樓住戶首次聽見水管傳出讀信聲"},{date:"2025.12.02",event:"全棟住戶陸續夢見相同收信地址"},{date:"2026.01.09",event:"松聽簷、裘芨與花楀完成住戶協調"},{date:"2026.01.11",event:"玳敕青定位水塔夾層文字源"},{date:"2026.01.14",event:"褚日央與婪煙完成逆向回收"},{date:"2026.01.17",event:"午未核准恢復供水並結案"}],
    details:["取得五戶停水同意並安排臨時供水與住宿補貼。","彙整住戶夢境、管線圖與前屋主家族通信資料。","逐層測試用水點，確認文字由頂樓水塔向四樓集中。","停用水塔、取出家書並沿管線逆向回收文字殘留。","清算濾芯、水塔清潔、住戶安置與管線檢測費。","確認各戶用水與睡眠狀況連續 72 小時正常。","核准恢復供水、解除觀察並同意正常入住。"],
  },
]

export const properties:Property[]=records.map((r,i)=>{
  const d=caseDetails[i]
  const caseNumber=`ZT-${String(49+i).padStart(4,"0")}`
  const hasHouseAssets=i<8
  const beforeImage=hasHouseAssets?`/assets/house/${caseNumber}_before.webp`:images.properties[(i+1)%3]
  const afterImage=hasHouseAssets?`/assets/house/${caseNumber}_after.webp`:images.properties[i%3]
  return {
  id:`zt-${49+i}`,caseNumber,title:r.title,address:`${r.region}${i+3}號`,region:r.region,propertyType:r.type,price:i===2||i===5?null:13800000+i*1750000,layout:r.layout,area:r.area,age:r.age,floor:r.floor,direction:r.direction,publicFacilities:r.facilities,parking:r.parking,
  neighborHandling:d.neighbor,anomalyLevel:d.anomaly,status:d.status,handlerId:i%2?"song-tingyan":"dai-chiqing",coverImage:afterImage,beforeImage,afterImage,shortDescription:"表面條件良好，但現場紀錄與產權資料存在無法以一般屋況解釋的落差。",incidentSummary:d.summary,
  pollutionBefore:d.metrics[0],pollutionAfter:d.metrics[1],stabilityBefore:d.metrics[2],stabilityAfter:d.metrics[3],spiritualActivityBefore:d.metrics[4],spiritualActivityAfter:d.metrics[5],contractIntegrityBefore:d.metrics[6],contractIntegrityAfter:d.metrics[7],handlingMethod:d.method,sealConsumption:d.seal,finalDetermination:d.final,cautionNote:d.note,
  availableForSale:![2,5].includes(i),tags:[r.type,d.anomaly,i%2?"夜間限制":"已勘查"],completedAt:d.completedAt,timeline:d.timeline,
  handlingStages:[{stage:"案件洽談",staffIds:consultationTeams[i],detail:d.details[0]},{stage:"案件建檔",staffIds:["hua-yu"],detail:d.details[1]},{stage:"現場前期勘查",staffIds:surveyTeams[i],detail:d.details[2]},{stage:"現場異常處置",staffIds:responseTeams[i],detail:d.details[3]},...specialistStages[i],{stage:"資產清點與損耗清算",staffIds:["he-zhishun"],detail:d.details[4]},...(highestRiskCases.has(i)?[{stage:"最高風險現場安全",staffIds:["ming-hao"],detail:"冥濠統籌封鎖線、出入管制、撤離動線與現場人員安全確認。"}]:[]),{stage:"處置覆核",staffIds:["zhu-lan"],detail:d.details[5]},{stage:"最終簽核",staffIds:["wu-wei"],detail:d.details[6]}],
  }
})

const minimumCasesPerStaff=4
const staffCaseCounts=new Map<string,number>()
for(const property of properties){
  const participants=new Set(property.handlingStages.flatMap(stage=>stage.staffIds))
  for(const staffId of participants)staffCaseCounts.set(staffId,(staffCaseCounts.get(staffId)??0)+1)
}
const underrepresentedStaff=["dai-chiqing","he-zhishun","ming-hao","wu-wei","lan-yan","song-tingyan","zhu-lan","hua-yu","ju-qi","chu-riyang","ling-luan"].filter(staffId=>(staffCaseCounts.get(staffId)??0)<minimumCasesPerStaff)
if(underrepresentedStaff.length)throw new Error(`每位員工必須參與至少 ${minimumCasesPerStaff} 間不同物件，目前未達標：${underrepresentedStaff.join(", ")}`)

export const getProperty=(id:string)=>properties.find(p=>p.id===id)
