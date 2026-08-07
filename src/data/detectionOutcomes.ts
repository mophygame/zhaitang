import type { DetectionModeId } from "@/data/supernaturalAssets"

export type DetectionSeverity = "clear" | "low" | "medium" | "high"

export type DetectionOutcome = {
  isAnomalous: boolean
  severity: DetectionSeverity
  verdict: string
}

const normal = (verdict: string): DetectionOutcome => ({ isAnomalous: false, severity: "clear", verdict })
const anomaly = (severity: Exclude<DetectionSeverity, "clear">, verdict: string): DetectionOutcome => ({ isAnomalous: true, severity, verdict })

export const detectionOutcomePools: Record<DetectionModeId, readonly DetectionOutcome[]> = {
  基礎靈異檢測: [
    normal("本次檢測未發現異常殘留，影像狀態穩定。"),
    normal("光影與拍攝環境相符，未檢出額外輪廓。"),
    normal("影像中的視線數量與登記人數一致。"),
    normal("未發現需要處理的低度靈異反應。"),
    normal("背景陰影屬自然光線變化，無異常紀錄。"),
    normal("影像殘留值低於警戒標準，可正常保存。"),
    normal("檢測結果清晰，沒有非登記存在靠近鏡頭。"),
    normal("空間反射正常，未見持續性異常訊號。"),
    normal("本次影像安全，但仍不建議於凌晨重拍。"),
    normal("檔案結構與拍攝內容一致，未發現靈異殘留。"),
    anomaly("low", "影像邊緣出現短暫冷色殘光，目前無主動靠近跡象。"),
    anomaly("low", "背景留有微弱靈體殘影，判定為低度經過型殘留。"),
    anomaly("low", "鏡頭右側記錄到一次不明亮度下降，建議保留原檔。"),
    anomaly("low", "發現一處與現場光源不一致的淡影，危險度偏低。"),
    anomaly("low", "影像中有短暫視線反應，來源尚未形成完整輪廓。"),
    anomaly("medium", "照片後方出現低透明度存在，請勿連續拍攝三次。"),
    anomaly("medium", "偵測到未登記的微弱輪廓，建議由齋堂進一步複檢。"),
    anomaly("medium", "影像殘留在人物離開後仍持續，暫列觀察案件。"),
    anomaly("medium", "背景中有一處視線方向始終朝向鏡頭。"),
    anomaly("high", "基礎檢測即出現完整顯影，請停止在原地繼續拍攝。"),
  ],
  異常存在檢測: [
    normal("現場登記存在與影像辨識數量一致。"),
    normal("未辨識到拍攝者以外的人形或視線來源。"),
    normal("背景輪廓皆可由家具與自然陰影解釋。"),
    normal("影像深度資料正常，未出現額外站位。"),
    normal("鏡面與窗面反射數量正確，沒有遺漏對象。"),
    normal("未登記存在數量為零，本次檢測通過。"),
    normal("畫面中的移動痕跡均與拍攝對象一致。"),
    normal("未發現持續注視鏡頭的外部視線。"),
    anomaly("low", "影像最外側出現一個未完成輪廓，停留時間極短。"),
    anomaly("low", "人物後方辨識到額外視線，但尚未形成實體。"),
    anomaly("low", "窗面反射比現場登記人數多出一處。"),
    anomaly("low", "畫面角落存在模糊站位，無法對應任何拍攝者。"),
    anomaly("medium", "偵測到一處未登記存在，視線正朝向主要人物。"),
    anomaly("medium", "背景輪廓在連續影格中改變位置，排除固定物件。"),
    anomaly("medium", "拍攝者身後存在第二組肩部輪廓，來源不明。"),
    anomaly("medium", "影像中多出一個遮蔽光源的存在，建議立即離場。"),
    anomaly("high", "未登記存在與拍攝者距離過近，無法確認是否已離開。"),
    anomaly("high", "辨識到兩處同步視線，其中一處位於非可站立區域。"),
    anomaly("high", "畫面內存在完整人形，但原始景深沒有記錄其距離。"),
    anomaly("high", "檢測對象後方的存在已轉向鏡頭，建議立即委託齋堂。"),
  ],
  空間污染檢測: [
    normal("空間墨跡與陰影值皆在正常範圍內。"),
    normal("牆面、地板及背景未發現持續性污染。"),
    normal("影像色偏來自拍攝光源，無異常擴散現象。"),
    normal("空間穩定度良好，未檢出殘留視線。"),
    normal("背景暗部邊界自然，沒有墨化或侵蝕反應。"),
    normal("環境污染指數低於處理標準，本次判定正常。"),
    normal("拍攝區域沒有偵測到附著型異常。"),
    normal("空間紋理與原始影像一致，未產生二次變化。"),
    anomaly("low", "牆面發現小範圍墨色暈染，暫未擴散。"),
    anomaly("low", "角落陰影濃度異常，疑似殘留曾短暫附著。"),
    anomaly("low", "空間中出現一條無光源依據的暗色軌跡。"),
    anomaly("low", "背景紋理有輕微重疊，建議七日後再次檢測。"),
    anomaly("medium", "墨跡殘留沿牆面向人物方向延伸。"),
    anomaly("medium", "偵測到兩處固定視線與一處環境陰影異常。"),
    anomaly("medium", "空間污染集中於門框附近，請避免長時間停留。"),
    anomaly("medium", "影像暗部出現不自然擴散，穩定度持續下降。"),
    anomaly("high", "污染已覆蓋主要活動區域，建議暫停使用該空間。"),
    anomaly("high", "墨色殘留形成封閉輪廓，請勿自行擦除或觸碰。"),
    anomaly("high", "空間中的視線與陰影同時增加，判定為持續性異常。"),
    anomaly("high", "環境污染接近封鎖標準，建議立即建立正式案件。"),
  ],
  深度顯影: [
    normal("深度顯影完成，未發現隱藏於原始曝光下的存在。"),
    normal("提高顯影強度後，所有輪廓仍可由現場物件對應。"),
    normal("影像深層資訊穩定，沒有額外視線回應。"),
    normal("多層曝光比對一致，本次未檢出高危異常。"),
    normal("深度掃描未發現附著或跟隨型反應。"),
    normal("顯影結果正常；為安全起見，請勿於同地點立即重測。"),
    anomaly("low", "深層曝光中出現短暫輪廓，原始照片未能直接辨識。"),
    anomaly("low", "顯影後發現一處淡色視線，尚未接近主要人物。"),
    anomaly("low", "影像底層留有不明移動軌跡，來源可能已離開。"),
    anomaly("medium", "第二層顯影出現未登記存在，正位於拍攝者後方。"),
    anomaly("medium", "原始暗部內藏有完整面部方向，但五官無法辨識。"),
    anomaly("medium", "偵測到跟隨型殘影，請勿攜帶本照片返回拍攝地點。"),
    anomaly("medium", "顯影素材與原始空間產生位移，判定並非固定殘留。"),
    anomaly("medium", "有一處存在只在提高對比後回望鏡頭。"),
    anomaly("high", "深度顯影辨識到近距離人形，與拍攝者幾乎重疊。"),
    anomaly("high", "影像底層存在多重視線，部分來源超出原始畫面範圍。"),
    anomaly("high", "顯影後的存在位置比拍攝瞬間更靠近鏡頭。"),
    anomaly("high", "偵測到非單次殘留；該存在可能持續附著於影像。"),
    anomaly("high", "深層輪廓已遮蔽部分原始人物，請停止重複顯影。"),
    anomaly("high", "檢測結果超出公開服務處理範圍，建議立即委託齋堂。"),
  ],
}

export function pickDetectionOutcome(mode: DetectionModeId) {
  const pool = detectionOutcomePools[mode]
  return pool[Math.floor(Math.random() * pool.length)]
}
