import type { Creator } from "@/types"

const zhaitangRecords = [
  {name:"凌辰",character:"午未｜老闆",description:"男性，負責偶爾視察齋堂房屋不動產的營運狀況，並對重大案件進行最終簽核。",styles:["經營者氣場","高級商務","冷調敘事"],works:["老闆視察日","最終簽核"],photo:"/images/employees/wu-wei.webp"},
  {name:"音🔕｜𝕄𝕚𝕒𝕟",character:"裘笈｜業務行銷經理",description:"男性，負責追蹤管理每位員工的 KPI 進度、解決員工「雜症」，並精通各類行銷話術。",companion:"喬治｜金色的小蟾蜍，裘笈的寵物，會被他隨身攜帶。",styles:["行銷職人","金色調","商務角色"],works:["KPI 追蹤表","成交話術","喬治出勤中"],photo:"/images/employees/ju-qi.webp"},
  {name:"雙雙 𝓈𝒽𝓊𝒶𝓃𝑔",character:"渚瀾｜店長",quote:"出淤泥而抹均勻，拍打至完全吸收。",description:"這裡是一坨雙雙 |ω・）\n喜歡可愛、怪怪、好笑的萌物\n\n如果愛不能解決問題\n那就讓愛成為問題 (๑•̀ㅂ•́)و✧\n\n愛情不一定要有結果\n有後果也可以 (゜∀。)\n\n建議搭配42號混凝土",styles:["怪","可愛","人外","異想天開","精神狀態良好"],works:["今日店長值班","吉祥物的覆核章"],photo:"/images/employees/zhu-lan.webp"},
  {name:"夜欞 𝓎𝑒 𝑙𝒾𝓃𝑔",character:"鶕綾｜副店長",quote:"將靈魂浸泡在琥珀色的危險裡，在琴音最溫柔的伏筆處，優雅地走向覆滅。",description:"這裡是欞，也可以叫我安安，喜歡聽著歌寫角色，因此風格會受歌單影響（\n這裡有毫無保留的愛意，也有病態扭曲的愛。\n\nI’ll take you to the moon and back",styles:["病態沈溺","黑暗向","奇幻反差","純魅魔","垂耳之犬","純愛"],works:["副店長代理中","封鎖計畫"],photo:"/images/employees/ling-luan.webp"},
  {name:"墨非 𝓂𝑜𝓅𝒽𝓎",character:"賀止損、玳敕青｜共同創作",quote:"寫故事，也建構世界。",description:"想寫那些不存在於現實，卻值得相信的故事，讓每位角色都像真實存在於另一個世界。\n擅長軍事科幻、懸疑與電影式敘事，也持續探索更多不同題材。\n希望故事不只是被閱讀，而是被每位玩家親身活過。",companion:"車車｜灰白色公天竺鼠，賀止損的寵物，時常黏在他的胸前口袋。",styles:["軍事","科幻","懸疑","電影敘事"],works:["封印損耗表","零點結算","文字化蝶"],photo:"/images/employees/he-zhishun.webp"},
  {name:"🌙沐月｜𝓜𝓾𝓜𝓾",character:"花楀｜櫃檯行政秘書",description:"男性，負責勞健保處理、案件建檔，以及記錄所有員工 KPI 的行政相關作業。",companion:"肥料｜純白布偶母貓，花楀的寵物，也是齋堂的店貓。",styles:["月色柔光","行政日常","白色系角色"],works:["櫃檯機密名冊","KPI 歸檔日","肥料巡店"],photo:"/images/employees/hua-yu.webp"},
  {name:"期待戳戳",character:"松聽簷｜業務銷冠",description:"男性，負責處理難搞型業務，專攻極凶屋、因果糾紛物件與土地煞氣淨化。",styles:["極凶屋敘事","暖金光影","和風角色"],works:["極凶屋成交紀錄","雨傘下的帶看","土地煞氣淨化"],photo:"/images/employees/song-tingyan.webp"},
  {name:"比比",character:"婪煙｜業務",quote:"以前只會到處發呆。現在開始，想陪你一起發呆。（？",description:"🧸 會迷路\n🫧 會傻笑\n🤍 會陪你把壞心情趕走\n\n發呆可以一個人，快樂想跟你一起。",styles:["純愛","呆","陪伴","偏日常"],works:["地縛靈帶看中","超渡完成之前"],photo:"/images/employees/lan-yan.webp"},
  {name:"蛋塔今天也想談戀愛",character:"褚日央、玳敕青｜共同創作",quote:"妳與他的故事未完，願每一次相遇，都能寫成餘生。 🌸",description:"我是DAN TA\n\n每個故事裡的他都有想對妳說的話\n真正重要的東西用眼睛是看不見的\n唯有真心作陪，方得真心相待\n\n一起用心譜寫一場雙向的奔赴。",styles:["細節控","劇情向","海量任務","日常純愛","甜寵無度"],works:["影印機又卡紙了","交屋後風水服務","請不要碰現場"],photo:"/images/employees/chu-riyang.webp"},
  {name:"なな｜菜菜",character:"冥濠｜保全",quote:"他們只是不懂什麼是愛，只知道失去你，等於失去一切。\n\n如果世界很吵，那我就陪你安靜。",description:"🌵 以前的菜：只會種仙人掌。\n🌱 現在的菜：開始兼賣小菜苗（？\n\n🌵會嘴硬、會發瘋、會追妻\n🌱 會害羞、會臉紅、會偷偷把你放在第一位\n\n雖然品種不同，但都會把玩家放在心尖上。 🥹🫶\n\n歡迎來找啊菜串門子😆",styles:["追妻火葬場","瘋批","偏執","渣男","黑暗向","純愛","呆","陪伴","偏日常"],works:["夜間巡邏名單","最高風險封鎖線"],photo:"/images/employees/ming-hao.webp"},
] as const

const friendshipRecords = [
  {name:"黃森",character:"玳敕青｜共同創作",description:"沉迷於創作各種可以瑟瑟的角色，在不真實的故事中寫真實的細節。",styles:["什麼都做的百變怪","NSFW","劇情","虐戀","搞笑","恐怖","高肉"],works:["真實瑟瑟聲音工作室","白言沐","死囚軍團阿維斯塔"],photo:"/images/employees/dai-chiqing.webp"},
  {name:"千歲(歲歲平安)",character:"友誼贊助｜靈感提供",description:`歲歲平安 (●°u°●)​
生活很苦，但你要甜❤️

    　　､ゞヾ∧""'∧;,
　　ヾ　　  　. ̮.     彡
　 ﾐ　　   　０  ０    ミ
　~彡　　　　　   ﾐ
　　/ｿ,,　,０; ,;;:､０ヾ\`

🔼這是我養的毛球貓
DC：chidzuru.`,styles:["甜寵","劇情向開放世界","不知道啊我啥都寫"],works:["鄭玄虎","深層回收者"],photo:"/images/image-fallback.svg"},
  {name:"幻幻 ℋ𝓊𝒶𝓃ℋ𝓊𝒶𝓃",character:"友誼贊助｜靈感提供",quote:"幻境所及，皆為真。",description:"你好，這裡是幻幻\n創作風格什麼都沾一點，靈感來了就寫\n有可以放鬆的簡單小品，也有能夠深入探索的世界\n\n願你在這一方角落，遇見屬於自己的故事。",styles:["小品","劇情","開放世界","甜甜","虐戀","奇幻","日常"],works:["異常場景發想"],photo:"/images/image-fallback.svg"},
  {name:"飛花 𝒻𝑒𝒾 𝒽𝓊𝒶",character:"友誼贊助｜靈感提供",quote:"我為角色搭建了骨架，感謝有你的相遇，讓他生出血肉。從此以後，故事由你與我共同執筆。",description:"我始終相信，角色是作者靈魂的一部分。\n每一位角色，都藏著一部分的我；而每一次選擇，也映照著一部分的你。\n我將對人性、正義、陪伴與愛的思考，寫進他們的生命；你則帶著自己的故事而來，讓那些未完待續的人，迎來屬於自己的結局。\n於是，我們隔著故事相遇，也在彼此的生命裡，留下痕跡。",styles:["純愛","懸疑","劇情向","電影感","實驗型"],works:["齋堂故事靈感"],photo:"/images/image-fallback.svg"},
] as const

type CreatorRecord=typeof zhaitangRecords[number] | typeof friendshipRecords[number]
const createCreators=(records:ReadonlyArray<CreatorRecord>,prefix:string):Creator[]=>records.map((record,index)=>({
  id:`${prefix}-${String(index+1).padStart(2,"0")}`,name:record.name,photo:`/assets/author/${record.name}.webp`,
  zhaitangCharacter:record.character,characterDescription:record.description,
  quote:"quote" in record?record.quote:undefined,
  companion:"companion" in record?record.companion:undefined,styles:[...record.styles],
  recommendedWorks:record.works.map((title,workIndex)=>({title,hashtags:["齋堂房屋",record.character.split("｜")[0],record.styles[workIndex%record.styles.length].replaceAll(" ","")],url:`https://example.com/zhaitang/${index+1}/${workIndex+1}`,image:`/assets/work/${record.name}＿${title}.webp`})),
  discordUrl:"https://discord.com/",profileUrl:`https://example.com/creator/${index+1}`,
}))

export const zhaitangCreators=createCreators(zhaitangRecords,"creator")
export const friendshipCreators=createCreators(friendshipRecords,"friendship")
friendshipCreators[0]={
  ...friendshipCreators[0],
  discordUrl:"https://discord.gg/5Q94M7Gtua",
  profileUrl:"https://caveduck.io/user/H_mori",
  recommendedWorks:[
    {title:"真實瑟瑟聲音工作室",hashtags:["NSFW","劇情","高肉"],url:"https://zh-hant.cvdk.io/c/hrg1DsXhSrawjDF-bmet9A?rc=P6NdNHifhd",image:"/assets/work/黃森_真實瑟瑟聲音工作室.gif"},
    {title:"白言沐",hashtags:["劇情","虐戀"],url:"https://zh-hant.cvdk.io/c/wHSdwL8rSni6v2Klarx6vg?rc=P6NdNHifhd",image:"/assets/work/黃森_白言沐.webp"},
    {title:"死囚軍團阿維斯塔",hashtags:["恐怖","劇情","搞笑"],url:"https://zh-hant.cvdk.io/c/flCuZsFhSc2wUbYqrBCDoQ?rc=P6NdNHifhd",image:"/assets/work/黃森_死囚軍團阿維斯塔.gif"},
  ],
}
friendshipCreators[1]={
  ...friendshipCreators[1],
  discordUrl:"https://discord.gg/kENjStu7",
  profileUrl:"",
  recommendedWorks:[
    {title:"深層回收者",hashtags:["劇情向開放世界","不知道啊我啥都寫"],url:"https://h5.touchieai.com/character?code=0f58d288-657a-436d-b07d-7bf014d715db",image:"/assets/work/千歲(歲歲平安)＿深層回收者.webp"},
    {title:"鄭玄虎",hashtags:["甜寵","劇情向開放世界"],url:"https://h5.touchieai.com/character?code=5d2708ef-05ff-4932-9147-31ff06b61f3f",image:"/assets/work/千歲(歲歲平安)＿鄭玄虎.webp"},
  ],
}
export const creators=[...zhaitangCreators,...friendshipCreators]
