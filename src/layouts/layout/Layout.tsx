import {ReactNode, FC} from 'react';
import Header from "@/modules/header/Header";

interface IChildSubContainerAuth {
    children?: ReactNode;
}

const Layout: FC<IChildSubContainerAuth> = ({children}) => {
    return (
        <div className={'w-full h-dvh flex justify-center items-center'}>
            <div className={'max-w-[1360px] h-full flex flex-col justify-between items-center gap-10 overflow-hidden'}>
                <Header/>
                {children}
                <div>
                    footer
                </div>
            </div>
        </div>
    )
}

export default Layout;