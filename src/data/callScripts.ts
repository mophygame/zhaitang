export const extensionScripts: Record<string, string> = {
  "dai-chiqing": "您好，齋堂房屋。特殊物件勘查……是，您先說地址。其他的我會確認。",
  "he-zhishun": "齋堂房屋。……如果是問退款，請先把案件編號和損耗明細準備好。",
  "ming-hao": "……你打錯分機了。櫃檯不是這裡。",
  "wu-wei": "午未。重大案件先送簽核，不該收購的東西，不要帶回公司。",
  "lan-yan": "您好，齋堂房屋。照片先不要修，原始檔和拍攝時間一起傳給我。",
  "song-tingyan": "齋堂。極凶屋？可以。地址傳過來，我先看看值不值得親自跑一趟。",
  "zhu-lan": "您好，齋堂房屋。門市目前正常營業。請先告訴我，現場還有幾個人。",
  "hua-yu": "您好，這裡是齋堂。委託、文件或案件進度都可以詢問，請問需要哪一位？",
  "ju-qi": "您好，齋堂房屋不動產。先別急著掛電話，您這間房子到底是賣不出去，還是住不下去？",
  "chu-riyang": "您好，齋堂房屋。若是交屋後的狀況，請準備契約和現場照片，我替您確認。",
  "ling-luan": "齋堂副店長室。請說明案件編號；如果沒有編號，先不要進入現場。",
}

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
