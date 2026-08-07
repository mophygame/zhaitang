import {CommissionProvider} from "@/components/shared/UI";import {Header} from "./Header";import {Footer} from "./Footer";
export function SiteShell({children}:{children:React.ReactNode}){return <CommissionProvider><Header/><main>{children}</main><Footer/></CommissionProvider>}
