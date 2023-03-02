import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import { gotCompaniesAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import adminWebApi from "../../../Services/WebApi/AdminWebApi";
import CompanyCard from "../../SharedArea/Cards/CompanyCard/CompanyCard";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./ShowAllCompanies.css";
import {AiFillPlusCircle} from "react-icons/ai";

function ShowAllCompanies(): JSX.Element {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<CompanyModel[]>([]);

  useEffect(() => {
    const token = store.getState().authReducer.loginResponse.token;
    const clientType = store.getState().authReducer.loginResponse.clientType;

    if (!token) {
      navigate("/login");
    }
    if (clientType !== "ADMINISTRATOR") {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    adminWebApi
      .getAllCompanies()
      .then((res) => {
        setCompanies(res.data);
        store.dispatch(gotCompaniesAction(res.data));
      })
      .catch((e) => notify.error(e));
  }, []);

  return (
    <div className="ShowAllCompanies">
      <h2>All companies</h2>
      <button className="addButton" onClick={() => navigate("add")}><AiFillPlusCircle />Add new Company</button>
      <div>
        {companies.length > 0 ? (
          <>
            {" "}
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </>
        ) : (
          <EmptyView msg="No Companies 4u" />
        )}
      </div>
    </div>
  );
}

export default ShowAllCompanies;
