import {CommissionProvider} from "@/components/shared/UI";import {PhoneCallProvider} from "@/components/shared/PhoneCall";import {Header} from "./Header";import {Footer} from "./Footer";
export function SiteShell({children}:{children:React.ReactNode}){return <PhoneCallProvider><CommissionProvider><Header/><main>{children}</main><Footer/></CommissionProvider></PhoneCallProvider>}
