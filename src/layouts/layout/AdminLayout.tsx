import { NavigationSidebar } from "@/components/admin/navigation-sidebar/NavigationSidebar";
import { ReactNode, FC } from "react";

interface IChildSubContainerAuth {
  children?: ReactNode;
}

const AdminLayout: FC<IChildSubContainerAuth> = ({ children }) => {
  return (
    <>
      <NavigationSidebar />
      <div className="w-full h-dvh flex justify-center items-center">
        <div className="max-w-[1360px] h-full flex flex-col justify-between items-center gap-10 overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;