import { Routes, Route } from "react-router-dom";
import App from "../../../App";
import AddNewCompany from "../../AdminServiceArea/AddNewCompany/AddNewCompany";
import AddNewCustomer from "../../AdminServiceArea/AddNewCustomer/AddNewCustomer";
import DeleteCompany from "../../AdminServiceArea/DeleteCompany/DeleteCompany";
import DeleteCustomer from "../../AdminServiceArea/DeleteCustomer/DeleteCustomer";
import ShowAllCompanies from "../../AdminServiceArea/ShowAllCompanies/ShowAllCompanies";
import ShowAllCustomers from "../../AdminServiceArea/ShowAllCustomers/ShowAllCustomers";
import UpdateCompany from "../../AdminServiceArea/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../AdminServiceArea/UpdateCustomer/UpdateCustomer";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import AddCoupon from "../../CompanyService/AddCoupon/AddCoupon";
import DeleteCoupon from "../../CompanyService/DeleteCoupon/DeleteCoupon";
import ShowAllCoupons from "../../CompanyService/ShowAllCoupons/ShowAllCoupons";
import UpdateCoupon from "../../CompanyService/UpdateCoupon/UpdateCoupon";
import PurchaseCoupon from "../../CustomerServiceArea/PurchaseCoupon/PurchaseCoupon";
import ShowCoupons from "../../CustomerServiceArea/ShowAllCoupons/ShowCoupons";
import ShowCustomerCoupons from "../../CustomerServiceArea/ShowCustomerCoupons/ShowCustomerCoupons";
import About from "../../PagesArea/About/About";
import Developer from "../../PagesArea/Developer/Developer";
import Home from "../../PagesArea/Home/Home";
import Page404 from "../../PagesArea/Page404/Page404";
import "./Routing.css";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/developer" element={<Developer/>}/>

        {/* Admin Area */}

        <Route path="/companies" element={<ShowAllCompanies/>}/>
        <Route path="/companies/remove/:id" element={<DeleteCompany/>}/>
        <Route path="/companies/edit/:id" element={<UpdateCompany/>}/>
        <Route path="/companies/add" element={<AddNewCompany/>}/>
        <Route path="/customers" element={<ShowAllCustomers/>}/>
        <Route path="/customers/remove/:id" element={<DeleteCustomer/>}/>
        <Route path="/customers/edit/:id" element={<UpdateCustomer/>}/>
        <Route path="/customers/add" element={<AddNewCustomer/>}/>


        {/* Company Area */}
        <Route path="/coupons" element={<ShowAllCoupons/>}/>
        <Route path="/coupons/remove/:id" element={<DeleteCoupon/>}/>
        <Route path="/coupons/edit/:id" element={<UpdateCoupon/>}/>
        <Route path="/coupons/add" element={<AddCoupon/>}/>


        {/* Customer Area */}
        <Route path="/customer/coupons" element={<ShowCoupons/>}/>
        <Route path="/customer/coupons/my" element={<ShowCustomerCoupons/>}/>
        <Route path="/customer/coupons/purchase/:id" element={<PurchaseCoupon/>}/>



        
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default Routing;
