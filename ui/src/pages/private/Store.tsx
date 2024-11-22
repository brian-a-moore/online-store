import { Outlet } from "react-router-dom";
import { BreadCrumb } from "../../components/core/Breadcrumb";

export const StoreLayout: React.FC = () => {
  return (
    <div>
      <BreadCrumb />
      <Outlet />
    </div>
  );
};