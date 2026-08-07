import type { Creator } from "@/types"

const zhaitangRecords = [
  {name:"凌辰",character:"午未｜老闆",description:"佛系創作者，沒有固定題材，也沒有固定更新日。想到什麼就創作什麼，希望每一次更新，都能遇見剛好喜歡的人。",styles:["隨筆"],works:[],photo:"/images/employees/wu-wei.webp"},
  {name:"音🔕｜𝕄𝕚𝕒𝕟",character:"裘笈｜業務行銷經理",description:"「文字是一門填補遺憾的藝術，而語言則是通往遺憾的橋樑」",companion:"喬治｜金色的小蟾蜍，裘笈的寵物，會被他隨身攜帶。",styles:["日常","真實","黑市","傭兵","白月光","心碎美學"],works:[],photo:"/images/employees/ju-qi.webp"},
  {name:"雙雙 𝓈𝒽𝓊𝒶𝓃𝑔",character:"渚瀾｜店長",quote:"出淤泥而抹均勻，拍打至完全吸收。",description:"這裡是一坨雙雙 |ω・）\n喜歡可愛、怪、好笑的各類萌物(´・ω・`)",styles:["怪","可愛","異想天開","精神狀態良好","無厘頭","人外"],works:["《寄生：培育》","《寄生：甦醒》","錦霽"],photo:"/images/employees/zhu-lan.webp"},
  {name:"夜欞 𝓎𝑒 𝑙𝒾𝓃𝑔",character:"鶕綾｜副店長",description:"這個人很懶，什麼都不想填",styles:["魅魔","車車"],works:["白星瀾","沈洛年","甄言"],photo:"/images/employees/ling-luan.webp"},
  {name:"墨非 𝓂𝑜𝓅𝒽𝓎",character:"賀止損、玳敕青｜共同創作",quote:"寫故事，也建構世界。",description:"想寫那些不存在於現實，卻值得相信的故事，讓每位角色都像真實存在於另一個世界。\n擅長軍事科幻、懸疑與電影式敘事，也持續探索更多不同題材。\n希望故事不只是被閱讀，而是被每位玩家親身活過。",companion:"車車｜灰白色公天竺鼠，賀止損的寵物，時常黏在他的胸前口袋。",styles:["軍事","科幻","懸疑","電影敘事"],works:["封印損耗表","零點結算","文字化蝶"],photo:"/images/employees/he-zhishun.webp"},
  {name:"🌙沐月｜𝓜𝓾𝓜𝓾",character:"花楀｜櫃檯行政秘書",description:"沐一生溫熱的筆墨，只為照亮筆下如月般純粹的靈魂。",companion:"肥料｜純白布偶母貓，花楀的寵物，也是齋堂的店貓。",styles:["日常","反差","純愛","玄幻","劇情","細節"],works:[],photo:"/images/employees/hua-yu.webp"},
  {name:"期待戳戳",character:"松聽簷｜業務銷冠",description:"男性，負責處理難搞型業務，專攻極凶屋、因果糾紛物件與土地煞氣淨化。",styles:["極凶屋敘事","暖金光影","和風角色"],works:["極凶屋成交紀錄","雨傘下的帶看","土地煞氣淨化"],photo:"/images/employees/song-tingyan.webp"},
  {name:"比比",character:"婪煙｜業務",description:"是塊有點天馬行空的餅乾，請多多指教。",styles:["純愛","開車(?)"],works:["顧修珩","韓曜拓","洛比然"],photo:"/images/employees/lan-yan.webp"},
  {name:"蛋塔今天也想談戀愛",character:"褚日央、玳敕青｜共同創作",description:"重度言情腦，喜歡用各種方式說故事",styles:["劇情","沉浸式","多元互動方式"],works:["《偏向虎山行》顧行之","屈子驍","陌騫予"],photo:"/images/employees/chu-riyang.webp"},
  {name:"なな｜菜菜",character:"冥濠｜保全",description:"哈囉哈囉～我是菜菜😆🌱\n腦洞一開就停不下來，今天可能是追妻火葬場，明天可能變成純愛日常🥹💕\n歡迎大家一起來照顧我的小菜苗，也歡迎找菜聊天🫶",styles:["追妻火葬場","虐戀","瘋批"],works:["許墨","顧承野","林柊晟"],photo:"/images/employees/ming-hao.webp"},
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
zhaitangCreators[0]={
  ...zhaitangCreators[0],
  discordUrl:"",
  discordLabel:"lincen_cy",
  profileUrl:"https://h5.touchieai.com/author?code=7102a50d-030f-45d8-85a4-5959ed2129a9",
  otherLinks:[],
  recommendedWorks:[],
}
zhaitangCreators[1]={
  ...zhaitangCreators[1],
  discordUrl:"https://discord.gg/mumain",
  profileUrl:"",
  profileLabel:"無",
  otherLinks:[],
  recommendedWorks:[],
}
zhaitangCreators[2]={
  ...zhaitangCreators[2],
  discordUrl:"",
  discordLabel:"雙(゜∀。)／twinko.22",
  profileUrl:"",
  profileLabel:"貓堆中的雙💚／QQG30U",
  otherLinks:[
    {label:"Instagram",url:"https://www.instagram.com/twinko_22?igsh=MTJxeWVvMmY2bTl2bg=="},
  ],
  recommendedWorks:[
    {title:"《寄生：培育》",hashtags:["怪","可愛","人外"],url:"https://h5.touchieai.com/character?code=8bd89ce0-1574-48b3-aa08-6b7e1057aaf5",image:"/assets/work/雙雙 𝓈𝒽𝓊𝒶𝓃𝑔_《寄生：培育》.webp"},
    {title:"《寄生：甦醒》",hashtags:["異想天開","無厘頭"],url:"https://h5.touchieai.com/character?code=84810468-3e24-48fe-87cc-d099caa8fe20",image:"/assets/work/雙雙 𝓈𝒽𝓊𝒶𝓃𝑔_《寄生：甦醒》.webp"},
    {title:"錦霽",hashtags:["怪","精神狀態良好"],url:"https://h5.touchieai.com/character?code=6062f167-b9df-4d19-b243-76d88c82a8af",image:"/assets/work/雙雙 𝓈𝒽𝓊𝒶𝓃𝑔_錦霽.webp"},
  ],
}
zhaitangCreators[3]={
  ...zhaitangCreators[3],
  discordUrl:"",
  discordLabel:"an1lpd_ling",
  profileUrl:"",
  profileLabel:"夜欞Ling.",
  otherLinks:[],
  recommendedWorks:[
    {title:"白星瀾",hashtags:["魅魔","車車"],url:"https://h5.touchieai.com/character?code=137e4836-49d7-4f02-a485-b35b30e80a4f",image:"/assets/work/夜欞 𝓎𝑒 𝑙𝒾𝓃𝑔_白星瀾.webp"},
    {title:"沈洛年",hashtags:["魅魔","車車"],url:"https://h5.touchieai.com/character?code=9ea62b18-cc57-41b8-ac4f-7b9fd4f7fd40",image:"/assets/work/夜欞 𝓎𝑒 𝑙𝒾𝓃𝑔_沈洛年.webp"},
    {title:"甄言",hashtags:["魅魔","車車"],url:"https://h5.touchieai.com/character?code=2d8a3592-2970-40f5-b59e-dbe6e8518c81",image:"/assets/work/夜欞 𝓎𝑒 𝑙𝒾𝓃𝑔_甄言.webp"},
  ],
}
zhaitangCreators[4]={
  ...zhaitangCreators[4],
  discordUrl:"https://discord.gg/mumain",
  profileUrl:"",
  profileLabel:"0MAH9V",
  otherLinks:[],
  recommendedWorks:[
    {title:"《戰域代碼》",hashtags:["軍事","科幻","電影敘事"],url:"https://h5.touchieai.com/combo?code=90a5dbc4-547c-4035-8270-ec1d85fc464c",image:"/assets/work/墨非 𝓂𝑜𝓅𝒽𝓎_戰域代碼.webp"},
    {title:"顧星衡",hashtags:["科幻","懸疑"],url:"https://h5.touchieai.com/character?code=c41277f5-7833-46b4-84c5-3d833a193818",image:"/assets/work/墨非 𝓂𝑜𝓅𝒽𝓎_顧星衡.webp"},
    {title:"我的財閥繼兄們",hashtags:["懸疑","電影敘事"],url:"https://h5.touchieai.com/character?code=3caf2f19-1ee2-41bf-9c73-cc3dd1c1d009",image:"/assets/work/墨非 𝓂𝑜𝓅𝒽𝓎＿我的財閥繼兄們.webp"},
  ],
}
zhaitangCreators[5]={
  ...zhaitangCreators[5],
  discordUrl:"",
  discordLabel:"__muyue__",
  profileUrl:"https://h5.touchieai.com/author?code=f1e1a54e-ac4d-48c1-b327-bec31afa9c87",
  otherLinks:[
    {label:"Instagram",url:"https://www.instagram.com/__muyue__?igsh=MWNhaDU0b2x4M2FmOQ%3D%3D&utm_source=qr"},
    {label:"Threads",url:"https://www.threads.com/@__muyue__?igshid=NTc4MTIwNjQ2YQ=="},
  ],
}
zhaitangCreators[6]={
  ...zhaitangCreators[6],
  recommendedWorks:[],
}
zhaitangCreators[7]={
  ...zhaitangCreators[7],
  discordUrl:"https://discord.gg/UVT8SMY2",
  profileUrl:"https://h5.touchieai.com/author?code=a5fe3165-bfc3-4f19-a0bd-d107816307d2",
  otherLinks:[],
  recommendedWorks:[
    {title:"顧修珩",hashtags:["純愛","開車(?)"],url:"https://h5.touchieai.com/character?code=1a007610-c461-432d-a0a0-c010c3a49c56",image:"/assets/work/比比_顧修珩.webp"},
    {title:"韓曜拓",hashtags:["純愛","開車(?)"],url:"https://h5.touchieai.com/character?code=100d1756-de87-4a8a-a6c4-538f8edce639",image:"/assets/work/比比_韓曜拓.webp"},
    {title:"洛比然",hashtags:["純愛","開車(?)"],url:"https://h5.touchieai.com/character?code=2224e264-5460-457a-84c1-8803c0a852c4",image:"/assets/work/比比_洛比然.webp"},
  ],
}
zhaitangCreators[8]={
  ...zhaitangCreators[8],
  discordUrl:"",
  discordLabel:"nikoyo6548",
  profileUrl:"",
  otherLinks:[],
  recommendedWorks:[
    {title:"《偏向虎山行》顧行之",hashtags:["劇情","沉浸式"],url:"https://h5.touchieai.com/character?code=30018d40-3f54-4727-a441-cdb0fdf97eb8",image:"/assets/work/蛋塔今天也想談戀愛_《偏向虎山行》顧行之.webp"},
    {title:"屈子驍",hashtags:["沉浸式","多元互動方式"],url:"https://h5.touchieai.com/character?code=8b5e3f5a-b267-4d6e-82cc-9c6f1d6e5fdd",image:"/assets/work/蛋塔今天也想談戀愛_屈子驍.webp"},
    {title:"陌騫予",hashtags:["劇情","多元互動方式"],url:"https://h5.touchieai.com/character?code=61ee33d9-adb5-4370-a5a7-71ce29630535",image:"/assets/work/蛋塔今天也想談戀愛_陌騫予.webp"},
  ],
}
zhaitangCreators[9]={
  ...zhaitangCreators[9],
  discordUrl:"https://discord.gg/7aEEpcx6",
  profileUrl:"https://h5.touchieai.com/author?code=6b3de2a2-0a30-4c3c-bffa-565434a07ce5",
  otherLinks:[{label:"CRUSH",url:"https://creators.passion.xyz/tyby_0309"}],
  recommendedWorks:[
    {title:"許墨",hashtags:["追妻火葬場","虐戀"],url:"https://h5.touchieai.com/character?code=68e16589-41e7-41bf-b968-9a012cc78765",image:"/assets/work/なな｜菜菜＿許墨.webp"},
    {title:"顧承野",hashtags:["瘋批","虐戀"],url:"https://h5.touchieai.com/character?code=8a9188ed-1107-4b7b-bd30-43039b2b0440",image:"/assets/work/なな｜菜菜＿顧承野.webp"},
    {title:"林柊晟",hashtags:["追妻火葬場","瘋批"],url:"https://h5.touchieai.com/character?code=4007bbfd-cd17-4423-86f9-59a691a8d9eb",image:"/assets/work/なな｜菜菜＿林柊晟.webp"},
  ],
}
friendshipCreators[0]={
  ...friendshipCreators[0],
  discordUrl:"https://discord.gg/5Q94M7Gtua",
  profileUrl:"https://caveduck.io/user/H_mori",
  recommendedWorks:[
    {title:"真實瑟瑟聲音工作室",hashtags:["NSFW","劇情","高肉"],url:"",image:"/assets/work/黃森_真實瑟瑟聲音工作室.gif"},
    {title:"白言沐",hashtags:["劇情","虐戀"],url:"",image:"/assets/work/黃森_白言沐.webp"},
    {title:"死囚軍團阿維斯塔",hashtags:["恐怖","劇情","搞笑"],url:"",image:"/assets/work/黃森_死囚軍團阿維斯塔.gif"},
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
