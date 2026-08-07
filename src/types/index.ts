export type HandlingStage = { stage:string; staffIds:string[]; detail:string }
export type Property = { id:string; caseNumber:string; title:string; address:string; region:string; propertyType:string; price:number|null; layout:string; area:number; age:number; floor:string; direction:string; publicFacilities:string|null; parking:string; neighborHandling:string; anomalyLevel:string; status:string; handlerId:string; coverImage:string; beforeImage:string; afterImage:string; shortDescription:string; incidentSummary:string; pollutionBefore:number; pollutionAfter:number; stabilityBefore:number; stabilityAfter:number; availableForSale:boolean; tags:string[]; completedAt:string; timeline:{date:string;event:string}[]; handlingStages:HandlingStage[] };
export type StaffMember = { id:string; employeeNumber:string; name:string; englishName:string; title:string; department:string; ageDisplay:string; height:string; specialty:string[]; description:string; quote:string; portrait:string; caseCount:number; successRate:number; status:string; confidentialNote:string };
export type DetectionEffect = {
  x: number
  y: number
  scale: number
  opacity: number
  rotation: number
}

export type DetectionResult = {
  caseNumber: string
  isAnomalous: boolean
  pollution: number
  gazes: number
  entities: number
  ink: string
  stability: number
  verdict: string
  effect: DetectionEffect | null
}

export type CreatorWork = {
  title: string
  hashtags: string[]
  url: string
  image: string
}

export type Creator = {
  id: string
  name: string
  photo: string
  zhaitangCharacter: string
  characterDescription: string
  companion?: string
  styles: string[]
  recommendedWorks: CreatorWork[]
  discordUrl: string
  profileUrl: string
}
