type CallProfile = { opening:string; service:string; request:string; warning:string; action:string; closing:string }
const makeCallLines = (p:CallProfile) => [
  p.opening, `請先${p.request}，我才能確認。`, `這件事由我處理，${p.action}。`, `先記住，${p.warning}。`,
  `${p.service}可以處理，但我需要完整資料。`, `地址再說一次，我正在建檔。`, `案件編號有嗎？沒有的話先報委託人姓名。`,
  `我聽見了。現在先${p.action}。`, `不要急著下結論，先讓我核對現場紀錄。`, `這通電話會留下案件註記，請說清楚發生時間。`,
  `如果情況還在持續，${p.warning}。`, `照片請保留原始檔，不要裁切，也不要調亮。`, `現場還有人嗎？請先確認所有人的位置。`,
  `我會把這件事列入${p.service}，稍後再回覆。`, `請不要自行測試第二次，第一次紀錄最有價值。`, `門窗、燈光和家具都先保持原狀。`,
  `你剛才提到的聲音，再描述一次，不要模仿它。`, `資料收到後我會重新判定案件等級。`, `若通話中斷，不要立刻回撥，先離開現場。`, p.closing,
] as const

const profiles:Record<string,CallProfile> = {
  "dai-chiqing":{opening:"您好，齋堂房屋。特殊物件勘查……是，您先說地址。",service:"前期勘查與歷史溯源",request:"提供地址、屋齡與第一次異常時間",warning:"請不要碰現場",action:"退出房間並替我保留入口動線",closing:"其他的我會確認。現在，離那扇門遠一點。"},
  "he-zhishun":{opening:"齋堂房屋。如果是問退款，先準備案件編號和損耗明細。",service:"資產與損耗清算",request:"把發票、契約與損壞照片分開整理",warning:"紙錢、符咒與正式發票不能混放",action:"列出所有無法報帳的損壞",closing:"數字對上以前，這筆案件不會結案。"},
  "ming-hao":{opening:"……你打錯分機了。櫃檯不是這裡。",service:"高危現場安全",request:"說明你的位置和身邊還有幾個人",warning:"不要回頭，也不要回應敲門聲",action:"往有光的出口移動",closing:"保持通話，走到門外再掛斷。"},
  "wu-wei":{opening:"午未。重大案件先送簽核。",service:"重大案件簽核與收購審核",request:"交代案件風險、預算與負責人",warning:"不該收購的東西不要帶回公司",action:"先停止交易並封存合約",closing:"我看完資料再決定齋堂是否接手。"},
  "lan-yan":{opening:"您好，齋堂房屋。照片先不要修。",service:"靈體超渡與地縛靈協處",request:"傳原始照片、拍攝時間與目擊順序",warning:"不要對著影像中的存在喊名字",action:"關閉預覽並離開拍攝位置",closing:"我會確認它是留在照片裡，還是跟著你。"},
  "song-tingyan":{opening:"齋堂。極凶屋？可以，地址傳過來。",service:"極凶屋與因果糾紛處理",request:"說明土地沿革與最近一次事故",warning:"不要擅自拆符，也別承諾任何交換",action:"把人撤出來，鑰匙留在管理處",closing:"我先看看，這案子值不值得親自跑一趟。"},
  "zhu-lan":{opening:"您好，齋堂房屋。門市目前正常營業。",service:"門市調度與案件受理",request:"告訴我現場人數及可聯絡窗口",warning:"不要讓任何人單獨留在屋內",action:"清點同行人員並到戶外集合",closing:"我會安排人手。少一個人都要立刻告訴我。"},
  "hua-yu":{opening:"您好，這裡是齋堂。委託、文件或案件進度都可以詢問。",service:"案件建檔與行政文件",request:"提供姓名、案件編號與聯絡方式",warning:"資料缺頁時不要自行補寫",action:"將文件依日期排列後重新上傳",closing:"我已經替您留下紀錄，進度更新會再通知。"},
  "ju-qi":{opening:"您好，齋堂房屋不動產。這間房子是賣不出去，還是住不下去？",service:"業務洽談與特殊物件行銷",request:"說明售價、屋況與買方退出原因",warning:"不要向下一位買方隱瞞已知異常",action:"暫停帶看並保留所有洽談紀錄",closing:"只要問題能被定義，房子就有談判空間。"},
  "chu-riyang":{opening:"您好，齋堂房屋。若是交屋後狀況，我替您確認。",service:"售後服務與房產風水",request:"準備契約、格局圖與現場照片",warning:"不要自行更動財位或封存位置",action:"標記異常方位並暫停施工",closing:"售後不代表結束，我會把房子調整到能住。"},
  "ling-luan":{opening:"齋堂副店長室。請先說明案件編號。",service:"店務管理與處置計畫",request:"依時間順序交代事件與現場人員",warning:"沒有案件編號就先不要進入現場",action:"封鎖入口並等待正式指派",closing:"計畫確認前，任何人都不准擅自行動。"},
}

export const extensionScripts:Record<string,readonly string[]> = Object.fromEntries(Object.entries(profiles).map(([id,profile])=>[id,makeCallLines(profile)]))

export const busyScript = "目前所有專員皆正在處理特殊物件，請保持現場原狀，稍後重新撥打。"
export const unknownScript = "……這支分機不在齋堂名冊裡。你是從哪裡拿到這個號碼的？"
export const transferScript = "請稍候，正在為您轉接專員分機。"
export const voicemailScript = "您撥打的分機目前無人接聽。請在提示音後留言；本次網站互動不會實際錄音。"

export const staffExtensions: Record<string, string> = {
  "dai-chiqing": "#001",
  "he-zhishun": "#002",
  "ming-hao": "#003",
  "wu-wei": "#004",
  "lan-yan": "#005",
  "song-tingyan": "#006",
  "zhu-lan": "#007",
  "hua-yu": "#008",
  "ju-qi": "#009",
  "chu-riyang": "#010",
  "ling-luan": "#011",
}

export const operatorGreetings = [
  "您好，這裡是齋堂房屋不動產總機。請保持冷靜，並依照語音指示選擇服務。",
  "齋堂房屋不動產您好。本通話為網站互動功能，請選擇需要轉接的服務。",
  "您好，齋堂總機。若現場燈光正在閃爍，請先離開室內，再選擇服務。",
  "歡迎致電齋堂房屋不動產。一般物件與特殊案件皆可透過下方按鍵轉接。",
  "齋堂總機您好。為了您的安全，請勿在通話期間移動現場任何物品。",
  "您好，這裡是齋堂。若您聽見本段語音以外的聲音，請不要回應。",
  "齋堂房屋不動產為您服務。請依案件需求選擇服務，或直接輸入員工分機。",
  "您好，齋堂總機。所有地址與案件內容將由接聽專員再次確認。",
  "歡迎致電齋堂。若您不確定案件類型，請選擇特殊物件初步諮詢。",
  "齋堂房屋不動產您好。請選擇服務；未登記的分機將不保證由人員接聽。",
] as const

export const serviceOptions = [
  { digit: "1", label: "特殊物件初步諮詢", staffIds: ["dai-chiqing", "song-tingyan", "lan-yan"] },
  { digit: "2", label: "案件進度與文件", staffIds: ["hua-yu", "zhu-lan"] },
  { digit: "3", label: "房屋買賣與交屋服務", staffIds: ["ju-qi", "chu-riyang"] },
  { digit: "4", label: "費用、損耗與退款", staffIds: ["he-zhishun", "wu-wei"] },
  { digit: "5", label: "高危現場與緊急安全", staffIds: ["ming-hao", "ling-luan"] },
] as const

export const operatorMenuScript = "特殊物件初步諮詢請按一；案件進度與文件請按二；房屋買賣與交屋服務請按三；費用、損耗與退款請按四；高危現場與緊急安全請按五。若要撥打員工分機，請按星號，再輸入三位數分機號碼。"
